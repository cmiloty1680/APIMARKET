

"use client";


import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Clipboard } from "lucide-react";
import axiosInstance from "@/lib/axiosInstance";
// import { Droplet } from "lucide-react";
import {
  Archive,
  FlaskRoundIcon as Flask,
  PenToolIcon as Tool,
} from "lucide-react";
import DynamicAlert from "@/components/utils/DynamicAlert";

function FormProtocol({ buttonForm, protocol, onSubmit, closeModal, onDataUpdated }) {
  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState("");
  const [fechaCreacion, setFechaCreacion] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const [isModalOpenFall, setModalOpenFall] = useState(false);

  const [fechaActualizacion, setFechaActualizacion] = useState("");
  const [file, setArchivo] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [error, setError] = useState("");
  const [id_Protocol, setIdProtocol] = useState(null);
  const [msSuccess, setMsSuccess] = useState("");

  useEffect(() => {
    if (protocol) {
      setNombre(protocol.nom_Protocol || "");
      setTipo(protocol.tip_Protocol || "");
      setFechaCreacion(protocol.fecCre_Protocol || "");
      setFechaActualizacion(protocol.fecAct_Protocol || "");
      setArchivo(protocol.archivo_Protocol || null);
      setIdProtocol(protocol.id_Protocol || null);
    }
  }, [protocol]);


  async function handlerSubmit(event) {
    event.preventDefault();
    setSubmitting(true);

    // Validación de campos
    if (!nombre || !tipo || !fechaCreacion || !fechaActualizacion || (!file)) {
      setError("Todos los campos son requeridos.");
      setModalOpenFall(true);
      setSubmitting(false);
      return;
    }
    if (nombre.length > 20) {
      setError("El nombre del protocolo debe ser menor de 20 caracteres.");
      setModalOpenFall(true);
      setSubmitting(false);
      return;
  }
  
    try {
      if (buttonForm === "Actualizar") {
        const updateProtocol = {
          id_protocol: id_Protocol,
          Nom_Protocol: nombre,
          Tip_Protocol: tipo,
          FecCre_Protocol: fechaCreacion,
          FecAct_Protocol: fechaActualizacion,
          Archivo_Protocol: file,
        };
        const response = await axiosInstance.put(`/Api/Protocol/UpdateProtocol?id=${id_Protocol}`, updateProtocol);
        if (response.status === 200) {
          setMsSuccess("Implemento actualizado correctamente.");
          setModalOpen(true);
          onDataUpdated();
        }
      } else if (buttonForm === "Registrar") {
        const response = await axiosInstance.post("/Api/Protocol/CreateProtocol", {
          id_Protocol: id_Protocol,
          Nom_Protocol: nombre,
          Tip_Protocol: tipo,
          FecCre_Protocol: fechaCreacion,
          FecAct_Protocol: fechaActualizacion,
          Archivo_Protocol: file,
        });

        if (response.status === 200) {
          setMsSuccess("protocol registrado correctamente.");
          setModalOpen(true);
          onDataUpdated();
        }
      }
    } catch (error) {
      console.log("Error:", error.response || error.message);
      setError(error.response?.data?.message || "Error al conectar con el servidor.");
      setModalOpenFall(false);
    } finally {
      setSubmitting(false);
    }
    const setDataProtocolForUpdate = () => {
      setNombre(protocol.nom_Protocol);
      setTipo(protocol.tip_Protocol);
      setFechaCreacion(protocol.fecCre_Protocol);
      setFechaActualizacion(protocol.fecAct_Protocol);
      setArchivo(protocol.archivo_Protocol);
      setIdProtocol(protocol.id_Protocol);

    }

    // useEffect(() => {
    //   if (protocol) {
    //     setDataProtocolForUpdate();
    //   }
    // }, [protocol]);


    // Validación del archivo
    if (file) {
      if (file.type !== "application/pdf") {
        alert("Solo se permiten archivos PDF.");
        setSubmitting(false);
        return;
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB
        alert("El archivo es demasiado grande. El tamaño máximo permitido es 5MB.");
        setSubmitting(false);
        return;
      }
    }
    console.log("Archivo en estado:", file);

    try {
      const formData = new FormData();
      formData.append("Nom_Protocol", nombre);
      formData.append("Tip_Protocol", tipo);
      formData.append("FecCre_Protocol", fechaCreacion);
      formData.append("FecAct_Protocol", fechaActualizacion);
      if (file) {
        formData.append("Archivo_Protocol", file);
      }

      let response;

      if (buttonForm === "Actualizar") {
        formData.append("id_Protocol", id_Protocol);
        response = await axiosInstance.put(`/Api/Protocol/UpdateProtocol?id=${id_Protocol}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else if (buttonForm === "Registrar") {
        response = await axiosInstance.post("/Api/Protocol/CreateProtocol", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }
      console.log("Archivo en estado:", file);
      for (let pair of formData.entries()) {
        console.log(`${pair[0]}:`, pair[1]);
      }

      if (response?.status === 200) {
        setMsSuccess(
          buttonForm === "Registrar"
            ? "Protocolo registrado correctamente."
            : "Protocolo actualizado correctamente."
        );
        setModalOpen(true);
        onDataUpdated();
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      setModalMessage(error.response?.data?.message || "Error al conectar con el servidor.");

    } finally {
      setSubmitting(false);
    }

  }
  return (
<>
<form onSubmit={handlerSubmit} className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-[#e87204] rounded-full flex items-center justify-center text-white">
              <Tool className="h-5 w-5" />
            </div>
            <div className="ml-3">
              <h2 className="text-xl font-bold text-gray-900">Protocolo</h2>
              <p className="text-xs text-gray-500">Ingrese los datos del protocolo</p>
            </div>
          </div>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Campo Nombre */}
          <div className="space-y-1">
            <label  className="text-sm font-medium text-gray-700">Nombre del protocolo</label>
            <input
              id="nombre"
              type="text"
              maxLength={50}
              value={nombre || ""}
              placeholder="Nombre protocolo"

              onChange={(e) => setNombre(e.target.value)}
              className="w-full px-3 py-1.5 border border-gray-300 rounded-md leading-5 focus:outline-none focus:ring-1 focus:ring-[#e87204] text-sm"
              />
             
            
            </div>
                          
                 
          

          

          {/* Campo Tipo */}
          <div className="space-y-1">
            <label htmlFor="tipo" className="text-sm font-medium text-gray-700">Tipo de protocolo</label>
            <select
              id="tipo"
              value={tipo || ""}
              onChange={(e) => setTipo(e.target.value)}
              className="w-full px-3 py-1.5 border border-gray-300 rounded-md leading-5 focus:outline-none focus:ring-1 focus:ring-[#e87204] text-sm"
              required
            >
              <option value="">Seleccionar tipo</option>
              <option value="Riesgo">Riesgo</option>
              <option value="Ambiental">Ambiental</option>

              <option value="Seguridad">Seguridad</option>
            </select>
          </div>

          {/* Campo Fecha de Creación */}
          <div className="space-y-1">
            <label htmlFor="fechaCreacion" className="text-sm font-medium text-gray-700">Fecha de creación</label>
            <input
              type="date"
              id="fechaCreacion"
              value={fechaCreacion || ""}
              onChange={(e) => setFechaCreacion(e.target.value)}
              className="w-full px-3 py-1.5 border border-gray-300 rounded-md leading-5 focus:outline-none focus:ring-1 focus:ring-[#e87204] text-sm"
              required
            />
          </div>

          {/* Campo Fecha de Actualización */}
          <div className="space-y-1">
            <label htmlFor="fechaActualizacion" className="text-sm font-medium text-gray-700">Fecha de actualización</label>
            <input
              type="date"
              id="fechaActualizacion"
              value={fechaActualizacion || ""}
              onChange={(e) => setFechaActualizacion(e.target.value)}
              className="w-full px-3 py-1.5 border border-gray-300 rounded-md leading-5 focus:outline-none focus:ring-1 focus:ring-[#e87204] text-sm"
              required
            />
          </div>

          {/* Campo Archivo */}
          <div className="space-y-1 col-span-1 md:col-span-2">
            <label htmlFor="archivo" className="text-sm font-medium text-gray-700">Archivo (PDF)</label>
            <input
              type="file"
              id="archivo"
              accept=".pdf"
              onChange={(e) => setArchivo(e.target.files[0])}
              className="block w-full"
              required={buttonForm === "Registrar"}
            />
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <Button disabled={isSubmitting}
            type="submit"
            className="bg-[#e87204] text-white px-6 py-2 text-sm rounded-lg hover:bg-[#030712] focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50 transition-colors"
          >

            {isSubmitting ? "Guardando..." : buttonForm}
          </Button>
        </div>
      </form>



      {/* Modal de éxito usando el componente dinámico */}

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
            setModalOpenFall(isOpen);                    }
          
        }}
        type="error"
        message={error || "Ha ocurrido un error inesperado"}
        redirectPath=""
      />
    </>
    
  );
}

export default FormProtocol;

