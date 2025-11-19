import { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router";
import { courtsApi, type Court } from "../api/courts";
import { bookingsApi } from "../api/bookings";
import { useAuth } from "../contexts/AuthContext";
import type { Schedule } from "../types/ReservationTypes";

type ReservationStep = 'date' | 'schedules' | 'confirmation' | 'success';

export function useReservationFlow() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [searchParams, setSearchParams] = useSearchParams();

    const [court, setCourt] = useState<Court | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [selectedDate, setSelectedDate] = useState(searchParams.get('date') || "");
    const [selectedTime, setSelectedTime] = useState<Schedule | null>(null);
    const [schedules, setSchedules] = useState<Schedule[]>([]);
    const [loadingSchedules, setLoadingSchedules] = useState(false);

    const [bookingInProgress, setBookingInProgress] = useState(false);

    const getCurrentStep = (): ReservationStep => {
        const step = searchParams.get('step');
        if (step === 'confirmation') return 'confirmation';
        if (step === 'schedules') return 'schedules';
        if (step === 'success') return 'success';
        return 'date';
    };

    const currentStep = getCurrentStep();

    useEffect(() => {
        const fetchCourt = async () => {
            if (!id) {
                setError("No se especificó una cancha");
                setLoading(false);
                return;
            }

            try {
                const { data } = await courtsApi.getById(id);
                setCourt(data);
            } catch (err) {
                setError("Error al cargar la cancha");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCourt();
    }, [id]);

    useEffect(() => {
        const fetchAvailability = async () => {
            if (!id || !selectedDate) return;
            if (currentStep !== 'schedules' && currentStep !== 'confirmation') return;

            setLoadingSchedules(true);
            try {
                const { data } = await courtsApi.getAvailability(id, selectedDate);
                setSchedules(data);

                // Restore selectedTime from URL params
                const timeParam = searchParams.get('time');
                if (timeParam && user) {
                    const schedule = data.find(s => s.start_time === timeParam);
                    if (schedule?.available) {
                        setSelectedTime(schedule);
                        // Only auto-navigate if we're on schedules step (coming from login)
                        if (currentStep === 'schedules') {
                            setSearchParams({ date: selectedDate, step: 'confirmation', time: timeParam });
                        }
                    }
                }
            } catch (err) {
                console.error("Error al cargar disponibilidad:", err);
                setSchedules([]);
            } finally {
                setLoadingSchedules(false);
            }
        };

        fetchAvailability();
    }, [id, selectedDate, currentStep, user, searchParams, setSearchParams]);

    const goToSchedules = () => {
        if (selectedDate) {
            setSearchParams({ date: selectedDate, step: 'schedules' });
        }
    };

    const selectTimeSlot = (schedule: Schedule) => {
        if (!user) {
            const currentUrl = `/reservation/${id}?date=${selectedDate}&step=schedules&time=${schedule.start_time}`;
            navigate('/login', { state: { from: currentUrl } });
            return;
        }
        setSelectedTime(schedule);
        setSearchParams({ date: selectedDate, step: 'confirmation', time: schedule.start_time });
    };

    const goBackToSchedules = () => {
        setSelectedTime(null);
        setSearchParams({ date: selectedDate, step: 'schedules' });
    };

    const goBackToDate = () => {
        if (selectedDate) {
            setSearchParams({ date: selectedDate });
        } else {
            setSearchParams({});
        }
    };

    const confirmReservation = async () => {
        if (!selectedTime || !id) return;

        setBookingInProgress(true);
        try {
            await bookingsApi.create({
                court_id: id,
                booking_date: selectedDate,
                start_time: selectedTime.start_time,
            });
            setSearchParams({ step: 'success' });
        } catch (err) {
            console.error('Error al crear reserva:', err);
            setError('Error al crear la reserva. Por favor intenta nuevamente.');
        } finally {
            setBookingInProgress(false);
        }
    };

    const cancel = () => {
        navigate(-1);
    };

    const goHome = () => {
        navigate('/');
    };

    return {
        court,
        loading,
        error,
        selectedDate,
        setSelectedDate,
        selectedTime,
        schedules,
        loadingSchedules,
        bookingInProgress,
        currentStep,
        
        goToSchedules,
        selectTimeSlot,
        goBackToSchedules,
        goBackToDate,
        confirmReservation,
        cancel,
        goHome,
    };
}
