"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { Users } from "lucide-react";
import DynamicAlert from "@/components/utils/DynamicAlert";

function FormResponsible({ buttonForm, responsible, onDataUpdated, closeModal }) {
    const router = useRouter();
    const [estResponsible, setEstResponsible] = useState("");
    const [tipResponsible, setTipResponsible] = useState("");
    const [phoResponsible, setPhoResponsible] = useState("");
    const [emaiResponsible, setEmaiResponsible] = useState("");
    const [error, setError] = useState("");
    const [msSuccess, setMsSuccess] = useState("");
    const [isModalOpen, setModalOpen] = useState(false);
    const [isModalOpenFall, setModalOpenFall] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [idResponsible, setIdResponsible] = useState(null);

    async function handlerSubmit(event) {
        event.preventDefault();
        setIsSubmitting(true);

        // Validaciones básicas
        if (!estResponsible || !tipResponsible || !phoResponsible || !emaiResponsible) {
            setError("Por favor, complete todos los campos.");
            setIsSubmitting(false);
            return;
        }

        // Validar email básico (puedes mejorar esta validación si quieres)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emaiResponsible)) {
            setError("Ingrese un correo electrónico válido.");
            setIsSubmitting(false);
            return;
        }

        try {
            if (buttonForm === "Actualizar") {
                const updateResponsible = {
                    id_Responsible: idResponsible,
                    est_Responsible: estResponsible,
                    tip_Responsible: tipResponsible,
                    pho_Responsible: phoResponsible,
                    emai_Responsible: emaiResponsible,
                };

                const response = await axiosInstance.put(
                    `/Api/Responsible/UpdateResponsible/${idResponsible}`,
                    updateResponsible
                );

                if (response.status === 200) {
                    setMsSuccess(response.data.message || "Responsable actualizado.");
                    setModalOpen(true);
                    onDataUpdated();
                }
            } else if (buttonForm === "Registrar") {
                const response = await axiosInstance.post("/Api/Responsible/CreateResponsible", {
                    est_Responsible: estResponsible,
                    tip_Responsible: tipResponsible,
                    pho_Responsible: phoResponsible,
                    emai_Responsible: emaiResponsible,
                });

                if (response.status === 200) {
                    setMsSuccess(response.data.registrado || "Responsable registrado.");
                    setModalOpen(true);
                    onDataUpdated();
                }
            }
        } catch (error) {
            console.log("Error:", error.response || error.message);
            setError(error.response?.data?.message || "Error al conectar con el servidor.");
            setModalOpenFall(true);
        } finally {
            setIsSubmitting(false);
        }
    }

    const setDataResponsibleForUpdate = () => {
        setEstResponsible(responsible.est_Responsible);
        setTipResponsible(responsible.tip_Responsible);
        setPhoResponsible(responsible.pho_Responsible);
        setEmaiResponsible(responsible.emai_Responsible);
        setIdResponsible(responsible.id_Responsible);
    };

    useEffect(() => {
        if (buttonForm === "Actualizar" && responsible) {
            setDataResponsibleForUpdate();
        }
    }, [buttonForm, responsible]);

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
                            <Users className="h-4 w-4" />
                        </div>
                        <div className="ml-3">
                            <h2 className="text-xl font-bold text-gray-900">Responsable</h2>
                            <p className="text-xs text-gray-500">Ingrese los datos del responsable</p>
                        </div>
                    </div>
                </div>

                {/* Mensajes de error o éxito */}
                {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
                {msSuccess && <p className="text-green-500 mb-4 text-sm">{msSuccess}</p>}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Estado */}
                    <div className="space-y-1">
                        <label htmlFor="estResponsible" className="text-sm font-medium text-gray-700">
                            Estado
                        </label>
                        <select
                            id="estResponsible"
                            required
                            className="w-full px-3 py-1.5 border border-gray-300 rounded-md leading-5 focus:outline-none focus:ring-1 focus:ring-[#e87204] text-sm"
                            value={estResponsible}
                            onChange={(e) => setEstResponsible(e.target.value)}
                        >
                            <option value="">Seleccione estado</option>
                            <option value="activo">Activo</option>
                            <option value="inactivo">Inactivo</option>
                        </select>
                    </div>

                    {/* Tipo */}
                    <div className="space-y-1">
                        <label htmlFor="tipResponsible" className="text-sm font-medium text-gray-700">
                            Tipo
                        </label>
                        <select
                            id="tipResponsible"
                            required
                            className="w-full px-3 py-1.5 border border-gray-300 rounded-md leading-5 focus:outline-none focus:ring-1 focus:ring-[#e87204] text-sm"
                            value={tipResponsible}
                            onChange={(e) => setTipResponsible(e.target.value)}
                        >
                            <option value="">Seleccione tipo</option>
                            <option value="pasante">Pasante</option>
                            <option value="gestor">Gestor</option>
                        </select>
                    </div>

                </div>

                <div className="my-4" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    {/* Teléfono */}
                    <div className="space-y-1">
                        <label htmlFor="phoResponsible" className="text-sm font-medium text-gray-700">
                            Teléfono
                        </label>
                        <input
                            type="tel"
                            id="phoResponsible"
                            required
                            placeholder="Ingrese teléfono"
                            className="w-full px-3 py-1.5 border border-gray-300 rounded-md leading-5 focus:outline-none focus:ring-1 focus:ring-[#e87204] text-sm"
                            value={phoResponsible}
                            onChange={(e) => setPhoResponsible(e.target.value)}
                        />
                    </div>

                    {/* Email */}
                    <div className="space-y-1">
                        <label htmlFor="emaiResponsible" className="text-sm font-medium text-gray-700">
                            Correo electrónico
                        </label>
                        <input
                            type="email"
                            id="emaiResponsible"
                            required
                            placeholder="Ingrese correo electrónico"
                            className="w-full px-3 py-1.5 border border-gray-300 rounded-md leading-5 focus:outline-none focus:ring-1 focus:ring-[#e87204] text-sm"
                            value={emaiResponsible}
                            onChange={(e) => setEmaiResponsible(e.target.value)}
                        />
                    </div>

                    {/* Botón Guardar */}
                </div>
                <div className="flex justify-end pt-3">
                    <Button
                        disabled={isSubmitting}
                        type="submit"
                        className="bg-[#e87204] text-white px-6 py-2 text-sm rounded-lg hover:bg-[#030712] focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50 transition-colors"
                    >
                        {isSubmitting ? "Guardando..." : buttonForm}
                    </Button>
                </div>
            </form>

            {/* Modal de éxito */}
            <DynamicAlert
                isOpen={isModalOpen}
                onOpenChange={(isOpen) => {
                    setModalOpen(isOpen);
                    if (!isOpen) {
                        closeModal();
                    }
                }}
                type="success"
                message={msSuccess || "Operación exitosa"}
                redirectPath=""
            />

            {/* Modal de error */}
            <DynamicAlert
                isOpen={isModalOpenFall}
                onOpenChange={(isOpen) => {
                    setModalOpenFall(isOpen);
                    if (!isOpen) {
                        setModalOpenFall(isOpen);
                    }
                }}
                type="error"
                message={error || "Ha ocurrido un error inesperado"}
                redirectPath=""
            />
        </>
    );
}

export default FormResponsible;
