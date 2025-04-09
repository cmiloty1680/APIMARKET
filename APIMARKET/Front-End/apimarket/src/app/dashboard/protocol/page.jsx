"use client";
import NavPrivate from "@/components/navs/NavPrivate";
import ContentPage from "@/components/utils/ContentPage";
import Sidebar from "@/components/navs/Siderbar";
import FormProtocol from "./FormProtocol";
import ModalDialog from "@/components/utils/ModalDialog";
import ConfirmationModal from "@/components/utils/ConfirmationModal";
import React, { useState, useEffect } from "react";
import axiosInstance from "@/lib/axiosInstance";

function Protocol() {
  const TitlePage = "Protocolo";
  const DeleteRegistro = "¿Estás seguro de que deseas eliminar este protocolo?";

  const [regisProtocol, setRegisProtocol] = useState([]);
  const [selectedProtocol, setSelectedProtocol] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const [action, setAction] = useState("Registrar");
  const [buttonForm, setButtonForm] = useState("Registrar");

  const titlesProtocol = [
    "Código",
    "Nombre de protocolo",
    "Tipo de protocolo",
    "Fecha de creación",
    "Fecha de Actualización",
    "Nombre de Archivo",
  ];

  const [protocol, setProtocol] = useState({
    id_Protocol: "",
    nom_Protocol: "",
    tip_Protocol: "",
    fecCre_Protocol: "",
    fecAct_Protocol: "",
    nomFile_Protocol: "",
  });

  useEffect(() => {
    fetchProtocol();
  }, []);

  const fetchProtocol = async () => {
    try {
      const response = await axiosInstance.get("/Api/Protocol/GetsAllProtocol");
      setRegisProtocol(response.data);
    } catch (error) {
      console.error("Error al obtener la lista de protocolos:", error);
    }
  };

  const formattedData = regisProtocol.map((protocol) => [
    protocol.id_Protocol || "-",
    protocol.nom_Protocol || "Sin descripción",
    protocol.tip_Protocol || "Sin estado",
    protocol.fecCre_Protocol || "-",
    protocol.fecAct_Protocol || "-",
    protocol.nomFile_Protocol || "-",
  ]);

  // Abrir formulario con acción
  const updateTextTitleForm = (texto, rowData) => {
    setAction(texto);
    setButtonForm(texto);

    if (texto === "Actualizar") {
      setProtocol({
        id_Protocol: rowData[0],
        nom_Protocol: rowData[1],
        tip_Protocol: rowData[2],
        fecCre_Protocol: rowData[3],
        fecAct_Protocol: rowData[4],
        nomFile_Protocol: rowData[5],
      });
    } else {
      setProtocol({
        id_Protocol: "",
        nom_Protocol: "",
        tip_Protocol: "",
        fecCre_Protocol: "",
        fecAct_Protocol: "",
        nomFile_Protocol: "",
      });
    }

    setIsFormModalOpen(true);
  };

  // Eliminar protocolo
  async function deleteProtocol() {
    if (!selectedProtocol) {
      setError("Debe seleccionar un protocolo.");
      return;
    }

    try {
      await axiosInstance.delete(`/Api/Protocol/DeleteProtocol?id=${selectedProtocol}`);
      fetchProtocol();
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Error al eliminar el protocolo:", error);
      setError("No se pudo eliminar el protocolo.");
    }
  }

  const handleDataUpdated = () => {
    fetchProtocol();
  };

  const actions = {
    update: (rowData) => {
      updateTextTitleForm("Actualizar", rowData);
    },
    delete: (rowData) => {
      setSelectedProtocol(rowData[0]);
      setIsDeleteModalOpen(true);
    },
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
                {error ? (
                  <p className="text-red-500">{error}</p>
                ) : (
                  <ContentPage
                    Data={formattedData}
                    TitlesTable={titlesProtocol}
                    Actions={actions}
                    action={action}
                    updateTextTitleForm={updateTextTitleForm}
                    openModalForm={setIsFormModalOpen}
                    ignorar={[]}
                  />
                )}
              </div>
            </div>
          </main>
        </div>
      </div>

      <ModalDialog
        isOpen={isFormModalOpen}
        setIsOpen={setIsFormModalOpen}
        FormPage={
          <FormProtocol
            protocol={protocol}
            buttonForm={buttonForm}
            onDataUpdated={handleDataUpdated}
          />
        }
        action={action}
      />

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={deleteProtocol}
        DeleteTitle={DeleteRegistro}
      />
    </>
  );
}

export default Protocol;
