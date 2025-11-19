import { type FC } from "react";
import type { Schedule } from "../../types/ReservationTypes";
import type { Court } from "../../api/courts";

interface ConfirmationProps {
    court: Court;
    selectedDate: string;
    selectedTime: Schedule | null;
    onGoBackToSelection: () => void;
    onConfirmReservation: () => void;
    loading?: boolean;
}

const Confirmation: FC<ConfirmationProps> = ({
    court,
    selectedDate,
    selectedTime,
    onGoBackToSelection,
    onConfirmReservation,
    loading = false,
}) => {
    return (
        <>
            <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Detalles de la Reserva
                </h2>
                <div className="space-y-3">
                    <div className="flex justify-between">
                        <span className="font-medium text-gray-700">
                            Cancha:
                        </span>
                        <span>{court.name}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-medium text-gray-700">
                            Fecha:
                        </span>
                        <span>{selectedDate}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-medium text-gray-700">Hora:</span>
                        <span>{selectedTime?.start_time}</span>
                    </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold text-gray-900">
                            Total a pagar:
                        </span>
                        <span className="text-2xl font-bold text-primary-600">
                            ${court.price.toLocaleString()}
                        </span>
                    </div>
                </div>
            </div>

            <div className="flex gap-3">
                <button
                    onClick={onGoBackToSelection}
                    className="flex-1 py-2 px-4 border border-gray-300 rounded-md font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                    Volver
                </button>
                <button
                    onClick={onConfirmReservation}
                    disabled={loading}
                    className="flex-1 py-2 px-4 rounded-md font-medium transition-colors bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? 'Confirmando...' : 'Confirmar Reserva'}
                </button>
            </div>
        </>
    );
};

export default Confirmation;
