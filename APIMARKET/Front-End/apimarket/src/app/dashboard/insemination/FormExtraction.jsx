"use client";
import { useState, useEffect } from "react";
import { FlaskRoundIcon as Flask } from "lucide-react";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/lib/axiosInstance";
import DynamicAlert from "@/components/utils/DynamicAlert";

function FormExtraction({ buttonForm, extractionData, onDataUpdated }) {
  const [fecExtraction, setFecExtraction] = useState("");
  const [canExtraction, setCanExtraction] = useState("");
  const [idExtraction, setIdExtraction] = useState(null);

  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const [msSuccess, setMsSuccess] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalOpenFall, setModalOpenFall] = useState(false);

  const setDataForUpdate = () => {
    if (extractionData) {
      setFecExtraction(extractionData.fec_Extraction);
      setCanExtraction(extractionData.can_Extraction);
      setIdExtraction(extractionData.id_Extraction);
    }
  };

  useEffect(() => {
    setDataForUpdate();
  }, [extractionData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!fecExtraction || !canExtraction) {
      setError("Todos los campos son requeridos.");
      setModalOpenFall(true);
      setSubmitting(false);
      return;
    }

    try {
      if (buttonForm === "Actualizar") {
        const updateBody = {
          id_Extraction: idExtraction,
          fec_Extraction: fecExtraction,
          can_Extraction: canExtraction,
        };

        const response = await axiosInstance.put(
          `/Api/Extraction/UpdateExtraction/${idExtraction}`,
          updateBody
        );

        if (response.status === 200) {
          setMsSuccess(response.data.message || "Extracción actualizada.");
          setModalOpen(true);
          onDataUpdated?.();  // Notificar al componente padre que los datos han sido actualizados
        }
      } else if (buttonForm === "Registrar") {
        const createBody = {
          fec_Extraction: fecExtraction,
          can_Extraction: canExtraction,
        };

        const response = await axiosInstance.post(`/Api/Extraction/CreateExtraction`, createBody);

        if (response.status === 200) {
          setMsSuccess(response.data.message || "Extracción registrada.");
          setModalOpen(true);
          onDataUpdated?.();  // Notificar al componente padre que se ha registrado una nueva extracción
          // Resetear formulario después de registrar
          setFecExtraction("");
          setCanExtraction("");
        }
      }
    } catch (error) {
      console.error("Error:", error.response || error.message);
      setError(error.response?.data?.message || "Error al conectar con el servidor.");
      setModalOpenFall(true);
    } finally {
      setSubmitting(false);
    }
  };

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
              <Flask className="h-4 w-4" />
            </div>
            <div className="ml-3">
              <h2 className="text-xl font-bold text-gray-900">Extracción</h2>
            </div>
          </div>
        </div>

        {/* Mensajes de error y éxito */}
        {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
        {msSuccess && <p className="text-green-500 mb-4 text-sm">{msSuccess}</p>}

        <div className="space-y-4">
          {/* Fecha */}
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

          {/* Cantidad */}
          <div className="space-y-1">
            <label htmlFor="CanExtraction" className="text-sm font-medium text-gray-700">
              Cantidad de la Extracción
            </label>
            <input
              type="number"
              id="CanExtraction"
              placeholder="Cantidad extraída"
              value={canExtraction}
              onChange={(e) => setCanExtraction(e.target.value)}
              required
              className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#e87204]"
            />
          </div>

          {/* Botón de acción */}
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

      {/* Modal de éxito */}
      <DynamicAlert
        isOpen={isModalOpen}
        onOpenChange={setModalOpen}
        type="success"
        message={msSuccess || "Operación exitosa"}
        redirectPath=""
      />

      {/* Modal de error */}
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

export default FormExtraction;
