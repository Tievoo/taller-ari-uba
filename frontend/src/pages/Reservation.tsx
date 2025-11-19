import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import {
    DateSelection,
    ScheduleSelection,
    Confirmation,
} from "../components/reservation";
import type { Schedule, Court } from "../types/ReservationTypes";

export default function Reservation() {
    const location = useLocation();
    const navigate = useNavigate();
    const { court } = location.state as { court: Court };

    const [selectedDate, setSelectedDate] = useState("");
    const [showSchedules, setShowSchedules] = useState(false);
    const [selectedTime, setSelectedTime] = useState<Schedule | null>(null);
    const [showConfirmation, setShowConfirmation] = useState(false);

    // Schedules disponibles con estado hardcodeado
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

    if (!court) {
        return <div>No se encontró la cancha.</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-6">
                    <button
                        onClick={handleCancel}
                        className="mr-4 text-gray-600 hover:text-gray-800"
                    >
                        Volver
                    </button>
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Reservar {court.name}
                    </h1>
                </div>

                <div className="mb-6">
                    <img
                        src={court.img}
                        alt={court.name}
                        className="w-full h-48 object-cover rounded-lg"
                    />
                </div>

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
    );
}
