"use client";

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { Dialog } from "@headlessui/react";
// import { Tool } from "lucide-react";
import { 
  Hexagon, 
  Home,
  Users, 
  Droplet, 
  FlaskRoundIcon as Flask, 
  Clipboard, 
  Apple, 
  Eye, 
  PenToolIcon as Tool, 
  Bug, 
  Scissors, 
  Zap, 
  Sprout, 
  Menu, 

  X 
} from "lucide-react";


function FormImplement({ buttonForm, implement }) {
    const [nomImplement, setNomImplement] = useState("");
    const [tipImplement, setTipImplement] = useState("");
    const [fecIngImplement, setFecIngImplement] = useState("");
    const [vlrImplement, setVlrImplement] = useState("");
    const [exiImplement, setExiImplement] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setSubmitting] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [isModalOpen, setModalOpen] = useState(false);
    const [id_Implement, setIdImplement] = useState(null);

    useEffect(() => {
        if (implement) {
            setNomImplement(implement.nom_Implement);
            setTipImplement(implement.tip_Implement);
            setFecIngImplement(implement.fechIng_Implement);
            setVlrImplement(implement.vlr_Implement);
            setExiImplement(implement.exi_Implement);
            setIdImplement(implement.id_Implement);
        }
    }, [implement]);

    async function handlerSubmit(event) {
        event.preventDefault();
        setSubmitting(true);

        if (!nomImplement || !tipImplement || !fecIngImplement || !vlrImplement || !exiImplement) {
            setModalMessage("Todos los campos son requeridos.");
            setModalOpen(true);
            setSubmitting(false);
            return;
        }

        try {
            if (buttonForm === "Actualizar") {
                const updateImplement = {
                    id_Implement: id_Implement,
                    nom_Implement: nomImplement,
                    tip_Implement: tipImplement,
                    fechIng_Implement: fecIngImplement,
                    vlr_Implement: vlrImplement,
                    exi_Implement: exiImplement,
                };
                await axiosInstance.put(`/Api/Implement/UpdateImplement${id_Implement}`, updateImplement);
                setModalMessage("Implemento actualizado correctamente.");
            } else {
                await axiosInstance.post("/Api/Implement/CreateImplement", {
                    nom_Implement: nomImplement,
                    tip_Implement: tipImplement,
                    fechIng_Implement: fecIngImplement,
                    vlr_Implement: vlrImplement,
                    exi_Implement: exiImplement,
                });
                setModalMessage("Implemento registrado correctamente.");
            }
            setModalOpen(true);
        } catch (error) {
            setModalMessage(error.response?.data?.message || "Error al conectar con el servidor.");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <>
           <form className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md" onSubmit={handlerSubmit}>
  <div className="flex items-center justify-between mb-6">
    <div className="flex items-center">
      <div className="w-8 h-8 bg-[#e87204] rounded-full flex items-center justify-center text-white">
        <Tool className="h-5 w-5" />
      </div>
      <div className="ml-3">
        <h2 className="text-xl font-bold text-gray-900">Implemento</h2>
        <p className="text-xs text-gray-500">Ingrese los datos del implemento</p>
      </div>
    </div>
  </div>

  {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700">Nombre del Implemento</label>
      <input type="text" value={nomImplement} onChange={(e) => setNomImplement(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm" required />
    </div>

    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700">Tipo de Implemento</label>
      <input type="text" value={tipImplement} onChange={(e) => setTipImplement(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm" required />
    </div>

    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700">Fecha de Ingreso</label>
      <input type="date" value={fecIngImplement} onChange={(e) => setFecIngImplement(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm" required />
    </div>

    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700">Valor del Implemento</label>
      <input type="number" value={vlrImplement} onChange={(e) => setVlrImplement(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm" required />
    </div>

    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700">Existencia</label>
      <select value={exiImplement} onChange={(e) => setExiImplement(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm" required>
        <option value="">Seleccione</option>
        <option value="Sí">Sí</option>
        <option value="No">No</option>
      </select>
    </div>
  </div>

  <div className="flex justify-end pt-6">
    <Button disabled={isSubmitting} type="submit" className="bg-[#e87204] text-white px-6 py-2 text-sm rounded-lg hover:bg-[#030712] focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50 transition-colors">
      {isSubmitting ? "Guardando..." : buttonForm}
    </Button>
  </div>
</form>

        </>
    );
}

export default FormImplement;