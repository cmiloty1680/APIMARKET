"use client"

import { useState } from "react"
import PublicNav from "@/components/navs/PublicNav"
import { FileText, Download, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const documentos = [
  {
    id: "manual-tecnico",
    title: "Manual Técnico",
    description:
      "Este manual técnico documenta en detalle todas las actividades realizadas durante el desarrollo del proyecto.",
    file: "/assets/docs/APIMARKET.pdf",
    icon: <FileText className="h-10 w-10 text-yellow-500" />,
  },
  {
    id: "manual-usuario",
    title: "Manual de Usuario",
    description: "Guía completa para el uso correcto de todas las funcionalidades del sistema.",
    file: "/assets/docs/APIMARKET.pdf", // Usar el mismo archivo como ejemplo
    icon: <FileText className="h-10 w-10 text-blue-500" />,
  },
]

const Documentacion = () => {
  const [activeDoc, setActiveDoc] = useState(documentos[0])
  const [zoom, setZoom] = useState(100)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(34) // Valor predeterminado basado en la imagen

  const handleZoomIn = () => {
    if (zoom < 200) setZoom(zoom + 10)
  }

  const handleZoomOut = () => {
    if (zoom > 50) setZoom(zoom - 10)
  }

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
  }

  return (
    <>
      <PublicNav />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Encabezado */}
        <div className="bg-primary/5 from-gray-400 to-gray-500 py-12">
          <div className="max-w-6xl mx-auto px-4">
            <h1 className="text-4xl font-bold md:text-5xl sm:text-5xl xl:text-4xl/none mb-2">Documentación</h1>
            <p className="text-gray-500 max-w-2xl">
              Accede a todos los documentos técnicos y manuales de usuario del proyecto APIMARKET
            </p>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Barra lateral con lista de documentos */}
            <div className="lg:w-1/4">
              <div className="bg-white rounded-xl shadow-sm p-4 sticky top-4">
                <h2 className="text-lg font-semibold mb-4 text-gray-800">Documentos disponibles</h2>

                <div className="space-y-3">
                  {documentos.map((doc) => (
                    <div
                      key={doc.id}
                      className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                        activeDoc.id === doc.id ? "bg-yellow-50 border border-yellow-200" : "hover:bg-gray-50"
                      }`}
                      onClick={() => setActiveDoc(doc)}
                    >
                      {doc.icon}
                      <div>
                        <h3 className="font-medium">{doc.title}</h3>
                        <p className="text-sm text-gray-500 line-clamp-2">{doc.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Área principal de visualización */}
            <div className="lg:w-3/4">
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                {/* Encabezado del documento */}
                <div className="bg-gray-100 p-4 border-b">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-bold text-gray-800">{activeDoc.title}</h2>
                      <p className="text-sm text-gray-600">{activeDoc.description}</p>
                    </div>
                    {/* <Button variant="outline" className="flex items-center gap-2 self-start">
                      <Download className="h-4 w-4" />
                      <span>Descargar</span>
                    </Button> */}
                  </div>
                </div>

                {/* Controles del visor */}
                <div className="bg-gray-800 text-white p-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-300 hover:text-white hover:bg-gray-700"
                      onClick={handlePrevPage}
                      disabled={currentPage <= 1}
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <span className="text-sm">
                      Página {currentPage} de {totalPages}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-300 hover:text-white hover:bg-gray-700"
                      onClick={handleNextPage}
                      disabled={currentPage >= totalPages}
                    >
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-300 hover:text-white hover:bg-gray-700"
                      onClick={handleZoomOut}
                      disabled={zoom <= 50}
                    >
                      <ZoomOut className="h-5 w-5" />
                    </Button>
                    <span className="text-sm">{zoom}%</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-300 hover:text-white hover:bg-gray-700"
                      onClick={handleZoomIn}
                      disabled={zoom >= 200}
                    >
                      <ZoomIn className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                {/* Visor de PDF */}
                <div className="bg-gray-900 flex justify-center">
                  <iframe
                    src={`${activeDoc.file}#page=${currentPage}&zoom=${zoom}`}
                    title={activeDoc.title}
                    className="w-full h-[700px] border-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Documentacion;