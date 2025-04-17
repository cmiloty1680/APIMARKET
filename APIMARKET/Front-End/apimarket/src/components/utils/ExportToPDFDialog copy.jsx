"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { jsPDF } from "jspdf"
import autoTable from "jspdf-autotable"
import { FileDown, Info, ChevronLeft, ChevronRight, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

function ExportToPDFDialog({ isOpen, setIsOpen, TitlePage, Data, TitlesTable, setIsExportModalOpen }) {
  const [orientation, setOrientation] = useState("portrait")
  const [currentPage, setCurrentPage] = useState(1)
  const [filterId, setFilterId] = useState("")
  const [isFiltered, setIsFiltered] = useState(false)

  // Número de registros por página en la vista previa
  const recordsPerPage = 5

  // Filtrar datos basados en el ID
  const filteredData = isFiltered && filterId ? Data.filter((row) => row[0].toString() === filterId.toString()) : Data

  // Calcular el número total de páginas
  const totalPages = Math.ceil(filteredData.length / recordsPerPage)

  // Obtener los registros para la página actual
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * recordsPerPage
    return filteredData.slice(startIndex, startIndex + recordsPerPage)
  }

  // Navegar a la página anterior
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  // Navegar a la página siguiente
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  // Función para applyFilter
  const applyFilter = () => {
    setIsFiltered(!!filterId)
    setCurrentPage(1) // Resetear a la primera página cuando se aplica un filtro
  }

  // Función para clearFilter
  const clearFilter = () => {
    setFilterId("")
    setIsFiltered(false)
    setCurrentPage(1)
  }

  // Función para exportar los datos a PDF
  const exportToPDF = () => {
    const doc = new jsPDF({
      orientation: orientation,
      unit: "mm",
      format: "a4",
    })

    const fileName = `${TitlePage.toLowerCase().replace(/\s+/g, "_")}_${isFiltered && filterId ? `id_${filterId}_` : ""}${new Date().toISOString().split("T")[0]}.pdf`

    // Si estamos filtrando por ID, usamos un formato optimizado para una sola página
    if (isFiltered && filterId && filteredData.length > 0) {
      exportFilteredPDF(doc, filteredData[0])
    } else {
      // Formato estándar para múltiples registros
      exportStandardPDF(doc)
    }

    // Descargar el PDF
    doc.save(fileName)
    setIsOpen(false)
  }

  // Función para exportar en formato optimizado para un solo registro (filtrado por ID)
  const exportFilteredPDF = (doc, record) => {
    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()

    // Encabezado con borde azul
    doc.setDrawColor(3, 7, 18)
    doc.setFillColor(3, 7, 18)
    doc.rect(0, 0, pageWidth, 15, "F")

    // Título principal
    doc.setFont("helvetica", "normal")
    doc.setFontSize(16)
    doc.setTextColor(255, 255, 255)
    doc.text(`${TitlePage} - ID: ${record[0]}`, pageWidth / 2, 10, { align: "center" })

    // Fecha en la esquina superior derecha
    doc.setFontSize(10)
    doc.setTextColor(80, 80, 80)
    doc.setFont("helvetica", "normal")
    doc.text(`Generado: ${new Date().toLocaleDateString()}`, pageWidth - 15, 25, { align: "right" })

    // Línea horizontal debajo del título
    doc.setDrawColor(200, 200, 200)
    doc.setLineWidth(0.5)
    doc.line(15, 30, pageWidth - 15, 30)

    // Título de la sección de detalles
    doc.setFontSize(14)
    doc.setTextColor(3, 7, 18)
    doc.setFont("helvetica", "bold")
    doc.text("Detalles del registro", 15, 40)

    // Configuración para los cuadros de datos
    const startY = 45
    const boxMargin = 5 // Margen entre cuadros
    const boxesPerRow = 3 // Número de cuadros por fila (aumentado a 3 para más compacto)
    const totalFields = Math.min(TitlesTable.length, record.length)

    // Calcular el ancho de cada cuadro basado en el ancho de página disponible
    const availableWidth = pageWidth - 30 - (boxesPerRow - 1) * boxMargin
    const boxWidth = availableWidth / boxesPerRow

    // Altura mínima del cuadro
    const minBoxHeight = 18

    // Colores y estilos
    const boxBorderColor = [220, 220, 220] // Color del borde
    const boxHeaderColor = [245, 247, 250] // Color del encabezado

    // Altura máxima disponible para los cuadros (restando encabezado, pie de página, etc.)
    const maxAvailableHeight = pageHeight - startY - 20

    // Calcular cuántas filas completas podemos tener en una página
    const maxRowsPerPage = Math.floor(maxAvailableHeight / (minBoxHeight + boxMargin))

    // Función para calcular la altura necesaria para un texto
    const calculateTextHeight = (text, width) => {
      const lines = doc.splitTextToSize(text, width - 6)
      return lines.length * 5 + 7 // 5 puntos por línea + margen
    }

    // Preparar datos para calcular alturas
    const fieldHeights = []
    for (let i = 0; i < totalFields; i++) {
      const title = TitlesTable[i]
      const value = String(record[i] || "")
      const textHeight = calculateTextHeight(value, boxWidth)
      fieldHeights.push(Math.max(minBoxHeight, textHeight))
    }

    // Dibujar cada campo en un cuadro individual
    let currentPage = 1
    let currentY = startY
    let maxRowHeight = 0

    for (let i = 0; i < totalFields; i++) {
      // Calcular posición del cuadro
      const col = i % boxesPerRow
      const row = Math.floor(i / boxesPerRow) % maxRowsPerPage

      // Si estamos empezando una nueva fila
      if (col === 0) {
        // Si no es la primera fila, actualizar currentY con la altura máxima de la fila anterior
        if (i > 0) {
          currentY += maxRowHeight + boxMargin
          maxRowHeight = 0
        }

        // Si estamos empezando una nueva página
        if (row === 0 && i > 0) {
          // Añadir nueva página
          doc.addPage()
          currentPage++

          // Dibujar encabezado en la nueva página
          doc.setDrawColor(3, 7, 18)
          doc.setFillColor(3, 7, 18)
          doc.rect(0, 0, pageWidth, 15, "F")

          doc.setFont("helvetica", "normal")
          doc.setFontSize(12)
          doc.setTextColor(255, 255, 255)
          doc.text(`${TitlePage} - ID: ${record[0]} (continuación)`, pageWidth / 2, 10, { align: "center" })

          // Resetear currentY para la nueva página
          currentY = 25
        }
      }

      const x = 15 + col * (boxWidth + boxMargin)
      const boxHeight = fieldHeights[i]

      // Actualizar la altura máxima de la fila actual si es necesario
      maxRowHeight = Math.max(maxRowHeight, boxHeight)

      // Dibujar el cuadro
      doc.setDrawColor(...boxBorderColor)
      doc.setLineWidth(0.3)
      doc.rect(x, currentY, boxWidth, boxHeight)

      // Dibujar el encabezado del cuadro
      doc.setFillColor(...boxHeaderColor)
      doc.rect(x, currentY, boxWidth, 7, "F")

      // Título del campo
      doc.setFont("helvetica", "bold")
      doc.setFontSize(9)
      doc.setTextColor(50, 50, 50)
      doc.text(TitlesTable[i], x + 3, currentY + 5)

      // Valor del campo
      doc.setFont("helvetica", "normal")
      doc.setFontSize(10)
      doc.setTextColor(0, 0, 0)

      // Manejar valores largos con saltos de línea
      const value = String(record[i] || "")
      const splitValue = doc.splitTextToSize(value, boxWidth - 6)
      doc.text(splitValue, x + 3, currentY + 12)
    }

    // Dibujar pie de página en todas las páginas
    for (let p = 1; p <= currentPage; p++) {
      doc.setPage(p)

      doc.setFillColor(245, 245, 245)
      doc.rect(0, pageHeight - 15, pageWidth, 15, "F")

      doc.setFontSize(8)
      doc.setTextColor(100, 100, 100)
      doc.text("API Market - Sistema de Gestión", 15, pageHeight - 8)

      const now = new Date()
      doc.text(`Exportado: ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`, pageWidth - 15, pageHeight - 8, {
        align: "right",
      })

      doc.text(`Página ${p} de ${currentPage}`, pageWidth / 2, pageHeight - 8, {
        align: "center",
      })
    }
  }

  // Función para exportar en formato estándar (múltiples registros)
  const exportStandardPDF = (doc) => {
    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()

    // Añadir borde decorativo en la parte superior
    doc.setDrawColor(3, 7, 18)
    doc.setFillColor(3, 7, 18)
    doc.rect(0, 0, pageWidth, 12, "F")

    // Título principal
    doc.setFont("helvetica", "normal")
    doc.setFontSize(22)
    doc.setTextColor(33, 33, 33)
    doc.text(TitlePage, pageWidth / 2, 25, { align: "center" })

    // Línea decorativa bajo el título
    doc.setDrawColor(3, 7, 18)
    doc.setLineWidth(0.5)
    doc.line(pageWidth * 0.2, 30, pageWidth * 0.8, 30)

    // Fecha y metadatos
    doc.setFontSize(10)
    doc.setTextColor(100, 100, 100)
    doc.setFont("helvetica", "normal")
    doc.text(`Generado: ${new Date().toLocaleDateString()}`, pageWidth - 20, 20, { align: "right" })

    // Información adicional (opcional)
    doc.setFontSize(11)
    doc.setTextColor(80, 80, 80)
    doc.text(`Total de registros: ${filteredData.length}`, 20, 40)

    // Mostrar información del filtro si está activo
    if (isFiltered && filterId) {
      doc.text(`Filtrado por ID: ${filterId}`, 20, 45)
    }

    const yPosition = isFiltered && filterId ? 55 : 50

    // Configuración de la tabla
    autoTable(doc, {
      head: [TitlesTable],
      body: filteredData,
      startY: yPosition,
      theme: "grid",
      headStyles: {
        fillColor: [3, 7, 18],
        textColor: [255, 255, 255],
        fontSize: 11,
        fontStyle: "bold",
        halign: "center",
        valign: "middle",
        cellPadding: 4,
        lineWidth: 0.2,
        lineColor: [220, 220, 220],
      },
      bodyStyles: {
        fontSize: 10,
        cellPadding: 4,
        valign: "middle",
        lineWidth: 0.1,
        lineColor: [240, 240, 240],
      },
      alternateRowStyles: {
        fillColor: [245, 247, 250],
      },
      columnStyles: {
        // Personalizar columnas específicas si es necesario
        0: { halign: "center", cellWidth: 15 }, // Código
      },
      margin: { top: 50, left: 15, right: 15, bottom: 25 },
      didDrawPage: (data) => {
        // Pie de página
        doc.setFillColor(245, 245, 245)
        doc.rect(0, pageHeight - 15, pageWidth, 15, "F")

        doc.setFontSize(8)
        doc.setTextColor(120, 120, 120)
        doc.text(`Página ${data.pageNumber} de ${doc.getNumberOfPages()}`, pageWidth / 2, pageHeight - 8, {
          align: "center",
        })

        // Información de la empresa en el pie de página
        doc.text("API Market - Sistema de Gestión", 15, pageHeight - 8)

        // Fecha y hora en el pie de página
        const now = new Date()
        doc.text(`Exportado: ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`, pageWidth - 15, pageHeight - 8, {
          align: "right",
        })

        // Volver a dibujar el encabezado en cada página
        if (data.pageNumber > 1) {
          doc.setDrawColor(41, 98, 255)
          doc.setFillColor(41, 98, 255)
          doc.rect(0, 0, pageWidth, 12, "F")

          doc.setFontSize(10)
          doc.setFont("helvetica", "bold")
          doc.setTextColor(255, 255, 255)
          doc.text(TitlePage, pageWidth / 2, 8, { align: "center" })
        }
      },
      didParseCell: (data) => {
        // Personalizar celdas específicas
        if (data.section === "body") {
          // Personalizar celdas que contienen fechas (asumiendo que las columnas 1 y 2 son fechas)
          if (data.column.index === 1 || data.column.index === 2) {
            data.cell.styles.halign = "center"
          }
        }
      },
    })
  }

  // Función para abreviar títulos largos en la vista previa
  const shortenTitle = (title, maxLength = 8) => {
    if (!title) return ""
    if (title.length <= maxLength) return title
    return title.substring(0, maxLength) + ".."
  }

  // Función para renderizar una versión simplificada de la vista previa
  const renderSimplifiedPreview = () => {
    // Seleccionar solo algunas columnas importantes para mostrar
    const keyColumns = [0, 1, 2, 3, 4, 5].filter((i) => i < TitlesTable.length) // Índices de las columnas a mostrar

    return (
      <div className="border rounded-md overflow-hidden">
        <div className="bg-[#030712] text-white p-2 text-center font-bold text-sm">{TitlePage}</div>
        <div className="p-1 text-right text-xs text-gray-500">
          Generado: {new Date().toLocaleDateString()}
          {isFiltered && filterId && <span className="ml-2">• Filtrado por ID: {filterId}</span>}
        </div>
        <div className="p-1 max-h-[300px] overflow-auto">
          {isFiltered && filterId && filteredData.length > 0 ? (
            // Vista previa para un solo registro filtrado
            <div className="space-y-3">
              <div className="bg-blue-50 p-2 rounded border border-blue-100">
                <h3 className="text-xs font-bold text-blue-800 mb-1">Detalles del registro ID: {filteredData[0][0]}</h3>
                <div className="grid grid-cols-2 gap-2 text-[9px]">
                  {TitlesTable.slice(0, 6).map((title, index) => (
                    <div key={index} className="flex">
                      <span className="font-bold text-blue-600 w-24">{title}:</span>
                      <span>{String(filteredData[0][index] || "")}</span>
                    </div>
                  ))}
                </div>
                {TitlesTable.length > 6 && (
                  <div className="text-[8px] text-gray-500 text-center mt-1">(El PDF mostrará todos los campos)</div>
                )}
              </div>
            </div>
          ) : (
            // Vista previa para múltiples registros
            <>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#030712] text-white text-[9px]">
                    {keyColumns.map((index) => (
                      <th key={index} className="border border-white-600 p-1 text-center">
                        {shortenTitle(TitlesTable[index], 8)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {getCurrentPageData().map((row, rowIndex) => (
                    <tr key={rowIndex} className={rowIndex % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                      {keyColumns.map((colIndex) => (
                        <td key={colIndex} className="border border-gray-200 p-1 text-[9px] text-center">
                          {typeof row[colIndex] === "string" ? shortenTitle(row[colIndex], 8) : row[colIndex]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Paginación */}
              {filteredData.length > recordsPerPage && (
                <div className="flex justify-between items-center mt-2 px-1">
                  <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className={`text-xs flex items-center ${currentPage === 1 ? "text-gray-400" : "text-[#030712]"}`}
                  >
                    <ChevronLeft className="h-3 w-3 mr-1" /> Anterior
                  </button>
                  <span className="text-xs text-gray-500">
                    Página {currentPage} de {totalPages}
                  </span>
                  <button
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className={`text-xs flex items-center ${currentPage === totalPages ? "text-gray-400" : "text-[#030712]"}`}
                  >
                    Siguiente <ChevronRight className="h-3 w-3 ml-1" />
                  </button>
                </div>
              )}
            </>
          )}

          <div className="text-center text-[9px] text-gray-500 mt-2">
            (Vista previa simplificada - El PDF incluirá todas las columnas)
          </div>
        </div>
        <div className="bg-gray-100 p-1 text-[9px] text-gray-500 flex justify-between">
          <span>API Market - Sistema de Gestión</span>
          <span>
            {isFiltered && filterId && filteredData.length > 0
              ? "Página 1 de 1"
              : `Página ${currentPage} de ${totalPages}`}
          </span>
        </div>
      </div>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-[95vw] sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl font-semibold text-center">Exportar a PDF</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="options" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="options">Opciones</TabsTrigger>
            <TabsTrigger value="preview">Vista Previa</TabsTrigger>
          </TabsList>

          <TabsContent value="options" className="py-3">
            <div className="space-y-3">
              <div className="bg-blue-50 p-3 rounded-md border border-blue-100">
                <div className="flex items-start">
                  <Info className="h-4 w-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                  <div>
                    <h3 className="text-xs sm:text-sm font-medium text-blue-800">Información del documento</h3>
                    <p className="text-xs text-blue-600 mt-1">
                      Se generará un PDF con los datos seleccionados. Puede personalizar algunas opciones antes de
                      exportar.
                    </p>
                  </div>
                </div>
              </div>

              {/* Filtro por ID */}
              <div className="space-y-2">
                <label className="text-xs sm:text-sm font-medium">Filtrar por ID:</label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={filterId}
                    onChange={(e) => setFilterId(e.target.value)}
                    placeholder="Ingrese ID"
                    className="flex-1 px-3 py-2 text-xs border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Button type="button" variant="default" className="text-xs h-9" onClick={applyFilter}>
                    <Search className="h-3 w-3 mr-1" />
                    Filtrar
                  </Button>
                  {isFiltered && (
                    <Button type="button" variant="outline" className="text-xs h-9" onClick={clearFilter}>
                      Limpiar
                    </Button>
                  )}
                </div>
                {isFiltered && filterId && (
                  <p className="text-xs text-green-600">
                    Mostrando {filteredData.length} registro(s) con ID: {filterId}
                  </p>
                )}
                {isFiltered && filterId && filteredData.length === 0 && (
                  <p className="text-xs text-red-600">No se encontraron registros con el ID especificado.</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 p-2 rounded-md border border-slate-100">
                  <p className="text-xs font-medium text-slate-500 mb-1">Título:</p>
                  <p className="text-xs sm:text-sm font-medium truncate">{TitlePage}</p>
                </div>

                <div className="bg-slate-50 p-2 rounded-md border border-slate-100">
                  <p className="text-xs font-medium text-slate-500 mb-1">Registros:</p>
                  <p className="text-xs sm:text-sm font-medium">
                    {filteredData.length} de {Data.length}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs sm:text-sm font-medium">Orientación de página:</label>
                <div className="flex space-x-2">
                  <Button
                    type="button"
                    variant={orientation === "portrait" ? "default" : "outline"}
                    className="flex-1 text-xs h-9"
                    onClick={() => setOrientation("portrait")}
                  >
                    Vertical
                  </Button>
                  <Button
                    type="button"
                    variant={orientation === "landscape" ? "default" : "outline"}
                    className="flex-1 text-xs h-9"
                    onClick={() => setOrientation("landscape")}
                  >
                    Horizontal
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="preview" className="py-3">
            {renderSimplifiedPreview()}
          </TabsContent>
        </Tabs>

        <div className="flex justify-between items-center pt-3 border-t">
          <Button variant="outline" onClick={() => setIsOpen(false)} className="text-xs h-9 px-3">
            Cancelar
          </Button>

          <Button onClick={exportToPDF} className="bg-blue-600 hover:bg-blue-700 text-white text-xs h-9 px-3">
            <FileDown className="mr-1 h-4 w-4" />
            Exportar PDF
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ExportToPDFDialog;