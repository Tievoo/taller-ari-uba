import {
    DateSelection,
    ScheduleSelection,
    Confirmation,
} from "../components/reservation";
import { useReservationFlow } from "../hooks/useReservationFlow";

export default function Reservation() {
    const {
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
    } = useReservationFlow();

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
                        onClick={goHome}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Volver al inicio
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen-nav bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-3xl w-full">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden max-h-[calc(100vh-5rem)]">
                    {/* Court Header */}
                    <div className="relative h-48">
                        <img
                            src={court.image || "/placeholder-cancha.jpg"}
                            alt={court.name}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                            <button
                                onClick={cancel}
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
                    <div className="p-6 md:p-8 overflow-y-auto">
                        {currentStep === 'date' && (
                            <DateSelection
                                selectedDate={selectedDate}
                                setSelectedDate={setSelectedDate}
                                onViewSchedules={goToSchedules}
                                onCancel={cancel}
                            />
                        )}

                        {currentStep === 'schedules' && (
                            <ScheduleSelection
                                selectedDate={selectedDate}
                                schedules={schedules}
                                onReserveTime={selectTimeSlot}
                                onGoBack={goBackToDate}
                                loading={loadingSchedules}
                            />
                        )}

                        {currentStep === 'confirmation' && (
                            <Confirmation
                                court={court}
                                selectedDate={selectedDate}
                                selectedTime={selectedTime}
                                onGoBackToSelection={goBackToSchedules}
                                onConfirmReservation={confirmReservation}
                                loading={bookingInProgress}
                            />
                        )}

                        {currentStep === 'success' && (
                            <div className="text-center py-8">
                                <div className="mb-4 text-green-600">
                                    <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">¡Reserva confirmada!</h2>
                                <p className="text-gray-600 mb-6">Tu reserva ha sido creada exitosamente.</p>
                                <button
                                    onClick={goHome}
                                    className="px-6 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
                                >
                                    Volver al inicio
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
