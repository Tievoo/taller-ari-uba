import { Link } from "react-router";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-linear-to-r from-primary-600 to-primary-700 text-white shadow-xl backdrop-blur-sm sticky top-0 z-50">
      <div className=" px-3 sm:px-4 py-3 sm:py-4 flex justify-between items-center">
        <Link 
          to="/" 
          className="text-lg sm:text-2xl font-bold tracking-tight hover:opacity-90 transition-opacity duration-200"
        >
          <span className="text-white">
            Alquiler de Canchas
          </span>
        </Link>
        <div className="flex items-center gap-2 sm:gap-3">
          {user ? (
            <>
              <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm">
                <div className="w-8 h-8 rounded-full bg-linear-to-br from-accent-500 to-accent-600 flex items-center justify-center text-sm font-semibold">
                  {user.first_name[0].toUpperCase()}
                </div>
                <span className="font-medium">Hola, {user.first_name}</span>
              </div>
              <button
                onClick={logout}
                className="px-3 sm:px-5 py-2 sm:py-2.5 text-sm sm:text-base bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg font-medium transition-all duration-200 hover:shadow-lg border border-white/20"
              >
                <span className="hidden sm:inline">Cerrar Sesión</span>
                <span className="sm:hidden">Salir</span>
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-3 sm:px-5 py-2 sm:py-2.5 text-sm sm:text-base hover:bg-white/10 rounded-lg font-medium transition-all duration-200"
              >
                <span className="hidden sm:inline">Iniciar Sesión</span>
                <span className="sm:hidden">Ingresar</span>
              </Link>
              <Link
                to="/register"
                className="px-3 sm:px-5 py-2 sm:py-2.5 text-sm sm:text-base bg-white text-primary-600 hover:bg-primary-50 rounded-lg font-semibold transition-all duration-200"
              >
                Registrarse
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}