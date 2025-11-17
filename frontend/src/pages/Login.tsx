import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const loginHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    await login({ email, password }).catch((err) => {
      alert("Login error: " + err);
      return null
    });
    navigate("/");

  };

  return (
    <div className="min-h-screen-nav flex items-center justify-center">
      <form
        onSubmit={loginHandler}
        className="w-full max-w-md p-6 border rounded bg-white"
      >
        <h2 className="font-heading text-2xl mb-4 text-indigo-800">Iniciar Sesión</h2>

        <label className="block mb-2">
          <span className="text-sm">Email</span>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full border rounded px-3 py-2 font-body border-gray-300"
            placeholder="Ingrese su email"
          />
        </label>

        <label className="block mb-4">
          <span className="text-sm">Contraseña</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full border rounded px-3 py-2 font-body border-gray-300"
            placeholder="Ingrese su contraseña"
          />
        </label>

        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded w-full z-10 cursor-pointer"
          >
            Iniciar sesión
          </button>
        </div>
      </form>
    </div>
  );
}
