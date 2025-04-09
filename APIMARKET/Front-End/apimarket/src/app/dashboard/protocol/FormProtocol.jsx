"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { FileText } from "lucide-react";

function FormProtocol({ buttonForm, protocol, onDataUpdated }) {
  const router = useRouter();
  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState("");
  const [fechaCreacion, setFechaCreacion] = useState("");
  const [fechaActualizacion, setFechaActualizacion] = useState("");
  const [archivo, setArchivo] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const [id_Protocol, setIdProtocol] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!nombre || !tipo || !fechaCreacion || !fechaActualizacion || !archivo) {
      setError("Por favor, complete todos los campos.");
      setSubmitting(false);
      return;
    }

    try {
      const payload = {
        id_Protocol,
        nom_Protocol: nombre,
        tipo_Protocol: tipo,
        fecCre_Protocol: fechaCreacion,
        fecAct_Protocol: fechaActualizacion,
        arch_Protocol: archivo
      };

      if (buttonForm === "Actualizar") {
        const response = await axiosInstance.put(`/Api/Protocol/UpdateProtocol/${id_Protocol}`, payload);
        if (response.status === 200) {
          alert(response.data.message);
          onDataUpdated();
        }
      } else {
        const response = await axiosInstance.post("/Api/Protocol/CreateProtocol", payload);
        if (response.status === 200) {
          alert(response.data.registrado);
          onDataUpdated();
        }
      }
    } catch (error) {
      console.error("Error:", error.response || error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const setDataForUpdate = () => {
    setNombre(protocol.nom_Protocol || "");
    setTipo(protocol.tipo_Protocol || "");
    setFechaCreacion(protocol.fecCre_Protocol || "");
    setFechaActualizacion(protocol.fecAct_Protocol || "");
    setArchivo(protocol.arch_Protocol || "");
    setIdProtocol(protocol.id_Protocol || null);
  };

  useEffect(() => {
    if (protocol) setDataForUpdate();
  }, [protocol]);

  return (
    <form
      className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md"
      onSubmit={handleSubmit}
    >
      {/* Título */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-[#e87204] rounded-full flex items-center justify-center text-white">
            <FileText className="h-4 w-4" />
          </div>
          <div className="ml-3">
            <h2 className="text-xl font-bold text-gray-900">Protocolo</h2>
            <p className="text-xs text-gray-500">Ingrese los datos del protocolo</p>
          </div>
        </div>
      </div>

      {/* Mensaje de error */}
      {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Nombre */}
        <div className="space-y-1">
          <label htmlFor="nombre" className="text-sm font-medium text-gray-700">
            Nombre de protocolo
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            maxLength={50}
            placeholder="Nombre del protocolo"
            className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-[#e87204]"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>

        {/* Tipo */}
        <div className="space-y-1">
          <label htmlFor="tipo" className="text-sm font-medium text-gray-700">
            Tipo de protocolo
          </label>
          <input
            type="text"
            id="tipo"
            name="tipo"
            placeholder="Tipo de protocolo"
            className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-[#e87204]"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            required
          />
        </div>

        {/* Fecha de creación */}
        <div className="space-y-1">
          <label htmlFor="fechaCreacion" className="text-sm font-medium text-gray-700">
            Fecha de creación
          </label>
          <input
            type="date"
            id="fechaCreacion"
            name="fechaCreacion"
            className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-[#e87204]"
            value={fechaCreacion}
            onChange={(e) => setFechaCreacion(e.target.value)}
            required
          />
        </div>

        {/* Fecha de actualización */}
        <div className="space-y-1">
          <label htmlFor="fechaActualizacion" className="text-sm font-medium text-gray-700">
            Fecha de Actualización
          </label>
          <input
            type="date"
            id="fechaActualizacion"
            name="fechaActualizacion"
            className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-[#e87204]"
            value={fechaActualizacion}
            onChange={(e) => setFechaActualizacion(e.target.value)}
            required
          />
        </div>

        {/* Nombre de Archivo */}
        <div className="space-y-1 col-span-1 md:col-span-2">
          <label htmlFor="archivo" className="text-sm font-medium text-gray-700">
            Nombre del archivo
          </label>
          <input
            type="text"
            id="archivo"
            name="archivo"
            maxLength={100}
            placeholder="Nombre del archivo"
            className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-[#e87204]"
            value={archivo}
            onChange={(e) => setArchivo(e.target.value)}
            required
          />
        </div>
      </div>

      {/* Botón */}
      <div className="flex justify-end pt-4">
        <Button
          disabled={isSubmitting}
          type="submit"
          className="bg-[#e87204] text-white px-6 py-2 text-sm rounded-lg hover:bg-[#030712] focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50 transition-colors"
        >
          {isSubmitting ? "Guardando..." : buttonForm}
        </Button>
      </div>
    </form>
  );
}

export default FormProtocol;
