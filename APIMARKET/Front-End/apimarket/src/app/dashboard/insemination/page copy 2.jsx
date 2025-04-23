"use client"
import { useState, useEffect } from "react"
import NavPrivate from "@/components/navs/NavPrivate"
import ContentPage from "@/components/utils/ContentPage"
import Siderbar from "@/components/navs/Siderbar"
import ConfirmationModal from "@/components/utils/ConfirmationModal"
import ModalDialog from "@/components/utils/ModalDialog"
import DynamicAlert from "@/components/utils/DynamicAlert"
import FormCollecDrone from "./FormCollecDrone"
import FormExtraction from "./FormExtraction"
import FormFertilization from "./FormFertilization"
import { ArrowLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"

// Definir las constantes para los tipos de vista
const VIEW_MAIN = "main"
const VIEW_EXTRACTION = "extraction"
const VIEW_FERTILIZATION = "fertilization"

function ColmenaRecoleccion() {
  const TitlePage = "Recolección"
  const eliminar = "¿Estás seguro de que deseas eliminar este registro?"

  // Estados principales
  const [currentView, setCurrentView] = useState(VIEW_MAIN)
  const [action, setAction] = useState("Registrar")
  const [isOpen, setIsOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [buttonForm, setButtonForm] = useState("Registrar")
  const [isModalOpenSuccess, setIsModalOpenSuccess] = useState(false)
  const [isModalOpenError, setIsModalOpenError] = useState(false)
  const [error, setError] = useState(null)
  const [selectedId, setSelectedId] = useState(null)
  const [selectedRecoleccion, setSelectedRecoleccion] = useState(null)
  const [selectedExtraccion, setSelectedExtraccion] = useState(null)
  const [currentRecoleccion, setCurrentRecoleccion] = useState(null)
  const [currentExtraccion, setCurrentExtraccion] = useState(null)
  const [currentFertilizacion, setCurrentFertilizacion] = useState(null)
  const [registros, setRegistros] = useState([])
  const [extractionData, setExtractionData] = useState([])
  const [fertilizationData, setFertilizationData] = useState([])

  // Títulos para las tablas
  const titlesRecoleccion = ["Fecha", "Cantidad", "Responsable", "Extracción"]
  const titlesExtraccion = ["Fecha Extracción", "Cantidad Extracción", "Responsable", "Fertilización"]
  const titlesFertilizacion = ["Fecha Fertilización", "Cantidad Fertilización", "Responsable"]

  // Obtener datos de recolección
  async function fetchRecolecciones() {
    setIsLoading(true)
    try {
      // Simulación de datos para desarrollo
      setRegistros([
        ["01/04/2025", "2.5 kg", "Carlos Méndez", "Sí"],
        ["03/04/2025", "1.8 kg", "Ana López", "Sí"],
        ["05/04/2025", "3.2 kg", "Juan Pérez", "No"],
      ])
    } catch (error) {
      console.error("Error al obtener las recolecciones:", error)
      setError("No se pudo cargar las recolecciones.")
    } finally {
      setIsLoading(false)
    }
  }

  // Obtener datos de extracción
  async function fetchExtracciones(recoleccionId) {
    setIsLoading(true)
    try {
      // Simulación de datos para desarrollo
      setExtractionData([
        ["02/04/2025", "1.2 kg", "Carlos Méndez", "Sí"],
        ["05/04/2025", "0.8 kg", "Ana López", "Sí"],
      ])
    } catch (error) {
      console.error("Error al obtener las extracciones:", error)
      setError("No se pudo cargar las extracciones.")
    } finally {
      setIsLoading(false)
    }
  }

  // Obtener datos de fertilización
  async function fetchFertilizaciones(extraccionId) {
    setIsLoading(true)
    try {
      // Simulación de datos para desarrollo
      setFertilizationData([
        ["03/04/2025", "0.5 kg", "Carlos Méndez"],
        ["06/04/2025", "0.3 kg", "Ana López"],
      ])
    } catch (error) {
      console.error("Error al obtener las fertilizaciones:", error)
      setError("No se pudo cargar las fertilizaciones.")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchRecolecciones()
  }, [])

  // Función para actualizar los datos después de agregar/editar
  const handleDataUpdated = () => {
    if (currentView === VIEW_MAIN) fetchRecolecciones()
    else if (currentView === VIEW_EXTRACTION) fetchExtracciones(selectedRecoleccion)
    else if (currentView === VIEW_FERTILIZATION) fetchFertilizaciones(selectedExtraccion)
    setIsOpen(false)
  }

  // Función para cambiar el título del formulario y acción
  const updateTextTitleForm = (texto, rowData) => {
    setAction(texto)
    setButtonForm(texto)

    if (texto === "Actualizar") {
      if (currentView === VIEW_MAIN) {
        setCurrentRecoleccion({
          fecha: rowData[0],
          cantidad: rowData[1],
          responsable: rowData[2],
          extraccion: rowData[3] === "Sí",
        })
      } else if (currentView === VIEW_EXTRACTION) {
        setCurrentExtraccion({
          fec_extraction: rowData[0],
          can_extraction: rowData[1],
          responsable: rowData[2],
        })
      } else if (currentView === VIEW_FERTILIZATION) {
        setCurrentFertilizacion({
          fec_fertilization: rowData[0],
          can_fertilization: rowData[1],
          responsable: rowData[2],
        })
      }
    } else {
      setCurrentRecoleccion(null)
      setCurrentExtraccion(null)
      setCurrentFertilizacion(null)
    }
  }

  // Función para abrir el modal
  const openModalForm = (isOpen) => {
    setSelectedId(null)
    setIsOpen(isOpen)
  }

  // Eliminar registro
  async function deleteRecord() {
    try {
      if (currentView === VIEW_MAIN) fetchRecolecciones()
      else if (currentView === VIEW_EXTRACTION) fetchExtracciones(selectedRecoleccion)
      else if (currentView === VIEW_FERTILIZATION) fetchFertilizaciones(selectedExtraccion)

      setIsModalOpen(false)
      setIsModalOpenSuccess(true)
    } catch (error) {
      console.error("Error al eliminar el registro:", error)
      setError("No se pudo eliminar el registro.")
      setIsModalOpenError(true)
    }
  }

  // Función para manejar el clic en el botón "Ir" de extracción
  const handleExtractionClick = (rowIndex) => {
    const recoleccionId = rowIndex + 1 // En un entorno real, obtener el ID real
    setSelectedRecoleccion(recoleccionId)
    fetchExtracciones(recoleccionId)
    setCurrentView(VIEW_EXTRACTION)
  }

  // Función para manejar el clic en el botón "Ir" de fertilización
  const handleFertilizationClick = (rowIndex) => {
    const extraccionId = rowIndex + 1 // En un entorno real, obtener el ID real
    setSelectedExtraccion(extraccionId)
    fetchFertilizaciones(extraccionId)
    setCurrentView(VIEW_FERTILIZATION)
  }

  // Acciones de la tabla
  const actionsRecoleccion = {
    delete: (rowData, rowIndex) => {
      setSelectedId(rowIndex + 1)
      setIsModalOpen(true)
    },
    update: (rowData) => {
      updateTextTitleForm("Actualizar", rowData)
      setIsOpen(true)
    },
    custom: [
      {
        name: "Extracción",
        action: (rowData, rowIndex) => handleExtractionClick(rowIndex),
      },
    ],
  }

  const actionsExtraccion = {
    delete: (rowData, rowIndex) => {
      setSelectedId(rowIndex + 1)
      setIsModalOpen(true)
    },
    update: (rowData) => {
      updateTextTitleForm("Actualizar", rowData)
      setIsOpen(true)
    },
    custom: [
      {
        name: "Fertilización",
        action: (rowData, rowIndex) => handleFertilizationClick(rowIndex),
      },
    ],
  }

  const actionsFertilizacion = {
    delete: (rowData, rowIndex) => {
      setSelectedId(rowIndex + 1)
      setIsModalOpen(true)
    },
    update: (rowData) => {
      updateTextTitleForm("Actualizar", rowData)
      setIsOpen(true)
    },
  }

  // Navegación entre vistas
  const handleBackToMain = () => setCurrentView(VIEW_MAIN)
  const handleBackToExtraction = () => setCurrentView(VIEW_EXTRACTION)

  // Renderizar el formulario según la vista actual
  const renderFormComponent = () => {
    if (currentView === VIEW_MAIN) {
      return (
        <FormCollecDrone
          buttonForm={buttonForm}
          recoleccion={currentRecoleccion}
          onDataUpdated={handleDataUpdated}
          closeModal={openModalForm}
        />
      )
    } else if (currentView === VIEW_EXTRACTION) {
      return (
        <FormExtraction
          buttonForm={buttonForm}
          extraccion={currentExtraccion}
          onDataUpdated={handleDataUpdated}
          closeModal={openModalForm}
          recoleccionId={selectedRecoleccion}
        />
      )
    } else if (currentView === VIEW_FERTILIZATION) {
      return (
        <FormFertilization
          buttonForm={buttonForm}
          fertilizacion={currentFertilizacion}
          onDataUpdated={handleDataUpdated}
          closeModal={openModalForm}
          extraccionId={selectedExtraccion}
        />
      )
    }
    return null
  }

  return (
    <>
      <div className="flex h-screen bg-gray-200">
        <Siderbar />
        <div className="flex flex-col flex-1 overflow-hidden text-white">
          <NavPrivate TitlePage={TitlePage} />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background">
            <div className="container mx-auto px-6 py-8 mt-10">
              <div className="rounded-lg border-2 bg-white text-card-foreground shadow-lg">
                <div className="relative p-6">
                  {/* Botón de retroceso para vistas secundarias */}
                  {currentView !== VIEW_MAIN && (
                    <div className="mb-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-700"
                        onClick={currentView === VIEW_FERTILIZATION ? handleBackToExtraction : handleBackToMain}
                      >
                        <ArrowLeft size={18} className="mr-2" />
                        {currentView === VIEW_FERTILIZATION ? "Volver a Extracción" : "Volver a Recolección"}
                      </Button>
                    </div>
                  )}

                  {/* Contenido principal */}
                  {currentView === VIEW_MAIN && (
                    <ContentPage
                      Data={registros}
                      TitlesTable={titlesRecoleccion}
                      Actions={actionsRecoleccion}
                      action={action}
                      updateTextTitleForm={updateTextTitleForm}
                      openModalForm={openModalForm}
                      ignorar={[]}
                    />
                  )}

                  {currentView === VIEW_EXTRACTION && (
                    <ContentPage
                      Data={extractionData}
                      TitlesTable={titlesExtraccion}
                      Actions={actionsExtraccion}
                      action={action}
                      updateTextTitleForm={updateTextTitleForm}
                      openModalForm={openModalForm}
                      ignorar={[]}
                    />
                  )}

                  {currentView === VIEW_FERTILIZATION && (
                    <ContentPage
                      Data={fertilizationData}
                      TitlesTable={titlesFertilizacion}
                      Actions={actionsFertilizacion}
                      action={action}
                      updateTextTitleForm={updateTextTitleForm}
                      openModalForm={openModalForm}
                      ignorar={[]}
                    />
                  )}
                </div>
              </div>
            </div>
          </main>
        </div>

        {/* Modal para formularios */}
        <ModalDialog 
        isOpen={isOpen} 
        setIsOpen={openModalForm} 
        FormPage={renderFormComponent()} 
        action={action} />

        {/* Modal de confirmación para eliminar */}
        <ConfirmationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={deleteRecord}
          DeleteTitle={eliminar}
        />

        {/* MODALES DE ALERTA */}
        <DynamicAlert
          isOpen={isModalOpenSuccess}
          onOpenChange={setIsModalOpenSuccess}
          type="success"
          message="Operación realizada con éxito"
          redirectPath=""
        />

        <DynamicAlert
          isOpen={isModalOpenError}
          onOpenChange={setIsModalOpenError}
          type="error"
          message={error || "Ha ocurrido un error inesperado"}
          redirectPath=""
        />
      </div>
    </>
  )
}

export default ColmenaRecoleccion;