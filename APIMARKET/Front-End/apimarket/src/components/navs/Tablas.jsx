"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Search,
  Edit,
  Trash2,
  Plus,
  RefreshCw,
  FileDown,
  FileUp,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data for demonstration
const initialData = [
  { id: 1, name: "Juan Pérez", role: "Apicultor", experience: "5 años" },
  { id: 2, name: "María García", role: "Técnico", experience: "3 años" },
  { id: 3, name: "Carlos Rodríguez", role: "Supervisor", experience: "7 años" },
  { id: 4, name: "Ana Martínez", role: "Apicultor", experience: "4 años" },
  { id: 5, name: "Luis Sánchez", role: "Técnico", experience: "6 años" },
  { id: 6, name: "Elena Gómez", role: "Supervisor", experience: "8 años" },
  { id: 7, name: "Pedro Ramírez", role: "Apicultor", experience: "2 años" },
  { id: 8, name: "Sofia Torres", role: "Técnico", experience: "5 años" },
  { id: 9, name: "Miguel Herrera", role: "Supervisor", experience: "9 años" },
  { id: 10, name: "Laura Díaz", role: "Apicultor", experience: "3 años" },
];

function Tablas() {
  const [data, setData] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleEdit = (id) => {
    console.log("Edit item with id:", id);
    // Implement edit functionality
  };

  const handleDelete = (id) => {
    console.log("Delete item with id:", id);
    // Implement delete functionality
  };

  const handleCreate = () => {
    console.log("Create new item");
    // Implement create functionality
  };

  const handleRefresh = () => {
    console.log("Refresh data");
    // Implement refresh functionality
  };

  const handleExport = (format) => {
    console.log("Export data as", format);
    // Implement export functionality
  };

  const handleImport = () => {
    console.log("Import data");
    // Implement import functionality
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="">

    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-2">Tabla de Responsables</h1>
      <div className="flex justify-between items-center mb-4">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={handleSearch}
            className="pl-8 pr-4 py-2 w-64"
          />
        </div>
        <div className="space-x-2">
          <Button onClick={handleCreate} variant="outline" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Crear
          </Button>
          <Button onClick={handleRefresh} variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Actualizar
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <FileDown className="w-4 h-4 mr-2" />
                Exportar
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleExport("pdf")}>
                Exportar como PDF
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport("svg")}>
                Exportar como SVG
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport("csv")}>
                Exportar como CSV
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button onClick={handleImport} variant="outline" size="sm">
            <FileUp className="w-4 h-4 mr-2" />
            Importar
          </Button>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Rol</TableHead>
            <TableHead>Experiencia</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.role}</TableCell>
              <TableCell>{item.experience}</TableCell>
              <TableCell className="text-right">
                <Button
                  onClick={() => handleEdit(item.id)}
                  variant="ghost"
                  size="sm"
                  className="mr-2"
                  >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  onClick={() => handleDelete(item.id)}
                  variant="ghost"
                  size="sm"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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
    </div>
            </div>
  );
}

export default Tablas;
