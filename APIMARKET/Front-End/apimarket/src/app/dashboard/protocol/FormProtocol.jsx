"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/lib/axiosInstance";

function FormProtocol() {
  const [protocolName, setProtocolName] = useState("");
  const [tipoProtocol, setTipo] = useState("");
  const [creationDate, setCreationDate] = useState("");
  const [updateDate, setUpdateDate] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const [msSuccess, setMsSuccess] = useState("");

  async function handlerSubmitProtocol(event) {
    event.preventDefault();
    setSubmitting(true);

    // Validación básica
    if (!protocolName || !tipoProtocol || !creationDate || !updateDate) {
      setError("Por favor, complete todos los campos.");
      setSubmitting(false);
      return;
    }

    try {
      const response = await axiosInstance.post("/Api/Protocol/CreateProtocol", {
        nom_Protocol: protocolName,
        tip_Protocol: tipoProtocol,
        fecCre_Protocol: creationDate,
        fecAct_Protocol: updateDate,
      });

      if (response.status === 200) {
        setMsSuccess(response.data.registro || "Protocolo registrado exitosamente.");
        alert(response.data.registro);
        setProtocolName("");
        setTipo("");
        setCreationDate("");
        setUpdateDate("");
        setError(""); // Limpiar mensaje de error
      }
    } catch (error) {
      console.error(error);
      setError(
        error.response?.data?.title || "Error al intentar conectar con el servidor"
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
            <form
              className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md"
              onSubmit={handlerSubmitProtocol}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Registrar Protocolo</h3>
                <p className="text-xs text-gray-500">
                  Complete los datos del protocolo
                </p>
              </div>

              {/* Mensajes de error o éxito */}
              {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
              {msSuccess && <p className="text-green-500 mb-4 text-sm">{msSuccess}</p>}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label
                      htmlFor="ProtocolName"
                      className="text-sm font-medium text-gray-700"
                    >
                      Nombre de Protocolo
                    </label>
                    <input
                    type="text"
                    className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    id="ProtocolName"
                    placeholder="Ingrese el nombre del protocolo"
                    value={protocolName}
                    onChange={(event) => setProtocolName(event.target.value)}
                  />
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor="Description"
                      className="text-sm font-medium text-gray-700"
                    >
                      Tipo de Protocolo
                    </label>
                    <select
                    className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    id="Description"
                    value={tipoProtocol}
                    onChange={(event) => setTipo(event.target.value)}
                  >
                    <option value="">Seleccione el tipo</option>
                    <option value="Riesgo">Riesgo</option>
                    <option value="Seguridad">Seguridad</option>
                  </select>
                  </div>
                </div>

              <div className="space-y-6">

                <div className="space-y-1">
    
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label
                      htmlFor="CreationDate"
                      className="text-sm font-medium text-gray-700"
                    >
                      Fecha de Creación
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      id="CreationDate"
                      value={creationDate}
                      onChange={(event) => setCreationDate(event.target.value)}
                    />
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor="UpdateDate"
                      className="text-sm font-medium text-gray-700"
                    >
                      Fecha de Actualización
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      id="UpdateDate"
                      value={updateDate}
                      onChange={(event) => setUpdateDate(event.target.value)}
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-3">
                  <Button
                    disabled={isSubmitting}
                    type="submit"
                    className="bg-[#e87204] text-white px-6 py-2 text-sm rounded-lg hover:bg-[#030712] focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50 transition-colors"
                    >
                    {isSubmitting ? "Guardando..." : "Guardar Protocolo"}
                  </Button>
                </div>
              </div>
            </form>
  );
}

export default FormProtocol;
