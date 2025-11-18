import { useState } from "react";

export default function Card({
    id,
    name,
    price,
    img,
    court_type_name,
}: {
    id: string;
    name: string;
    price?: number;
    img: string;
    court_type_name?: string;
}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState("");
    const [showHorarios, setShowHorarios] = useState(false);

    // Horarios disponibles con estado hardcodeado
    const horarios = [
        { hora: "09:00", disponible: true },
        { hora: "10:00", disponible: false },
        { hora: "11:00", disponible: true },
        { hora: "12:00", disponible: true },
        { hora: "13:00", disponible: false },
        { hora: "14:00", disponible: true },
        { hora: "15:00", disponible: false },
        { hora: "16:00", disponible: true },
        { hora: "17:00", disponible: true },
        { hora: "18:00", disponible: false },
        { hora: "19:00", disponible: true },
        { hora: "20:00", disponible: false },
        { hora: "21:00", disponible: true },
        { hora: "22:00", disponible: true },
    ];

    const handleReservarClick = () => {
        setIsModalOpen(true);
        setShowHorarios(false);
        setSelectedDate("");
    };

    const handleVerHorarios = () => {
        if (selectedDate) {
            setShowHorarios(true);
        }
    };

    const handleReservarHorario = (hora: string) => {
        // Aquí puedes agregar la lógica para reservar el horario
        console.log(`Reservando ${name} para el ${selectedDate} a las ${hora}`);
        setIsModalOpen(false);
        setShowHorarios(false);
        setSelectedDate("");
    };

    const handleCancelar = () => {
        setIsModalOpen(false);
        setShowHorarios(false);
        setSelectedDate("");
    };

    const handleVolver = () => {
        setShowHorarios(false);
    };

    return (
        <>
            <div
                key={id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
                <div className="md:flex">
                    <div className="md:w-1/3">
                        <img
                            src={img}
                            alt={name}
                            className="w-full h-48 md:h-full object-cover"
                        />
                    </div>

                    <div className="md:w-2/3 p-6">
                        <div className="flex justify-between items-start mb-4">
                            <h2 className="text-xl font-semibold text-gray-900">
                                {name}
                            </h2>
                            {court_type_name && (
                                <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                    {court_type_name}
                                </span>
                            )}
                        </div>

                        <div className="mb-4">
                            {price && (
                                <p className="text-2xl font-bold text-green-600">
                                    ${price.toLocaleString()}
                                    <span className="text-sm font-normal text-gray-500 ml-1">
                                        /hora
                                    </span>
                                </p>
                            )}
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={handleReservarClick}
                                className="flex-1 py-2 px-4 rounded-md font-medium transition-colors bg-blue-600 text-white hover:bg-blue-700"
                            >
                                Reservar
                            </button>
                            <button className="py-2 px-4 border border-gray-300 rounded-md font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                                Ver detalles
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 shadow-xl max-h-[90vh] overflow-y-auto">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            Reservar {name}
                        </h3>

                        {!showHorarios ? (
                            <>
                                <div className="mb-4">
                                    <label
                                        htmlFor="fecha"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        Seleccionar fecha
                                    </label>
                                    <input
                                        type="date"
                                        id="fecha"
                                        value={selectedDate}
                                        onChange={(e) =>
                                            setSelectedDate(e.target.value)
                                        }
                                        min={
                                            new Date()
                                                .toISOString()
                                                .split("T")[0]
                                        } // Fecha mínima: hoy
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        onClick={handleCancelar}
                                        className="flex-1 py-2 px-4 border border-gray-300 rounded-md font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        onClick={handleVerHorarios}
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
                        ) : (
                            <>
                                <div className="mb-4">
                                    <p className="text-sm text-gray-600 mb-2">
                                        Fecha seleccionada:{" "}
                                        <strong>{selectedDate}</strong>
                                    </p>
                                    <p className="text-sm font-medium text-gray-700 mb-4">
                                        Horarios disponibles:
                                    </p>
                                    <div className="space-y-2 max-h-60 overflow-y-auto">
                                        {horarios.map((horario) => (
                                            <div
                                                key={horario.hora}
                                                className="flex items-center justify-between p-3 border border-gray-200 rounded-md"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <span className="font-medium text-gray-900">
                                                        {horario.hora}
                                                    </span>
                                                    <span
                                                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                            horario.disponible
                                                                ? "bg-green-100 text-green-800"
                                                                : "bg-red-100 text-red-800"
                                                        }`}
                                                    >
                                                        {horario.disponible
                                                            ? "Libre"
                                                            : "Ocupado"}
                                                    </span>
                                                </div>
                                                {horario.disponible && (
                                                    <button
                                                        onClick={() =>
                                                            handleReservarHorario(
                                                                horario.hora
                                                            )
                                                        }
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
                                        onClick={handleVolver}
                                        className="flex-1 py-2 px-4 border border-gray-300 rounded-md font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                                    >
                                        Volver
                                    </button>
                                    <button
                                        onClick={handleCancelar}
                                        className="flex-1 py-2 px-4 border border-gray-300 rounded-md font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
