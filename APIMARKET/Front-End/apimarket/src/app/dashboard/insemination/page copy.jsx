"use client"

import { useState } from "react"
import { Search, Edit, Trash2, ChevronLeft, ChevronRight, ArrowLeft, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import NavPrivate from "@/components/navs/NavPrivate"
import Siderbar from "@/components/navs/Siderbar"
// Definir las constantes para los tipos de vista
const VIEW_MAIN = "main"
const VIEW_EXTRACTION = "extraction"
const VIEW_FERTILIZATION = "fertilization"

// Definir las constantes para los tipos de modal
const MODAL_ADD = "add"
const MODAL_EDIT = "edit"

export default function ColmenaRecoleccion() {
  // Estado para los registros principales
  const [registros, setRegistros] = useState([
    {
      id: 1,
      fecha: "01/04/2025",
      cantidad: "2.5 kg",
      responsable: "Carlos Méndez",
      extraccion: true,
      fertiliza: false,
    },
    { id: 2, fecha: "03/04/2025", cantidad: "1.8 kg", responsable: "Ana López", extraccion: true, fertiliza: true },
  ])

  // Estado para los registros de extracción
  const [extractionData, setExtractionData] = useState([
    { id: 1, fec_extraction: "02/04/2025", can_extraction: "1.2 kg", responsable: "Carlos Méndez" },
    { id: 2, fec_extraction: "05/04/2025", can_extraction: "0.8 kg", responsable: "Ana López" },
  ])

  // Estado para los registros de fertilización
  const [fertilizationData, setFertilizationData] = useState([
    { id: 1, fec_fertilization: "03/04/2025", can_fertilization: "0.5 kg", responsable: "Carlos Méndez" },
    { id: 2, fec_fertilization: "06/04/2025", can_fertilization: "0.3 kg", responsable: "Ana López" },
  ])

  // Estado para controlar la vista actual
  const [currentView, setCurrentView] = useState(VIEW_MAIN)

  // Estado para controlar el modal
  const [modalType, setModalType] = useState(null)

  // Estados para los formularios
  const [mainForm, setMainForm] = useState({
    fecha: "",
    cantidad: "",
    responsable: "",
    extraccion: false,
    fertiliza: false,
  })

  const [extractionForm, setExtractionForm] = useState({
    fec_extraction: "",
    can_extraction: "",
    responsable: "",
  })

  const [fertilizationForm, setFertilizationForm] = useState({
    fec_fertilization: "",
    can_fertilization: "",
    responsable: "",
  })

  // Estado para el ID del registro seleccionado para editar
  const [selectedId, setSelectedId] = useState(null)

  // Función para manejar el clic en el botón "Ir" de extracción
  const handleExtractionClick = () => {
    setCurrentView(VIEW_EXTRACTION)
  }

  // Función para manejar el clic en el botón "Ir" de fertilización
  const handleFertilizationClick = () => {
    setCurrentView(VIEW_FERTILIZATION)
  }

  // Función para volver a la vista principal
  const handleBackToMain = () => {
    setCurrentView(VIEW_MAIN)
  }

  // Función para volver a la vista de extracción desde fertilización
  const handleBackToExtraction = () => {
    setCurrentView(VIEW_EXTRACTION)
  }

  // Función para abrir el modal de agregar
  const handleOpenAddModal = () => {
    setModalType(MODAL_ADD)

    // Resetear el formulario según la vista actual
    if (currentView === VIEW_MAIN) {
      setMainForm({
        fecha: "",
        cantidad: "",
        responsable: "",
        extraccion: false,
        fertiliza: false,
      })
    } else if (currentView === VIEW_EXTRACTION) {
      setExtractionForm({
        fec_extraction: "",
        can_extraction: "",
        responsable: "",
      })
    } else if (currentView === VIEW_FERTILIZATION) {
      setFertilizationForm({
        fec_fertilization: "",
        can_fertilization: "",
        responsable: "",
      })
    }
  }

  // Función para abrir el modal de editar
  const handleOpenEditModal = (id) => {
    setModalType(MODAL_EDIT)
    setSelectedId(id)

    // Cargar los datos del registro seleccionado según la vista actual
    if (currentView === VIEW_MAIN) {
      const record = registros.find((r) => r.id === id)
      if (record) {
        setMainForm({ ...record })
      }
    } else if (currentView === VIEW_EXTRACTION) {
      const record = extractionData.find((r) => r.id === id)
      if (record) {
        setExtractionForm({ ...record })
      }
    } else if (currentView === VIEW_FERTILIZATION) {
      const record = fertilizationData.find((r) => r.id === id)
      if (record) {
        setFertilizationForm({ ...record })
      }
    }
  }

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setModalType(null)
    setSelectedId(null)
  }

  // Función para guardar los cambios
  const handleSave = () => {
    if (currentView === VIEW_MAIN) {
      if (modalType === MODAL_ADD) {
        // Agregar nuevo registro
        const newRecord = {
          id: Math.max(0, ...registros.map((r) => r.id)) + 1,
          fecha: mainForm.fecha || "",
          cantidad: mainForm.cantidad || "",
          responsable: mainForm.responsable || "",
          extraccion: mainForm.extraccion || false,
          fertiliza: mainForm.fertiliza || false,
        }
        setRegistros([...registros, newRecord])
      } else if (modalType === MODAL_EDIT && selectedId) {
        // Actualizar registro existente
        setRegistros(registros.map((r) => (r.id === selectedId ? { ...r, ...mainForm, id: selectedId } : r)))
      }
    } else if (currentView === VIEW_EXTRACTION) {
      if (modalType === MODAL_ADD) {
        // Agregar nuevo registro de extracción
        const newRecord = {
          id: Math.max(0, ...extractionData.map((r) => r.id)) + 1,
          fec_extraction: extractionForm.fec_extraction || "",
          can_extraction: extractionForm.can_extraction || "",
          responsable: extractionForm.responsable || "",
        }
        setExtractionData([...extractionData, newRecord])
      } else if (modalType === MODAL_EDIT && selectedId) {
        // Actualizar registro de extracción existente
        setExtractionData(
          extractionData.map((r) => (r.id === selectedId ? { ...r, ...extractionForm, id: selectedId } : r)),
        )
      }
    } else if (currentView === VIEW_FERTILIZATION) {
      if (modalType === MODAL_ADD) {
        // Agregar nuevo registro de fertilización
        const newRecord = {
          id: Math.max(0, ...fertilizationData.map((r) => r.id)) + 1,
          fec_fertilization: fertilizationForm.fec_fertilization || "",
          can_fertilization: fertilizationForm.can_fertilization || "",
          responsable: fertilizationForm.responsable || "",
        }
        setFertilizationData([...fertilizationData, newRecord])
      } else if (modalType === MODAL_EDIT && selectedId) {
        // Actualizar registro de fertilización existente
        setFertilizationData(
          fertilizationData.map((r) => (r.id === selectedId ? { ...r, ...fertilizationForm, id: selectedId } : r)),
        )
      }
    }

    // Cerrar el modal
    handleCloseModal()
  }

  // Función para eliminar un registro
  const handleDelete = (id) => {
    if (currentView === VIEW_MAIN) {
      setRegistros(registros.filter((r) => r.id !== id))
    } else if (currentView === VIEW_EXTRACTION) {
      setExtractionData(extractionData.filter((r) => r.id !== id))
    } else if (currentView === VIEW_FERTILIZATION) {
      setFertilizationData(fertilizationData.filter((r) => r.id !== id))
    }
  }

  // Renderizar la vista principal
  const renderMainView = () => (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Recolección</h2>
        <div className="flex gap-2">
          <Button className="bg-[#f97316] hover:bg-[#ea580c]" onClick={handleOpenAddModal}>
            Agregar
          </Button>
          <Button className="bg-[#f97316] hover:bg-[#ea580c]">Exportar</Button>
        </div>
      </div>

      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input className="pl-10 bg-gray-50 border border-gray-200" placeholder="Buscar..." />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="px-4 py-3 text-sm font-medium text-gray-500">Fecha</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-500">Cantidad</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-500">Responsable</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-500">Extracción</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-500">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {registros.map((registro) => (
              <tr key={registro.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm">{registro.fecha}</td>
                <td className="px-4 py-3 text-sm">{registro.cantidad}</td>
                <td className="px-4 py-3 text-sm">{registro.responsable}</td>
                <td className="px-4 py-3 text-sm">
                  <Button size="sm" className="bg-[#f97316] hover:bg-[#ea580c]" onClick={handleExtractionClick}>
                    Ir
                  </Button>
                </td>
                <td className="px-4 py-3 text-sm">
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => handleOpenEditModal(registro.id)}
                    >
                      <Edit size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(registro.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-4 text-sm">
        <div className="text-gray-500">
          Mostrando 1 - {registros.length} de {registros.length} resultados
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" disabled>
            <ChevronLeft size={16} />
          </Button>
          <Button size="sm" className="bg-[#f97316] hover:bg-[#ea580c] min-w-8">
            1
          </Button>
          <Button variant="outline" size="sm" disabled>
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  )

  // Renderizar la vista de extracción
  const renderExtractionView = () => (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Button variant="ghost" size="sm" className="mr-2" onClick={handleBackToMain}>
            <ArrowLeft size={18} />
          </Button>
          <h2 className="text-xl font-semibold">Extracción</h2>
        </div>
        <div className="flex gap-2">
          <Button className="bg-[#f97316] hover:bg-[#ea580c]" onClick={handleOpenAddModal}>
            Agregar
          </Button>
          <Button className="bg-[#f97316] hover:bg-[#ea580c]">Exportar</Button>
        </div>
      </div>

      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input className="pl-10 bg-gray-50 border border-gray-200" placeholder="Buscar..." />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="px-4 py-3 text-sm font-medium text-gray-500">Fec_Extraction</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-500">Can_Extraction</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-500">Responsable</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-500">Fertilización</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-500">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {extractionData.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm">{item.fec_extraction}</td>
                <td className="px-4 py-3 text-sm">{item.can_extraction}</td>
                <td className="px-4 py-3 text-sm">{item.responsable}</td>
                <td className="px-4 py-3 text-sm">
                  <Button size="sm" className="bg-[#f97316] hover:bg-[#ea580c]" onClick={handleFertilizationClick}>
                    Ir
                  </Button>
                </td>
                <td className="px-4 py-3 text-sm">
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => handleOpenEditModal(item.id)}
                    >
                      <Edit size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(item.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-4 text-sm">
        <div className="text-gray-500">
          Mostrando 1 - {extractionData.length} de {extractionData.length} resultados
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" disabled>
            <ChevronLeft size={16} />
          </Button>
          <Button size="sm" className="bg-[#f97316] hover:bg-[#ea580c] min-w-8">
            1
          </Button>
          <Button variant="outline" size="sm" disabled>
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  )

  // Renderizar la vista de fertilización
  const renderFertilizationView = () => (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Button variant="ghost" size="sm" className="mr-2" onClick={handleBackToExtraction}>
            <ArrowLeft size={18} />
          </Button>
          <h2 className="text-xl font-semibold">Fertilización</h2>
        </div>
        <div className="flex gap-2">
          <Button className="bg-[#f97316] hover:bg-[#ea580c]" onClick={handleOpenAddModal}>
            Agregar
          </Button>
          <Button className="bg-[#f97316] hover:bg-[#ea580c]">Exportar</Button>
        </div>
      </div>

      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input className="pl-10 bg-gray-50 border border-gray-200" placeholder="Buscar..." />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="px-4 py-3 text-sm font-medium text-gray-500">Fec_Fertilization</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-500">Can_Fertilization</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-500">Responsable</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-500">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {fertilizationData.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm">{item.fec_fertilization}</td>
                <td className="px-4 py-3 text-sm">{item.can_fertilization}</td>
                <td className="px-4 py-3 text-sm">{item.responsable}</td>
                <td className="px-4 py-3 text-sm">
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => handleOpenEditModal(item.id)}
                    >
                      <Edit size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(item.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-4 text-sm">
        <div className="text-gray-500">
          Mostrando 1 - {fertilizationData.length} de {fertilizationData.length} resultados
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" disabled>
            <ChevronLeft size={16} />
          </Button>
          <Button size="sm" className="bg-[#f97316] hover:bg-[#ea580c] min-w-8">
            1
          </Button>
          <Button variant="outline" size="sm" disabled>
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  )

  // Renderizar el modal según la vista actual
  const renderModal = () => {
    const isOpen = modalType !== null
    const title = modalType === MODAL_ADD ? "Registrar" : "Actualizar"

    return (
      <Dialog open={isOpen} onOpenChange={(open) => !open && handleCloseModal()}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="relative">
            <button className="absolute right-0 top-0 p-2" onClick={handleCloseModal}>
              <X size={18} />
            </button>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>

          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-[#f97316] flex items-center justify-center text-white mr-3">
              <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-medium">Colmena</h3>
              <p className="text-sm text-gray-500">
                {currentView === VIEW_MAIN
                  ? "Ingrese los datos de la recolección"
                  : currentView === VIEW_EXTRACTION
                    ? "Ingrese los datos de la extracción"
                    : "Ingrese los datos de la fertilización"}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {currentView === VIEW_MAIN && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1">Fecha</label>
                  <Input
                    type="date"
                    value={mainForm.fecha}
                    onChange={(e) => setMainForm({ ...mainForm, fecha: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Cantidad</label>
                  <Input
                    placeholder="Ingrese la cantidad"
                    value={mainForm.cantidad}
                    onChange={(e) => setMainForm({ ...mainForm, cantidad: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Responsable</label>
                  <Input
                    placeholder="Ingrese el responsable"
                    value={mainForm.responsable}
                    onChange={(e) => setMainForm({ ...mainForm, responsable: e.target.value })}
                  />
                </div>
              </>
            )}

            {currentView === VIEW_EXTRACTION && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1">Fec_Extraction</label>
                  <Input
                    type="date"
                    value={extractionForm.fec_extraction}
                    onChange={(e) => setExtractionForm({ ...extractionForm, fec_extraction: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Can_Extraction</label>
                  <Input
                    placeholder="Ingrese la cantidad de extracción"
                    value={extractionForm.can_extraction}
                    onChange={(e) => setExtractionForm({ ...extractionForm, can_extraction: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Responsable</label>
                  <Input
                    placeholder="Ingrese el responsable"
                    value={extractionForm.responsable}
                    onChange={(e) => setExtractionForm({ ...extractionForm, responsable: e.target.value })}
                  />
                </div>
              </>
            )}

            {currentView === VIEW_FERTILIZATION && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1">Fec_Fertilization</label>
                  <Input
                    type="date"
                    value={fertilizationForm.fec_fertilization}
                    onChange={(e) => setFertilizationForm({ ...fertilizationForm, fec_fertilization: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Can_Fertilization</label>
                  <Input
                    placeholder="Ingrese la cantidad de fertilización"
                    value={fertilizationForm.can_fertilization}
                    onChange={(e) => setFertilizationForm({ ...fertilizationForm, can_fertilization: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Responsable</label>
                  <Input
                    placeholder="Ingrese el responsable"
                    value={fertilizationForm.responsable}
                    onChange={(e) => setFertilizationForm({ ...fertilizationForm, responsable: e.target.value })}
                  />
                </div>
              </>
            )}

            <div className="flex justify-end">
              <Button className="bg-[#f97316] hover:bg-[#ea580c]" onClick={handleSave}>
                {title}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  // Renderizar la vista correspondiente según el estado
  const renderCurrentView = () => {
    switch (currentView) {
      case VIEW_EXTRACTION:
        return renderExtractionView()
      case VIEW_FERTILIZATION:
        return renderFertilizationView()
      default:
        return renderMainView()
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
        <Siderbar/>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <NavPrivate/>

        {/* Content */}
        <main className="flex-1 p-6">
          {renderCurrentView()}
          {renderModal()}
        </main>
      </div>
    </div>
  )
}