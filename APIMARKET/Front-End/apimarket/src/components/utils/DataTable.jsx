"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { Search, Edit, Trash2, ChevronLeft, ChevronRight, CheckCircle2, XCircle } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"

function DataTable({ Data, TitlesTable, Actions, updateTextTitleForm, openModalForm, ignorar }) {
  console.log(Data)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Ordenar los datos por ID en orden descendente
  // Asumiendo que el ID está en la primera posición (índice 0) de cada fila
  const sortedData = [...Data].sort((a, b) => {
    // Convertir a número si es posible, para asegurar ordenamiento numérico correcto
    const idA = typeof a[0] === "number" ? a[0] : Number(a[0])
    const idB = typeof b[0] === "number" ? b[0] : Number(b[0])

    // Orden descendente (de mayor a menor)
    return idB - idA
  })

  // Filtrar los datos según el término de búsqueda
  const filteredData = sortedData.filter((row) =>
    row.some((cell) => cell.toString().toLowerCase().includes(searchTerm.toLowerCase())),
  )

  // Paginación sobre los datos filtrados
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem)

  // Cambiar el término de búsqueda
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1) // Resetear la página a 1 cada vez que se realiza una búsqueda
  }

  // Cambiar de página
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)

  return (
    <>

      <div className="border border-gray-200 rounded-lg shadow-sm bg-white">
        <Table className="table">
          <TableHeader>
            <TableRow>
              {TitlesTable.map(
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
            {currentItems.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {row.map(
                  (cell, cellIndex) =>
                    !ignorar.includes(cellIndex) && (
                      <TableCell key={cellIndex} className="table-cell">
                        {typeof cell === "string" &&
                          (cell.toLowerCase() === "activo" || cell.toLowerCase() === "inactivo") ? (
                          <div
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${cell.toLowerCase() === "activo"
                                ? "bg-green-50 text-green-700 border border-green-200"
                                : "bg-red-50 text-red-700 border border-red-200"
                              }`}
                          >
                            {cell.toLowerCase() === "activo" ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                            ) : (
                              <XCircle className="w-3.5 h-3.5 text-red-500" />
                            )}
                            <span>{cell}</span>
                          </div>
                        ) : (
                          cell
                        )}
                      </TableCell>
                    ),
                )}

                {/* Botón "Ir" en celda separada */}
                {/* Celda "Ir" solo cuando haya una acción asociada */}
                {Actions && (
                  Actions.custom &&
                  Actions.custom.some(customAction =>
                    ["Extracción", "Fertilización"].includes(customAction.name)
                  ) && (
                    <TableCell className="table-cell">
                      {Actions.custom.map((customAction, index) =>
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
                        )
                      )}
                    </TableCell>
                  )
                )}

                {/* Botones de editar y eliminar */}
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

            ))}
          </TableBody>
        </Table>
      </div>

      {/* Paginación */}
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
                    className={`min-w-[32px] ${currentPage === page ? "text-white bg-[#e87204] hover:bg-[#030712]" : ""
                      }`}
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

export default DataTable;