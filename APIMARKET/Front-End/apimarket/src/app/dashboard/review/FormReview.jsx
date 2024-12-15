"use client";

import { useState } from "react";
import axiosInstance from "@/lib/axiosInstance";

function FormReview() {
  const [fechaReview, setFechaReview] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [msSuccess, setMsSuccess] = useState("");

  const clearMessages = () => {
    setError("");
    setSuccess(false);
  };

  async function handlerSubmitReview(event) {
    event.preventDefault();
    setSubmitting(true);

    const body = {
      Fec_Review: fechaReview,
      Des_Review: descripcion,
    };

    if (Object.values(body).includes("")) {
      setError("Todos los campos son requeridos.");
      clearMessages();
      setSubmitting(false);
      return;
    }

    try {
      const response = await axiosInstance.post("Api/Review/CreateReview", body);
      if (response.status === 200) {
        setMsSuccess(response.data.message || "Revisión registrada exitosamente.");
        setSuccess(true);
        setError("");
      } else {
        setError("Error desconocido.");
      }
    } catch (err) {
      setError(
        err.response ? err.response.data.title || "Error al conectar con el servidor" : "Error desconocido"
      );
      clearMessages();
    } finally {
      setSubmitting(false);
    }
  }

  return (
            <form
              className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md"
              onSubmit={handlerSubmitReview}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Registrar Revisión</h3>
                <p className="text-xs text-gray-500">Complete los datos de la revisión</p>
              </div>

              {/* Inputs organizados en grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label
                    htmlFor="fechaReview"
                    className="text-sm font-medium text-gray-700"
                  >
                    Fecha de Revisión
                  </label>
                  <input
                    type="date"
                    id="fechaReview"
                    value={fechaReview}
                    onChange={(e) => setFechaReview(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="descripcion"
                    className="text-sm font-medium text-gray-700"
                  >
                    Descripción
                  </label>
                  <textarea
                    id="descripcion"
                    placeholder="Ingrese la descripción"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Botón de enviar */}
              <div className="flex justify-end pt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#e87204] text-white px-6 py-2 text-sm rounded-lg hover:bg-[#030712] focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50 transition-colors"
                  >
                  {isSubmitting ? "Guardando..." : "Guardar Revisión"}
                </button>
              </div>
            </form>
  );
}

export default FormReview;
