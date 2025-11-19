import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import {
    DateSelection,
    ScheduleSelection,
    Confirmation,
} from "../components/reservation";
import type { Schedule } from "../types/ReservationTypes";
import { courtsApi, type Court } from "../api/courts";

export default function Reservation() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    
    const [court, setCourt] = useState<Court | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const [selectedDate, setSelectedDate] = useState("");
    const [showSchedules, setShowSchedules] = useState(false);
    const [selectedTime, setSelectedTime] = useState<Schedule | null>(null);
    const [showConfirmation, setShowConfirmation] = useState(false);

    // Hardcoded schedules for now
    const schedules: Schedule[] = [
        { id: 1, start_time: "09:00", end_time: "10:00", available: true },
        { id: 2, start_time: "10:00", end_time: "11:00", available: false },
        { id: 3, start_time: "11:00", end_time: "12:00", available: true },
        { id: 4, start_time: "12:00", end_time: "13:00", available: true },
        { id: 5, start_time: "13:00", end_time: "14:00", available: false },
        { id: 6, start_time: "14:00", end_time: "15:00", available: true },
        { id: 7, start_time: "15:00", end_time: "16:00", available: false },
        { id: 8, start_time: "16:00", end_time: "17:00", available: true },
        { id: 9, start_time: "17:00", end_time: "18:00", available: true },
        { id: 10, start_time: "18:00", end_time: "19:00", available: false },
        { id: 11, start_time: "19:00", end_time: "20:00", available: true },
        { id: 12, start_time: "20:00", end_time: "21:00", available: false },
        { id: 13, start_time: "21:00", end_time: "22:00", available: true },
        { id: 14, start_time: "22:00", end_time: "23:00", available: true },
    ];

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

    const handleViewSchedules = () => {
        if (selectedDate) {
            setShowSchedules(true);
        }
    };

    const handleReserveTime = (schedule: Schedule) => {
        setSelectedTime(schedule);
        setShowConfirmation(true);
    };

    const handleCancel = () => {
        navigate(-1);
    };

    const handleGoBack = () => {
        setShowSchedules(false);
    };

    const handleConfirmReservation = () => {
        console.log(
            `Reservando ${court.name} para el ${selectedDate} a las ${selectedTime?.start_time}`
        );
        navigate(-1);
    };

    const handleGoBackToSelection = () => {
        setShowConfirmation(false);
        setSelectedTime(null);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
                <p className="text-gray-500 text-lg">Cargando...</p>
            </div>
        );
    }

    if (error || !court) {
        return (
            <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-500 text-lg mb-4">{error || "No se encontró la cancha"}</p>
                    <button
                        onClick={() => navigate("/")}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Volver al inicio
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-3xl mx-auto px-4">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    {/* Court Header */}
                    <div className="relative h-64 md:h-80">
                        <img
                            src={court.image || "/placeholder-cancha.jpg"}
                            alt={court.name}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                            <button
                                onClick={handleCancel}
                                className="mb-4 flex items-center text-white hover:text-gray-200 transition"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                Volver
                            </button>
                            <h1 className="text-3xl font-bold text-white mb-2">{court.name}</h1>
                            <div className="flex items-center gap-4">
                                {court.court_type_name && (
                                    <span className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm font-medium">
                                        {court.court_type_name}
                                    </span>
                                )}
                                {court.price && (
                                    <span className="text-white text-xl font-semibold">
                                        ${court.price.toLocaleString()}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Reservation Content */}
                    <div className="p-6 md:p-8">
                        {!showSchedules && !showConfirmation ? (
                            <DateSelection
                                selectedDate={selectedDate}
                                setSelectedDate={setSelectedDate}
                                onViewSchedules={handleViewSchedules}
                                onCancel={handleCancel}
                            />
                        ) : showSchedules && !showConfirmation ? (
                            <ScheduleSelection
                                selectedDate={selectedDate}
                                schedules={schedules}
                                onReserveTime={handleReserveTime}
                                onGoBack={handleGoBack}
                                onCancel={handleCancel}
                            />
                        ) : showConfirmation ? (
                            <Confirmation
                                court={court}
                                selectedDate={selectedDate}
                                selectedTime={selectedTime}
                                onGoBackToSelection={handleGoBackToSelection}
                                onConfirmReservation={handleConfirmReservation}
                            />
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
}
