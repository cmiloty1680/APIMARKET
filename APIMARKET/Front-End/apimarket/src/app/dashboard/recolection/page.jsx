"use client";
import NavPrivate from "@/components/navs/NavPrivate";
import ContentPage from "@/components/utils/ContentPage";
import Sidebar from "@/components/navs/Siderbar";
import FormHoneyCollection from "./FormHoneyCollection";
import ModalDialog from "@/components/utils/ModalDialog";
import ConfirmationModal from "@/components/utils/ConfirmationModal";
import React, { useState, useEffect } from "react";
import axiosInstance from "@/lib/axiosInstance";
import ExportToPDFDialog from "@/components/utils/ExportToPDFDialog"; // 👈 ya estaba importado


function HoneyCollection() {
  const TitlePage = "Recolección de Miel";
  const DeleteRegistro = "¿Estás seguro de que deseas eliminar esta recolección de miel?";

  const [regisHoney, setRegisHoney] = useState([]);
  const [selectedHoney, setSelectedHoney] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [action, setAction] = useState("Registrar");
  const [buttonForm, setButtonForm] = useState("Registrar");
  const [isExportModalOpen, setIsExportModalOpen] = useState(false); // 👈 Para controlar el modal de exportación
  

  const titlesHoney = [
    "ID",
    "Descripción",
    "Fecha",
    "Frascos 125ml",
    "Frascos 250ml",
    "Unidad",
    "Responsable",
    "ID Producción",
    "ID Responsable",
    "Nombre de producción",
    "Fecha de inicio de producción",
    "Fecha de Fin de producción",
    "Subcentro",
    "Centro de costo",
    "total Colmena",
    "total produccion",
    "cantidad de cuadros",

  ];

  const [honeyCollection, setHoneyCollection] = useState({
    id_HoneyCollection: "",
    des_HoneyCollection: "",
    fec_HoneyCollection: "",
    canFra125_HoneyCollection: "",
    canFra250_HoneyCollection: "",
    uniMed_HoneyCollection: "",
    nam_Responsible: "",
    id_Production: "",
  });

  useEffect(() => {
    fetchHoneyCollections();
  }, []);

  const fetchHoneyCollections = async () => {
    try {
      const response = await axiosInstance.get("/Api/HoneyCollection/GetAllHoneyCollection");
      if(response.status === 200){
        const data = response.data.map((honey) => [
          honey.id_HoneyCollection || "-",
          honey.des_HoneyCollection || "Sin descripción",
          honey.fec_HoneyCollection 
          ? new Date(honey.fec_HoneyCollection).toLocaleDateString("es-CO")
          : "Sin descripción", 
          // honey.fec_HoneyCollection || "-",
          honey.canFra125_HoneyCollection || "-",
          honey.canFra250_HoneyCollection || "-",
          honey.uniMed_HoneyCollection || "ml",
          honey.nam_Responsible || "-",
          honey.id_Production || "-",
          honey.id_Responsible || "-",
          honey.nom_Production || "-",
          honey.fecIni_Production || "-",
          honey.fecFin_Production || "-",
          honey.subCen_Production || "-",
          honey.cenCos_Production || "-",
          honey.totColm_Hive || "-",
          honey.tot_Production || "-",
          honey.canCua_Production || "-",
        ]);
        setRegisHoney(data);
      }
    } catch (error) {
      console.error("Error al obtener la lista de recolecciones:", error);
    } finally {
      setIsLoading(false)
    }
  };



  const updateTextTitleForm = (texto, rowData) => {
    setAction(texto);
    setButtonForm(texto);
    setHoneyCollection({});

    if (texto === "Actualizar") {
      setHoneyCollection({
        id_HoneyCollection: rowData[0],
        des_HoneyCollection: rowData[1],
        fec_HoneyCollection: rowData[2],
        canFra125_HoneyCollection: rowData[3],
        canFra250_HoneyCollection: rowData[4],
        uniMed_HoneyCollection: rowData[5],
        id_Production: rowData[7],
        id_Responsible: rowData[8],
      });
      console.log(rowData);
    } else {
     
      console.log("Registrando...");
    }
  };

  const openModalForm = (isOpen) => {
    setSelectedHoney(null);
    setIsOpen(isOpen);
  };

  async function deleteHoney() {
    if (!selectedHoney) {
      setError("Debe seleccionar una recolección.");
      return;
    }

    try {
      await axiosInstance.delete(`/Api/HoneyCollection/DeleteHoneyCollection?id=${selectedHoney}`);
      fetchHoneyCollections();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error al eliminar la recolección:", error);
      setError("No se pudo eliminar la recolección.");
    }
  }

  const handleDataUpdated = () => {
    fetchHoneyCollections();
  };

   // Acciones de la tabla
   const actions = {
    delete: (rowData) => {
      setSelectedHoney(rowData[0]);
      setIsModalOpen(true);
    },
    update: (rowData) => {
    
    }

 
  };

  return (
    <>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <NavPrivate TitlePage={TitlePage} />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
            <div className="container mx-auto px-6 py-8 border-4 mt-10 bg-white">
              <div className="relative p-6">
              {error && (
                  <div className="bg-red-500 text-white p-2 rounded mb-4">
                    {error}
                  </div>
                )}
                  <ContentPage
                    Data={regisHoney}
                    TitlesTable={titlesHoney}
                    Actions={actions}
                    action={action}
                    updateTextTitleForm={updateTextTitleForm}
                    openModalForm={openModalForm}
                    ignorar={[8, 9, 10, 11, 12, 13, 14, 15, 16 ]}
                    setIsExportModalOpen={setIsExportModalOpen}
                  />
             
              </div>
            </div>
          </main>
        </div>
      </div>

      <ModalDialog
        isOpen={isOpen}
        setIsOpen={openModalForm}
        FormPage={
          <FormHoneyCollection
            honeyCollection={honeyCollection}
            buttonForm={buttonForm}
            onDataUpdated={handleDataUpdated}
            closeModal={openModalForm}
          />
        }
        action={action}
      />

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={deleteHoney}
        DeleteTitle={DeleteRegistro}
      />

       {/* Modal de exportación a PDF */}
       <ExportToPDFDialog
        isOpen={isExportModalOpen}
        setIsOpen={setIsExportModalOpen}
        TitlePage={TitlePage}
        Data={regisHoney}
        TitlesTable={titlesHoney}
      />
    </>
  );
}

export default HoneyCollection;
