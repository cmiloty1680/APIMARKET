import { Button } from "../ui/button";
import DataTable from "./DataTable";
import { FileText, FileDown, FileCode2, PlusCircle, Download } from "lucide-react"; // Íconos

function ContentPage({
  TitlePage,
  Data,
  TitlesTable,
  Actions,
  updateTextTitleForm,
  openModalForm,
  ignorar,
  setIsExportModalOpen,
  showAddButton
}) {
  return (
    <div>
      <h1 className="text-xl font-bold mb-5">{TitlePage}</h1>

      {/* Contenedor de botones */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-5 flex-wrap">
        {/* Botones de exportación con estilos visuales */}
        <div className="flex flex-wrap gap-3">
          {/* PDF */}
          <div className="flex items-center space-x-1 bg-red-100 text-red-600 px-4 py-2 rounded-xl shadow-sm hover:bg-red-200 transition cursor-pointer"
          onClick={() =>{
            setIsExportModalOpen(true);
          }}>
            <FileText size={20} />
            <span className="text-sm font-semibold">PDF</span>
          </div>

          {/* XLSX */}
          <div className="flex items-center space-x-1 bg-green-100 text-green-600 px-4 py-2 rounded-xl shadow-sm hover:bg-green-200 transition cursor-pointer">
            <FileDown size={20} />
            <span className="text-sm font-semibold">XLSX</span>
          </div>

          {/* SQL */}
          <div className="flex items-center space-x-1 bg-blue-100 text-blue-600 px-4 py-2 rounded-xl shadow-sm hover:bg-blue-200 transition cursor-pointer">
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

          {showAddButton && (<Button
            className="flex items-center space-x-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#e87204] hover:bg-[#30712] focus:outline-none px-4 py-2"
            onClick={() => {
              updateTextTitleForm("Registrar", {});
              openModalForm(true);
            }}
          >
            <PlusCircle size={18} />
            <span>Agregar</span>
          </Button>)}
        </div>
      </div>


      {/* Tabla de datos */}
      <DataTable
        Data={Data}
        TitlesTable={TitlesTable}
        Actions={Actions}
        updateTextTitleForm={updateTextTitleForm}
        openModalForm={openModalForm}
        ignorar={ignorar}
      />
    </div>
  );
}

export default ContentPage;
