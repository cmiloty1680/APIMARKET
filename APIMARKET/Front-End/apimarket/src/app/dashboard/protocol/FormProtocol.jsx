
"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { Droplet } from "lucide-react";

function FormProtocol({ buttonForm, protocol }) {
  const router = useRouter();
  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState("");
  const [fechaCreacion, setFechaCreacion] = useState("");
  const [fechaActualizacion, setFechaActualizacion] = useState("");
  const [archivo, setArchivo] = useState(null);
  const [archivoPrevio, setArchivoPrevio] = useState("");
  const [error, setError] = useState("");
  const [msSuccess, setMsSuccess] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [id_Protocol, setIdProtocol] = useState(null);

  async function handlerSubmit(event) {
    event.preventDefault();
    setSubmitting(true);

    if (!nombre || !tipo || !fechaCreacion || !fechaActualizacion || !archivo) {
      setModalMessage("Por favor, complete todos los campos.");
      setModalOpen(true);
      setSubmitting(false);
      return;
    }

    const formattedFecha = new Date(fechaCreacion).toISOString().split("T")[0];
    const formattedFechas = new Date(fechaActualizacion).toISOString().split("T")[0];

    try {
      const formData = new FormData();
      formData.append("Nom_Protocol", nombre);
      formData.append("Tip_Protocol", tipo);
      formData.append("FecCre_Protocol", formattedFecha);
      formData.append("FecAct_Protocol", formattedFechas);
      formData.append("Archivo", archivo);

      if (buttonForm === "Actualizar") {
        const response = await axiosInstance.put(`/Api/Protocol/UpdateProtocol/${id_Protocol}`, formData, {
        });

        if (response.status === 200) {
          setModalMessage("Protocolo actualizado correctamente.");
          setModalOpen(true);
        }
      } else if (buttonForm === "Registrar") {
        const response = await axiosInstance.post("/Api/Protocol/CreateProtocol", formData, {
        });

        if (response.status === 200) {
          setModalMessage(response.data.registrado);
          setModalOpen(true);
          localStorage.setItem("registroProduccion", response.data.registrado);
          alert(response.data.registrado);
        }
      }
    } catch (error) {
      console.log("Error:", error.response || error.message);
      setModalMessage(error.response?.data?.message || "Error al conectar con el servidor.");
    } finally {
      setSubmitting(false);
    }
  }

  const setDataprotocolForUpdate = () => {
    setNombre(protocol.nom_Protocol || "");
    setTipo(protocol.tipo_Protocol || "");
    setFechaCreacion(protocol.fecCre_Protocol ? new Date(protocol.fecCre_Protocol).toLocaleDateString("sv-SE") : "");
    setFechaActualizacion(protocol.fecAct_Protocol ? new Date(protocol.fecAct_Protocol).toLocaleDateString("sv-SE") : "");
    setArchivo(null);
    setArchivoPrevio(protocol.archivo_Protocol || "");
    setIdProtocol(protocol.id_Protocol || null);
  };

  useEffect(() => {
    setDataprotocolForUpdate();
  }, [protocol]);

  return (
    <form className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md" onSubmit={handlerSubmit}>
      {/* Encabezado */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-[#e87204] rounded-full flex items-center justify-center text-white">
            <Droplet className="h-5 w-5" />
          </div>
          <div className="ml-3">
            <h2 className="text-xl font-bold text-gray-900">Protocolo</h2>
            <p className="text-xs text-gray-500">Ingrese los datos del protocolo</p>
          </div>
        </div>
      </div>

      {/* Mensajes */}
      {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
      {msSuccess && <p className="text-green-500 mb-4 text-sm">{msSuccess}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Nombre */}
        <div className="space-y-1">
          <label htmlFor="nombre" className="text-sm font-medium text-gray-700">Nombre de protocolo</label>
          <input
            type="text"
            id="nombre"
            maxLength={50}
            placeholder="Nombre del protocolo"
            className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-[#e87204]"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>

        {/* Tipo */}
        <div className="space-y-1">
          <label htmlFor="tipo" className="text-sm font-medium text-gray-700">Tipo de protocolo</label>
          <input
            type="text"
            id="tipo"
            placeholder="Tipo de protocolo"
            className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-[#e87204]"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            required
          />
        </div>

        {/* Fechas */}
        <div className="space-y-1">
          <label htmlFor="fechaCreacion" className="text-sm font-medium text-gray-700">Fecha de creación</label>
          <input
            type="date"
            id="fechaCreacion"
            className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-[#e87204]"
            value={fechaCreacion}
            onChange={(e) => setFechaCreacion(e.target.value)}
            required
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="fechaActualizacion" className="text-sm font-medium text-gray-700">Fecha de Actualización</label>
          <input
            type="date"
            id="fechaActualizacion"
            className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-[#e87204]"
            value={fechaActualizacion}
            onChange={(e) => setFechaActualizacion(e.target.value)}
            required
          />
        </div>

        {/* Subida de archivo */}
        <div className="space-y-1 col-span-1 md:col-span-2">
          <label htmlFor="archivo" className="text-sm font-medium text-gray-700">Subir archivo</label>
          <input
            type="file"
            id="archivo"
            name="archivo"
            accept=".pdf"
            onChange={(e) => setArchivo(e.target.files[0])}
            required
          />
          {archivoPrevio && (
            <p className="text-sm text-gray-500 mt-1">
              Archivo actual:{" "}
              {archivoPrevio !== "-" ? (
                <a
                  href={`http://localhost:5167${archivoPrevio}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  {archivoPrevio.split("/").pop()}
                </a>
              ) : "-"}
            </p>
          )}
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
  );
}

export default FormProtocol;