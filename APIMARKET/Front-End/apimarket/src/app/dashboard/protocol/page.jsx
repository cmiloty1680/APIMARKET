"use client";
import NavPrivate from "@/components/navs/NavPrivate";
import ContentPage from "@/components/utils/ContentPage";
import Sidebar from "@/components/navs/Siderbar";
import FormProtocol from "./FormProtocol";
import React, { useState, useEffect } from "react";
import axiosInstance from "@/lib/axiosInstance";

function Protocol() {
  const TitlePage = "Protocolo";
  const DeleteRegistro = "¿Estás seguro de que deseas eliminar este protocolo?";
  const [regisProtocol, setRegisProtocol] = useState([]);
  const [selectedProtocol, setSelectedProtocol] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [error, setError] = useState(null);

  const titlesProtocol = [
    "Código",
    "Nombre de protocolo",
    "Tipo de protocolo",
    "Fecha de creación",
    "Fecha de Actualización",
  ];

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
  ]);

  // Función para eliminar
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


  async function handleEditProtocol(updatedData) {
    try {
      await axiosInstance.put(`/Api/Protocol/UpdateProtocol`, updatedData);
  
      // Actualizar el estado local sin necesidad de recargar todo
      setRegisProtocol((prev) =>
        prev.map((item) =>
          item.id_Protocol === updatedData.id_Protocol ? updatedData : item
        )
      );
  
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error al actualizar el protocolo:", error);
    }
  }
  

  const actions = {
    update: (rowData) => {
      console.log("Datos de la fila seleccionada:", rowData);
      setSelectedProtocol({
        id: rowData[0],
        name: rowData[1],
        type: rowData[2],
      });
      setIsEditModalOpen(true);
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
                    TitlePage={TitlePage}
                    Data={formattedData}
                    TitlesTable={titlesProtocol}
                    Actions={actions}
                    FormPage={FormProtocol}
                  />
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default Protocol;
