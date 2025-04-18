"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import ModalDialog from "./ModalDialog";
import { Search, Edit, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";


function DataTable({ Data, TitlesTable, Actions, updateTextTitleForm, openModalForm,ignorar}) {
    // console.log(Data)
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Filtrar los datos según el término de búsqueda
    const filteredData = Data.filter((row) =>
        row.some((cell) =>
            cell.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    // Paginación sobre los datos filtrados
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    // Cambiar el término de búsqueda
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Resetear la página a 1 cada vez que se realiza una búsqueda
    };

    // Cambiar de página
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

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
                            {TitlesTable.map((title, index) => (
                            //     <TableHead
                            //         key={index}
                            //         className="text-gray-600 font-medium bg-gray-100 table-head"
                            //     >
                            //         {title}
                            //     </TableHead>
                            // ))}
                            !ignorar.includes(index) && (
                                <TableHead
                                  key={index}
                                  className="text-gray-600 font-medium bg-gray-100 table-head"
                                >
                                  {title}
                                </TableHead>
                              )
                            ))}
                            {Actions && (
                                <TableHead className="text-gray-600 font-medium bg-gray-100 table-head">
                                    Acciones
                                </TableHead>
                            )}
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {currentItems.map((row, rowIndex) => (
                                //     <TableRow key={rowIndex}>
                                //     {row.map((cell, cellIndex) => (
                                //         <TableCell key={cellIndex} className="table-cell">
                                //             {cell}
                                //         </TableCell>
                                // ))}
                                <TableRow key={rowIndex}>
                                {row.map((cell, cellIndex) => (
                                  // Verificar si la columna debe ser visible
                                  !ignorar.includes(cellIndex) && (
                                    <TableCell key={cellIndex} className="table-cell">
                                      {cell}
                                    </TableCell>
                                  )
                                ))}
                                {Actions && (
                                    <TableCell className="table-cell">
                                        <div className="flex space-x-1">
                                            {Actions.update && (
            
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => {updateTextTitleForm("Actualizar", row); openModalForm(true)} }
                                                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 flex items-center gap-1 px-2 py-1 rounded-md"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                    <span></span>
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
                                                    <span></span>
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
                    Mostrando {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, filteredData.length)} de {filteredData.length} resultados
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
                        .filter(page => {
                            if (page === 1 || page === totalPages) return true;
                            if (page >= currentPage - 1 && page <= currentPage + 1) return true;
                            return false;
                        })
                        .map((page, index, array) => {
                            if (index > 0 && array[index - 1] !== page - 1) {
                                return [
                                    <span key={`ellipsis-${page}`} className="px-2">...</span>,
                                    <Button
                                        key={page}
                                        variant={currentPage === page ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => handlePageChange(page)}
                                        className={`min-w-[32px] ${currentPage === page
                                                ? "text-white bg-[#e87204] hover:bg-[#030712]"
                                                : ""
                                            }`}
                                    >
                                        {page}
                                    </Button>
                                ];
                            }
                            return (
                                <Button
                                    key={page}
                                    variant={currentPage === page ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => handlePageChange(page)}
                                    className={`min-w-[32px] ${currentPage === page
                                            ? "text-white bg-[#e87204] hover:bg-[#030712]"
                                            : ""
                                        }`}
                                >
                                    {page}
                                </Button>
                            );
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
    );
}

export default DataTable;
