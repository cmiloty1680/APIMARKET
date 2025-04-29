"use client";
import { useState, useEffect } from "react";
import { FlaskRoundIcon as Flask } from "lucide-react";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/lib/axiosInstance";
import DynamicAlert from "@/components/utils/DynamicAlert";

function FormExtraction({ buttonForm, extractionData, onDataUpdated }) {
  const [extractions, setExtractions] = useState([]);

  const [fecExtraction, setFecExtraction] = useState("");
  const [canExtraction, setCanExtraction] = useState("");
  const [idExtraction, setIdExtraction] = useState(null);
  const [nomResponsible, setNomResponsible] = useState("");
  const [responsibles, setResponsibles] = useState([]);
  const [id_CollecDrone, setIdCollecDrone] = useState(null);
  const [collecDrones, setCollecDrones] = useState([]);
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const [msSuccess, setMsSuccess] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalOpenFall, setModalOpenFall] = useState(false);


  useEffect(() => {

    async function fetchresponsibles() {
      try {
        const response = await axiosInstance.get("/Api/Responsible/GetsAllResponsible");
        setResponsibles(response.data);

      } catch (error) {
        console.error("Error al octener responsable:", error);
      }
    }
    fetchresponsibles();
  }, []);

  useEffect(() => {
    async function fetchExtractions() {
      try {
        const response = await axiosInstance.get("/Api/Extraction/GetAllExtration");
        setExtractions(response.data);
      } catch (error) {
        console.error("Error al obtener extracciones:", error);
      }
    }

    fetchExtractions();
  }, []);


  useEffect(() => {

    async function fetchCollecDrones() {
      try {
        const response = await axiosInstance.get("/Api/CollecDrone/GetAllCollecDrone");
        setCollecDrones(response.data);

      } catch (error) {
        console.error("Error al octener las recolecciones:", error);
      }
    }
    fetchCollecDrones();
  }, []);

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
          id_CollecDrone: id_CollecDrone,
          id_Responsible: parseInt(nomResponsible)
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
          id_Extraction: idExtraction,
          fec_Extraction: fecExtraction,
          can_Extraction: canExtraction,
          id_Responsible: nomResponsible,
          id_CollecDrone: id_CollecDrone
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

  const setDataForUpdate = () => {
    if (extractionData) {
      setIdExtraction(extractionData.id_Extraction);
      setFecExtraction(extractionData.fec_Extraction ?? "");
      setCanExtraction(extractionData.can_Extraction);
      setNomResponsible(extractionData.id_Responsible);
      setIdCollecDrone(extractionData.id_CollecDrone);
    }
  };

  useEffect(() => {
    setDataForUpdate();
  }, [extractionData]);

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
              <p className="text-xs text-gray-500">Ingrese los datos de la Extracción</p>
            </div>
          </div>
        </div>

        {/* Mensajes de error y éxito */}
        {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
        {msSuccess && <p className="text-green-500 mb-4 text-sm">{msSuccess}</p>}

        <div className="space-y-4">
          {/* Fecha */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div className="space-y-1">
              <label htmlFor="FecExtraction" className="text-sm font-medium text-gray-700">
                Fecha de la Extracción
              </label>
              <input
                type="date"
                id="FecExtraction"
                placeholder="Fecha de la extracción"
                value={fecExtraction || ""}
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
                value={canExtraction || ""}
                onChange={(e) => setCanExtraction(e.target.value)}
                required
                className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#e87204]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Nombre de Responsable
              </label>
              <select
                className="w-full px-3 py-1.5 border border-gray-300 rounded-md leading-5 focus:outline-none focus:ring-1 focus:ring-[#e87204] text-sm"
                value={nomResponsible || ""}
                onChange={(event) => setNomResponsible(event.target.value)}
                required
              >
                <option value="" disabled>Seleccione</option>
                {responsibles.map((responsible) => (
                  <option key={responsible.id_Responsible} value={responsible.id_Responsible}>
                    {responsible.nam_Responsible}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                ID Recolección
              </label>
              <select
                className="w-full px-3 py-1.5 border border-gray-300 rounded-md leading-5 focus:outline-none focus:ring-1 focus:ring-[#e87204] text-sm"
                value={id_CollecDrone || ""}
                onChange={(event) => setIdCollecDrone(event.target.value)}
                required
              >
                <option value="" disabled>Seleccione</option>
                {collecDrones
                  .filter((collecDrone) => {
                    const yaExtraido = extractions.some(
                      (ext) => ext.id_CollecDrone === collecDrone.id_CollecDrone
                    );
                    return !yaExtraido; // Solo muestra si NO ha sido usado aún
                  })
                  .map((collecDrone) => (
                    <option key={collecDrone.id_CollecDrone} value={collecDrone.id_CollecDrone}>
                      {collecDrone.id_CollecDrone}
                    </option>
                  ))}

              </select>
            </div>
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
