"use client"
import NavPrivate from "@/components/navs/NavPrivate";
import ContentPage from "@/components/utils/ContentPage";
import Sidebar from "@/components/navs/Siderbar";
import axiosInstance from "@/lib/axiosInstance";
import React, { useState, useEffect } from "react";
import ModalDialog from "@/components/utils/ModalDialog";
import PrivateRoute from "@/app/routes/privateRoute";
import { Users } from "lucide-react";
import FormResponsible from "./FormResponsible";
import { date } from "zod";


function
  ResponsiblePage() {
  const TitlePage = "Responsables";
  const eliminar = "Responsable";
  const [regisResponsible, setRegisResponsible] = useState([]);
  const [selectedResponsible, setSelectedResponsible] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
  
  const [isOpen, setIsOpen] = useState(false);
  const [action, setAction] = useState("Registrar");
  const [buttonForm, setButtonForm] = useState("Registrar");


  const titlesResponsable = [
    "Codigo",
    "Nombre",
    "Apellido",
    "N° documento",
    "Tipo",
    "Telefono",
    "Correo",
    "Estado"

  ];

  const [responsible, setResponsible] = useState({
    est_Responsible: "",
    tip_Responsible: "",
  });

  async function fetchResponsibles() {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get("/Api/Responsible/GetsAllResponsible");
      if (response.status === 200) {
        const data = response.data.map((responsible) => [
          responsible.id_Responsible || "-",
          responsible.nam_Responsible || "-",
          responsible.lasNam_Responsible || "-",
          responsible.numDoc_Responsible != null ? responsible.numDoc_Responsible : "-",
          responsible.tip_Responsible != null ? responsible.tip_Responsible : "-",
          responsible.pho_Responsible != null ? responsible.pho_Responsible : "-",
          responsible.emai_Responsible != null ? responsible.emai_Responsible : "-",
          responsible.est_Responsible || "-",

        ]);
        setRegisResponsible(data);
      }
    } catch (error) {
      console.error("Error al obtener la colmenas:", error);
      setError("No se pudo cargar la colmenas.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchResponsibles();
  }, []);

  const handleDataUpdated = () => {
    fetchResponsibles(); // Refresca los datos de la tabla
  };

  const updateTextTitleForm = (texto, rowData) => {
    setAction(texto);
    setButtonForm(texto);
    setResponsible({});

    if (texto === "Actualizar"){
      setResponsible({
        id_Responsible: rowData[0],
        nam_Responsible: rowData[1],
        lasNam_Responsible: rowData[2],
        tip_Responsible: rowData[4],
        est_Responsible: rowData[7],
      });
      console.log(rowData);
    } else {
      console.log("registrando");
    }
  }

  // Función para abrir el modal
  const openModalForm = (isOpen) => {
    setSelectedResponsible(null);
    setIsOpen(isOpen);
  };


  const actions = {
    update: (rowData) => {

    }
  }

  return (
    <>
      <PrivateRoute requiredRole={["instructor", "pasante"]}>
        <div className="flex h-screen bg-gray-200">
          <Sidebar />
          <div className="flex flex-col flex-1 overflow-hidden text-white">
            <NavPrivate TitlePage={TitlePage} Icon={<Users />} />
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background">
              <div className="container mx-auto px-6 py-8 mt-10">
                <div className="rounded-lg border-2 bg-white text-card-foreground shadow-lg">
                  <div className="relative p-6">
                    <ContentPage
                      Data={regisResponsible}
                      TitlesTable={titlesResponsable}
                      Actions={actions}
                      updateTextTitleForm={updateTextTitleForm}
                      openModalForm={openModalForm}
                      action={action}
                      ignorar={[]}
                      tableName="Responsables"
                      showPdfButton={false} // ← aquí se oculta

                    />
                  </div>
                </div>
              </div>
            </main>
          </div>
          <ModalDialog
            isOpen={isOpen}
            setIsOpen={openModalForm}
            FormPage={<FormResponsible
              responsible={responsible}
              buttonForm={buttonForm}
              onDataUpdated={handleDataUpdated}
              closeModal={openModalForm} />
            }
            action={action}
          />
        </div>
      </PrivateRoute>
    </>
  );
}

export default
  ResponsiblePage;
