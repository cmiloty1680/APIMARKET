"use client";

import Sidebar from "@/components/navs/Siderbar";
import Header from "@/components/navs/NavPrivate";
import { useState } from "react";
import { Scissors } from "lucide-react";

import axiosInstance from "@/lib/axiosInstance";

function CollecdronePage() {
  const [fecCollecDrone, setFecCollecDrone] = useState("");
  const [canCollecDrone, setCanCollecDrone] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [msSuccess, setMsSuccess] = useState("");

  async function handleSubmitCollecdrone(event) {
    event.preventDefault();
    setSubmitting(true);

    const body = {
      fec_CollecDrone: fecCollecDrone,
      can_CollecDrone: canCollecDrone,
    };

    if (!body.fec_CollecDrone || !body.can_CollecDrone) {
      setError("Todos los campos son requeridos.");
      setSubmitting(false);
      return;
    }

    try {
      const response = await axiosInstance.post(`Api/Collecdrone/CreateCollecdrone`, body);
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
        <main className="collecdrone">
          <div className="container mx-auto px-6 py-8">
            {(success || error) && (
              <div className="alert-overlay">
                <div className={`alert-box ${success ? "success" : "error"}`}>
                  {success && <p>Colección registrada exitosamente.</p>}
                  {error && <p>{error}</p>}
                  <button
                    className="close-btn"
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

            <form
              className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md"
              onSubmit={handleSubmitCollecdrone}
            >
              {/* Título */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-[#e87204] rounded-full flex items-center justify-center text-white">
                    <Scissors className="h-4 w-4" />
                  </div>
                  <div className="ml-3">
                    <h2 className="text-xl font-bold text-gray-900">Recolección de Zángano</h2>
                    <p className="text-xs text-gray-500">Ingrese los datos de la recolección</p>
                  </div>
                </div>
              </div>

              {/* Mensajes */}
              {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
              {/* {successMsg && <p className="text-green-500 mb-4 text-sm">{successMsg}</p>} */}

              <div className="space-y-4">
                {/* Fecha de Recolección */}
                <div className="space-y-1">
                  <label htmlFor="FecCollecDrone" className="text-sm font-medium text-gray-700">
                    Fecha del CollecDrone
                  </label>
                  <input
                    type="date"
                    id="FecCollecDrone"
                    value={fecCollecDrone}
                    onChange={(e) => setFecCollecDrone(e.target.value)}
                    required
                    className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#e87204]"
                  />
                </div>

                {/* Cantidad */}
                <div className="space-y-1">
                  <label htmlFor="CanCollecDrone" className="text-sm font-medium text-gray-700">
                    Cantidad del CollecDrone
                  </label>
                  <input
                    type="number"
                    id="CanCollecDrone"
                    placeholder="Cantidad recolectada"
                    value={canCollecDrone}
                    onChange={(e) => setCanCollecDrone(parseInt(e.target.value))}
                    required
                    className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#e87204]"
                  />
                </div>

                {/* Botón Guardar */}
                <div className="flex justify-end pt-3">
                  <button
                    type="submit"
                    className="bg-[#e87204] text-white px-6 py-2 text-sm rounded-lg hover:bg-[#030712] focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50 transition-colors"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Enviando..." : "Guardar"}
                  </button>
                </div>
              </div>
            </form>

          </div>
        </main>
      </div>
    </div>
  );
}

export default CollecdronePage;
