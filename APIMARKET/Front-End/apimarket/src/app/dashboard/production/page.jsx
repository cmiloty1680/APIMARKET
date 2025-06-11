"use client";
import React, { useState, useEffect } from "react";
import NavPrivate from "@/components/navs/NavPrivate";
import ContentPage from "@/components/utils/ContentPage";
import Sidebar from "@/components/navs/Siderbar";
import axiosInstance from "@/lib/axiosInstance";
import ConfirmationModal from "@/components/utils/ConfirmationModal";
import ModalDialog from "@/components/utils/ModalDialog";
import FormProduction from "./FormProduction";
import ExportToPDFDialog from "@/components/utils/ExportToPDFDialog"; // 👈 ya estaba importado
import { Droplet } from "lucide-react";
import PrivateRoute from "@/app/routes/privateRoute";

function ProductionPage() {
  const TitlePage = "Producción";
  const eliminar = "¿Estás seguro de que deseas eliminar esta producción?";
  const [action, setAction] = useState("Registrar");
  const [isOpen, setIsOpen] = useState(false);
  const [regisProduction, setRegisProduction] = useState([]);
  const [error, setError] = useState(null);
  const [selectedProduction, setSelectedProduction] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [buttonForm, setButtonForm] = useState("Registrar");
  const [isExportModalOpen, setIsExportModalOpen] = useState(false); // 👈 Para controlar el modal de exportación

  const titlesProduction = [
    "Código",
    "Fecha de Inicio",
    "Fecha de Fin",
    "Subcentro",
    "Centro Costo",
    "Cantidad de Colmenas",
    "Nombre producción",
    "Id Raza",
    "Nom_Raza",
    // "Tot Producción",
    "Cantidad de cuadro"
  ];

  const [production, setProduction] = useState({
    id_Production: '',
    fecIni_Production: '',
    fecFin_Production: '',
    subCen_Production: '',
    cenCos_Production: '',
    nom_Production: '',
    totColm_Hive: '',
    tot_Production: '',
    id_Race: ''
  });

  function formatDateToISO(dateString) {
    // Espera algo como "20/04/2025"
    const [day, month, year] = dateString.split("/");
    if (!day || !month || !year) return "";
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  }
  

  // Obtener producción
  async function fetchProduction() {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get("/Api/Production/GetsAllProduction");
      if (response.status === 200) {
        const data = response.data.map((production) => [
          production.id_Production || "-",
          production.fecIni_Production ? new Date(production.fecIni_Production).toLocaleDateString("es-CO")
            : "Sin descripción", 
          production.fecFin_Production 
            ? new Date(production.fecFin_Production).toLocaleDateString("es-CO")
            : "Sin descripción", 
          production.subCen_Production || "-",
          production.cenCos_Production || "-",
          production.totColm_Hive || "-",
          production.nom_Production || "-",
          production.id_Race || "-",
          production.nom_Race || "-",
          // production.tot_Production || "-",
          production.canCua_Production || "-",
        ]);
        setRegisProduction(data);
      }
    } catch (error) {
      console.error("Error al obtener la producción:", error);
      setError("No se pudo cargar la producción.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchProduction();
  }, []);

  const handleDataUpdate = () => {
    fetchProduction();
  }

  // Función para cambiar el título del formulario y acción
  const updateTextTitleForm = (texto, rowData) => {
    setAction(texto);
    setButtonForm(texto);
    setProduction({});

    if (texto === "Actualizar") {
      setProduction({
        id_Production: rowData[0],
        fecIni_Production:formatDateToISO(rowData[1]),
        fecFin_Production: formatDateToISO(rowData[2]),
        totColm_Hive: rowData[5],
        id_Race: rowData[7],
        // tot_Production: rowData[9],
        canCua_Production: rowData[9]
        
      });
      console.log(rowData);
    }
  };

  const openModalForm = (isOpen) => {
    setSelectedProduction(null);
    setIsOpen(isOpen);
  };
  

  async function deleteProduction() {
    if (!selectedProduction) {
      setError("Debe seleccionar una producción.");
      return;
    }

    try {
      await axiosInstance.delete(`/Api/Production/DeleteProduction?id=${selectedProduction}`);
      fetchProduction();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error al eliminar la producción:", error);
      setError("No se pudo eliminar la producción.");
    }
  }

  const actions = {
    update: (rowData) => {
      updateTextTitleForm("Actualizar", rowData);
      setIsOpen(true);
    }
  };

  return (
    <PrivateRoute requiredRole={["instructor","pasante", "gestor"]}>
    <div className="flex h-screen bg-gray-200">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden text-white">
        <NavPrivate TitlePage={TitlePage} Icon={<Droplet/>}/>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background">
          <div className="container mx-auto px-6 py-8 mt-10">
            <div className="rounded-lg border-2 bg-white text-card-foreground shadow-lg">
              <div className="relative p-6">
                {error && (
                  <div className="bg-red-500 text-white p-2 rounded mb-4">
                    {error}
                  </div>
                )}


                <ContentPage
                  Data={regisProduction}
                  TitlesTable={titlesProduction}
                  Actions={actions}
                  action={action}
                  updateTextTitleForm={updateTextTitleForm}
                  openModalForm={openModalForm}
                  setIsExportModalOpen={setIsExportModalOpen}
                  showAddButton={true} // 👈 aquí indicas que NO lo muestre
                  ignorar={[7]}
                  tableName="Producción"

                />
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Modal para formulario */}
      <ModalDialog
        isOpen={isOpen}
        setIsOpen={openModalForm}
        FormPage={<FormProduction buttonForm={buttonForm} production={production} 
        onDataUpdated={handleDataUpdate}
        closeModal={openModalForm}/>}
        action={action}

      />

      {/* Modal de confirmación para eliminar */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={deleteProduction}
        DeleteTitle={eliminar}
      />

      {/* Modal de exportación a PDF */}
      <ExportToPDFDialog
        isOpen={isExportModalOpen}
        setIsOpen={setIsExportModalOpen}
        TitlePage={TitlePage}
        Data={regisProduction}
        TitlesTable={titlesProduction}
      />
    </div>
    </PrivateRoute>
  );
}

export default ProductionPage;


