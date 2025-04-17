



"use client";
import NavPrivate from "@/components/navs/NavPrivate";
import ContentPage from "@/components/utils/ContentPage";
import Sidebar from "@/components/navs/Siderbar";
import FormProtocol from "./FormProtocol";
import ModalDialog from "@/components/utils/ModalDialog";
import ConfirmationModal from "@/components/utils/ConfirmationModal";
import React, { useState, useEffect } from "react";
import axiosInstance from "@/lib/axiosInstance";

function ProtocolPage() {
  const TitlePage = "Protocolo";
  const eliminar = "¿Estás seguro de que deseas eliminar este protocolo?";
  const [regisProtocol, setRegisProtocol] = useState([]);
  const [action, setAction] = useState("Registrar");
  const [isOpen, setIsOpen] = useState(false);

  const [selectedProtocol, setSelectedProtocol] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
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
    archivo_Protocol: "",
  });

 

  async function fetchProtocol() {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get("/Api/Protocol/GetsAllProtocol");
      if (response.status === 200) {
        const data = response.data.map((protocol) => [
          protocol.id_Protocol || "-",
          protocol.nom_Protocol || "Sin descripción",
          protocol.tip_Protocol || "Sin estado",
          protocol.fecCre_Protocol || "-",
          protocol.fecAct_Protocol || "-",
          protocol.archivo_Protocol
            ? (
                <a
                  href={`http://localhost:5167${protocol.archivo_Protocol}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  {protocol.archivo_Protocol.split("/").pop()}
                </a>
              )
            : "-",
        ]);
        
        
        
  setRegisProtocol(data);

}
} catch (error) {
  console.error("Error al obtener los protocolos:", error);
  setError("No se pudo cargar los protocolos.");
} finally {
  setIsLoading(false);
}
}
 useEffect(() => {
  fetchProtocol();
  }, []);



  // Abrir formulario con acción
  const updateTextTitleForm = (texto, rowData) => {
    setAction(texto);
    setButtonForm(texto);

    setProtocol({})

    if (texto === "Actualizar") {
      console.log("Actualizando...");

      setProtocol({
        id_Protocol: rowData[0],
        nom_Protocol: rowData[1],
        tip_Protocol: rowData[2],
        fecCre_Protocol: rowData[3],
        fecAct_Protocol: rowData[4],
        archivo_Protocol: rowData[5],
      });  console.log("hola", rowData);
      
      // Llamar directamente la función correcta
    } else {
      console.log("Registrando...");

    }
  };
   
  const openModalForm = (isOpen) => {
    setSelectedProtocol(null);
    setIsOpen(isOpen);
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


  const actions = {
    delete: (rowData) => {
      setSelectedProtocol(rowData[0]);
      setIsModalOpen(true);
    },
    update: (rowData) => {
      updateTextTitleForm(rowData)
      setIsOpen(true);
    }
  };

  return (
    
      <div className="flex h-screen bg-gray-200">
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <NavPrivate TitlePage={TitlePage} />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="rounded-lg border-2 bg-white text-card-foreground shadow-lg">

            <div className="container mx-auto px-6 py-8 border-4 mt-10 bg-white">
              <div className="relative p-6">
              {error && (
                  <div className="bg-red-500 text-white p-2 rounded mb-4">
                    {error}
                  </div>
                )} 
                  <ContentPage
                    Data={regisProtocol}
                    TitlesTable={titlesProtocol}
                    Actions={actions}
                    action={action}
                    updateTextTitleForm={updateTextTitleForm}
                    openModalForm={openModalForm}
                    ignorar={[]}
                  />
                  </div>
              </div>
            </div>
          </main>
        </div>
   

      <ModalDialog
        isOpen={isOpen}
        setIsOpen={openModalForm}
        FormPage={
          <FormProtocol
            protocol={protocol}
            buttonForm={buttonForm}
             />}
            action={action}
          />
       
     

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={deleteProtocol}
        DeleteTitle={eliminar}
      />
      </div>
  );
}

export default ProtocolPage;