"use client"
import NavPrivate from "@/components/navs/NavPrivate";
import ContentPage from "@/components/utils/ContentPage";
import Sidebar from "@/components/navs/Siderbar";
import axiosInstance from "@/lib/axiosInstance";
import React, { useState, useEffect } from "react";
import ModalDialog from "@/components/utils/ModalDialog";
import ConfirmationModal from "@/components/utils/ConfirmationModal";


function
  ResponsiblePage() {
  const TitlePage = "Responsable";
  const eliminar = "Responsable";
  const [regisResponsible, setRegisResponsible] = useState([]);
  const [selectedResponsible, setSelectedResponsible] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  const titlesResponsable = [
    "Codigo",
    "Nombre",
    "Apellido",
    "N° documento",
    "Tipo",
    "Telefono",
    "Correo"

  ];
  

  useEffect(() => {
    const fetchResponsibles = async () => {
      try {
        const response = await axiosInstance.get("/Api/Responsible/GetsAllResponsible");
        setRegisResponsible(response.data);
      } catch (error) {
        console.error("Error al obtener la lista de responsables:", error);
      }
    };

    fetchResponsibles();
  }, []);

  const formattedData = regisResponsible.map((responsible) => [
    responsible.id_Responsible || "-",
    responsible.nam_Responsible || "-",
    responsible.lasNam_Responsible || "-",
    responsible.numDoc_Responsible != null ? responsible.numDoc_Responsible : "-",
    responsible.tip_Responsible != null ? responsible.tip_Responsible : "-",
    responsible.pho_Responsible != null ? responsible.pho_Responsible : "-",
    responsible.emai_Responsible != null ? responsible.emai_Responsible : "-",

  ]);

  // Función para abrir el modal
  const openModalForm = (isOpen) => {
    selectedResponsible(null);
    setIsOpen(isOpen);
  };

  //Eliminar Responsables
  async function deleteResponsible() {
    if(!selectedResponsible){
      alert("error debe seleccionar un responsable");
      return;
    }
    try {
      await axiosInstance.delete(`/Api/Hive/DeleteHive?id=${selectedResponsible}`)
      fetchResponsibles();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error al eliminar el responsable", error);
    }
  }
  const actions = {
    delete: (rowData) => {
      setSelectedResponsible(rowData[0]);
      setIsModalOpen(true);


    },
    update: (rowData) =>{
      
    }
  }

  return (
    <>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <NavPrivate />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
            <div className="container mx-auto px-6 py-8 border-4 mt-10 bg-white">
              <div className="relative p-6">
                <ContentPage
                  TitlePage={TitlePage}
                  Data={formattedData}
                  TitlesTable={titlesResponsable}
                  Actions={actions}
                  tableName="Responsables"

                />
              </div>

            </div>
          </main>
        </div>
        {/* <ModalDialog
        isOpen={isOpen}
        setIsOpen={openModalForm}
        /> */}
         <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={deleteResponsible}
        DeleteTitle={eliminar}
      />
      </div>
    </>
  );
}

export default
  ResponsiblePage;