import type { FC } from "react";
import type { Schedule } from "../../types/ReservationTypes";

interface ScheduleSelectionProps {
    selectedDate: string;
    schedules: Schedule[];
    onReserveTime: (schedule: Schedule) => void;
    onGoBack: () => void;
    loading?: boolean;
}

const ScheduleSelection: FC<ScheduleSelectionProps> = ({
    selectedDate,
    schedules,
    onReserveTime,
    onGoBack,
    loading = false,
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
                {loading ? (
                    <div className="text-center py-8 text-gray-500">
                        Cargando horarios...
                    </div>
                ) : schedules.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                        No hay horarios disponibles para esta fecha
                    </div>
                ) : (
                    <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
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
                                    className="px-3 py-1 font-semibold bg-primary-600 text-white text-sm rounded-md hover:bg-primary-700 transition-colors"
                                >
                                    Reservar
                                </button>
                            )}
                        </div>
                    ))}
                    </div>
                )}
            </div>

            <div className="flex gap-3">
                <button
                    onClick={onGoBack}
                    className="flex-1 py-2 px-4 border border-gray-300 rounded-md font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                    Volver
                </button>
            </div>
        </>
    );
};

export default ScheduleSelection;
