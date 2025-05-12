

"use client";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axiosInstance";
import { Droplet } from "lucide-react";
import DynamicAlert from "@/components/utils/DynamicAlert";

function FormHoneyCollection({ buttonForm, honeyCollection, onDataUpdated, closeModal }) {
  const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [canFra125, setCanFra125] = useState("");
  const [canFra250, setCanFra250] = useState("");
  const [uniMed, setUniMed] = useState("ml");
  const [descripcion, setDescripcion] = useState("");
  const [fecha, setFecha] = useState("");
  const [produccion, setProduccion] = useState("");
  const [totMiel, setTotMiel] = useState("");
  const [msSuccess, setMsSuccess] = useState("");
  const [error, setError] = useState("");
  const [id_HoneyCollection, setIdHoneyCollection] = useState(null);
  const [responsibles, setResponsibles] = useState([]);
  const [nomResponsible, setNomResponsible] = useState("");
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


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!canFra125 || !canFra250 || !descripcion || !fecha || !nomResponsible || !produccion ) {
      setError("Por favor, complete todos los campos obligatorios.");
      setIsSubmitting(false);
      return;
    }
    if (descripcion.length > 250) {
      setError("La descripcion debe tener menos de 250 caracteres.");
      setModalOpenFall(true);
      setIsSubmitting(false);
      return;
    }
    if (parseFloat(totMiel) > 250) {
      setError("La descripcion debe tener menos de 250 caracteres.");
      setModalOpenFall(true);
      setIsSubmitting(false);
      return;
    }
    const payload = {
      id_HoneyCollection: id_HoneyCollection,
      tot_HoneyCollection: totMiel,
      canFra125_HoneyCollection: canFra125,
      canFra250_HoneyCollection: canFra250,
      uniMed_HoneyCollection: uniMed,
      des_HoneyCollection: descripcion,
      fec_HoneyCollection: fecha,
      id_Responsible: parseInt(nomResponsible),
      id_Production: produccion,
    };

    try {
      if (buttonForm === "Actualizar") {
        const response = await axiosInstance.put(
          `/Api/HoneyCollection/UpdateHoneyCollection/${id_HoneyCollection}`,
          payload
        );
        if (response.status === 200) {

          setMsSuccess(response.data.message || "Actualizado");
          setModalOpen(true);
          onDataUpdated();

        }
      } else if (buttonForm === "Registrar") {

        // console.log(uniMed)
        const response = await axiosInstance.post("/Api/HoneyCollection/Create", {
          tot_HoneyCollection: totMiel,
          canFra125_HoneyCollection: canFra125,
          canFra250_HoneyCollection: canFra250,
          uniMed_HoneyCollection: uniMed,
          des_HoneyCollection: descripcion,
          fec_HoneyCollection: fecha,
          id_Responsible: nomResponsible,
          id_Production: produccion,
        });
        if (response.status === 200) {
          setMsSuccess(response.data.registrado);
          setModalOpen(true);
          onDataUpdated();
        }
      }
    } catch (error) {
      setError(error.response?.data?.message || "Error al conectar con el servidor.");
      console.log(error.response?.data?.message || "Error al conectar con el servidor.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const setDataHoneyForUpdate = () => {
    setIdHoneyCollection(honeyCollection.id_HoneyCollection);
    setDescripcion(honeyCollection.des_HoneyCollection);
    setTotMiel(honeyCollection.tot_HoneyCollection);
    setFecha(honeyCollection.fec_HoneyCollection ?? "");
    setCanFra125(honeyCollection.canFra125_HoneyCollection);
    setCanFra250(honeyCollection.canFra250_HoneyCollection);
    setUniMed(honeyCollection.uniMed_HoneyCollection);
    setNomResponsible(honeyCollection.id_Responsible);
    setProduccion(honeyCollection.id_Production);

  }

  useEffect(() => {

    console.log(uniMed)
    if(buttonForm == "Actualizar"){
      setDataHoneyForUpdate()
    }
    
  }, [buttonForm]);

  return (
    <>
      <form
        className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        {/* Encabezado */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-[#e87204] rounded-full flex items-center justify-center text-white">
              <Droplet className="h-4 w-4" />
            </div>
            <div className="ml-3">
              <h2 className="text-xl font-bold text-gray-900">Recolección de Miel</h2>
              <p className="text-xs text-gray-500">Ingrese los datos de la recolección</p>
            </div>
          </div>
        </div>

        {/* Error */}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {/* Campos */}
        <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Total de Miel en Kg</label>
            <input
              type="number"
              value={totMiel || ""}
              onChange={(e) => setTotMiel(e.target.value)}
              placeholder="Cantidad Recolectada"
              className="w-full px-3 py-1.5 border border-gray-300 rounded-md leading-5 focus:outline-none focus:ring-1 focus:ring-[#e87204] text-sm"
              required
            />
          </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Frascos de 125ml */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">
              Cantidad Frascos 125ml
            </label>
            <input
              type="number"
              value={canFra125 || ""}
              onChange={(e) => setCanFra125(e.target.value)}
              className="w-full px-3 py-1.5 border border-gray-300 rounded-md leading-5 focus:outline-none focus:ring-1 focus:ring-[#e87204] text-sm"
              required
            />
          </div>

          {/* Frascos de 250ml */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">
              Cantidad Frascos 250ml
            </label>
            <input
              type="number"
              value={canFra250 || ""}
              onChange={(e) => setCanFra250(e.target.value)}
              className="w-full px-3 py-1.5 border border-gray-300 rounded-md leading-5 focus:outline-none focus:ring-1 focus:ring-[#e87204] text-sm"
              required
            />
          </div>

          {/* Unidad de Medida */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Unidad de Medida</label>
            <select
              value={uniMed || ""}
              onChange={(e) => setUniMed(e.target.value)}
              className="w-full px-3 py-1.5 border border-gray-300 rounded-md leading-5 focus:outline-none focus:ring-1 focus:ring-[#e87204] text-sm"
            >
              <option value={uniMed}>{uniMed}</option>
            </select>
          </div>

          {/* Descripción */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">ID Producción</label>
            <input
              type="number"
              value={produccion || ""}
              onChange={(e) => setProduccion(e.target.value)}
              placeholder="ID de la producción"
              className="w-full px-3 py-1.5 border border-gray-300 rounded-md leading-5 focus:outline-none focus:ring-1 focus:ring-[#e87204] text-sm"
              required
            />
          </div>

          {/* Fecha */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Fecha</label>
            <input
              type="date"
              value={fecha || ""}
              onChange={(e) => setFecha(e.target.value)}
              className="w-full px-3 py-1.5 border border-gray-300 rounded-md leading-5 focus:outline-none focus:ring-1 focus:ring-[#e87204] text-sm"
              required
            />
          </div>

          {/* Responsable */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Nombre de responsable</label>
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

          
          {/* Producción */}
          <div className="space-y-1 col-span-1 md:col-span-2">
            <label className="text-sm font-medium text-gray-700">Descripción</label>
            <textarea
              type="text"
              value={descripcion || ""}
              onChange={(e) => setDescripcion(e.target.value)}
              placeholder="Descripción menos de 250 caracteres"
              className="w-full px-3 py-1.5 border border-gray-300 rounded-md leading-5 focus:outline-none focus:ring-1 focus:ring-[#e87204] text-sm"
              required
            />
          </div>
        </div>

        {/* Botón */}
        <div className="flex justify-end pt-4">
          <Button
            disabled={isSubmitting}
            type="submit"
            className="bg-[#e87204] text-white px-6 py-2 text-sm rounded-lg hover:bg-[#030712] focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50 transition-colors"
          >
            {isSubmitting ? "Guardando..." : buttonForm}
          </Button>
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
            setModalOpenFall(isOpen);                    }
          }}
        type="error"
        message={error || "Ha ocurrido un error inesperado"}
        redirectPath=""
      />
    </>
  );
}

export default FormHoneyCollection;










