"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { Bug } from "lucide-react";
import DynamicAlert from "@/components/utils/DynamicAlert";

function FormRace({ buttonForm, race, onDataUpdated, closeModal }) {
  const router = useRouter();
  const [nomRace, setNomRace] = useState("");
  const [desRace, setDesRace] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const [msSuccess, setMsSuccess] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalOpenFall, setModalOpenFall] = useState(false);
  const [idRace, setIdRace] = useState(null);

  async function handlerSubmit(event) {
    event.preventDefault();
    setSubmitting(true);

    if (!nomRace || !desRace) {
      setError("Por favor, complete todos los campos.");
      setSubmitting(false);
      setModalOpenFall(true);
      return;
    }
    // Validación del nombre de la raza: debe tener exactamente 25 dígitos
    if (nomRace.length > 25) {
      setError("El nombre de la raza solo permite 25 caracteres.");
      setModalOpenFall(true);
      setSubmitting(false);
      return;
    }

    function capitalizarNombreCompleto(texto) {
      return texto
        .toLowerCase()                            // todo en minúscula
        .replace(/\s+/g, " ")                     // elimina espacios múltiples
        .trim()                                   // quita espacios al inicio/final
        .split(" ")                               // separa por palabra
        .map(p => p.charAt(0).toUpperCase() + p.slice(1)) // primera en mayúscula
        .join(" ");                               // une de nuevo
    }
const descripcionFormateada = capitalizarNombreCompleto(nomRace);
const Formateada = capitalizarNombreCompleto(desRace);

    try {
      if (buttonForm === "Actualizar") {
        const updateRace = {
          id_Race: idRace,
          nom_Race: descripcionFormateada,
          des_Race: Formateada,
        };

        const response = await axiosInstance.put(
          `/Api/Race/UpdateRace${idRace}`,
          updateRace
        );
        if (response.status === 200) {
          setMsSuccess(response.data.message || "Raza actualizada correctamente.");
          setModalOpen(true);
          onDataUpdated();
        }
      } else if (buttonForm === "Registrar") {
        const response = await axiosInstance.post("/Api/Race/CreateRace", {
          nom_Race: descripcionFormateada,
          des_Race: Formateada,
        });

        if (response.status === 200) {
          setMsSuccess(response.data.registrado || "Raza registrada correctamente.");
          setModalOpen(true);
          onDataUpdated();
        }
      }
    } catch (err) {
      console.log("Error:", err.response || err.message);
      setError(err.response?.data?.message || "Error al conectar con el servidor.");
      setModalOpenFall(true);
    } finally {
      setSubmitting(false);
    }
  }



  useEffect(() => {
    if (race) {
    setNomRace(race.nom_Race);
    setDesRace(race.des_Race);
    setIdRace(race.id_Race);
    }
  }, [race]);

  return (
    <>
      <form
        className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md"
        onSubmit={handlerSubmit}
      >
        {/* Título */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-[#e87204] rounded-full flex items-center justify-center text-white">
              <Bug className="h-4 w-4" />
            </div>
            <div className="ml-3">
              <h2 className="text-xl font-bold text-gray-900">Raza</h2>
              <p className="text-xs text-gray-500">Ingrese los datos de la raza</p>
            </div>
          </div>
        </div>

        {/* Mensajes opcionales */}
        {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
        {msSuccess && <p className="text-green-500 mb-4 text-sm">{msSuccess}</p>}

        <div className="space-y-4">
          {/* Nombre de la Raza */}
          <div className="space-y-1">
            <label htmlFor="nomRace" className="text-sm font-medium text-gray-700">
              Nombre de la Raza
            </label>
            <input
              type="text"
              className="w-full px-3 py-1.5 border border-gray-300 rounded-md leading-5 focus:outline-none focus:ring-1 focus:ring-[#e87204] text-sm"
              id="nomRace"
              placeholder="Ingrese el nombre de la raza"
              required
              name="nomRace"
              value={nomRace || ""}
              onChange={(event) => setNomRace(event.target.value)}
            />
          </div>

          {/* Descripción de la Raza */}
          <div className="space-y-1">
            <label htmlFor="desRace" className="text-sm font-medium text-gray-700">
              Descripción de la Raza
            </label>
            <textarea
              type="text"
              className="w-full px-3 py-1.5 border border-gray-300 rounded-md leading-5 focus:outline-none focus:ring-1 focus:ring-[#e87204] text-sm"
              id="desRace"
              placeholder="Ingrese una descripción de la raza"
              required
              name="desRace"
              value={desRace || ""}
              onChange={(event) => setDesRace(event.target.value)}
            />
          </div>

          {/* Botón Guardar */}
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

      {/* Modal de éxito usando DynamicAlert */}
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

      {/* Modal de error usando DynamicAlert */}
      <DynamicAlert
        isOpen={isModalOpenFall}
        onOpenChange={(isOpen) => {
          setModalOpenFall(isOpen); // Cambia el estado del modal
          if (!isOpen) {
            closeModal();  // Cierra el modal del formulario cuando se cierra el modal de éxito
          }
        }}
        type="error"
        message={error || "Ha ocurrido un error inesperado"}
        redirectPath=""
      />
    </>
  );
}

export default FormRace;
