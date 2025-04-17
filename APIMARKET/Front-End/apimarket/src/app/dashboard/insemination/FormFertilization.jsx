"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sprout } from "lucide-react";
import axiosInstance from "@/lib/axiosInstance";
import DynamicAlert from "@/components/utils/DynamicAlert";

function FormFertilization({ buttonForm, fertilization, onDataUpdated }) {
  const [fecFertilization, setFecFertilization] = useState("");
  const [canFertilization, setCanFertilization] = useState("");
  const [idFertilization, setIdFertilization] = useState(null);

  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const [msSuccess, setMsSuccess] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalOpenFall, setModalOpenFall] = useState(false);

  useEffect(() => {
    if (fertilization) {
      setFecFertilization(fertilization.fec_Fertilization);
      setCanFertilization(fertilization.can_Fertilization);
      setIdFertilization(fertilization.id_Fertilization);
    }
  }, [fertilization]);

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);

    if (!fecFertilization || !canFertilization) {
      setError("Por favor, complete todos los campos.");
      setSubmitting(false);
      return;
    }

    try {
      if (buttonForm === "Actualizar") {
        const updateData = {
          id_Fertilization: idFertilization,
          fec_Fertilization: fecFertilization,
          can_Fertilization: parseInt(canFertilization),
        };

        const response = await axiosInstance.put(
          `/Api/Fertilization/UpdateFertilization/${idFertilization}`,
          updateData
        );

        if (response.status === 200) {
          setMsSuccess(response.data.message || "Fertilización actualizada.");
          setModalOpen(true);
          onDataUpdated?.();
        }
      } else if (buttonForm === "Registrar") {
        const response = await axiosInstance.post("/Api/Fertilization/CreateFertilization", {
          fec_Fertilization: fecFertilization,
          can_Fertilization: parseInt(canFertilization),
        });

        if (response.status === 200) {
          setMsSuccess(response.data.message || "Fertilización registrada.");
          setModalOpen(true);
          onDataUpdated?.();
          setFecFertilization("");
          setCanFertilization("");
        }
      }
    } catch (error) {
      console.log("Error:", error.response || error.message);
      setError(error.response?.data?.message || "Error al conectar con el servidor.");
      setModalOpenFall(true);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <form
        className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        {/* Título */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-[#e87204] rounded-full flex items-center justify-center text-white">
              <Sprout className="h-4 w-4" />
            </div>
            <div className="ml-3">
              <h2 className="text-xl font-bold text-gray-900">Fertilización</h2>
              <p className="text-xs text-gray-500">Ingrese los datos de la fertilización</p>
            </div>
          </div>
        </div>

        {/* Mensajes */}
        {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
        {msSuccess && <p className="text-green-500 mb-4 text-sm">{msSuccess}</p>}

        <div className="space-y-4">
          {/* Fecha */}
          <div className="space-y-1">
            <label htmlFor="fecFertilization" className="text-sm font-medium text-gray-700">
              Fecha de Fertilización
            </label>
            <input
              type="date"
              id="fecFertilization"
              required
              className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#e87204]"
              value={fecFertilization}
              onChange={(e) => setFecFertilization(e.target.value)}
            />
          </div>

          {/* Cantidad */}
          <div className="space-y-1">
            <label htmlFor="canFertilization" className="text-sm font-medium text-gray-700">
              Cantidad aplicada
            </label>
            <input
              type="number"
              id="canFertilization"
              placeholder="Ingrese cantidad"
              required
              className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#e87204]"
              value={canFertilization}
              onChange={(e) => setCanFertilization(e.target.value)}
            />
          </div>

          {/* Botón */}
          <div className="flex justify-end pt-3">
            <Button
              disabled={isSubmitting}
              type="submit"
              className="bg-[#e87204] text-white px-6 py-2 text-sm rounded-lg hover:bg-[#030712] focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50 transition-colors"
            >
              {isSubmitting ? "Guardando..." : buttonForm}
            </Button>
          </div>
        </div>
      </form>

      {/* Modal éxito */}
      <DynamicAlert
        isOpen={isModalOpen}
        onOpenChange={setModalOpen}
        type="success"
        message={msSuccess || "Operación exitosa"}
        redirectPath=""
      />

      {/* Modal error */}
      <DynamicAlert
        isOpen={isModalOpenFall}
        onOpenChange={setModalOpenFall}
        type="error"
        message={error || "Ha ocurrido un error inesperado"}
        redirectPath=""
      />
    </>
  );
}

export default FormFertilization;
