"use client";

import { useState } from "react";
import { Button } from "../ui/button";
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

function DataTable({ Data, TitlesTable, Actions }) {
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
                    <TableHead
                        key={index}
                        className="text-gray-600 font-medium bg-gray-100 table-head"
                    >
                        {title}
                    </TableHead>
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
                <TableRow key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                        <TableCell key={cellIndex} className="table-cell">
                            {cell}
                        </TableCell>
                    ))}
                    {Actions && (
                        <TableCell className="table-cell">
                            <div className="flex space-x-1">
                                {Actions.update && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => Actions.update(row)}
                                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 flex items-center gap-1 px-2 py-1 rounded-md"
                                    >
                                        <Edit className="w-4 h-4" />
                                        <span>Editar</span>
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
                                        <span>Eliminar</span>
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
                <div>
                    Mostrando {indexOfFirstItem + 1} -{" "}
                    {Math.min(indexOfLastItem, filteredData.length)} de {filteredData.length}{" "}
                    resultados
                </div>
                <div className="flex space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </Button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <Button
                            key={page}
                            variant={currentPage === page ? "default" : "outline"}
                            size="sm"
                            onClick={() => handlePageChange(page)}
                            className="text-white bg-[#e87204] hover:bg-[#030712] focus:outline-none hover:text-white focus:ring-primary"

                        >
                            {page}
                        </Button>
                    ))}
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        <ChevronRight className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </>
    );
}

export default DataTable;