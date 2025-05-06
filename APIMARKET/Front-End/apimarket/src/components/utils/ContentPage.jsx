"use client";

import { Button } from "../ui/button";
import DataTable from "./DataTable";
import { FileText, FileDown, FileCode2, PlusCircle, Download } from "lucide-react"; // Íconos
import * as XLSX from "xlsx";

function ContentPage({
  TitlePage,
  Data,
  TitlesTable = { titlesFeeding },
  Actions,
  updateTextTitleForm,
  openModalForm,
  ignorar,
  setIsExportModalOpen,
  tableName,
}) {
  const exportToXLSX = (data, headers) => {
    // Confirmación antes de exportar
    const confirmExport = window.confirm("¿Desea descargar los datos en formato EXCEL?");
    if (!confirmExport) return;  // Si el usuario no confirma, no hacer nada

    try {
      // Asegurémonos de formatear las fechas y los valores correctamente
      const formattedData = data.map(row => {
        return row.map(cell => {
          if (cell instanceof Date) {
            // Si es una fecha, la convertimos en una cadena con formato adecuado
            return cell.toLocaleDateString(); // Aquí puedes personalizar el formato de la fecha
          } else if (typeof cell === 'number') {
            // Si es un número, lo dejamos como está
            return cell;
          } else {
            // Si es una cadena, la dejamos como está
            return cell;
          }
        });
      });

      // Añadir los encabezados al principio de los datos
      const wsData = [headers, ...formattedData];

      // Convierte los datos (con encabezados) en una hoja de Excel
      const ws = XLSX.utils.aoa_to_sheet(wsData);
      // Crea un libro nuevo
      const wb = XLSX.utils.book_new();
      // Añade la hoja de datos al libro
      XLSX.utils.book_append_sheet(wb, ws, "Datos");
      // Exporta el archivo XLSX
      XLSX.writeFile(wb, ' Datos.xlsx');
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
      // Ordenar los datos por la columna de fecha (suponiendo que la fecha esté en formato string)
      data.sort((a, b) => new Date(a['Fecha de alimentación']) - new Date(b['Fecha de alimentación']));

      let sqlContent = "-- Archivo generado automáticamente\n\n";

      data.forEach((row) => {
        const values = row
          .map((value) =>
            typeof value === "string" ? `'${value.replace(/'/g, "''")}'` : value
          )
          .join(", ");

        sqlContent += `INSERT INTO \`${tableName}\` (${headers
          .map((h) => `\`${h}\``)
          .join(", ")}) VALUES (${values});\n`;
      });

      const blob = new Blob([sqlContent], { type: "text/sql;charset=utf-8;" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.setAttribute("download", "datos_exportados.sql");
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

      {/* Contenedor de botones */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-5 flex-wrap">
        {/* Botones de exportación con estilos visuales */}
        <div className="flex flex-wrap gap-3">
          {/* PDF */}
          <div
            className="flex items-center space-x-1 bg-red-100 text-red-600 px-4 py-2 rounded-xl shadow-sm hover:bg-red-200 transition cursor-pointer"
            onClick={() => {
              setIsExportModalOpen(true);
            }}
          >
            <FileText size={20} />
            <span className="text-sm font-semibold">PDF</span>
          </div>

          {/* XLSX */}
          <div
            className="flex items-center space-x-1 bg-green-100 text-green-600 px-4 py-2 rounded-xl shadow-sm hover:bg-green-200 transition cursor-pointer"
            onClick={() => exportToXLSX(Data, TitlesTable)} // Llama a la función para exportar con los encabezados
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

        {/* Botones funcionales */}
        <div className="flex flex-wrap gap-3">
          <Button
            className="flex items-center space-x-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#e87204] hover:bg-[#30712] focus:outline-none px-4 py-2"
          >
            <Download size={18} className="text-white" />
            <span>Descargar CSV</span>
          </Button>

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
        </div>
      </div>

      {/* Tabla de datos */}
      <DataTable
        Data={Data}
        TitlesTable={TitlesTable}
        Actions={Actions}
        updateTextTitleForm={updateTextTitleForm}
        openModalForm={openModalForm}
        ignorar={[9, 10]}
      />
    </div>
  );
}

export default ContentPage;