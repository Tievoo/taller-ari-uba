import { useState, useEffect } from "react";
import { bookingsApi, type Booking } from "../api/bookings";

const isPast = (date: string, time: string) => {
    const bookingDateTime = new Date(`${date.split('T')[0]}T${time}`);
    return bookingDateTime < new Date();
};


export default function MyBookings() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchBookings = async () => {
        try {
            const { data } = await bookingsApi.getAll();
            setBookings(data);
        } catch (err) {
            setError("Error al cargar las reservas");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const handleCancel = async (id: number) => {
        if (!confirm("¿Estás seguro de que quieres cancelar esta reserva?")) {
            return;
        }

        try {
            await bookingsApi.delete(id);
            setBookings(bookings.filter(b => b.id !== id));
        } catch (err) {
            alert("Error al cancelar la reserva");
            console.error(err);
        }
    };

    const pastBookings = bookings.filter(b => isPast(b.booking_date, b.start_time));
    const futureBookings = bookings.filter(b => !isPast(b.booking_date, b.start_time));

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-200 border-t-primary-600 mb-4"></div>
                    <p className="text-gray-600 text-lg font-medium">Cargando reservas...</p>
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
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Mis Reservas</h1>
                    <p className="text-gray-600">Gestiona tus reservas actuales y pasadas</p>
                </div>

                {futureBookings.length > 0 && (
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Próximas Reservas</h2>
                        <div className="flex flex-col gap-4">
                            {futureBookings.map((booking) => (
                                <BookingCard key={booking.id} booking={booking} handleCancel={handleCancel} />
                            ))}
                        </div>
                    </div>
                )}

                {pastBookings.length > 0 && (
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Historial</h2>
                        <div className="flex flex-col gap-4">
                            {pastBookings.map((booking) => (
                                <BookingCard key={booking.id} booking={booking} handleCancel={handleCancel} />
                            ))}
                        </div>
                    </div>
                )}

                {bookings.length === 0 && (
                    <div className="text-center bg-white rounded-2xl shadow-xl p-12">
                        <p className="text-gray-600 text-lg">No tienes reservas aún</p>
                    </div>
                )}
            </div>
        </div>
    );
}

function BookingCard({ booking, handleCancel }: { booking: Booking, handleCancel: (id: number) => void }) {
    return (
        <div key={booking.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex flex-col gap-3 md:gap-0 md:flex-row justify-between items-start">
                <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{booking.court_name}</h3>
                    <div className="space-y-1 text-gray-600">
                        <p className="flex items-center gap-2">
                            <span className="font-medium">Fecha:</span>
                            {new Date(booking.booking_date).toLocaleDateString('es-ES', {
                                weekday: 'short',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </p>
                        <p className="flex items-center gap-2">
                            <span className="font-medium">Horario:</span>
                            {booking.start_time.slice(0, 5)} - {booking.end_time.slice(0, 5)}
                        </p>
                    </div>
                </div>
                {
                    !isPast(booking.booking_date, booking.start_time) && (
                        <button
                            onClick={() => handleCancel(booking.id)}
                            className="mt-4 md:mt-0 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                            Cancelar
                        </button>
                    )
                }
            </div>
        </div>
    )
}
