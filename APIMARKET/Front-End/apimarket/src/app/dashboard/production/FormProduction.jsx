"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { Dialog } from "@headlessui/react"; // Para el modal
import { Droplet } from "lucide-react";

function FormProduction() {
    const router = useRouter();
    const [fecha, setFecha] = useState("");
    const [fechaF, setFechaF] = useState("");
    const [cantidad, setCantidad] = useState("");
    const [total, setTotal] = useState("");
    const [error, setError] = useState("");
    const [tproduction, setTproduction] = useState("");
    const [isSubmitting, setSubmitting] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [isModalOpen, setModalOpen] = useState(false);
    const [msSuccess, setMsSuccess] = useState("");


    async function handlerSubmit(event) {
        event.preventDefault();
        setSubmitting(true);

        if (!fecha || !cantidad) {
            setModalMessage("Todos los campos son requeridos.");
            setModalOpen(true);
            setSubmitting(false);
            return;
        }

        try {
            const formattedFecha = new Date(fecha).toISOString().split("T")[0];
            const formattedFechas = new Date(fechaF).toISOString().split("T")[0];
            const response = await axiosInstance.post("/Api/Production/CreateProduction", {
                fecIni_Production: formattedFecha,
                fecFin_Production: formattedFechas,
                cant_Abejas: cantidad,
                tot_Colmen: total,
                can_Production: tproduction
            });

            if (response.status === 200) {
                setModalMessage(response.data.registrado);
                setModalOpen(true);
                localStorage.setItem("registroProduccion", response.data.registrado);
                alert(response.data.registrado);
                router.push("");
            }
        } catch (error) {
            console.log(error);
            if (error.response) {
                setModalMessage(`Error: ${error.response.data.title || "Error en la solicitud"}`);
            } else {
                setModalMessage("Error al intentar conectar con el servidor.");
            }
            setModalOpen(true);
        } finally {
            setSubmitting(false);
        }
    }

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
                            <Droplet className="h-5 w-5" />
                        </div>
                        <div className="ml-3">
                            <h2 className="text-xl font-bold text-gray-900">Producción</h2>
                            <p className="text-xs text-gray-500">Ingrese los datos de la producción</p>
                        </div>
                    </div>
                </div>

                {/* Mensajes de error o éxito */}
                {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
                {msSuccess && <p className="text-green-500 mb-4 text-sm">{msSuccess}</p>}

                <div className="space-y-6">
                    {/* Descripción */}
                    <div className="space-y-1">
                        <label htmlFor="descripcion" className="text-sm font-medium text-gray-700">
                            Fecha de Inicio
                        </label>
                        <input
                            type="date"
                            className="w-full px-3 py-1.5 border border-gray-300 rounded-md leading-5 focus:outline-none focus:ring-1 focus:ring-[#e87204] text-sm"
                            id="fecha"
                            required
                            name="fecha"
                            value={fecha}
                            onChange={(event) => setFecha(event.target.value)}
                        />
                    </div>

                    {/* Estado y Número de cuadro */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label htmlFor="estado" className="text-sm font-medium text-gray-700">
                                Fecha Fin
                            </label>
                            <input
                                type="date"
                                className="w-full px-3 py-1.5 border border-gray-300 rounded-md leading-5 focus:outline-none focus:ring-1 focus:ring-[#e87204] text-sm"
                                id="fecha"
                                required
                                name="fecha"
                                value={fechaF}
                                onChange={(event) => setFechaF(event.target.value)}
                            />
                        </div>
                        <div className="space-y-1">
                            <label htmlFor="Ncuadro" className="text-sm font-medium text-gray-700">
                                cantidad de abejas
                            </label>
                            <input
                                type="number"
                                className="w-full px-3 py-1.5 border border-gray-300 rounded-md leading-5 focus:outline-none focus:ring-1 focus:ring-[#e87204] text-sm"
                                id="cantidad"
                                required
                                name="cantidad"
                                value={cantidad}
                                onChange={(event) => setCantidad(event.target.value)}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label htmlFor="estado" className="text-sm font-medium text-gray-700">
                                Cantidad de Colmenas
                            </label>
                            <input
                                type="number"
                                className="w-full px-3 py-1.5 border border-gray-300 rounded-md leading-5 focus:outline-none focus:ring-1 focus:ring-[#e87204] text-sm"
                                id="cantidad"
                                required
                                name="cantidad"
                                value={total}
                                onChange={(event) => setTotal(event.target.value)}
                            />
                        </div>
                        <div className="space-y-1">
                            <label htmlFor="Ncuadro" className="text-sm font-medium text-gray-700">
                                cantidad de produccion
                            </label>
                            <input
                                type="number"
                                className="w-full px-3 py-1.5 border border-gray-300 rounded-md leading-5 focus:outline-none focus:ring-1 focus:ring-[#e87204] text-sm"
                                id="cantidad"
                                required
                                name="cantidad"
                                value={tproduction}
                                onChange={(event) => setTproduction(event.target.value)}
                            />
                        </div>
                    </div>
                    {/* Botón Guardar */}
                    <div className="flex justify-end pt-3">
                        <Button
                            disabled={isSubmitting}
                            type="submit"
                            className="bg-[#e87204] text-white px-6 py-2 text-sm rounded-lg hover:bg-[#030712] focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50 transition-colors"
                        >
                            {isSubmitting ? "Guardando..." : "Guardar"}
                        </Button>
                    </div>
                </div>
            </form>

        </>
    );
}

export default FormProduction;
