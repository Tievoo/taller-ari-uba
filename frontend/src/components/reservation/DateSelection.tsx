import type { FC } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
    const handleDateChange = (date: Date | null) => {
        if (date) {
            const formattedDate = date.toISOString().split("T")[0];
            setSelectedDate(formattedDate);
        }
    };

    const setTomorrow = () => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const formattedDate = tomorrow.toISOString().split("T")[0];
        setSelectedDate(formattedDate);
    };

    const setNextSaturday = () => {
        const today = new Date();
        const currentDay = today.getDay();
        const daysUntilSaturday = (6 - currentDay + 7) % 7 || 7;
        const nextSaturday = new Date();
        nextSaturday.setDate(today.getDate() + daysUntilSaturday);
        const formattedDate = nextSaturday.toISOString().split("T")[0];
        setSelectedDate(formattedDate);
    };

    const selectedDateObj = selectedDate ? new Date(selectedDate + "T00:00:00") : null;

    return (
        <div>
            <div className="mb-6">
                <label
                    htmlFor="date"
                    className="block text-sm font-semibold text-gray-700 mb-3"
                >
                    Seleccionar fecha
                </label>

                <div className="flex gap-2 mb-3">

                    <DatePicker
                        selected={selectedDateObj}
                        onChange={handleDateChange}
                        minDate={new Date()}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Elegí una fecha"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none text-gray-900"
                        calendarClassName="custom-datepicker"
                        inline={false}
                    />
                    <button
                        onClick={setTomorrow}
                        className="px-4 py-2 text-sm bg-primary-50 text-primary-700 hover:bg-primary-100 rounded-lg font-medium transition-colors border border-primary-200"
                    >
                        Mañana
                    </button>
                    <button
                        onClick={setNextSaturday}
                        className="px-4 py-2 text-sm bg-primary-50 text-primary-700 hover:bg-primary-100 rounded-lg font-medium transition-colors border border-primary-200"
                    >
                        Próximo sábado
                    </button>
                </div>


            </div>

            <div className="flex gap-3">
                <button
                    onClick={onCancel}
                    className="flex-1 py-3 px-4 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                    Cancelar
                </button>
                <button
                    onClick={onViewSchedules}
                    disabled={!selectedDate}
                    className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-colors ${selectedDate
                            ? "bg-primary-600 text-white hover:bg-primary-700"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                >
                    Ver horarios
                </button>
            </div>
        </div>
    );
};

export default DateSelection;
