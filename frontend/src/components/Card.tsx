import { useNavigate } from "react-router";

export default function Card({
    id,
    name,
    price,
    img,
    court_type_name,
    court_type_id,
}: {
    id: string;
    name: string;
    price?: number;
    img: string;
    court_type_name?: string;
    court_type_id: string;
}) {
    const navigate = useNavigate();

    const handleReserveClick = () => {
        navigate("/reservation", {
            state: {
                court: { id, name, price, img, court_type_name, court_type_id },
            },
        });
    };

    return (
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
                            onClick={handleReserveClick}
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
    );
}
