"use client";

import Sidebar from "@/components/navs/Siderbar";
import Header from "@/components/navs/NavPrivate";
import { useState } from "react";
// import "./page.css";

import axiosInstance from "@/lib/axiosInstance";
import Tablas from "@/components/navs/Tablas";

function RacePage() {
  const [raceName, setRaceName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [msSuccess, setMsSuccess] = useState("");

  async function handleSubmitRace(event) {
    event.preventDefault();
    setSubmitting(true);

    const body = {
      nom_Race: raceName,
      des_Race: description,
    };

    if (Object.values(body).includes("")) {
      setError("Todos los campos son requeridos.");
      setSubmitting(false);
      return;
    }

    try {
      const response = await axiosInstance.post(`Api/Race/CreateRace`, body);
      if (response.status === 200) {
        setMsSuccess(response.data);
        setSuccess(true);
        setError("");
      } else {
        setError("Error desconocido");
      }
    } catch (error) {
      setError(error.response ? error.response.data : "Error al conectar con el servidor");
      setSuccess(false);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            {/* Alerta personalizada */}
            {(success || error) && (
              <div className="alert-overlay">
                <div className="alert-box">
                  {success && <p className="text-green-500">{msSuccess}</p>}
                  {error && <p className="text-red-500">{error}</p>}
                  <button
                    className="bg-transparent text-gray-600 font-semibold hover:text-gray-800 focus:outline-none"
                    onClick={() => {
                      setSuccess(false);
                      setError("");
                    }}
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            )}

            {/* Formulario de Registro de Raza */}
            <main className="race">
              <form
                className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md"
                onSubmit={handleSubmitRace}
              >
                <h3 className="text-xl font-bold text-gray-900 mb-6">Registrar Raza</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="RaceName" className="text-sm font-medium text-gray-700">
                      Nombre de la Raza
                    </label>
                    <input
                      type="text"
                      placeholder="Nombre de la raza"
                      value={raceName}
                      onChange={(e) => setRaceName(e.target.value)}
                      required
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="Description" className="text-sm font-medium text-gray-700">
                      Descripción
                    </label>
                    <textarea
                      placeholder="Descripción de la raza"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    type="submit"
                    className="bg-[#e87204] text-white px-6 py-2 text-sm rounded-lg hover:bg-[#030712] focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50 transition-colors"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Enviando..." : "Guardar Raza"}
                  </button>
                </div>
              </form>
              <Tablas/>
            </main>
          </div>
        </main>
      </div>
    </div>
  );
}

export default RacePage;
