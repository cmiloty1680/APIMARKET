"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { Flower } from "lucide-react";
import { ShieldCheck, AlertCircle } from "lucide-react";
import DynamicAlert from "@/components/utils/DynamicAlert";


function FormFeeding({ buttonForm, feeding, onDataUpdated, closeModal }) {
    const router = useRouter();
    const [fecha, setFecha] = useState("");
    const [cantidad, setCantidad] = useState("");
    const [tipoAlimentacion, setTipoAlimentacion] = useState("");
    const [valor, setValor] = useState("");
    const [deshive, setDesHive] = useState("");
    const [error, setError] = useState("");
    const [msSuccess, setMsSuccess] = useState("");
    const [hives, setHives] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [isModalOpenFall, setModalOpenFall] = useState(false);
    const [isSubmitting, setSubmitting] = useState(false);
    const [id_Feeding, setIdFeeding] = useState(null);
    const [responsibles, setResponsibles] = useState([]);
    const [idResponsible, setIdResponsible] = useState("");
    const [tipResponsible, setTipResponsible] = useState("");
    const [numDocResponsible, setnumDocResponsible] = useState("");


    useEffect(() => {
        async function fetchHives() {
            try {
                const response = await axiosInstance.get("/Api/Hive/AllHive"); // Ajusta la URL según tu API
                setHives(response.data); // Guardar las razas en el estado
            } catch (error) {
                console.error("Error al obtener alimentacion:", error);
            }
        }
        fetchHives();

    }, []);
    useEffect(() => {
        async function fetchResponsibles() {
            try {
                const response = await axiosInstance.get("/Api/Responsible/GetsAllResponsible"); // Ajusta la URL según tu API
                setResponsibles(response.data);

            } catch (error) {
                console.error("Error al obtener responsable:", error);
            }
        }
        fetchResponsibles();


    }, []);


    async function handlerSubmit(event) {
        event.preventDefault();
        setSubmitting(true);

        if (!fecha || !cantidad || !tipoAlimentacion || !valor || !deshive || !idResponsible || !tipResponsible || !numDocResponsible) {
            setError("Todos los campos son requeridos.");
            setSubmitting(false);
            setModalOpenFall(true);
            return;
        }

        if (parseFloat(valor) > 100000) {
            setError("El valor debe ser menor  a $100,000.");
            setModalOpenFall(true);
            setSubmitting(false);
            return;
        }



        if (parseFloat(cantidad) > 100) {
            setError("La cantidad debe ser menor a 100 Kg.");
            setModalOpenFall(true);
            setSubmitting(false);
            return;
        }




        const formattedFecha = fecha ? new Date(fecha).toISOString().split('T')[0] : '';


        try {
            if (buttonForm == "Actualizar") {
                const updateFeeding = {
                    id_Feeding: id_Feeding,
                    fec_Feeding: formattedFecha,
                    tip_Feeding: tipoAlimentacion,
                    can_Feeding: cantidad,
                    vlr_Feeding: valor,
                    des_Hive: deshive,
                    id_Hive: deshive,
                    id_Responsible: numDocResponsible,
                    id_Responsible: idResponsible,
                    tip_Responsible: tipResponsible,
                    numDoc_Responsible: numDocResponsible,

                };
                const response = await axiosInstance.
                    put(`/Api/Feeding/UpdateFeeding/${id_Feeding}`, updateFeeding)

                // console.log("feeding", response);
                if (response.status === 200) {
                    setMsSuccess(response.data.message || "alimentacion actualizada correctamente.");
                    setModalOpen(true);
                    onDataUpdated();

                }
            } else if (buttonForm === "Registrar") {
                const response = await axiosInstance.post("/Api/Feeding/CreateFeeding", {
                    fec_Feeding: formattedFecha,
                    tip_Feeding: tipoAlimentacion,
                    can_Feeding: cantidad,
                    vlr_Feeding: valor,
                    des_Hive: deshive,
                    id_Hive: deshive,
                    numDoc_Responsible: numDocResponsible,
                    id_Responsible: idResponsible,
                    tip_Responsible: tipResponsible,
                    numDoc_Responsible: numDocResponsible
                });

                if (response.status === 200) {
                    setMsSuccess(response.data.registrado || "alimentacion registrada correctamente.");
                    setModalOpen(true);
                    onDataUpdated();

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

    const setDataFeedingForUpdate = () => {
        setFecha(feeding.fec_Feeding ?? "");
        setTipoAlimentacion(feeding.tip_Feeding);
        setCantidad(feeding.can_Feeding);
        setValor(feeding.vlr_Feeding);
        setDesHive(feeding.id_Hive);
        setIdFeeding(feeding.id_Feeding);
        setIdResponsible(feeding.id_Responsible);
        setTipResponsible(feeding.tip_Responsible);
        setnumDocResponsible(feeding.numDoc_Responsible);


    }
    // useEffect(() => {
    //     if (feeding) {
    //         setDataFeedingForUpdate();
    //     }
    // }, [feeding]);
    useEffect(() => {
        if (feeding) {
            setFecha(feeding.fec_Feeding ?? "");
            setTipoAlimentacion(feeding.tip_Feeding);
            setCantidad(feeding.can_Feeding);
            setValor(feeding.vlr_Feeding);
            setDesHive(feeding.id_Hive);
            setIdFeeding(feeding.id_Feeding);
            setIdResponsible(feeding.id_Responsible);
            setTipResponsible(feeding.tip_Responsible);
            setnumDocResponsible(feeding.numDoc_Responsible);
        }
    }, [feeding]); // ✅ limpio y claro


    return (
        <>
            <form className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md" onSubmit={handlerSubmit}>
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                        <div className="w-8 h-8 bg-[#e87204] rounded-full flex items-center justify-center text-white">
                            <Flower className="h-5 w-5" />
                        </div>
                        <div className="ml-3">
                            <h2 className="text-lg font-bold text-gray-900">Alimentación</h2>
                            <p className="text-xs text-gray-500">Ingrese los datos de la alimentación</p>
                        </div>
                    </div>
                </div>

                {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
                {msSuccess && <p className="text-green-500 mb-4 text-sm">{msSuccess}</p>}

                <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                            <label htmlFor="fechaA" className="text-sm font-medium text-gray-700">Fecha de Alimentación</label>
                            <input
                                type="date"
                                id="fechaA"
                                required
                                className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm leading-5 focus:outline-none focus:ring-1 focus:ring-[#e87204]"
                                value={fecha || ""}
                                onChange={(event) => setFecha(event.target.value)}
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Nombre Responsable </label>
                            <select
                                className="w-full px-3 py-1.5 border border-gray-300 rounded-md leading-5 focus:outline-none focus:ring-1 focus:ring-[#e87204] text-sm"
                                required
                                value={idResponsible || ""}
                                onChange={(e) => {
                                    const selectedId = e.target.value;
                                    setIdResponsible(selectedId);

                                    const selectedResponsible = responsibles.find(
                                        (responsible) => responsible.id_Responsible === parseInt(selectedId)
                                    );


                                    if (selectedResponsible) {
                                        setnumDocResponsible(selectedResponsible.numDoc_Responsible || "");
                                        setTipResponsible(selectedResponsible.tip_Responsible || "");
                                    }
                                }}
                            >
                                <option value="">Seleccione</option>
                                {responsibles
                                .filter((responsible) => responsible.est_Responsible === "activo") 
                                .map((responsible) => (
                                    <option key={responsible.id_Responsible} value={responsible.id_Responsible}>
                                        {responsible.nam_Responsible} {responsible.lasNam_Responsible}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Número de Documento</label>
                            <input
                                type="text"
                                required
                                placeholder="numero de documento"
                                className="w-full px-3 py-1.5 border border-gray-300 rounded-md leading-5 focus:outline-none focus:ring-1 focus:ring-[#e87204] text-sm"
                                value={numDocResponsible || ""}
                                onChange={(e) => setnumDocResponsible(e.target.value)}
                            />
                        </div>
                        <div className="space-y-1">
                            <span className="text-sm font-medium text-gray-700">Tipo responsable</span>
                            <select
                                className="w-full px-3 py-1.5 border border-gray-300 rounded-md leading-5 focus:outline-none focus:ring-1 focus:ring-[#e87204] text-sm"
                                required
                                value={tipResponsible || ""}
                                onChange={(e) => setTipResponsible(e.target.value)}
                            >
                                <option value="">Seleccione</option>
                                <option value="pasante">pasante</option>
                                <option value="gestor">gestor</option>
                                <option value="instructor">instructor</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Tipo</label>
                            <select
                                className="w-full px-3 py-1.5 border border-gray-300 rounded-md leading-5 focus:outline-none focus:ring-1 focus:ring-[#e87204] text-sm"
                                required
                                value={tipoAlimentacion || ""}
                                onChange={(e) => setTipoAlimentacion(e.target.value)}
                            >
                                <option value="">Seleccione</option>
                                <option value="Mango">Mango</option>
                                <option value="Azúcar">Azúcar</option>
                            </select>
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Cantidad (Kg)</label>
                            <input
                                type="text"
                                placeholder="cantidad alimentación"
                                className="w-full px-3 py-1.5 border border-gray-300 rounded-md leading-5 focus:outline-none focus:ring-1 focus:ring-[#e87204] text-sm"
                                required
                                value={cantidad || ""}
                                onChange={(e) => {
                                    const inputValue = e.target.value;
                                    if (inputValue === "") {
                                        setCantidad("");
                                        setError("");
                                        return;
                                    }
                                    if (!/^\d*\.?\d*$/.test(inputValue)) {
                                        setError("La cantidad debe ser un número válido (por ejemplo: 1.12 o 112).");
                                        setModalOpenFall(true);
                                        return;
                                    }
                                    setCantidad(inputValue);
                                    setError("");
                                }}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Valor</label>
                            <input
                                type="text"
                                placeholder="valor de alimentacion"
                                className="w-full px-3 py-1.5 border border-gray-300 rounded-md leading-5 focus:outline-none focus:ring-1 focus:ring-[#e87204] text-sm"
                                required
                                value={valor || ""}
                                onChange={(e) => {
                                    const inputValue = e.target.value;
                                    if (inputValue.includes(".")) {
                                        setError("No se permiten puntos en el valor. Use solo números enteros.");
                                        setModalOpenFall(true);
                                        return;
                                    }
                                    const numericValue = inputValue.replace(/[^\d]/g, "");
                                    setValor(numericValue);
                                }}
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Colmena</label>
                            <select
                                className="w-full px-3 py-1.5 border border-gray-300 rounded-md leading-5 focus:outline-none focus:ring-1 focus:ring-[#e87204] text-sm"
                                required
                                value={deshive || ""}
                                onChange={(e) => setDesHive(e.target.value)}
                            >
                                <option value="">Seleccione</option>
                                {hives
                                    .filter((hive) => hive.est_Hive === "activo")
                                    .map((hive) => (
                                        <option key={hive.id_Hive} value={hive.id_Hive}>
                                            {hive.des_Hive}
                                        </option>
                                    ))}
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-end pt-3">
                        <Button disabled={isSubmitting} type="submit" className="bg-[#e87204] text-white px-6 py-2 rounded-lg">
                            {isSubmitting ? "Guardando..." : buttonForm}
                        </Button>
                    </div>
                </div>
            </form>

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

            <DynamicAlert
                isOpen={isModalOpenFall}
                onOpenChange={(isOpen) => {
                    setModalOpenFall(isOpen);
                }}
                type="error"
                message={error || "Ha ocurrido un error inesperado"}
                redirectPath=""
            />
        </>
    );
}

export default FormFeeding;
