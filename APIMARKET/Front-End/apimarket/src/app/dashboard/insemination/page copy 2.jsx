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
import axiosInstance from "@/lib/axiosInstance";
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
  const [isOpen, setIsOpen] = useState(false)              // Control formulario
  const [isModalOpen, setIsModalOpen] = useState(false)    // Control delete
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
  const [extractionsData, setExtractionsData] = useState([])
  const [fertilizationData, setFertilizationData] = useState([])
  const [selectedFertilization, setSelectedFertilization] = useState(null)

  // Bandera para detectar si se guardó el formulario
  const [hasCreatedRecord, setHasCreatedRecord] = useState(false)
  const [previousView, setPreviousView] = useState(null);

  

  // Si el modal de formulario se cierra sin guardar, volver a vista principal
  useEffect(() => {
    if (!isOpen && !hasCreatedRecord) {
      if (currentView === VIEW_FERTILIZATION) {
        setCurrentView(VIEW_EXTRACTION);
      } else if (currentView === VIEW_EXTRACTION) {
        setCurrentView(VIEW_MAIN); // o VIEW_COLLEC_DRONE si existe
      } else if (currentView === VIEW_MAIN) {
        setCurrentView(VIEW_MAIN);
      }
    }
  }, [isOpen]);
  

  // Títulos para las tablas
  const titlesRecoleccion = [
    "ID",
    "Fecha",
    "Cantidad",
    "Responsable",
    "ID Colmena",
    "ID Responsable",
    "Extracción"
  ]
  const titlesExtraccion = [
    "ID",
    "Fecha Extracción",
    "Cantidad Extracción",
    "Responsable",
    "ID Recolección",
    "ID Responsable",
    "Fertilización"
  ]
  const titlesFertilizacion = [
    "ID",
    "Fecha Fertilización",
    "Cantidad Fertilización",
    "Responsable",
    "ID Extracción",
    "ID Responsable"
  ]

  function formatDateToISO(dateString) {
    const [day, month, year] = dateString.split("/");
    if (!day || !month || !year) return "";
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  }

  const [droneData, setDroneData] = useState({
    id_CollecDrone: "",
    fec_CollecDrone: "",
    can_CollecDrone: "",
    id_Responsible: "",
    id_Hive: "",
  });

  const [extractionData, setExtractionData] = useState({
    id_Extraction: "",
    fec_extraction: "",
    can_extraction: "",
    id_CollecDrone: "",
    id_Responsible: "",
  });

  const [fertilization, setFertilization] = useState({
    id_Fertilization: "",
    fec_Fertilization: "",
    can_Fertilization: "",
    id_Extraction: "",
    id_Responsible: "",
  });

  // Obtener datos de recolección
  async function fetchRecolecciones() {
    setIsLoading(true)
    try {
      const response = await axiosInstance.get("/Api/CollecDrone/GetAllCollecDrone");
      if (response.status === 200) {
        const data = response.data.map((collec) => [
          collec.id_CollecDrone || "-",
          collec.fec_CollecDrone ? new Date(collec.fec_CollecDrone).toLocaleDateString("es-CO") : "-",
          collec.can_CollecDrone || "Sin estado",
          collec.nam_Responsible || "-",
          collec.id_Hive || "-",
          collec.id_Responsible || "-",
        ]);
        setRegistros(data);
      }
    } catch (error) {
      console.error("Error al obtener las recolecciones:", error)
      setError("No se pudo cargar las recolecciones.")
    } finally {
      setIsLoading(false)
    }
  }

  // Obtener datos de extracción
  async function fetchExtracciones(idCollecDrone) {
    setIsLoading(true)
    try {
      const response = await axiosInstance.get(`/Api/Extraction/GetExtractionByCollecDrone?id=${idCollecDrone}`);
      if (response.status === 200) {
        const data = response.data.map((extration) => [
          extration.id_Extraction || "-",
          extration.fec_Extraction ? new Date(extration.fec_Extraction).toLocaleDateString("es-CO") : "-",
          extration.can_Extraction || "Sin estado",
          extration.nam_Responsible || "-",
          extration.id_CollecDrone || "-",
          extration.id_Responsible || "-",
        ]);
        setExtractionsData(data);
      }
    } catch (error) {
      console.error("Error al obtener las extracciones:", error)
      setError("No se pudo cargar las extracciones.")
    } finally {
      setIsLoading(false)
    }
  }

  // Obtener datos de fertilización
  async function fetchFertilizaciones(idFertilization) {
    setIsLoading(true)
    try {
      const response = await axiosInstance.get(`/Api/Fertilization/GetFertilizationByExtraction?id=${idFertilization}`);
      if (response.status === 200) {
        const data = response.data.map((fert) => [
          fert.id_Fertilization || "-",
          fert.fec_Fertilization ? new Date(fert.fec_Fertilization).toLocaleDateString("es-CO") : "-",
          fert.can_Fertilization || "-",
          fert.nam_Responsible || "-",
          fert.id_Extraction || "-",
          fert.id_Responsible || "-",
        ]);
        setFertilizationData(data);
      }
    } catch (error) {
      console.error("Error al obtener las fertilizaciones:", error)
      setError("No se pudo cargar las fertilizaciones.")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => { fetchRecolecciones() }, [])

  // Función tras guardar/actualizar datos
  const handleDataUpdated = () => {
    setHasCreatedRecord(true)          // Marca que se guardó
    if (currentView === VIEW_MAIN) fetchRecolecciones()
    else if (currentView === VIEW_EXTRACTION) fetchExtracciones(selectedRecoleccion)
    else if (currentView === VIEW_FERTILIZATION) fetchFertilizaciones(selectedExtraccion)
    setIsOpen(false)
  }

  // Cambiar título y datos para actualizar
  const updateTextTitleForm = (texto, rowData) => {
    setAction(texto)
    setButtonForm(texto)
    setExtractionData({});
    setFertilization({});

    if (texto === "Actualizar") {
      if (currentView === VIEW_MAIN) {
        setDroneData({
          id_CollecDrone: rowData[0],
          fec_CollecDrone: formatDateToISO(rowData[1]),
          can_CollecDrone: rowData[2],
          id_Responsible: rowData[5],
          id_Hive: rowData[4],
        })
      } else if (currentView === VIEW_EXTRACTION) {
        setExtractionData({
          id_Extraction: rowData[0],
          fec_Extraction: formatDateToISO(rowData[1]),
          can_Extraction: rowData[2],
          id_CollecDrone: rowData[4],
          id_Responsible: rowData[5],
        })
      } else if (currentView === VIEW_FERTILIZATION) {
        setFertilization({
          id_Fertilization: rowData[0],
          fec_Fertilization: formatDateToISO(rowData[1]),
          can_Fertilization: rowData[2],
          id_Extraction: rowData[4],
          id_Responsible: rowData[5],
        })
      }
    } else {
      setCurrentRecoleccion(null)
      setCurrentExtraccion(null)
      setCurrentFertilizacion(null)
    }
  }

  // Abrir/cerrar modal de formulario
  const openModalForm = (flag) => {
    setHasCreatedRecord(false)         // Reset bandera
    setSelectedId(null)
    setIsOpen(flag)
  }

  // Eliminar fertilización
  async function deleteFertilization() {
    if (!selectedFertilization) {
      setError("Debe seleccionar una colmena.");
      return;
    }

    try {
      await axiosInstance.delete(`/Api/Fertilization/DeleteFertilization?id=${selectedFertilization}`);
      fetchFertilizaciones(selectedExtraccion);
      setIsModalOpen(false);
      setIsModalOpenSuccess(true);
    } catch (error) {
      console.error("Error al eliminar la colmena:", error);
      setError("No se pudo eliminar la colmena.");
      setIsModalOpenError(true);
    }
  }

  // Acción "Ir" extracción
  const handleExtractionClick = async (rowData) => {
    setHasCreatedRecord(false)
    const recoleccionId = rowData[0]
    setSelectedRecoleccion(recoleccionId)
    setIsLoading(true)
    try {
      const response = await axiosInstance.get(`/Api/Extraction/GetExtractionByCollecDrone?id=${recoleccionId}`)
      if (response.status === 200) {
        const data = response.data.map((e) => [
          e.id_Extraction||"-",
          e.fec_Extraction? new Date(e.fec_Extraction).toLocaleDateString("es-CO"):"-",
          e.can_Extraction||"Sin estado",
          e.nam_Responsible||"-",
          e.id_CollecDrone||"-",
          e.id_Responsible||"-",
        ])
        setExtractionsData(data)
        if (data.length===0) {
          // Preparar datos para el formulario de extracción
          setExtractionData({
            id_Extraction: "",
            fec_Extraction: "",
            can_Extraction: "",
            id_CollecDrone: recoleccionId,
            id_Responsible: "",
          });
          
          // Cambiar a la vista de extracción y abrir el formulario
          setCurrentView(VIEW_EXTRACTION);
          setAction("Registrar");
          setButtonForm("Registrar");
          openModalForm(true)
        } else {
          setCurrentView(VIEW_EXTRACTION)
        }
      }
    } catch(e){ console.error(e); setError("No se pudo verificar extracciones."); setIsModalOpenError(true) }
    finally{ setIsLoading(false) }
  }

  // Acción "Ir" fertilización
  const handleFertilizationClick = async (rowData) => {
    setHasCreatedRecord(false)
    const extraccionId = rowData[0]
    setSelectedExtraccion(extraccionId)
    setIsLoading(true)
    try {
      const response = await axiosInstance.get(`/Api/Fertilization/GetFertilizationByExtraction?id=${extraccionId}`)
      if (response.status===200) {
        const data = response.data.map((f)=>[
          f.id_Fertilization||"-",
          f.fec_Fertilization? new Date(f.fec_Fertilization).toLocaleDateString("es-CO"):"-",
          f.can_Fertilization||"-",
          f.nam_Responsible||"-",
          f.id_Extraction||"-",
          f.id_Responsible||"-",
        ])
        setFertilizationData(data)
        if (data.length===0) {
          setFertilization({
            id_Fertilization: "",
            fec_Fertilization: "",
            can_Fertilization: "",
            id_Extraction: extraccionId,
            id_Responsible: "",
          });
          
          // Cambiar a la vista de fertilización y abrir el formulario
          setCurrentView(VIEW_FERTILIZATION);
          setAction("Registrar");
          setButtonForm("Registrar");
          openModalForm(true)
        } else {
          setCurrentView(VIEW_FERTILIZATION)
        }
      }
    } catch(e){ console.error(e); setError("No se pudo verificar fertilizaciones."); setIsModalOpenError(true) }
    finally{ setIsLoading(false) }
  }

  // Acciones tablas
  const actionsRecoleccion = 
  { delete: (r,i)=>{ setSelectedId(i+1); setIsModalOpen(true) }, 
  update:(r)=>{ updateTextTitleForm("Actualizar",r); openModalForm(true) }, custom:[{ name:"Extracción", action:handleExtractionClick }] }
  const actionsExtraccion   = 
  { delete: (r,i)=>{ setSelectedId(i+1); setIsModalOpen(true) }, 
  update:(r)=>{ updateTextTitleForm("Actualizar",r); openModalForm(true) }, custom:[{ name:"Fertilización", action:handleFertilizationClick }] }
  const actionsFertilizacion = 
  { delete:(r)=>{ setSelectedFertilization(r[0]); setIsModalOpen(true) }, 
  update:(r)=>{ updateTextTitleForm("Actualizar",r); openModalForm(true) } }

  const handleBackToMain       = () => setCurrentView(VIEW_MAIN)
  const handleBackToExtraction = () => setCurrentView(VIEW_EXTRACTION)

  const renderFormComponent = () => {
    if (currentView===VIEW_MAIN) 
      return <FormCollecDrone buttonForm={buttonForm} onDataUpdated={handleDataUpdated} closeModal={openModalForm} droneData={droneData} />
    if (currentView===VIEW_EXTRACTION) 
      return <FormExtraction buttonForm={buttonForm} extractionData={extractionData} onDataUpdated={handleDataUpdated} closeModal={openModalForm} recoleccionId={selectedRecoleccion} />
    if (currentView===VIEW_FERTILIZATION) 
      return <FormFertilization buttonForm={buttonForm} fertilization={fertilization} onDataUpdated={handleDataUpdated} closeModal={openModalForm} extraccionId={selectedExtraccion} />
    return null
  }

  return (
    <div className="flex h-screen bg-gray-200">
      <Siderbar />
      <div className="flex flex-col flex-1 overflow-hidden text-white">
        <NavPrivate TitlePage={ currentView===VIEW_MAIN ? "Recolección de Zanganos" : currentView===VIEW_EXTRACTION ? "Extracción de Semen" : "Fertilización" }/>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background">
          <div className="container mx-auto px-6 py-8 mt-10">
            <div className="rounded-lg border-2 bg-white text-card-foreground shadow-lg">
              <div className="relative p-6">
                {currentView!==VIEW_MAIN && (
                  <div className="mb-4">
                    <Button variant="ghost" size="sm" className="text-gray-700" onClick={currentView===VIEW_FERTILIZATION ? handleBackToExtraction : handleBackToMain}>
                      <ArrowLeft size={18} className="mr-2" />
                      {currentView===VIEW_FERTILIZATION ? "Volver a Extracción" : "Volver a Recolección"}
                    </Button>
                  </div>
                )}
                {currentView===VIEW_MAIN && 
                <ContentPage 
                  Data={registros} 
                  TitlesTable={titlesRecoleccion} 
                  Actions={actionsRecoleccion} 
                  action={action} 
                  updateTextTitleForm={updateTextTitleForm} 
                  openModalForm={openModalForm} 
                  ignorar={[]} 
                />}

                {currentView===VIEW_EXTRACTION && 
                <ContentPage 
                  Data={extractionsData} 
                  TitlesTable={titlesExtraccion} 
                  Actions={actionsExtraccion} 
                  action={action} 
                  updateTextTitleForm={updateTextTitleForm} 
                  openModalForm={openModalForm} 
                  ignorar={[]} 
                />}

                {currentView===VIEW_FERTILIZATION && 
                <ContentPage 
                  Data={fertilizationData} 
                  TitlesTable={titlesFertilizacion} 
                  Actions={actionsFertilizacion} 
                  action={action} 
                  updateTextTitleForm={updateTextTitleForm} 
                  openModalForm={openModalForm} 
                  ignorar={[]}
                />}
              </div>
            </div>
          </div>
        </main>
      </div>

      <ModalDialog 
      isOpen={isOpen} 
      setIsOpen={openModalForm} 
      FormPage={renderFormComponent()} 
      action={action} />

      <ConfirmationModal 
      isOpen={isModalOpen} 
      onClose={()=>setIsModalOpen(false)} 
      onConfirm={deleteFertilization} 
      DeleteTitle={eliminar} />

      <DynamicAlert 
      isOpen={isModalOpenSuccess} 
      onOpenChange={setIsModalOpenSuccess} 
      type="success" 
      message="Operación realizada con éxito" 
      redirectPath="" />

      <DynamicAlert 
      isOpen={isModalOpenError} 
      onOpenChange={setIsModalOpenError} 
      type="error" 
      message={error||"Ha ocurrido un error inesperado"} 
      redirectPath="" />
    </div>
  )
}

export default ColmenaRecoleccion;
