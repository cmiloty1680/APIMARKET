
"use client"
import { useState, useEffect } from "react"
import NavPrivate from "@/components/navs/NavPrivate"
import ContentPage from "@/components/utils/ContentPage"
import Sidebar from "@/components/navs/Siderbar"
import { Eye, Download, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react"
import ExportToPDFDialog from "@/components/utils/ExportToPDFDialog"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

import axiosInstance from "@/lib/axiosInstance"
import ConfirmationModal from "@/components/utils/ConfirmationModal"
import ModalDialog from "@/components/utils/ModalDialog"
import FormProtocol from "./FormProtocol"
import DynamicAlert from "@/components/utils/DynamicAlert"
import { Clipboard } from "lucide-react"
import PrivateRoute from "@/app/routes/privateRoute"

function ProtocolPage() {
  const TitlePage = "Protocolo"
  const eliminar = "¿Estás seguro de que deseas eliminar este protocolo?"
  const [regisProtocol, setRegisProtocol] = useState([])
  const [action, setAction] = useState("Registrar")
  const [msSuccess, setMsSuccess] = useState("")
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
  const [isModalOpenFall, setModalOpenFall] = useState(false)
  const [isExportModalOpen, setIsExportModalOpen] = useState(false)
  const [isModalOpen, setModalOpen] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedProtocol, setSelectedProtocol] = useState(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [buttonForm, setButtonForm] = useState("Registrar")

  // Estados para el modal de visualización
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [currentDocument, setCurrentDocument] = useState(null)
  const [zoom, setZoom] = useState(100)
  const [currentPage, setCurrentPage] = useState(1)
  const [isDocumentLoading, setIsDocumentLoading] = useState(true)

  const titlesProtocol = [
    "Código",
    "Nombre de protocolo",
    "Tipo de protocolo",
    "Fecha de creación",
    "Fecha de Actualización",
    "Descargar",
    "Visualizar", // Nueva columna
  ]

  const [protocol, setProtocol] = useState({
    id_Protocol: "",
    nom_Protocol: "",
    tip_Protocol: "",
    fecCre_Protocol: "",
    fecAct_Protocol: "",
    archivo_Protocol: "",
  })

  function formatDateToISO(dateString) {
    const [day, month, year] = dateString.split("/")
    if (!day || !month || !year) return ""
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`
  }

  // Función para abrir el modal de visualización
  const handleViewDocument = (base64Data, protocolName, protocolId) => {
    setCurrentDocument({
      base64: base64Data,
      name: protocolName,
      id: protocolId,
    })
    setZoom(100)
    setCurrentPage(1)
    setIsViewModalOpen(true)
  }

  // Funciones para controlar el zoom y páginas
  const handleZoomIn = () => {
    if (zoom < 200) setZoom(zoom + 10)
  }

  const handleZoomOut = () => {
    if (zoom > 50) setZoom(zoom - 10)
  }

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }



  // Función para convertir base64 a URL de blob
  const base64ToBlob = (base64) => {
    const byteCharacters = atob(base64)
    const byteNumbers = new Array(byteCharacters.length)
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i)
    }
    const byteArray = new Uint8Array(byteNumbers)
    const blob = new Blob([byteArray], { type: "application/pdf" })
    return URL.createObjectURL(blob)
  }

  async function fetchProtocol() {
    setIsLoading(true)
    try {
      const response = await axiosInstance.get("/Api/Protocol/GetsAllProtocol")
      if (response.status === 200) {
        const data = response.data.map((item) => [
          item.id_Protocol || "-",
          item.nom_Protocol || "Sin descripción",
          item.tip_Protocol || "Sin estado",
          item.fecCre_Protocol ? new Date(item.fecCre_Protocol).toLocaleDateString("es-CO") : "Sin descripción",
          item.fecAct_Protocol ? new Date(item.fecAct_Protocol).toLocaleDateString("es-CO") : "Sin descripción",
          item.archivo_Protocol ? (
            <div key={`download-${item.id_Protocol}`} className="center gap-2 justify-center items-center">
              <button
                onClick={() => handleDownload(item.archivo_Protocol, `Protocolo_${item.id_Protocol}`)}
                className="text-green-600 hover:text-black-800"
                title="Descargar archivo"
              >
                <Download size={25} />
              </button>
            </div>
          ) : (
            "-"
          ),
          // Nueva columna de visualización
          item.archivo_Protocol ? (
            <div key={`view-${item.id_Protocol}`} className="center gap-2 justify-center items-center">
              <button
                onClick={() => handleViewDocument(item.archivo_Protocol, item.nom_Protocol, item.id_Protocol)}
                className="text-blue-800 hover:text-blue-900"
                title="Visualizar documento"
              >
                <Eye size={25} />
              </button>
            </div>
          ) : (
            "-"
          ),
        ])

        setRegisProtocol(data)
      }
    } catch (error) {
      console.error("Error al obtener los protocolos:", error)
      setError("No se pudo cargar los protocolos.")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchProtocol()
  }, [])

  const getFileType = (base64) => {
    if (base64.startsWith("JVBER")) {
      return { type: "application/pdf", extension: ".pdf" }
    } else if (base64.startsWith("data:image")) {
      return { type: "image/jpeg", extension: ".jpg" }
    }
    return { type: "application/octet-stream", extension: ".pdf" }
  }

  const handleDownload = (base64, nombreArchivo) => {
    const byteCharacters = atob(base64)
    const byteArrays = []

    for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
      const slice = byteCharacters.slice(offset, offset + 1024)
      const byteNumbers = new Array(slice.length)
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i)
      }
      byteArrays.push(new Uint8Array(byteNumbers))
    }

    const { type, extension } = getFileType(base64)

    const blob = new Blob(byteArrays, { type })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = nombreArchivo + extension
    link.click()
  }

  const updateTextTitleForm = (texto, rowData) => {
    setAction(texto)
    setButtonForm(texto)
    setProtocol({})

    if (texto === "Actualizar") {
      setProtocol({
        id_Protocol: rowData[0],
        nom_Protocol: rowData[1],
        tip_Protocol: rowData[2],
        fecCre_Protocol: formatDateToISO(rowData[3]),
        fecAct_Protocol: formatDateToISO(rowData[4]),
        archivo_Protocol: rowData[5],
      })
    }
  }

  const handleDataUpdated = () => {
    fetchProtocol()
  }

  const openModalForm = (isOpen) => {
    setIsOpen(isOpen)
  }

  const handleSuccess = () => {
    const message =
      action === "Registrar"
        ? "El protocolo ha sido registrado correctamente."
        : "El protocolo ha sido actualizado correctamente."

    setMsSuccess(message)
    setModalOpen(true)
    fetchProtocol()
    setIsOpen(false)
  }

  async function deleteProtocol() {
    if (!selectedProtocol) {
      setError("Debe seleccionar un protocolo.")
      return
    }

    try {
      await axiosInstance.delete(`/Api/Protocol/DeleteProtocol?id=${selectedProtocol}`)
      fetchProtocol()
      setIsDeleteModalOpen(false)
    } catch (error) {
      console.error("Error al eliminar el protocolo:", error)
      setError("No se pudo eliminar el protocolo.")
      setModalOpenFall(true)
    }
  }

  const actions = {
    delete: (rowData) => {
      setSelectedProtocol(rowData[0])
      setIsModalOpenDelete(true)
    },
  }

  return (
    <PrivateRoute requiredRole={["instructor", "pasante", "gestor"]}>
      <div className="flex h-screen bg-gray-200">
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <NavPrivate TitlePage={TitlePage} Icon={<Clipboard />} />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background">
            <div className="container mx-auto px-6 py-8 mt-10">
              <div className="rounded-lg border-2 bg-white text-card-foreground shadow-lg">
                <div className="relative p-6">
                  {error && <div className="bg-red-500 text-white p-2 rounded mb-4">{error}</div>}
                  <ContentPage
                    Data={regisProtocol}
                    TitlesTable={titlesProtocol}
                    Actions={actions}
                    action={action}
                    updateTextTitleForm={updateTextTitleForm}
                    openModalForm={openModalForm}
                    ignorar={[]}
                    tableName="Protocolo"
                    setIsExportModalOpen={setIsExportModalOpen}
                    showAddButton={true}
                  />
                </div>
              </div>
            </div>
          </main>
        </div>

        <ModalDialog
          isOpen={isOpen}
          setIsOpen={openModalForm}
          FormPage={
            <FormProtocol
              buttonForm={buttonForm}
              protocol={protocol}
              onSuccess={handleSuccess}
              onDataUpdated={handleDataUpdated}
              closeModal={openModalForm}
            />
          }
          action={action}
        />

        <ConfirmationModal
          isOpen={isModalOpenDelete}
          onClose={() => setIsModalOpenDelete(false)}
          onConfirm={deleteProtocol}
          DeleteTitle={eliminar}
        />

        <DynamicAlert
          isOpen={isModalOpen}
          onOpenChange={setModalOpen}
          type="success"
          message={msSuccess}
          redirectPath=""
        />

        <ExportToPDFDialog
          isOpen={isExportModalOpen}
          setIsOpen={setIsExportModalOpen}
          TitlePage={TitlePage}
          Data={regisProtocol}
          TitlesTable={titlesProtocol}
        />

        {/* Modal de visualización de documentos */}
        <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
          <DialogContent className="max-w-6xl h-[90vh] flex flex-col p-0">
            <DialogHeader className="bg-white p-3">
              <DialogTitle>
              </DialogTitle>
            </DialogHeader>

            {/* Visor de PDF */}
            {/* <div className="bg-gray-900 flex-1 overflow-auto">
              {currentDocument && (
                <iframe
                  src={`data:application/pdf;base64,${currentDocument.base64}#page=${currentPage}&zoom=${zoom}`}
                  title={currentDocument.name}
                  className="w-full h-full border-none"
                />
              )}
            </div> */}
            <div className="bg-gray-900 flex-1 overflow-auto relative">
  {isDocumentLoading && (
    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-yellow-500"></div>
    </div>
  )}
  {currentDocument && (
    <iframe
      src={`data:application/pdf;base64,${currentDocument.base64}#page=${currentPage}&zoom=${zoom}`}
      title={currentDocument.name}
      className="w-full h-full border-none"
      onLoad={() => setIsDocumentLoading(false)} // << desactiva el loader
    />
  )}
</div>

          </DialogContent>
        </Dialog>
      </div>
    </PrivateRoute>
  )
}

export default ProtocolPage
;