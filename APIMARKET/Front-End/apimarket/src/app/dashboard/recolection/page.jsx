"use client";
import NavPrivate from "@/components/navs/NavPrivate";
import ContentPage from "@/components/utils/ContentPage";
import Sidebar from "@/components/navs/Siderbar";
import FormHoneyCollection from "./FormHoneyCollection";
import ModalDialog from "@/components/utils/ModalDialog";
import ConfirmationModal from "@/components/utils/ConfirmationModal";
import React, { useState, useEffect } from "react";
import axiosInstance from "@/lib/axiosInstance";

function HoneyCollection() {
  const TitlePage = "Recolección de Miel";
  const DeleteRegistro = "¿Estás seguro de que deseas eliminar esta recolección de miel?";

  const [regisHoney, setRegisHoney] = useState([]);
  const [selectedHoney, setSelectedHoney] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const [action, setAction] = useState("Registrar");
  const [buttonForm, setButtonForm] = useState("Registrar");

  const titlesHoney = [
    "ID",
    "Descripción",
    "Fecha",
    "Frascos 125ml",
    "Frascos 250ml",
    "Unidad",
    "Responsable",
    "Producción",
  ];

  const [honeyCollection, setHoneyCollection] = useState({
    id_HoneyCollection: "",
    des_HoneyCollection: "",
    fec_HoneyCollection: "",
    canFra125_HoneyCollection: 0,
    canFra250_HoneyCollection: 0,
    uniMed_HoneyCollection: "ml",
    nom_Responsible: 0,
    id_Production: 0,
  });

  useEffect(() => {
    fetchHoneyCollections();
  }, []);

  const fetchHoneyCollections = async () => {
    try {
      const response = await axiosInstance.get("/Api/HoneyCollection/GetAllHoneyCollection");
      setRegisHoney(response.data);
    } catch (error) {
      console.error("Error al obtener la lista de recolecciones:", error);
    }
  };

  const formattedData = regisHoney.map((honey) => [
    honey.id_HoneyCollection || "-",
    honey.des_HoneyCollection || "Sin descripción",
    honey.fec_HoneyCollection ? new Date(honey.fec_HoneyCollection).toLocaleString() : "-",
    honey.canFra125_HoneyCollection || 0,
    honey.canFra250_HoneyCollection || 0,
    honey.uniMed_HoneyCollection || "ml",
    honey.nom_Responsible || "-",
    honey.id_Production || "-",
  ]);

  const updateTextTitleForm = (texto, rowData) => {
    setAction(texto);
    setButtonForm(texto);

    if (texto === "Actualizar") {
      setHoneyCollection({
        id_HoneyCollection: rowData[0],
        des_HoneyCollection: rowData[1],
        fec_HoneyCollection: rowData[2],
        canFra125_HoneyCollection: rowData[3],
        canFra250_HoneyCollection: rowData[4],
        uniMed_HoneyCollection: rowData[5],
        nom_Responsible: rowData[6],
        id_Production: rowData[7],
      });
    } else {
      setHoneyCollection({
        id_HoneyCollection: "",
        des_HoneyCollection: "",
        fec_HoneyCollection: "",
        canFra125_HoneyCollection: 0,
        canFra250_HoneyCollection: 0,
        uniMed_HoneyCollection: "ml",
        nom_Responsible: 0,
        id_Production: 0,
      });
    }

    setIsFormModalOpen(true);
  };

  async function deleteHoney() {
    if (!selectedHoney) {
      setError("Debe seleccionar una recolección.");
      return;
    }

    try {
      await axiosInstance.delete(`/Api/HoneyCollection/DeleteHoneyCollection?id=${selectedHoney}`);
      fetchHoneyCollections();
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Error al eliminar la recolección:", error);
      setError("No se pudo eliminar la recolección.");
    }
  }

  const handleDataUpdated = () => {
    fetchHoneyCollections();
  };

  const actions = {
    update: (rowData) => {
      updateTextTitleForm("Actualizar", rowData);
    },
    delete: (rowData) => {
      setSelectedHoney(rowData[0]);
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
                    TitlesTable={titlesHoney}
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
          <FormHoneyCollection
            honeyCollection={honeyCollection}
            buttonForm={buttonForm}
            onDataUpdated={handleDataUpdated}
          />
        }
        action={action}
      />

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={deleteHoney}
        DeleteTitle={DeleteRegistro}
      />
    </>
  );
}

export default HoneyCollection;
