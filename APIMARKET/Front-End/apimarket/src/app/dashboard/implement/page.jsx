"use client";
import React, { useState, useEffect } from "react";
import NavPrivate from "@/components/navs/NavPrivate";
import ContentPage from "@/components/utils/ContentPage";
import Sidebar from "@/components/navs/Siderbar";
import axiosInstance from "@/lib/axiosInstance";
import ConfirmationModal from "@/components/utils/ConfirmationModal";
import ModalDialog from "@/components/utils/ModalDialog";
import FormImplement from "./FormImplement";
import DynamicAlert from "@/components/utils/DynamicAlert";
import ExportToPDFDialog from "@/components/utils/ExportToPDFDialog"; // 👈 ya estaba importado


function ImplementPage() {
  const TitlePage = "Implemento";
  const eliminar = "¿Estás seguro de que deseas eliminar esta implemento?";
  const [action, setAction] = useState("Registrar");
  const [isOpen, setIsOpen] = useState(false);
  const [regisImplement, setRegisImplement] = useState([]);
  const [selectedImplement, setSelectedImplement] = useState(null);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [buttonForm, setButtonForm] = useState("Registrar");

  const [isModalOpen, setModalOpen] = useState(false); // Para alerta de éxito
  const [isModalOpenFall, setModalOpenFall] = useState(false); // Para alerta de fallo
  const [msSuccess, setMsSuccess] = useState("");
  const [error, setError] = useState("");
  const [isExportModalOpen, setIsExportModalOpen] = useState(false); // 👈 Para controlar el modal de exportación


  const titlesImplement = [
    "Código",
    "Nombre del Implemento",
    "Tipo de Implemento",
    "Fecha de Ingreso",
    "Valor del Implemento",
    "Existencia",
  ];

  const [implement, setImplement] = useState({
    id_Implement: "",
    nom_Implement: "",
    tip_Implement: "",
    fechIng_Implement: "",
    vlr_Implement: "",
    exi_Implement: "",
  });

  function formatDateToISO(dateString) {
    // Espera algo como "20/04/2025"
    const [day, month, year] = dateString.split("/");
    if (!day || !month || !year) return "";
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  }
  

  async function fetchImplement() {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get("/Api/Implement/GetsImplement");
      if (response.status === 200) {
        console.log()
        const data = response.data.map((implement) => [
          implement.id_Implement || "-",
          implement.nom_Implement || "Sin descripción",
          implement.tip_Implement || "-",
          implement.fechIng_Implement ? new Date(implement.fechIng_Implement).toLocaleDateString("es-CO")
          : "Sin descripción",    
          implement.vlr_Implement != null ? implement.vlr_Implement : "-",
          implement.exi_Implement || "-",
        ]);
        setRegisImplement(data);
      }
    } catch (error) {
      console.error("Error al obtener los registros de implemnto:", error);
      setModalOpenFall(true);

    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchImplement();
  }, []);

  const updateTextTitleForm = (texto, rowData) => {
    setAction(texto);
    setButtonForm(texto);

    if (texto === "Actualizar" ) {
      setImplement({
        id_Implement: rowData[0],
        nom_Implement: rowData[1],
        tip_Implement: rowData[2],
        fechIng_Implement: formatDateToISO(rowData[3]),
        vlr_Implement: rowData[4],
        exi_Implement: rowData[5],
      });
    } else {
      setImplement({
        id_Implement: "",
        nom_Implement: "",
        tip_Implement: "",
        fechIng_Implement: "",
        vlr_Implement: "",
        exi_Implement: "",
      });
    }
  };

  const handleDataUpdated = () => {
    fetchImplement(); // Refresca los datos de la tabla
  };

  const openModalForm = (Open) => {
    setIsOpen(Open);
  };
  const handleSuccess = () => {
    const message =
      action === "Registrar"
        ? "implemento ha sido registrada correctamente."
        : "implemento ha sido actualizada correctamente.";
    setMsSuccess(message);
    setModalOpen(true);
    fetchImplement();
    setIsOpen(false);
  };
  

  async function deleteImplement() {
    if (!selectedImplement) {
      setError("Debe seleccionar un implemento.");
      setModalOpenFall(true);
     
      return;
    }

    try {
      await axiosInstance.delete(`/Api/Implement/DeleteImplement?id=${selectedImplement}`);
      setMsSuccess("implemento ha sido eliminada correctamente.");
      setModalOpen(true);
      fetchImplement();
      setIsModalOpenDelete(false);
    } catch (error) {
      console.error("Error al eliminar el implemento:", error);
      setError("No se pudo eliminar el implemento.");
      setModalOpenFall(true);
    }
  }

  const actions = {
    delete: (rowData) => {
      setSelectedImplement(rowData[0]);
      setIsModalOpenDelete(true);
    },
    update: (rowData) => {
      updateTextTitleForm("Actualizar", rowData);
      openModalForm(true);
    },
  };

  return (
    <div className="flex h-screen bg-gray-200">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden text-white">
        <NavPrivate TitlePage={TitlePage} />
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
                    Data={regisImplement}
                    TitlesTable={titlesImplement}
                    Actions={actions}
                    updateTextTitleForm={updateTextTitleForm}
                    openModalForm={openModalForm}
                    ignorar={[]}
                    setIsExportModalOpen={setIsExportModalOpen}
                    tableName="implemento"

                  />
                
              </div>
            </div>
          </div>
        </main>
      </div>

      <ModalDialog
        isOpen={isOpen}
        setIsOpen={openModalForm}
        FormPage={<FormImplement buttonForm={buttonForm} implement={implement} onSuccess={handleSuccess}  
        onDataUpdated={handleDataUpdated}
        closeModal={openModalForm}
        />}
        action={action}
      />

      <ConfirmationModal
        isOpen={isModalOpenDelete}
        onClose={() => setIsModalOpenDelete(false)}
        onConfirm={deleteImplement}
        DeleteTitle={eliminar}
      />
      {/* MODALES DE ALERTA */}
      <DynamicAlert
        isOpen={isModalOpen}
        onOpenChange={setModalOpen}
        type="success"
        redirectPath="" // o déjalo vacío si no deseas redirigir
      />

      <DynamicAlert
        isOpen={isModalOpenFall}
        onOpenChange={setModalOpenFall}
        type="error"
        message={error || "Ha ocurrido un error inesperado"}
        redirectPath=""
      />

       {/* Modal de exportación a PDF */}
       <ExportToPDFDialog
        isOpen={isExportModalOpen}
        setIsOpen={setIsExportModalOpen}
        TitlePage={TitlePage}
        Data={regisImplement}
        TitlesTable={titlesImplement}
      />
    </div>
  );
}

export default ImplementPage;