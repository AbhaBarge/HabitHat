import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.tsx";
import Dashboard from "./pages/Dashboard";
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <div className="rounded-2xl bg-white p-10 shadow-xl">
        <h1 className="text-4xl font-bold text-emerald-600">
          HabitHat 🚀
        </h1>
            <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </BrowserRouter>

        <p className="mt-3 text-slate-600">
          Backend + AI Habit building Platform
        </p>
      </div>
    </div>
  );
}


export default App
