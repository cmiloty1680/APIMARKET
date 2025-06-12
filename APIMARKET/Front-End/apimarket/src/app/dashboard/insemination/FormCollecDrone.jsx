"use client";
import { useEffect, useState } from "react";
import { Scissors } from "lucide-react";
import axiosInstance from "@/lib/axiosInstance";
import { Button } from "@/components/ui/button";
import DynamicAlert from "@/components/utils/DynamicAlert";

function FormCollecDrone({ buttonForm, droneData, onDataUpdated, closeModal }) {
  const [fecCollecDrone, setFecCollecDrone] = useState("");
  const [canCollecDrone, setCanCollecDrone] = useState("");
  const [idCollecDrone, setIdCollecDrone] = useState(null);
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const [msSuccess, setMsSuccess] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalOpenFall, setModalOpenFall] = useState(false);
  const [nomResponsible, setNomResponsible] = useState("");
  const [responsibles, setResponsibles] = useState([]);
  const [hives, setHives] = useState([]);
  const [id_Hive, setIdHive] = useState(null);

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

    async function fetchHives() {
      try {
        const response = await axiosInstance.get("/Api/Hive/AllHive");
        setHives(response.data);

      } catch (error) {
        console.error("Error al octener responsable:", error);
      }
    }
    fetchHives();
  }, []);

  // Manejo del envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!fecCollecDrone || !canCollecDrone) {
      setError("Todos los campos son requeridos.");
      setModalOpenFall(true);
      setSubmitting(false);
      return;
    }

    try {
      if (buttonForm === "Actualizar") {
        const updateBody = {
          id_CollecDrone: idCollecDrone,
          fec_CollecDrone: fecCollecDrone,
          can_CollecDrone: canCollecDrone,
          id_Responsible: parseInt(nomResponsible),
          id_Hive: id_Hive
        };

        const response = await axiosInstance.put(
          `/Api/CollecDrone/UpdateCollecDrone/${idCollecDrone}`,
          updateBody
        );

        if (response.status === 200) {
          setMsSuccess(response.data.message || "Recolección actualizada.");
          setModalOpen(true);
          onDataUpdated();
        }
      } else if (buttonForm === "Registrar") {
        const createBody = {
          fec_CollecDrone: fecCollecDrone,
          can_CollecDrone: canCollecDrone,
          id_Responsible: nomResponsible,
          id_Hive: id_Hive
        };

        const response = await axiosInstance.post(`/Api/Collecdrone/CreateCollecdrone`, createBody);

        if (response.status === 200) {
          setMsSuccess(response.data.message || "Recolección registrada.");
          setModalOpen(true);
          onDataUpdated();
          // Resetear campos después de registrar
          setFecCollecDrone("");
          setCanCollecDrone("");
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



  useEffect(() => {
    if (droneData) {
      setIdCollecDrone(droneData.id_CollecDrone);
      setFecCollecDrone(droneData.fec_CollecDrone ?? "");
      setCanCollecDrone(droneData.can_CollecDrone);
      setNomResponsible(droneData.id_Responsible);
      setIdHive(droneData.id_Hive);
    }
  }, [droneData]);

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
              <Scissors className="h-4 w-4" />
            </div>
            <div className="ml-3">
              <h2 className="text-xl font-bold text-gray-900">Recolección de Zángano</h2>
              <p className="text-xs text-gray-500">Ingrese los datos de la Recolección</p>
            </div>
          </div>
        </div>


        {/* Mensajes */}
        {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
        {msSuccess && <p className="text-green-500 mb-4 text-sm">{msSuccess}</p>}

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Fecha de Recolección
              </label>
              <input
                type="date"
                id="FecCollecDrone"
                value={fecCollecDrone || ""}
                onChange={(e) => setFecCollecDrone(e.target.value)}
                required
                className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#e87204]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Cantidad Recolectado
              </label>
              <input
                type="number"
                id="CanCollecDrone"
                placeholder="Cantidad"
                value={canCollecDrone || ""}
                onChange={(e) => setCanCollecDrone(e.target.value)}
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
                {responsibles
                .filter((responsible) => responsible.est_Responsible === "activo") 
                .map((responsible) => (
                  <option key={responsible.id_Responsible} value={responsible.id_Responsible}>
                    {responsible.nam_Responsible} {responsible.lasNam_Responsible}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                ID Colmena
              </label>
              <select
                className="w-full px-3 py-1.5 border border-gray-300 rounded-md leading-5 focus:outline-none focus:ring-1 focus:ring-[#e87204] text-sm"
                value={id_Hive || ""}
                onChange={(event) => setIdHive(event.target.value)}
                required
              >
                <option value="" disabled>Seleccione</option>
                {hives
                  .filter((hive) => hive.est_Hive === "activo") // Solo muestra colmenas activas
                  .map((hive) => (
                    <option key={hive.id_Hive} value={hive.id_Hive}>
                      {hive.id_Hive}
                    </option>
                  ))}

              </select>
            </div>
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
        onOpenChange={(isOpen) => {
          setModalOpen(isOpen); // Cambia el estado del modal
          if (!isOpen) {
            closeModal();  // Cierra el modal del formulario cuando se cierra el modal de éxito
          }
        }}
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

export default FormCollecDrone;
