"use client";

import { Button } from "../ui/button";
import DataTable from "./DataTable";
import { FileText, FileDown, FileCode2, PlusCircle, Download } from "lucide-react";
import * as XLSX from "xlsx";

function ContentPage({
  TitlePage,
  Data,
  TitlesTable = [], // Corregido
  Actions,
  updateTextTitleForm,
  openModalForm,
  ignorar,
  setIsExportModalOpen,
  tableName,
  showAddButton
}) {
  const exportToXLSX = (data, headers) => {
    const confirmExport = window.confirm("¿Desea descargar los datos en formato EXCEL?");
    if (!confirmExport) return;

    try {
      const formattedData = data.map(row =>
        row.map(cell => {
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

      data.forEach(row => {
        const values = row
          .map(value =>
            typeof value === "string" ? `'${value.replace(/'/g, "''")}'` : value
          )
          .join(", ");

        sqlContent += `INSERT INTO \`${tableName}\` (${headers
          .map(h => `\`${h}\``)
          .join(", ")}) VALUES (${values});\n`;
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

  return (
    <div>
      <h1 className="text-xl font-bold mb-5">{TitlePage}</h1>

      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-5 flex-wrap">
        {/* Export buttons */}
        <div className="flex flex-wrap gap-3">
          {/* PDF */}
          <div
            className="flex items-center space-x-1 bg-red-100 text-red-600 px-4 py-2 rounded-xl shadow-sm hover:bg-red-200 transition cursor-pointer"
            onClick={() => setIsExportModalOpen(true)}
          >
            <FileText size={20} />
            <span className="text-sm font-semibold">PDF</span>
          </div>

          {/* XLSX */}
          <div
            className="flex items-center space-x-1 bg-green-100 text-green-600 px-4 py-2 rounded-xl shadow-sm hover:bg-green-200 transition cursor-pointer"
            onClick={() => exportToXLSX(Data, TitlesTable)}
          >
            <FileDown size={20} />
            <span className="text-sm font-semibold">XLSX</span>
          </div>

          {/* SQL */}
          <div
            className="flex items-center space-x-1 bg-blue-100 text-blue-600 px-4 py-2 rounded-xl shadow-sm hover:bg-blue-200 transition cursor-pointer"
            onClick={() => exportToSQL(Data, TitlesTable, tableName)}
          >
            <FileCode2 size={20} />
            <span className="text-sm font-semibold">SQL</span>
          </div>
        </div>

        {/* Functional buttons */}
        <div className="flex flex-wrap gap-3">
          <Button className="flex items-center space-x-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#e87204] hover:bg-[#30712] focus:outline-none px-4 py-2">
            <Download size={18} className="text-white" />
            <span>Descargar CSV</span>
          </Button>

          {showAddButton && (
            <Button
              className="flex items-center space-x-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#e87204] hover:bg-[#30712] focus:outline-none px-4 py-2"
              onClick={() => {
                updateTextTitleForm("Registrar", {});
                openModalForm(true);
              }}
            >
              <PlusCircle size={18} />
              <span>Agregar</span>
            </Button>
          )}
        </div>
      </div>

      <DataTable
        Data={Data}
        TitlesTable={TitlesTable}
        Actions={Actions}
        updateTextTitleForm={updateTextTitleForm}
        openModalForm={openModalForm}
        ignorar={[]}
      />
    </div>
  );
}

export default ContentPage;
