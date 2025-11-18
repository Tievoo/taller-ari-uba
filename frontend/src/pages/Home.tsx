interface Cancha {
    id: string;
    name: string;
    court_type_id: string;
    court_type_name?: string;
    price?: number;
    img: string;
}
import Card from "../components/Card";

const canchas: Cancha[] = [
    {
        id: "1",
        name: "Cancha Fútbol",
        court_type_id: "futbol5",
        court_type_name: "Fútbol 5",
        price: 15000,
        img: "/placeholder-cancha.jpg",
    },
    {
        id: "2",
        name: "Cancha Fútbol 7 Centro",
        court_type_id: "futbol7",
        court_type_name: "Fútbol 7",
        price: 22000,
        img: "/placeholder-cancha.jpg",
    },
    {
        id: "3",
        name: "Cancha Fútbol 11 Sur",
        court_type_id: "futbol11",
        court_type_name: "Fútbol 11",
        price: 35000,
        img: "/placeholder-cancha.jpg",
    },
    {
        id: "4",
        name: "Cancha Paddle Premium",
        court_type_id: "paddle",
        court_type_name: "Paddle",
        price: 12000,
        img: "/placeholder-cancha.jpg",
    },
];

export default function Home() {
    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4">
                <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                    Canchas Disponibles
                </h1>

                <div className="space-y-6">
                    {canchas.map((cancha) => (
                        <Card
                            key={cancha.id}
                            id={cancha.id}
                            name={cancha.name}
                            price={cancha.price}
                            img={cancha.img}
                            court_type_name={cancha.court_type_name}
                        />
                    ))}
                </div>

                {canchas.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">
                            No hay canchas disponibles en este momento
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
