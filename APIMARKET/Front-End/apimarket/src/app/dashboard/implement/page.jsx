"use client";

import Sidebar from "@/components/navs/Siderbar";
import Header from "@/components/navs/NavPrivate";
import { useState } from "react";
import "./pageImplement.css";

import axiosInstance from "@/lib/axiosInstance";

function Implement() {
  const [nomImplement, setNomImplement] = useState("");
  const [tipImplement, setTipImplement] = useState("");
  const [fecIngImplement, setFecIngImplement] = useState("");
  const [vlrImplement, setVlrImplement] = useState("");
  const [exiImplement, setExiImplement] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [msSuccess, setMsSuccess] = useState("");

  async function handlerSubmitImplement(event) {
    event.preventDefault();
    setSubmitting(true);

    const body = {
      Nom_Implement: nomImplement,
      Tip_Implement: tipImplement,
      FechIng_Implement: fecIngImplement,
      Vlr_Implement: vlrImplement,
      Exi_Implement: exiImplement,
    };

    if (Object.values(body).includes("")) {
      setError("Todos los campos son requeridos.");
      setSubmitting(false);
      return;
    }

    try {
      const response = await axiosInstance.post(`Api/Implement/CreateImplement`, body);
      if (response.status === 200) {
        setMsSuccess(response.data);
        setSuccess(true);
        setError("");
      } else {
        setError("Error desconocido");
      }
    } catch (error) {
      console.log(error);
      const errorMessage = error.response ? JSON.stringify(error.response.data) : "Error al conectar con el servidor";
      setError(errorMessage);
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

            {/* Formulario Implementos */}
            <main className="implement">
              <form
                className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md"
                onSubmit={handlerSubmitImplement}
              >
                <h3 className="text-xl font-bold text-gray-900 mb-6">Registrar Implemento</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="NomImplement" className="text-sm font-medium text-gray-700">
                      Nombre del Implemento
                    </label>
                    <input
                      type="text"
                      placeholder="Ingrese el nombre del implemento"
                      value={nomImplement}
                      onChange={(e) => setNomImplement(e.target.value)}
                      required
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="TipImplement" className="text-sm font-medium text-gray-700">
                      Tipo de Implemento
                    </label>
                    <select
                      value={tipImplement}
                      onChange={(e) => setTipImplement(e.target.value)}
                      required
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    >
                      <option value="">Seleccione el tipo</option>
                      <option value="herramientas">Herramientas</option>
                      <option value="trajes">Trajes</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="FecIngImplement" className="text-sm font-medium text-gray-700">
                      Fecha de Ingreso
                    </label>
                    <input
                      type="date"
                      value={fecIngImplement}
                      onChange={(e) => setFecIngImplement(e.target.value)}
                      required
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="VlrImplement" className="text-sm font-medium text-gray-700">
                      Valor del Implemento
                    </label>
                    <input
                      type="number"
                      placeholder="Ingrese el valor del implemento"
                      value={vlrImplement}
                      onChange={(e) => setVlrImplement(e.target.value)}
                      required
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="ExiImplement" className="text-sm font-medium text-gray-700">
                      Existencia
                    </label>
                    <select
                      value={exiImplement}
                      onChange={(e) => setExiImplement(e.target.value)}
                      required
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    >
                      <option value="">Seleccione la existencia</option>
                      <option value="Sí">Sí</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    type="submit"
                    className="bg-[#e87204] text-white px-6 py-2 text-sm rounded-lg hover:bg-[#030712] focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50 transition-colors"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Enviando..." : "Guardar Implemento"}
                  </button>
                </div>
              </form>
            </main>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Implement;
