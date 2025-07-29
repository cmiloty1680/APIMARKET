"use client";

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Droplet } from "lucide-react";
import axiosInstance from "@/lib/axiosInstance";
import DynamicAlert from "@/components/utils/DynamicAlert";

function FormImplement({ buttonForm, implement, onDataUpdated, closeModal }) {

  const [nomImplement, setNomImplement] = useState("");
  const [tipImplement, setTipImplement] = useState("");
  const [fecIngImplement, setFecIngImplement] = useState("");
  const [vlrImplement, setVlrImplement] = useState("");
  const [exiImplement, setExiImplement] = useState("");
  const [id_Implement, setIdImplement] = useState(null);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [CantidadI, setCantidadI] = useState("");

  const [modalMessage, setModalMessage] = useState("");
  const [msSuccess, setMsSuccess] = useState("");
  const [isModalOpenFall, setModalOpenFall] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (implement) {
      setNomImplement(implement.nom_Implement || "");
      setTipImplement(implement.tip_Implement || "");
      setFecIngImplement(implement.fechIng_Implement || "");
      setVlrImplement(implement.vlr_Implement || "");
      setExiImplement(implement.exi_Implement || "");
      setIdImplement(implement.id_Implement);
      setCantidadI(implement.can_Implement || "")
    }
}, [implement]);

  async function handlerSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);

    // Validación de campos obligatorios
    if (!nomImplement || !tipImplement || !fecIngImplement || !vlrImplement || !exiImplement) {
      setModalMessage("Todos los campos son requeridos.");
      setModalOpenFall(true);
      setIsSubmitting(false);
      return;
    }

    // Validación de longitud del nombre
    if (nomImplement.length > 50) {
      setModalMessage("El nombre del implemento debe ser menor de 25 caracteres.");
      setModalOpenFall(true);
      setIsSubmitting(false);
      return;
    }

    // Validación del valor (convertir a string primero)
    const vlrString = String(vlrImplement || "");
    if (parseFloat(vlrString.replace(/,/g, "") || 0) > 100000000) {
      setModalMessage("El valor debe ser menor a $100.000.000.");
      setModalOpenFall(true);
      setIsSubmitting(false);
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

const descripcionFormateada = capitalizarNombreCompleto(nomImplement);

    try {
      if (buttonForm === "Actualizar") {
        const updateImplement = {
          id_Implement: id_Implement,
          nom_Implement: descripcionFormateada,
          tip_Implement: tipImplement,
          fechIng_Implement: fecIngImplement,
          vlr_Implement: String(vlrImplement).replace(/\./g, ""), // Convertir a string primero
          exi_Implement: exiImplement,
          can_Implement: CantidadI,
        };

        const response = await axiosInstance.put(`/Api/Implement/UpdateImplement${id_Implement}`, updateImplement)


        if (response.status === 200) {
          setMsSuccess("Implemento actualizado correctamente.");
          setModalOpen(true);
          onDataUpdated();
        }
      } else if (buttonForm === "Registrar") {
        const response = await axiosInstance.post("/Api/Implement/CreateImplement", {
          nom_Implement: descripcionFormateada,
          tip_Implement: tipImplement,
          fechIng_Implement: fecIngImplement,
          vlr_Implement: vlrImplement,
          exi_Implement: exiImplement,
          can_Implement: CantidadI,
        });

        if (response.status === 200) {
          setMsSuccess("Implemento registrado correctamente.");
          setModalOpen(true);
          onDataUpdated();
        }
      }
    } catch (error) {
      setModalMessage(error.response?.data?.message || "Error al conectar con el servidor.");
      setModalOpenFall(true);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <form className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md" onSubmit={handlerSubmit}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-[#e87204] rounded-full flex items-center justify-center text-white">
              <Droplet className="h-5 w-5" />
            </div>
            <div className="ml-3">
              <h2 className="text-xl font-bold text-gray-900">Implemento</h2>
              <p className="text-xs text-gray-500">Ingrese los datos del implemento</p>
            </div>
          </div>
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Nombre del Implemento</label>
            <input
              type="text"
              value={nomImplement}
              onChange={(e) => setNomImplement(e.target.value)}
              className="w-full px-3 py-1.5 border border-gray-300 rounded-md leading-5 focus:outline-none focus:ring-1 focus:ring-[#e87204] text-sm"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Cantidad</label>
            <input
              type="number"
              value={CantidadI}
              onChange={(e) => setCantidadI(e.target.value)}
              className="w-full px-3 py-1.5 border border-gray-300 rounded-md leading-5 focus:outline-none focus:ring-1 focus:ring-[#e87204] text-sm"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Tipo de Implemento</label>
            <select
              value={tipImplement}
              onChange={(e) => setTipImplement(e.target.value)}
              className="w-full px-3 py-1.5 border border-gray-300 rounded-md leading-5 focus:outline-none focus:ring-1 focus:ring-[#e87204] text-sm"
              required
            >
              <option value="">Seleccione</option>
              <option value="Herramientas">Herramientas</option>
              <option value="Trajes">Trajes</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Fecha de Ingreso</label>
            <input
              type="date"
              value={fecIngImplement}
              onChange={(e) => setFecIngImplement(e.target.value)}
              className="w-full px-3 py-1.5 border border-gray-300 rounded-md leading-5 focus:outline-none focus:ring-1 focus:ring-[#e87204] text-sm"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Valor del Implemento</label>
            <input
              type="text"
              placeholder="Valor de implemento"
              className="w-full px-3 py-1.5 border border-gray-300 rounded-md leading-5 focus:outline-none focus:ring-1 focus:ring-[#e87204] text-sm"
              required
              value={vlrImplement || ""}
              onChange={(e) => {
                const inputValue = e.target.value;

                // Permitir borrar completamente el campo
                if (inputValue === "") {
                  setVlrImplement("");
                  setError("");
                  return;
                }

                // Verificar si contiene punto
                if (inputValue.includes(".")) {
                  setModalMessage("No se permiten decimales en el valor del implemento. Use solo números enteros.");
                  setModalOpenFall(true); // Mostrar modal de error
                  return; // No actualizar el campo
                }

                // Validar que solo contenga números
                const onlyNumbers = inputValue.replace(/[^\d]/g, "");
                setVlrImplement(onlyNumbers);
                setError("");
              }}
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Existencia</label>
            <select
              value={exiImplement}
              onChange={(e) => setExiImplement(e.target.value)}
              className="w-full px-3 py-1.5 border border-gray-300 rounded-md leading-5 focus:outline-none focus:ring-1 focus:ring-[#e87204] text-sm"
              required
            >
              <option value="">Seleccione</option>
              <option value="Sí">Sí</option>
              <option value="No">No</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end pt-6">
          <Button
            disabled={isSubmitting}
            type="submit"
            className="bg-[#e87204] text-white px-6 py-2 text-sm rounded-lg hover:bg-[#030712] focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50 transition-colors"
          >
            {isSubmitting ? "Guardando..." : buttonForm}
          </Button>
        </div>
      </form>

      {/* Modal de error */}
      <DynamicAlert
        isOpen={isModalOpenFall}
        onOpenChange={(isOpen) => {
          setModalOpenFall(isOpen);
          if (!isOpen) {
            setModalMessage("");
          }
        }}
        type="error"
        message={modalMessage || "Ha ocurrido un error inesperado"}
        redirectPath=""
      />

      {/* Modal de éxito */}
      <DynamicAlert
        isOpen={isModalOpen}
        onOpenChange={(isOpen) => {
          setModalOpen(isOpen);
          if (!isOpen) {
            setMsSuccess("");
            if (closeModal) closeModal(); // opcionalmente cerrar el modal padre
          }
        }}
        type="success"
        message={msSuccess || "Operación realizada con éxito"}
        redirectPath=""
      />
    </>
  );
}

export default FormImplement;


