"use client"

import { useState, useEffect } from "react"
import { Button } from "../ui/button"
import { Search, Edit, Trash2, ChevronLeft, ChevronRight } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import axiosInstance from "@/lib/axiosInstance"

// Componente para mostrar el progreso en una celda de la tabla
function ProgressCell({ recordId }) {
  const [progress, setProgress] = useState({ completed: 1, total: 3, width: "33%" })

  useEffect(() => {
    async function checkRecordProgress() {
      try {
        // Siempre comenzamos con 1 (recolección)
        let completed = 1

        // Verificamos si existe extracción
        const hasExtraction = await checkExtractionExists(recordId)
        if (hasExtraction) {
          completed = 2

          // Solo verificamos fertilización si hay extracción
          const hasFertilization = await checkFertilizationExists(recordId)
          if (hasFertilization) {
            completed = 3
          }
        }

        setProgress({
          completed,
          total: 3,
          width: `${(completed / 3) * 100}%`,
        })
        if (completed === 3) {
          console.log("✅ Proceso completado: Recolección, extracción y fertilización finalizados.");
        }
        if(completed ===1){
          console.log("Solo lleva uno")
        }
        if(completed === 2){
          console.log("Solo lleva dos.")
        }
      } catch (error) {
        console.error("Error al verificar progreso:", error)
        // En caso de error, mostramos solo la recolección
        setProgress({
          completed: 1,
          total: 3,
          width: "33%",
        })
      }
    }

    checkRecordProgress()
  }, [recordId])

  async function checkExtractionExists(id) {
    try {
      const response = await axiosInstance.get(`/Api/Extraction/GetExtractionByCollecDrone?id=${id}`)
      
      return response.data && response.data.length > 0
    } catch (error) {
      console.error("Error al verificar extracción:", error)
      return false
    }
  }

  async function checkFertilizationExists(id) {
    try {
      // Primero obtenemos la extracción asociada a esta recolección
      const extractionResponse = await axiosInstance.get(`/Api/Extraction/GetExtractionByCollecDrone?id=${id}`)
      if (!extractionResponse.data || extractionResponse.data.length === 0) {
        return false // Si no hay extracción, no puede haber fertilización
      }

      // Obtenemos el ID de la extracción
      const extractionId = extractionResponse.data[0].id_Extraction

      // Verificamos si hay fertilización para esta extracción
      const fertilizationResponse = await axiosInstance.get(
        `/Api/Fertilization/GetFertilizationByExtraction?id=${extractionId}`,
      )
      console.log(fertilizationResponse.data); // Imprime el contenido de `data`
      return fertilizationResponse.data && fertilizationResponse.data.length > 0
      
    } catch (error) {
      console.error("Error al verificar fertilización:", error)
      return false
    }
  }

  return (
    <div className="w-full">
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div className="bg-black h-2.5 rounded-full" style={{ width: progress.width }}></div>
      </div>
      <div className="text-center text-sm text-blue-800 mt-1">
        {progress.completed}/{progress.total}
      </div>
    </div>
  )
}

