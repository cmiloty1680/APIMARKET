"use client"

import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import axiosInstance from "@/lib/axiosInstance"
import { PenToolIcon as Tool } from "lucide-react"
import DynamicAlert from "@/components/utils/DynamicAlert"

function FormProtocol({ buttonForm, protocol, onSubmit, closeModal, onDataUpdated }) {
  const [nombre, setNombre] = useState("")
  const [tipo, setTipo] = useState("")
  const [fechaCreacion, setFechaCreacion] = useState("")
  const [isSubmitting, setSubmitting] = useState(false)
  const [isModalOpenFall, setModalOpenFall] = useState(false)
  const [fechaActualizacion, setFechaActualizacion] = useState("")
  const [file, setArchivo] = useState(null)
  const [isModalOpen, setModalOpen] = useState(false)
  const [modalMessage, setModalMessage] = useState("")
  const [error, setError] = useState("")
  const [id_Protocol, setIdProtocol] = useState(null)
  const [msSuccess, setMsSuccess] = useState("")

  async function handlerSubmit(event) {
    event.preventDefault()
    setSubmitting(true)
    setError("") // Limpiar errores previos

    // Validación de campos obligatorios
    if (!nombre || !tipo || !fechaCreacion || !fechaActualizacion) {
      setError("Todos los campos son requeridos.")
      setModalOpenFall(true)
      setSubmitting(false)
      return
    }

    // Validación del nombre
    if (nombre.length > 20) {
      setError("El nombre del protocolo debe ser menor de 20 caracteres.")
      setModalOpenFall(true)
      setSubmitting(false)
      return
    }

    // Validación del archivo (solo para registro nuevo)
    if (buttonForm === "Registrar" && !file) {
      setError("El archivo es requerido para registrar un nuevo protocolo.")
      setModalOpenFall(true)
      setSubmitting(false)
      return
    }

    // Validación del tipo y tamaño del archivo
    if (file) {
      if (file.type !== "application/pdf") {
        setError("Solo se permiten archivos PDF.")
        setModalOpenFall(true)
        setSubmitting(false)
        return
      }
      if (file.size > 5 * 1024 * 1024) {
        // 5MB
        setError("El archivo es demasiado grande. El tamaño máximo permitido es 5MB.")
        setModalOpenFall(true)
        setSubmitting(false)
        return
      }
    }

    // Función para capitalizar el nombre
    function capitalizarNombreCompleto(texto) {
      return texto
        .toLowerCase()
        .replace(/\s+/g, " ")
        .trim()
        .split(" ")
        .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
        .join(" ")
    }

    const descripcionFormateada = capitalizarNombreCompleto(nombre)

    try {
      // Preparar FormData para el envío
      const formData = new FormData()
      formData.append("Nom_Protocol", descripcionFormateada)
      formData.append("Tip_Protocol", tipo)
      formData.append("FecCre_Protocol", fechaCreacion)
      formData.append("FecAct_Protocol", fechaActualizacion)

      if (file) {
        formData.append("Archivo_Protocol", file)
      }

      let response

      if (buttonForm === "Actualizar") {
        formData.append("id_Protocol", id_Protocol)
        response = await axiosInstance.put(`/Api/Protocol/UpdateProtocol?id=${id_Protocol}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
      } else if (buttonForm === "Registrar") {
        response = await axiosInstance.post("/Api/Protocol/CreateProtocol", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
      }

      // Log para debugging
      console.log("FormData contents:")
      for (const pair of formData.entries()) {
        console.log(`${pair[0]}:`, pair[1])
      }

      if (response?.status === 200) {
        setMsSuccess(
          buttonForm === "Registrar" ? "Protocolo registrado correctamente." : "Protocolo actualizado correctamente.",
        )
        setModalOpen(true)
        if (onDataUpdated) {
          onDataUpdated()
        }
      }
    } catch (error) {
      console.error("Error en la solicitud:", error)
      const errorMessage = error.response?.data?.message || error.response?.data || "Error al conectar con el servidor."
      setError(errorMessage)
      setModalOpenFall(true)
    } finally {
      setSubmitting(false)
    }
  }

  useEffect(() => {
    if (protocol) {
      setNombre(protocol.nom_Protocol || "")
      setTipo(protocol.tip_Protocol || "")
      setFechaCreacion(protocol.fecCre_Protocol || "")
      setFechaActualizacion(protocol.fecAct_Protocol || "")
      setArchivo(protocol.archivo_Protocol || null)
      setIdProtocol(protocol.id_Protocol || null)
    }
  }, [protocol])

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
            <label className="text-sm font-medium text-gray-700">Nombre del protocolo</label>
            <input
              id="nombre"
              type="text"
              maxLength={50}
              value={nombre}
              placeholder="Nombre protocolo"
              onChange={(e) => setNombre(e.target.value)}
              className="w-full px-3 py-1.5 border border-gray-300 rounded-md leading-5 focus:outline-none focus:ring-1 focus:ring-[#e87204] text-sm"
              required
            />
          </div>

          {/* Campo Tipo */}
          <div className="space-y-1">
            <label htmlFor="tipo" className="text-sm font-medium text-gray-700">
              Tipo de protocolo
            </label>
            <select
              id="tipo"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-[#e87204]"
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
            <label htmlFor="fechaCreacion" className="text-sm font-medium text-gray-700">
              Fecha de creación
            </label>
            <input
              type="date"
              id="fechaCreacion"
              value={fechaCreacion}
              onChange={(e) => setFechaCreacion(e.target.value)}
              className="w-full px-3 py-1.5 border border-gray-300 rounded-md leading-5 focus:outline-none focus:ring-1 focus:ring-[#e87204] text-sm"
              required
            />
          </div>

          {/* Campo Fecha de Actualización */}
          <div className="space-y-1">
            <label htmlFor="fechaActualizacion" className="text-sm font-medium text-gray-700">
              Fecha de actualización
            </label>
            <input
              type="date"
              id="fechaActualizacion"
              value={fechaActualizacion}
              onChange={(e) => setFechaActualizacion(e.target.value)}
              className="w-full px-3 py-1.5 border border-gray-300 rounded-md leading-5 focus:outline-none focus:ring-1 focus:ring-[#e87204] text-sm"
              required
            />
          </div>

          {/* Campo Archivo */}
          <div className="space-y-1 col-span-1 md:col-span-2">
            <label htmlFor="archivo" className="text-sm font-medium text-gray-700">
              Archivo (PDF) {buttonForm === "Registrar" && <span className="text-red-500">*</span>}
            </label>
            <input
              type="file"
              id="archivo"
              accept=".pdf"
              onChange={(e) => setArchivo(e.target.files[0])}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#e87204] file:text-white hover:file:bg-[#030712]"
              required={buttonForm === "Registrar"}
            />
            {file && (
              <p className="text-xs text-gray-600 mt-1">
                Archivo seleccionado: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end mt-6">
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
          setModalOpen(isOpen)
          if (!isOpen && closeModal) {
            closeModal()
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
          setModalOpenFall(isOpen)
        }}
        type="error"
        message={error || "Ha ocurrido un error inesperado"}
        redirectPath=""
      />
    </>
  )
}

export default FormProtocol
