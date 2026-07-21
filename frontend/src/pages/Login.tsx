import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../services/api";

export default function Login() {
  const navigate = useNavigate();
  const [name, setName] = useState("Abha");
  const [email, setEmail] = useState("abhanbarge@gmail.com");
  const [password, setPassword] = useState("password");

  async function login() {

    const response = await api.post("/users", {
      name,
      email,
      password,
    });

    localStorage.setItem("user", JSON.stringify(response.data));

    navigate("/dashboard");
  }

  return (
    <div className="min-h-screen bg-slate-100 flex">
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-emerald-500 to-indigo-600 items-center justify-center">
        <div>
          <h1 className="text-6xl font-bold text-white">HabitHat</h1>
          <p className="mt-6 text-xl text-white/90">
            Build habits. Build yourself.
          </p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-10">
        <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md">

          <h2 className="text-3xl font-bold mb-2">
            Welcome Back 👋
          </h2>

          <p className="text-slate-500 mb-8">
            Sign in to HabitHat
          </p>

          <input
            className="w-full border rounded-xl p-4 mb-4"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            placeholder="Name"
          />

          <input
            type="email"
            className="w-full border rounded-xl p-4 mb-6"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            placeholder="Email"
          />

          <input
            type="password"
            className="w-full border rounded-xl p-4 mb-6"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            placeholder="Password"
          />

          <button
          onClick={login}
          className="bg-emerald-600 text-white w-full rounded-xl py-3"
        >
          Sign In
        </button>

        </div>
      </div>
    </div>
  );
}