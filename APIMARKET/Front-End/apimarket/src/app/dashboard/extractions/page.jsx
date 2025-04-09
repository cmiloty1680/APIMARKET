"use client";

import Sidebar from "@/components/navs/Siderbar";
import Header from "@/components/navs/NavPrivate";
import { useState } from "react";
import { FlaskRoundIcon as Flask } from "lucide-react";

import axiosInstance from "@/lib/axiosInstance";

function ExtractionPage() {
  const [fecExtraction, setFecExtraction] = useState("");
  const [canExtraction, setCanExtraction] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [msSuccess, setMsSuccess] = useState("");

  async function handleSubmitExtraction(event) {
    event.preventDefault();
    setSubmitting(true);

    const body = {
      fec_Extraction: fecExtraction,
      can_Extraction: canExtraction,
    };

    if (!body.fec_Extraction || !body.can_Extraction) {
      setError("Todos los campos son requeridos.");
      setSubmitting(false);
      return;
    }

    try {
      const response = await axiosInstance.post(`Api/Extraction/CreateExtraction`, body);
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
        <main className="extraction">
          <div className="container mx-auto px-6 py-8">
            {(success || error) && (
              <div className="alert-overlay">
                <div className={`alert-box ${success ? "success" : "error"}`}>
                  {success && <p>Extracción registrada exitosamente.</p>}
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
              onSubmit={handleSubmitExtraction}
            >
              {/* Título */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-[#e87204] rounded-full flex items-center justify-center text-white">
                    <Flask className="h-4 w-4" />
                  </div>
                  <div className="ml-3">
                    <h2 className="text-xl font-bold text-gray-900">Extracción</h2>
                    <p className="text-xs text-gray-500">Ingrese los datos de la extracción</p>
                  </div>
                </div>
              </div>

              {/* Mensajes */}
              {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}

              <div className="space-y-4">
                {/* Fecha de extracción */}
                <div className="space-y-1">
                  <label htmlFor="FecExtraction" className="text-sm font-medium text-gray-700">
                    Fecha de la Extracción
                  </label>
                  <input
                    type="date"
                    id="FecExtraction"
                    placeholder="Fecha de la extracción"
                    value={fecExtraction}
                    onChange={(e) => setFecExtraction(e.target.value)}
                    required
                    className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#e87204]"
                  />
                </div>

                {/* Cantidad de extracción */}
                <div className="space-y-1">
                  <label htmlFor="CanExtraction" className="text-sm font-medium text-gray-700">
                    Cantidad de la Extracción
                  </label>
                  <input
                    type="number"
                    id="CanExtraction"
                    placeholder="Cantidad extraída"
                    value={canExtraction}
                    onChange={(e) => setCanExtraction(parseInt(e.target.value))}
                    required
                    className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#e87204]"
                  />
                </div>

                {/* Botón de envío */}
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

export default ExtractionPage;
