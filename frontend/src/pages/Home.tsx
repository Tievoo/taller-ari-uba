import { useState, useEffect } from "react";
import Card from "../components/Card";
import { courtsApi, type Court } from "../api/courts";

export default function Home() {
    const [courts, setCourts] = useState<Court[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCourts = async () => {
            try {
                const { data } = await courtsApi.getAll();
                setCourts(data);
            } catch (err) {
                setError("Error al cargar las canchas");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCourts();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-200 border-t-primary-600 mb-4"></div>
                    <p className="text-gray-600 text-lg font-medium">Cargando canchas...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center bg-white rounded-2xl shadow-xl p-8 max-w-md">
                    <p className="text-red-600 text-lg font-semibold">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-6xl mx-auto px-4 py-12">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        Canchas Disponibles
                    </h1>
                    <p className="text-gray-600">
                        {courts.length} {courts.length === 1 ? 'cancha disponible' : 'canchas disponibles'}
                    </p>
                </div>

                <div className="space-y-6">
                    {courts.map((court) => (
                        <div key={court.id}>
                            <Card court={court} />
                        </div>
                    ))}
                </div>

                {courts.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-2xl shadow-lg">
                        <p className="text-gray-500 text-xl font-medium">
                            No hay canchas disponibles en este momento
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
