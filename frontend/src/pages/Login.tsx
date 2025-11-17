import { useState } from "react";
import { useNavigate } from "react-router";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: implement login logic (e.g., call API, validate, set auth)
    console.log("loginHandler called", { username, password });
  };

  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={loginHandler}
        className="w-full max-w-md p-6 border rounded bg-white"
      >
        <h2 className="font-heading text-2xl mb-4 text-indigo-800">Login</h2>

        <label className="block mb-2">
          <span className="text-sm">Usuario</span>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 block w-full border rounded px-3 py-2 font-body border-gray-300"
            placeholder="Ingrese su usuario"
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

        <div className="mb-4 text-left">
          <span
            role="button"
            tabIndex={0}
            onClick={() => navigate("/register")}
            className="text-blue-800 hover:text-violet-700 cursor-pointer font-body inline-block"
          >
            Registrarse
          </span>
        </div>

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
