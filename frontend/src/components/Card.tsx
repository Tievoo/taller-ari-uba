import { useNavigate } from "react-router";
import type { Court } from "../api/courts";

export default function Card({
    court,
}: { court: Court }) {
    const navigate = useNavigate();

    const {
        id,
        name,
        price,
        image,
        court_type_name,
    } = court

    const handleReserveClick = () => {
        navigate(`/reservation/${id}`);
    };

    return (
        <div
            key={id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-200 border border-gray-100"
        >
            <div className="md:flex">
                <div className="md:w-1/3 md:h-48">
                    {
                        image ? (
                            <img    
                                src={image}
                                alt={name}
                                className="inset-0 w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-40 md:h-48 object-cover flex items-center justify-center">
                                <span className="text-gray-500 text-xl">Sin imagen disponible</span>
                            </div>
                        )
                    }
                </div>

                <div className="md:w-2/3 p-6 flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between items-start mb-3">
                            <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                                {name}
                            </h2>
                            {court_type_name && (
                                <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-primary-100 text-primary-700 border border-primary-200">
                                    {court_type_name}
                                </span>
                            )}
                        </div>

                        {price && (
                            <div className="mb-4 flex items-baseline gap-2">
                                <p className="text-2xl md:text-3xl font-bold text-primary-600">
                                    ${price.toLocaleString()}
                                </p>
                                <span className="text-sm font-medium text-gray-500">
                                    por hora
                                </span>
                            </div>
                        )}
                    </div>

                    <button
                        onClick={handleReserveClick}
                        className="w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200 bg-primary-600 text-white hover:bg-primary-700 hover:shadow-lg active:scale-[0.98]"
                    >
                        Reservar ahora
                    </button>
                </div>
            </div>
        </div>
    );
}
