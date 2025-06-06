"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { jsPDF } from "jspdf"
import autoTable from "jspdf-autotable"
import { FileDown, Info, ChevronLeft, ChevronRight, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

function ExportToPDFDialog({ isOpen, setIsOpen, TitlePage, Data, TitlesTable, setIsExportModalOpen }) {
  // Modificar las declaraciones de estado para usar useEffect y reiniciar cuando cambia isOpen
  const [orientation, setOrientation] = useState("portrait")
  const [currentPage, setCurrentPage] = useState(1)
  const [filterId, setFilterId] = useState("")
  const [isFiltered, setIsFiltered] = useState(false)

  // Añadir este useEffect para reiniciar los estados cuando se abre el diálogo
  useEffect(() => {
    if (isOpen) {
      // Reiniciar todos los estados cuando se abre el diálogo
      setFilterId("")
      setIsFiltered(false)
      setCurrentPage(1)
      setOrientation("portrait")
    }
  }, [isOpen])

  // Añadir estas constantes al inicio del componente, justo después de las declaraciones de estado
  const MAX_SAFE_RECORDS = 500 // Límite recomendado de registros para exportación segura
  const MAX_ABSOLUTE_RECORDS = 1000 // Límite absoluto de registros

  // Número de registros por página en la vista previa
  const recordsPerPage = 5

  // Filtrar datos basados en el ID
  const filteredData = isFiltered && filterId ? Data.filter((row) => row[0].toString() === filterId.toString()) : Data

  // Verificar si hay demasiados registros para exportar
  const hasTooManyRecords = filteredData.length > MAX_SAFE_RECORDS
  const exceedsAbsoluteLimit = filteredData.length > MAX_ABSOLUTE_RECORDS

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

  // Modificar la función exportToPDF para incluir la verificación de límites
  const exportToPDF = () => {
    // Si excede el límite absoluto, mostrar error y no permitir exportación
    if (exceedsAbsoluteLimit) {
      alert(
        `No es posible exportar más de ${MAX_ABSOLUTE_RECORDS} registros. Por favor, aplique filtros para reducir la cantidad de datos.`,
      )
      return
    }

    // Si excede el límite recomendado pero confirma, proceder
    if (hasTooManyRecords) {
      const confirm = window.confirm(
        `Está intentando exportar ${filteredData.length} registros, lo que podría generar un PDF muy grande y afectar el rendimiento. ¿Desea continuar de todos modos?\n\nSe recomienda filtrar los datos o exportar en lotes más pequeños.`,
      )
      if (!confirm) return
    }

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

// Modificar la función exportFilteredPDF para usar el estilo de factura
const exportFilteredPDF = (doc, record) => {
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const margin = 15

  // Configuración de fuentes y colores
  const primaryColor = [51, 51, 51] // Color de texto principal
  const secondaryColor = [120, 120, 120] // Color de texto secundario
  const borderColor = [221, 221, 221] // Color de bordes

  // ENCABEZADO
  // Título principal (equivalente a APICULTURA en el ejemplo)
  doc.setFont("helvetica", "bold")
  doc.setFontSize(24)
  doc.setTextColor(...primaryColor)
  doc.text(TitlePage.toUpperCase(), margin, 30)

  // Número de registro (equivalente a Invoice #INV-2024-001)
  doc.setFont("helvetica", "normal")
  doc.setFontSize(14)
  doc.setTextColor(...secondaryColor)
  doc.text(`ID: ${record[0]}`, margin, 40)

  // Información de la empresa (lado derecho)
  doc.setFont("helvetica", "bold")
  doc.setFontSize(12)
  doc.setTextColor(...primaryColor)
  doc.text("API Market", pageWidth - margin, 30, { align: "right" })

  doc.setFont("helvetica", "normal")
  doc.setFontSize(10)
  doc.setTextColor(...secondaryColor)
  doc.text("Sistema de Gestión", pageWidth - margin, 37, { align: "right" })
  doc.text(`Generado: ${new Date().toLocaleDateString()}`, pageWidth - margin, 44, { align: "right" })

  // DETALLES DEL REGISTRO (equivalente a Bill To:)
  doc.setFont("helvetica", "bold")
  doc.setFontSize(12)
  doc.setTextColor(...primaryColor)
  doc.text("Detalles del registro:", margin, 60)

  // Crear una tabla con los datos principales (primeras 4-6 columnas)
  const mainFields = Math.min(6, TitlesTable.length)
  const mainData = []

  for (let i = 0; i < mainFields; i++) {
    if (i === 0) continue // Saltamos el ID que ya se muestra en el encabezado
    mainData.push([TitlesTable[i], record[i] || ""])
  }

  // Tabla de datos principales
  autoTable(doc, {
    startY: 65,
    head: [],
    body: mainData,
    theme: "plain",
    styles: {
      fontSize: 10,
      cellPadding: 4,
    },
    columnStyles: {
      0: { fontStyle: "bold", cellWidth: 60 },
      1: { cellWidth: 100 },
    },
    margin: { left: margin },
  })

  // Calcular la posición Y después de la tabla de datos principales
  const finalY = doc.lastAutoTable.finalY + 15

  // TABLA PRINCIPAL DE DATOS (resto de campos)
  // Determinar qué campos mostrar en la tabla principal
  // Excluimos los campos ya mostrados en la sección de detalles
  const remainingFields = []
  const remainingTitles = []

  for (let i = mainFields; i < TitlesTable.length; i++) {
    remainingTitles.push(TitlesTable[i])
    remainingFields.push(record[i] || "")
  }

  // Si hay campos restantes, mostrarlos en una tabla
  if (remainingFields.length > 0) {
    doc.setFont("helvetica", "bold")
    doc.setFontSize(12)
    doc.setTextColor(...primaryColor)
    doc.text("Información adicional:", margin, finalY)

    autoTable(doc, {
      startY: finalY + 5,
      head: [remainingTitles],
      body: [remainingFields],
      theme: "grid",
      headStyles: {
        fillColor: [250, 250, 250],
        textColor: primaryColor,
        fontStyle: "bold",
        halign: "left",
        valign: "middle",
      },
      bodyStyles: {
        halign: "left",
      },
      alternateRowStyles: {
        fillColor: [255, 255, 255],
      },
      margin: { left: margin, right: margin },
    })
  }

  // PIE DE PÁGINA
  doc.setFontSize(8)
  doc.setTextColor(...secondaryColor)
  doc.text("API Market - Sistema de Gestión", margin, pageHeight - 10)
  doc.text(`Página 1 de 1`, pageWidth / 2, pageHeight - 10, { align: "center" })
  doc.text(
    `Exportado: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
    pageWidth - margin,
    pageHeight - 10,
    { align: "right" },
  )
}

// Modificar la función exportStandardPDF para usar el estilo de factura
const exportStandardPDF = (doc) => {
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const margin = 15

  // Configuración de fuentes y colores
  const primaryColor = [51, 51, 51] // Color de texto principal
  const secondaryColor = [120, 120, 120] // Color de texto secundario

  // ENCABEZADO
  // Título principal (equivalente a APICULTURA en el ejemplo)
  doc.setFont("helvetica", "bold")
  doc.setFontSize(24)
  doc.setTextColor(...primaryColor)
  doc.text(TitlePage.toUpperCase(), margin, 30)

  // Subtítulo (equivalente a Invoice #INV-2024-001)
  doc.setFont("helvetica", "normal")
  doc.setFontSize(14)
  doc.setTextColor(...secondaryColor)
  doc.text(`Registros: ${filteredData.length}`, margin, 40)

  // Información de la empresa (lado derecho)
  doc.setFont("helvetica", "bold")
  doc.setFontSize(12)
  doc.setTextColor(...primaryColor)
  doc.text("API Market", pageWidth - margin, 30, { align: "right" })

  doc.setFont("helvetica", "normal")
  doc.setFontSize(10)
  doc.setTextColor(...secondaryColor)
  doc.text("Sistema de Gestión", pageWidth - margin, 37, { align: "right" })
  doc.text(`Generado: ${new Date().toLocaleDateString()}`, pageWidth - margin, 44, { align: "right" })

  // Información del filtro (si está activo)
  let startY = 60
  if (isFiltered && filterId) {
    doc.setFont("helvetica", "bold")
    doc.setFontSize(12)
    doc.setTextColor(...primaryColor)
    doc.text("Filtrado por:", margin, startY)

    doc.setFont("helvetica", "normal")
    doc.setFontSize(10)
    doc.text(`ID: ${filterId}`, margin + 30, startY)

    startY += 15
  }

  // TABLA PRINCIPAL DE DATOS
  // Calcular anchos de columna óptimos
  const columnWidths = {}

  // Función para medir el ancho del texto
  const getTextWidth = (text, fontSize) => {
    doc.setFontSize(fontSize)
    return doc.getTextWidth(String(text))
  }

  // Analizar los encabezados
  TitlesTable.forEach((title, index) => {
    columnWidths[index] = getTextWidth(title, 11) + 8 // Ancho del título + padding
  })

  // Analizar los datos (muestreo de hasta 20 filas para rendimiento)
  const sampleSize = Math.min(filteredData.length, 20)
  for (let i = 0; i < sampleSize; i++) {
    const row = filteredData[i]
    row.forEach((cell, index) => {
      const cellWidth = getTextWidth(cell, 10) + 8
      columnWidths[index] = Math.max(columnWidths[index] || 0, cellWidth)
    })
  }

  // Limitar anchos máximos y mínimos
  Object.keys(columnWidths).forEach((key) => {
    const index = Number.parseInt(key)
    // Ancho mínimo de 15mm para la columna ID
    if (index === 0) {
      columnWidths[index] = Math.max(15, Math.min(25, columnWidths[index]))
    } else {
      // Para otras columnas, limitar entre 20mm y 40mm
      columnWidths[index] = Math.max(20, Math.min(40, columnWidths[index]))
    }
  })

  // Configuración de la tabla con estilo de factura
  autoTable(doc, {
    head: [TitlesTable],
    body: filteredData,
    startY: startY,
    theme: "grid",
    headStyles: {
      fillColor: [250, 250, 250],
      textColor: primaryColor,
      fontStyle: "bold",
      halign: "left",
      valign: "middle",
      cellPadding: 6,
      lineWidth: 0.2,
      lineColor: [220, 220, 220],
    },
    bodyStyles: {
      fontSize: 10,
      cellPadding: 6,
      valign: "middle",
      lineWidth: 0.1,
      lineColor: [240, 240, 240],
    },
    alternateRowStyles: {
      fillColor: [255, 255, 255],
    },
    columnStyles: columnWidths,
    margin: { top: 50, left: margin, right: margin, bottom: 25 },
    didDrawPage: (data) => {
      // Pie de página
      doc.setFontSize(8)
      doc.setTextColor(...secondaryColor)
      doc.text(`Página ${data.pageNumber} de ${doc.getNumberOfPages()}`, pageWidth / 2, pageHeight - 10, {
        align: "center",
      })

      // Información de la empresa en el pie de página
      doc.text("API Market - Sistema de Gestión", margin, pageHeight - 10)

      // Fecha y hora en el pie de página
      const now = new Date()
      doc.text(
        `Exportado: ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`,
        pageWidth - margin,
        pageHeight - 10,
        {
          align: "right",
        },
      )

      // Volver a dibujar el encabezado en cada página después de la primera
      if (data.pageNumber > 1) {
        doc.setFont("helvetica", "bold")
        doc.setFontSize(14)
        doc.setTextColor(...primaryColor)
        doc.text(TitlePage.toUpperCase(), margin, 20)

        doc.setFont("helvetica", "normal")
        doc.setFontSize(10)
        doc.setTextColor(...secondaryColor)
        doc.text(`Página ${data.pageNumber}`, pageWidth - margin, 20, { align: "right" })
      }
    },
    didParseCell: (data) => {
      // Personalizar celdas específicas
      if (data.section === "body") {
        // Alinear a la izquierda la primera columna (generalmente ID)
        if (data.column.index === 0) {
          data.cell.styles.halign = "left"
          data.cell.styles.fontStyle = "bold"
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
                {hasTooManyRecords && (
                  <div
                    className={`p-3 rounded-md border ${exceedsAbsoluteLimit ? "bg-red-50 border-red-100" : "bg-amber-50 border-amber-100"}`}
                  >
                    <div className="flex items-start">
                      <Info
                        className={`h-4 w-4 mt-0.5 mr-2 flex-shrink-0 ${exceedsAbsoluteLimit ? "text-red-500" : "text-amber-500"}`}
                      />
                      <div>
                        <h3
                          className={`text-xs sm:text-sm font-medium ${exceedsAbsoluteLimit ? "text-red-800" : "text-amber-800"}`}
                        >
                          {exceedsAbsoluteLimit ? "Demasiados registros para exportar" : "Advertencia de rendimiento"}
                        </h3>
                        <p className={`text-xs mt-1 ${exceedsAbsoluteLimit ? "text-red-600" : "text-amber-600"}`}>
                          {exceedsAbsoluteLimit
                            ? `No es posible exportar más de ${MAX_ABSOLUTE_RECORDS} registros. Por favor, aplique filtros para reducir la cantidad de datos.`
                            : `Está intentando exportar ${filteredData.length} registros, lo que podría generar un PDF muy grande y afectar el rendimiento. Se recomienda filtrar los datos o exportar en lotes más pequeños.`}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
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
                {TitlesTable.length > 7 && orientation === "portrait" && (
                  <p className="text-xs text-amber-600 mt-1">
                    <Info className="h-3 w-3 inline mr-1" />
                    Se recomienda usar orientación horizontal para tablas con muchas columnas. El sistema cambiará
                    automáticamente si es necesario.
                  </p>
                )}
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

          <Button
            onClick={exportToPDF}
            disabled={exceedsAbsoluteLimit}
            className={`${exceedsAbsoluteLimit ? "bg-gray-400 hover:bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"} text-white text-xs h-9 px-3`}
          >
            <FileDown className="mr-1 h-4 w-4" />
            Exportar PDF
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ExportToPDFDialog;
