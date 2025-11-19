import type { FC } from "react";

interface DateSelectionProps {
    selectedDate: string;
    setSelectedDate: (date: string) => void;
    onViewSchedules: () => void;
    onCancel: () => void;
}

const DateSelection: FC<DateSelectionProps> = ({
    selectedDate,
    setSelectedDate,
    onViewSchedules,
    onCancel,
}) => {
    return (
        <>
            <div className="mb-6">
                <label
                    htmlFor="date"
                    className="block text-sm font-medium text-gray-700 mb-2"
                >
                    Seleccionar fecha
                </label>
                <input
                    type="date"
                    id="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]} // Fecha mínima: hoy
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            <div className="flex gap-3">
                <button
                    onClick={onCancel}
                    className="flex-1 py-2 px-4 border border-gray-300 rounded-md font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                    Cancelar
                </button>
                <button
                    onClick={onViewSchedules}
                    disabled={!selectedDate}
                    className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                        selectedDate
                            ? "bg-blue-600 text-white hover:bg-blue-700"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                >
                    Ver horarios
                </button>
            </div>
        </>
    );
};

export default DateSelection;
