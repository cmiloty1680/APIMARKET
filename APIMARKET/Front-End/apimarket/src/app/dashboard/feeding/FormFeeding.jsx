"use client";

import { useState } from "react";
import "./pageFeeding.css";

import axiosInstance from "@/lib/axiosInstance";

function FormFeeding() {
    const [tipFeeding, setTipFeeding] = useState("");
    const [fecFeeding, setFecFeeding] = useState("");
    const [canFeeding, setCanFeeding] = useState("");
    const [valFeeding, setValFeeding] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [msSuccess, setMsSuccess] = useState("");

    async function handlerSubmitFeeding(event) {
        event.preventDefault();
        setSubmitting(true);

        const body = {
            Tip_Feeding: tipFeeding,
            Fec_Feeding: fecFeeding,
            Can_Feeding: canFeeding,
            Val_Feeding: valFeeding,
        };

        if (Object.values(body).includes("")) {
            setError("Todos los campos son requeridos.");
            setSubmitting(false);
            return;
        }

        try {
            const response = await axiosInstance.post(`Api/Feeding/CreateFeeding`, body);
            if (response.status === 200) {
                setMsSuccess(response.data.creada);
                console.log(response.data.data);
                setSuccess(true);
                setError("");
            } else {
                setError("Error desconocido");
            }
        } catch (error) {
            console.log(error);
            setError(error.response ? error.response.data : "Error al conectar con el servidor");
            setSuccess(false);
        } finally {
            setSubmitting(false);
        }
    }

    return (
              <form
                className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md"
                onSubmit={handlerSubmitFeeding}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Registrar Alimentación</h3>
                  <p className="text-xs text-gray-500">
                    Complete los datos de la alimentación
                  </p>
                </div>
      
                {/* Mensajes de error o éxito */}
                {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
                {success && <p className="text-green-500 mb-4 text-sm">{msSuccess}</p>}
      
                {/* Inputs organizados en grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label
                      htmlFor="TipFeeding"
                      className="text-sm font-medium text-gray-700"
                    >
                      Tipo de Alimentación
                    </label>
                    <select
                      id="TipFeeding"
                      value={tipFeeding}
                      onChange={(e) => setTipFeeding(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    >
                      <option value="">Seleccione el tipo</option>
                      <option value="mango">Mango</option>
                      <option value="azucar">Azúcar</option>
                    </select>
                  </div>
      
                  <div className="space-y-1">
                    <label
                      htmlFor="FecFeeding"
                      className="text-sm font-medium text-gray-700"
                    >
                      Fecha de Alimentación
                    </label>
                    <input
                      type="date"
                      id="FecFeeding"
                      value={fecFeeding}
                      onChange={(e) => setFecFeeding(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>
      
                  <div className="space-y-1">
                    <label
                      htmlFor="CanFeeding"
                      className="text-sm font-medium text-gray-700"
                    >
                      Cantidad de Alimentación
                    </label>
                    <input
                      type="number"
                      id="CanFeeding"
                      placeholder="Ingrese la cantidad"
                      value={canFeeding}
                      onChange={(e) => setCanFeeding(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>
      
                  <div className="space-y-1">
                    <label
                      htmlFor="ValFeeding"
                      className="text-sm font-medium text-gray-700"
                    >
                      Valor de Alimentación
                    </label>
                    <input
                      type="number"
                      id="ValFeeding"
                      placeholder="Ingrese el valor"
                      value={valFeeding}
                      onChange={(e) => setValFeeding(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>
                </div>
      
                {/* Botón para enviar */}
                <div className="flex justify-end pt-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#e87204] text-white px-6 py-2 text-sm rounded-lg hover:bg-[#030712] focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50 transition-colors"
                    >
                    {isSubmitting ? "Guardando..." : "Guardar Alimentación"}
                  </button>
                </div>
              </form>
    );
}

export default FormFeeding;
