import type { FC } from "react";
import type { Schedule } from "../../types/ReservationTypes";

interface ScheduleSelectionProps {
    selectedDate: string;
    schedules: Schedule[];
    onReserveTime: (schedule: Schedule) => void;
    onGoBack: () => void;
    onCancel: () => void;
}

const ScheduleSelection: FC<ScheduleSelectionProps> = ({
    selectedDate,
    schedules,
    onReserveTime,
    onGoBack,
    onCancel,
}) => {
    return (
        <>
            <div className="mb-6">
                <p className="text-sm text-gray-600 mb-2">
                    Fecha seleccionada: <strong>{selectedDate}</strong>
                </p>
                <p className="text-sm font-medium text-gray-700 mb-4">
                    Horarios disponibles:
                </p>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                    {schedules.map((schedule) => (
                        <div
                            key={schedule.start_time}
                            className="flex items-center justify-between p-3 border border-gray-200 rounded-md"
                        >
                            <div className="flex items-center gap-3">
                                <span className="font-medium text-gray-900">
                                    {schedule.start_time}
                                </span>
                                <span
                                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                                        schedule.available
                                            ? "bg-green-100 text-green-800"
                                            : "bg-red-100 text-red-800"
                                    }`}
                                >
                                    {schedule.available ? "Libre" : "Ocupado"}
                                </span>
                            </div>
                            {schedule.available && (
                                <button
                                    onClick={() => onReserveTime(schedule)}
                                    className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
                                >
                                    Reservar
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex gap-3">
                <button
                    onClick={onGoBack}
                    className="flex-1 py-2 px-4 border border-gray-300 rounded-md font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                    Volver
                </button>
                <button
                    onClick={onCancel}
                    className="flex-1 py-2 px-4 border border-gray-300 rounded-md font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                    Cancelar
                </button>
            </div>
        </>
    );
};

export default ScheduleSelection;
