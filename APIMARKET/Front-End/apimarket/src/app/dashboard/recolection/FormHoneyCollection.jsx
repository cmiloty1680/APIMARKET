"use client";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axiosInstance";
import { Droplet } from "lucide-react";

function FormHoneyCollection({ buttonForm, collection, onDataUpdated }) {
  const router = useRouter();
  const [canFra125, setCanFra125] = useState("");
  const [canFra250, setCanFra250] = useState("");
  const [uniMed, setUniMed] = useState("ml");
  const [descripcion, setDescripcion] = useState("");
  const [fecha, setFecha] = useState("");
  const [responsable, setResponsable] = useState("");
  const [produccion, setProduccion] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const [id_HoneyCollection, setIdHoneyCollection] = useState(null);

  useEffect(() => {
    if (collection) {
      setCanFra125(collection.canFra125_HoneyCollection || "");
      setCanFra250(collection.canFra250_HoneyCollection || "");
      setUniMed(collection.uniMed_HoneyCollection || "ml");
      setDescripcion(collection.des_HoneyCollection || "");
      setFecha(collection.fec_HoneyCollection || "");
      setResponsable(collection.nom_Responsible || "");
      setProduccion(collection.id_Production || "");
      setIdHoneyCollection(collection.id_HoneyCollection || null);
    }
  }, [collection]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!canFra125 || !canFra250 || !descripcion || !fecha || !responsable || !produccion) {
      setError("Por favor, complete todos los campos obligatorios.");
      setSubmitting(false);
      return;
    }

    const payload = {
      id_HoneyCollection,
      canFra125_HoneyCollection: canFra125,
      canFra250_HoneyCollection: canFra250,
      uniMed_HoneyCollection: uniMed,
      des_HoneyCollection: descripcion,
      fec_HoneyCollection: fecha,
      nom_Responsible: responsable,
      id_Production: produccion,
    };

    try {
      if (buttonForm === "Actualizar") {
        const response = await axiosInstance.put(
          `/Api/HoneyCollection/UpdateHoneyCollection/${id_HoneyCollection}`,
          payload
        );
        alert(response.data.message);
        onDataUpdated();
      } else {
        const response = await axiosInstance.post(
          `/Api/HoneyCollection/CreateHoneyCollection`,
          payload
        );
        alert(response.data.registrado);
        onDataUpdated();
      }
    } catch (error) {
      console.error("Error:", error.response || error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md"
      onSubmit={handleSubmit}
    >
      {/* Encabezado */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
        <div className="w-8 h-8 bg-[#e87204] rounded-full flex items-center justify-center text-white">
            <Droplet className="h-4 w-4" />
          </div>
          <div className="ml-3">
            <h2 className="text-xl font-bold text-gray-900">Recolección de Miel</h2>
            <p className="text-xs text-gray-500">Ingrese los datos de la recolección</p>
          </div>
        </div>
      </div>

      {/* Error */}
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      {/* Campos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Frascos de 125ml */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Cantidad Frascos 125ml
          </label>
          <input
            type="number"
            value={canFra125}
            onChange={(e) => setCanFra125(e.target.value)}
            className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm"
            required
          />
        </div>

        {/* Frascos de 250ml */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Cantidad Frascos 250ml
          </label>
          <input
            type="number"
            value={canFra250}
            onChange={(e) => setCanFra250(e.target.value)}
            className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm"
            required
          />
        </div>

        {/* Unidad de Medida */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Unidad de Medida</label>
          <select
            value={uniMed}
            onChange={(e) => setUniMed(e.target.value)}
            className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm"
          >
            <option value="ml">ml</option>
          </select>
        </div>

        {/* Descripción */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Descripción</label>
          <input
            type="text"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            maxLength={45}
            placeholder="Descripción breve"
            className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm"
            required
          />
        </div>

        {/* Fecha */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Fecha</label>
          <input
            type="datetime-local"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm"
            required
          />
        </div>

        {/* Responsable */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Responsable</label>
          <input
            type="number"
            value={responsable}
            onChange={(e) => setResponsable(e.target.value)}
            placeholder="ID del responsable"
            className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm"
            required
          />
        </div>

        {/* Producción */}
        <div className="space-y-1 col-span-1 md:col-span-2">
          <label className="text-sm font-medium text-gray-700">ID Producción</label>
          <input
            type="number"
            value={produccion}
            onChange={(e) => setProduccion(e.target.value)}
            placeholder="ID de la producción"
            className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm"
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

export default FormHoneyCollection;