function DataTable({ Data, TitlesTable, Actions, updateTextTitleForm, openModalForm, ignorar }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const sortedData = [...Data].sort((a, b) => {
    const idA = typeof a[0] === "number" ? a[0] : Number(a[0])
    const idB = typeof b[0] === "number" ? b[0] : Number(b[0])
    return idB - idA
  })

  const filteredData = sortedData.filter((row) =>
    row.some((cell) => cell.toString().toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem)

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)

  const idResponsableIndex = TitlesTable.findIndex((title) => title === "ID_Responsable")

  const titlesWithProgress = [...TitlesTable]
  if (idResponsableIndex !== -1) {
    titlesWithProgress.splice(idResponsableIndex + 1, 0, "Progreso")
  }

  return (
    <>
      <div className="relative mb-4">
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="pl-8 pr-4 py-2 w-64 "
        />
      </div>

      <div className="border border-gray-200 rounded-lg shadow-sm bg-white">
        <Table className="table">
          <TableHeader>
            <TableRow>
              {titlesWithProgress.map(
                (title, index) =>
                  !ignorar.includes(index) && (
                    <TableHead key={index} className="text-gray-600 font-medium bg-gray-100 table-head">
                      {title}
                    </TableHead>
                  ),
              )}
              {Actions && <TableHead className="text-gray-600 font-medium bg-gray-100 table-head">Acciones</TableHead>}
            </TableRow>
          </TableHeader>

          <TableBody>
            {currentItems.map((row, rowIndex) => {
              const rowWithProgress = [...row]
              if (idResponsableIndex !== -1 && idResponsableIndex < rowWithProgress.length) {
                rowWithProgress.splice(idResponsableIndex + 1, 0, "progress-cell")
              }

              return (
                <TableRow key={rowIndex}>
                  {rowWithProgress.map(
                    (cell, cellIndex) =>
                      !ignorar.includes(cellIndex) && (
                        <TableCell key={cellIndex} className="table-cell">
                          {cell === "progress-cell" ? (
                            <ProgressCell recordId={row[0]} />
                          ) : typeof cell === "string" &&
                            (cell.toLowerCase() === "activo" || cell.toLowerCase() === "inactivo") ? (
                            <span
                              className={`px-2 py-1 rounded-md text-xs font-medium ${
                                cell.toLowerCase() === "activo"
                                  ? "bg-green-100 text-green-800 border border-green-200"
                                  : "bg-red-100 text-red-800 border border-red-200"
                              }`}
                            >
                              {cell}
                            </span>
                          ) : (
                            cell
                          )}
                        </TableCell>
                      ),
                  )}

                  {Actions &&
                    Actions.custom &&
                    Actions.custom.some((customAction) =>
                      ["Extracción", "Fertilización"].includes(customAction.name),
                    ) && (
                      <TableCell className="table-cell">
                        {Actions.custom.map(
                          (customAction, index) =>
                            ["Extracción", "Fertilización"].includes(customAction.name) && (
                              <Button
                                key={index}
                                variant="ghost"
                                size="sm"
                                onClick={() => customAction.action(row, rowIndex)}
                                className="bg-green-100 text-green-800 border border-green-200"
                              >
                                Ir
                              </Button>
                            ),
                        )}
                      </TableCell>
                    )}

                  {Actions && (
                    <TableCell className="table-cell">
                      <div className="flex space-x-1">
                        {Actions.update && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              updateTextTitleForm("Actualizar", row)
                              openModalForm(true)
                            }}
                            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 flex items-center gap-1 px-2 py-1 rounded-md"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                        )}
                        {Actions.delete && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => Actions.delete(row)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 flex items-center gap-1 px-2 py-1 rounded-md"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-gray-700">
          Mostrando {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, filteredData.length)} de {filteredData.length}{" "}
          resultados
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-2"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="ml-1">Volver</span>
          </Button>

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter((page) => {
              if (page === 1 || page === totalPages) return true
              if (page >= currentPage - 1 && page <= currentPage + 1) return true
              return false
            })
            .map((page, index, array) => {
              if (index > 0 && array[index - 1] !== page - 1) {
                return [
                  <span key={`ellipsis-${page}`} className="px-2">
                    ...
                  </span>,
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePageChange(page)}
                    className={`min-w-[32px] ${currentPage === page ? "text-white bg-[#e87204] hover:bg-[#030712]" : ""}`}
                  >
                    {page}
                  </Button>,
                ]
              }
              return (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(page)}
                  className={`min-w-[32px] ${currentPage === page ? "text-white bg-[#e87204] hover:bg-[#030712]" : ""}`}
                >
                  {page}
                </Button>
              )
            })}

          <Button
            variant="ghost"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-2"
          >
            <span className="mr-1">Siguiente</span>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </>
  )
}

export default DataTable
;