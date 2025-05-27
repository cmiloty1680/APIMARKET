"use client";

import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input"; // Asegúrate de importar el input si es de shadcn/ui
import { Search, FileText, FileDown, FileCode2, PlusCircle } from "lucide-react";
import DataTable from "./DataTable";
import * as XLSX from "xlsx";
import { Database } from "lucide-react";

function ContentPage({
  TitlePage,
  Data,
  TitlesTable = [],
  Actions,
  updateTextTitleForm,
  openModalForm,
  setIsExportModalOpen,
  tableName,
  showAddButton,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(Data);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredData(Data);
    } else {
      const lowerTerm = searchTerm.toLowerCase();
      const filtered = Data.filter((row) =>
        row.some((cell) => cell?.toString().toLowerCase().includes(lowerTerm))
      );
      setFilteredData(filtered);
    }
  }, [searchTerm, Data]);

  const exportToXLSX = (data, headers) => {
    const confirmExport = window.confirm("¿Desea descargar los datos en formato EXCEL?");
    if (!confirmExport) return;

    try {
      const formattedData = data.map((row) =>
        row.map((cell) => {
          if (cell instanceof Date) return cell.toLocaleDateString();
          if (typeof cell === "number") return cell;
          return cell;
        })
      );

      const wsData = [headers, ...formattedData];
      const ws = XLSX.utils.aoa_to_sheet(wsData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Datos");
      XLSX.writeFile(wb, `${tableName || "Datos"}.xlsx`);
    } catch (error) {
      console.error("Error al exportar a XLSX:", error);
    }
  };

  const exportToSQL = (data, headers, tableName) => {
    if (!tableName) {
      alert("No se proporcionó el nombre de la tabla.");
      return;
    }

    const confirmExport = window.confirm("¿Desea descargar los datos en formato SQL?");
    if (!confirmExport) return;

    try {
      data.sort((a, b) => new Date(a["Fecha de alimentación"]) - new Date(b["Fecha de alimentación"]));

      let sqlContent = "-- Archivo generado automáticamente\n\n";

      data.forEach((row) => {
        const values = row
          .map((value) => (typeof value === "string" ? `'${value.replace(/'/g, "''")}'` : value))
          .join(", ");

        sqlContent += `INSERT INTO \`${tableName}\` (${headers.map((h) => `\`${h}\``).join(", ")}) VALUES (${values});\n`;
      });

      const blob = new Blob([sqlContent], { type: "text/sql;charset=utf-8;" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.setAttribute("download", `${tableName}.sql`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error al exportar a SQL:", error);
    }
  };
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
    // setCurrentPage(1) // Resetear la página a 1 cada vez que se realiza una búsqueda
  }

  return (
    <div className="w-full">
      {/* Barra superior: Buscador + Botones */}
      <div className="flex justify-between items-center flex-wrap gap-3 mb-5">
        {/* Buscador */}
        <div className="relative mb-4">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="pl-8 pr-4 py-2 w-64 border border-gray-400 focus:border-gray-500 focus:outline-none rounded-md"
          />
        </div>



        {/* Botones */}
        <div className="flex items-center gap-3 flex-wrap">
          <div
            className="h-10 flex items-center space-x-1 bg-red-100 text-red-600 px-4 rounded-xl shadow-sm hover:bg-red-200 transition cursor-pointer"
            onClick={() => setIsExportModalOpen(true)}
          >
            <FileText size={20} />
            <span className="text-sm font-semibold">PDF</span>
          </div>

          <div
            className="h-10 flex items-center space-x-1 bg-green-100 text-green-600 px-4 rounded-xl shadow-sm hover:bg-green-200 transition cursor-pointer"
            onClick={() => exportToXLSX(filteredData, TitlesTable)}
          >
            <FileDown size={20} />
            <span className="text-sm font-semibold">XLSX</span>
          </div>

          <div
            className="h-10 flex items-center space-x-1 bg-blue-100 text-blue-600 px-4 rounded-xl shadow-sm hover:bg-blue-200 transition cursor-pointer"
            onClick={() => exportToSQL(filteredData, TitlesTable, tableName)}
          >
            <Database size={20} />
            <span className="text-sm font-semibold">SQL</span>
          </div>

          {showAddButton && (
            <Button
              className="h-10 flex items-center justify-center space-x-2 bg-[#f97316] hover:bg-[#fb923c] text-white font-medium px-4 text-sm rounded-md shadow-sm transition"
              onClick={() => {
                updateTextTitleForm("Registrar", {});
                openModalForm(true);
              }}
            >
              <PlusCircle size={14} strokeWidth={2} />
              <span>Agregar</span>
            </Button>




          )}
        </div>
      </div>

      {/* Tabla de datos */}
      <div className="overflow-x-auto">
        <DataTable
          Data={filteredData}
          TitlesTable={TitlesTable}
          Actions={Actions}
          updateTextTitleForm={updateTextTitleForm}
          openModalForm={openModalForm}
          ignorar={[9, 10]}
        />
      </div>
    </div>
  );
}

export default ContentPage;