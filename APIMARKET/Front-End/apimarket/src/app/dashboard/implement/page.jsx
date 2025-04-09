"use client";
import React, { useState, useEffect } from "react";
import NavPrivate from "@/components/navs/NavPrivate";
import ContentPage from "@/components/utils/ContentPage";
import Sidebar from "@/components/navs/Siderbar";
import axiosInstance from "@/lib/axiosInstance";
import ConfirmationModal from "@/components/utils/ConfirmationModal";
import ModalDialog from "@/components/utils/ModalDialog";
import FormImplement from "./FormImplement";
import { ShieldCheck, AlertCircle } from "lucide-react";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

function ImplementPage() {
  const TitlePage = "Implemento";
  const eliminar = "El implemento";
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
          implement.fechIng_Implement 
          ? new Date(implement.fechIng_Implement).toLocaleDateString("es-CO", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })
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
        fechIng_Implement: rowData[3],
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
                  />
                
              </div>
            </div>
          </div>
        </main>
      </div>

      <ModalDialog
        isOpen={isOpen}
        setIsOpen={openModalForm}
        FormPage={<FormImplement buttonForm={buttonForm} implement={implement} onSuccess={handleSuccess}  />}
        action={action}
      />

      <ConfirmationModal
        isOpen={isModalOpenDelete}
        onClose={() => setIsModalOpenDelete(false)}
        onConfirm={deleteImplement}
        DeleteTitle={eliminar}
      />
      {/* Modal de alerta de éxito */}
            <AlertDialog open={isModalOpen} onOpenChange={setModalOpen}>
              <AlertDialogContent className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-green-500">
                <AlertDialogHeader>
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                    <ShieldCheck className="h-6 w-6 text-green-600" />
                  </div>
                  <AlertDialogTitle className="text-center text-lg font-medium text-gray-900">
                    ¡Operación Exitosa!
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-center text-sm text-gray-500 mt-2">
                    La alimentacion ha sido eliminada correctamente.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="mt-4">
                  <AlertDialogAction
                    onClick={() => setModalOpenFall(false)}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 rounded-md hover:from-orange-600 hover:to-red-600 transition-all duration-300"
                  >
                    Ok
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
      
            {/* Modal de alerta de fallo */}
            <AlertDialog open={isModalOpenFall} onOpenChange={setModalOpenFall}>
              <AlertDialogContent className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-red-500">
                <AlertDialogHeader>
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                    <AlertCircle className="h-6 w-6 text-red-600" />
                  </div>
                  <AlertDialogTitle className="text-center text-lg font-medium text-gray-900">
                    ¡Operación Fallida!
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-center text-sm text-gray-500 mt-2">
                    {error || "Ha ocurrido un error inesperado."}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="mt-4">
                  <AlertDialogAction
                    onClick={() => setModalOpenFall(false)}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 rounded-md hover:from-orange-600 hover:to-red-600 transition-all duration-300"
                  >
                    Ok
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
    </div>
  );
}

export default ImplementPage;