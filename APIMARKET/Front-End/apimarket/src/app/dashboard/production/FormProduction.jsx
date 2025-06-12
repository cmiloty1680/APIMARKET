"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { Dialog } from "@headlessui/react"; // Para el modal
import { Droplet } from "lucide-react";
import DynamicAlert from "@/components/utils/DynamicAlert";

function FormProduction({ buttonForm, production, onDataUpdated, closeModal }) {

    const router = useRouter();
    const [fecha, setFecha] = useState("");
    const [fechaF, setFechaF] = useState("");
    const [totColm, setTotColm] = useState("");
    // const [totalProd, setTotalPro] = useState("");
    const [nomrace, setNomrace] = useState("");
    const [canCua, setCanCua] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setSubmitting] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [isModalOpen, setModalOpen] = useState(false);
    const [msSuccess, setMsSuccess] = useState("");
    const [razas, setRazas] = useState([]);
    const [id_Production, setIdProduction] = useState(null); // ID de producción para actualizar
    const [isModalOpenFall, setModalOpenFall] = useState(false);


    //JORGE

    useEffect(() => {
        async function fetchRazas() {
            try {
                const response = await axiosInstance.get("/Api/Race/GetsAllRace"); // Ajusta la URL según tu API
                setRazas(response.data); // Guardar las razas en el estado
                // console.log(response.data)
            } catch (error) {
                console.error("Error al obtener razas:", error);
            }
        }
        fetchRazas();
    }, []);



    useEffect(() => {
        // Obtener el total de colmenas desde el backend
        async function fetchTotalColmenas() {
            try {
                const response = await axiosInstance.get("/Api/Hive/GetTotalHives"); // Asumiendo que el endpoint es correcto
                setTotColm(response.data.total); // Establecer el total de colmenas en el estado
            } catch (error) {
                console.error("Error al obtener total de colmenas:", error);
            }
        }
        fetchTotalColmenas();
    }, []);



    useEffect(() => {
        // Obtener el total de colmenas desde el backend
        async function fetchTotalCudrosMiel() {
            try {
                const response = await axiosInstance.get("/Api/Hive/GetTotalCuaMielHives"); // Asumiendo que el endpoint es correcto
                setCanCua(response.data.total); // Establecer el total de colmenas en el estado
            } catch (error) {
                console.error("Error al obtener total de colmenas:", error);
            }
        }
        fetchTotalCudrosMiel();
    }, []);



    async function handlerSubmit(event) {
        event.preventDefault();
        setSubmitting(true);

        if (!fecha) {
            setModalMessage("Todos los campos son requeridos.");
            setModalOpen(true);
            setSubmitting(false);
            return;
        }













        const formattedFecha = fecha ? fecha.split('T')[0] : '';
        const formattedFechas = fechaF ? fechaF.split('T')[0] : '';


        try {
            if (buttonForm == "Actualizar") {
                const updateProduction = {
                    id_Production: id_Production,
                    fecIni_Production: formattedFecha,
                    fecFin_Production: formattedFechas,
                    totColm_Hive: buttonForm === "Actualizar" ? production.totColm_Hive : totColm, // Usamos el valor original si es actualización
                    // tot_Production: totalProd,
                    canCua_Production: canCua,
                    id_Race: nomrace,
                }

                const response = await axiosInstance.put(`/Api/Production/UpdateProduction/${id_Production}`, updateProduction)
                console.log("pru", response);
                if (response.status === 200) {
                    console.log("Producción actualizada correctamente.", production);
                    setModalOpen(true);
                    setMsSuccess(response.data.message || "producción Actualizada");
                    onDataUpdated();
                }
            } else if (buttonForm === "Registrar") {
                const response = await axiosInstance.post("/Api/Production/CreateProduction", {
                    fecIni_Production: formattedFecha,
                    fecFin_Production: formattedFechas,
                    totColm_Hive: totColm,
                    // tot_Production: totalProd,
                    canCua_Production: canCua,
                    id_Race: nomrace,
                });


                if (response.status === 200) {
                    setModalMessage(response.data.registrado);
                    setModalOpen(true);
                    localStorage.setItem("registroProduccion", response.data.registrado);
                    setMsSuccess(response.data.registrado || "Registro creado.");
                    onDataUpdated();
                    // router.push("");
                }
            }
        } catch (error) {
            console.log("Error:", error.response || error.message);
            setError(error.response?.data?.message || "Error al conectar con el servidor.");
        }
        finally {
            setSubmitting(false);
        }
    }


    useEffect(() => {
    if (production) {
        setFecha(production.fecIni_Production ?? "");
        setFechaF(production.fecFin_Production);
        setTotColm(production.totColm_Hive);
        setNomrace(production.id_Race);
        setCanCua(production.canCua_Production);
        setIdProduction(production.id_Production);
        setDataProductionForUpdate()
    }
    }, [production]);





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

                <div className="space-y-3">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">


                        <div className="space-y-1">
                            <label htmlFor="descripcion" className="text-sm font-medium text-gray-700">
                                Fecha de Inicio
                            </label>
                            <input
                                type="date"
                                className="w-full px-3 py-1.5 border border-gray-300 rounded-md leading-5 focus:outline-none focus:ring-1 focus:ring-[#e87204] text-sm"
                                id="fechaI"
                                required
                                name="  "
                                value={fecha || ""}
                                onChange={(event) => setFecha(event.target.value)}
                            />
                        </div>
                        {/* Selección de Raza */}
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
                                value={fechaF || ""}
                                onChange={(event) => setFechaF(event.target.value)}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">


                        <p className="space-y-1">
                            <label htmlFor="estado" className="text-sm font-medium text-gray-700">
                                Total de Colmenas
                            </label>
                            <input
                                type="number"
                                className="w-full px-3 py-1.5 border border-gray-300 rounded-md leading-5 focus:outline-none focus:ring-1 focus:ring-[#e87204] text-sm"
                                id="cantidad"
                                required
                                name="cantidad"
                                value={buttonForm === "Actualizar" ? production.totColm_Hive : totColm || ""}
                                disabled // ← esto evita que el usuario escriba
                            />
                        </p>


                        <div className="space-y-1">
                            <label htmlFor="estado" className="text-sm font-medium text-gray-700">
                                Cantidad de Cuadro
                            </label>
                            <input
                                type="number"
                                className="w-full px-3 py-1.5 border border-gray-300 rounded-md leading-5 focus:outline-none focus:ring-1 focus:ring-[#e87204] text-sm"
                                id="cantidad"
                                required
                                name="cantidad"
                                value={buttonForm === "Actualizar" ? production.canCua_Production : canCua || ""}
                                disabled // ← Esto bloquea la escritura del usuario
                            />
                        </div>


                        {/* Selección de Raza */}
                        {/* <div className="space-y-1">
                            <label htmlFor="estado" className="text-sm font-medium text-gray-700">
                                Total de Producción
                            </label>
                            <input
                                type="number"
                                className="w-full px-3 py-1.5 border border-gray-300 rounded-md leading-5 focus:outline-none focus:ring-1 focus:ring-[#e87204] text-sm"
                                id="cantidad"
                                required
                                name="cantidad"
                                value={totalProd || ""}
                                onChange={(event) => setTotalPro(event.target.value)}
                            />
                        </div> */}
                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Selección de Raza */}
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Seleccionar Raza</label>
                            <select
                                className="w-full px-3 py-1.5 border border-gray-300 rounded-md leading-5 focus:outline-none focus:ring-1 focus:ring-[#e87204] text-sm"
                                value={nomrace || ""}
                                onChange={(event) => setNomrace(event.target.value)}
                                required
                            >
                                <option value="" disabled>Seleccione una raza</option>
                                {razas.map((raza) => (
                                    <option key={raza.id_Race} value={raza.id_Race}>
                                        {raza.nom_Race}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="space-y-1">
                            <label htmlFor="descripcion" className="text-sm font-medium text-gray-700">
                                SubCentro
                            </label>
                            <input
                                type="text"
                                value="Apicultura"
                                readOnly
                                className="w-full px-3 py-1.5 border border-gray-300 rounded-md leading-5 focus:outline-none focus:ring-1 focus:ring-[#e87204] text-sm"
                                id="descripcion"
                                placeholder=""
                                required
                            />
                        </div>

                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label htmlFor="descripcion" className="text-sm font-medium text-gray-700">
                                CentroCosto
                            </label>
                            <input
                                type="text"
                                value="Pecuaria"
                                readOnly
                                className="w-full px-3 py-1.5 border border-gray-300 rounded-md leading-5 focus:outline-none focus:ring-1 focus:ring-[#e87204] text-sm"
                                id="descripcion"
                                placeholder=""
                                required
                            />
                        </div>

                        <div className="space-y-1">
                            <label htmlFor="descripcion" className="text-sm font-medium text-gray-700">
                                Nombre de Producción
                            </label>
                            <input
                                type="text"
                                value="Miel de Abeja"
                                readOnly
                                className="w-full px-3 py-1.5 border border-gray-300 rounded-md leading-5 focus:outline-none focus:ring-1 focus:ring-[#e87204] text-sm"
                                id="descripcion"
                                placeholder=""
                                required
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
                            {isSubmitting ? "Guardando..." : buttonForm}
                        </Button>
                    </div>
                </div>
            </form>

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

            {/* Modal de fallido usando el componente dinámico */}
            <DynamicAlert
                isOpen={isModalOpenFall}
                onOpenChange={(isOpen) => {
                    setModalOpenFall(isOpen); // Cambia el estado del modal
                    if (!isOpen) {
                        setModalOpenFall();  // Cierra el modal del formulario cuando se cierra el modal de éxito
                    }
                }}
                type="error"
                message={error || "Ha ocurrido un error inesperado"}
                redirectPath=""
            />

        </>
    );
}

export default FormProduction;
