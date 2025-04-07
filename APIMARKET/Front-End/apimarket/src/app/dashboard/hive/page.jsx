"use client";
import React, { useState, useEffect } from "react";
import NavPrivate from "@/components/navs/NavPrivate";
import ContentPage from "@/components/utils/ContentPage";
import Sidebar from "@/components/navs/Siderbar";
import axiosInstance from "@/lib/axiosInstance";
import ConfirmationModal from "@/components/utils/ConfirmationModal";
import ModalDialog from "@/components/utils/ModalDialog";
import FormHive from "./FormHive";

function HivePage() {
  const TitlePage = "Colmena";
  const eliminar = "La colmena";
  const [action, setAction] = useState("Registrar");
  const [isOpen, setIsOpen] = useState(false);
  const [regisHive, setRegisHive] = useState([]);
  const [error, setError] = useState(null);
  const [selectedHive, setSelectedHive] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [buttonForm, setButtonForm] = useState("Registrar");

  const titlesColmena = [
    "Código",
    "Descripción",
    "Estado",
    "N° Cuadros",
    "N° Alzas",
  ];

  const [hive, setHive] = useState({
    id_Production: '',
    fecIni_Production: '',
    fecFin_Production: '',
    cant_Abejas: '',
    tot_Colmen: '',
    can_Production: '',
    nom_Race: '',
    id_Race: ''
  });

  // Obtener producción
  async function fetchHives() {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get("/Api/Hive/AllHive");
      if (response.status === 200) {
        const data = response.data.map((hive) => [
          hive.id_Hive || "-",
          hive.des_Hive || "Sin descripción",
          hive.est_Hive || "Sin estado",
          hive.numCua_Hive != null ? hive.numCua_Hive : "-",
          hive.numAlz_Hive != null ? hive.numAlz_Hive : "-",
          
        ]);
        setRegisHive(data);
      }
    } catch (error) {
      console.error("Error al obtener la colmenas:", error);
      setError("No se pudo cargar la colmenas.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchHives();
  }, []);

  const handleDataUpdated = () => {
    fetchHives(); // Refresca los datos de la tabla
  };

  
  // Función para cambiar el título del formulario y acción
  const updateTextTitleForm = (texto, rowData) => {
    console.log(rowData);
    setAction(texto);
    setButtonForm(texto);

    setHive({})


    if (texto === "Actualizar") {
      console.log("Actualizando...");
     

      setHive({
        id_Hive: rowData[0], 
        des_Hive: rowData[1], 
        est_Hive: rowData[2], 
        numCua_Hive: rowData[3],
        numAlz_Hive: rowData[4]
      });
      
      console.log(hive)
  
      // Llamar directamente la función correcta
    } else {
      console.log("Registrando...");

    }
  };

  // Función para abrir el modal
  const openModalForm = (isOpen) => {
    setSelectedHive(null);
    setIsOpen(isOpen);
  };

  // Eliminar colmena
  async function deleteHive() {
    if (!selectedHive) {
      setError("Debe seleccionar una colmena.");
      return;
    }

    try {
      await axiosInstance.delete(`/Api/Hive/DeleteHive?id=${selectedHive}`);
      fetchHives();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error al eliminar la colmena:", error);
      setError("No se pudo eliminar la colmena.");
    }
  }

  // Acciones de la tabla
  const actions = {
    delete: (rowData) => {
      setSelectedHive(rowData[0]);
      setIsModalOpen(true);
    },
    update: (rowData) => {
      
    }
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
                
                  <ContentPage
                    // TitlePage={TitlePage}
                    Data={regisHive}
                    TitlesTable={titlesColmena}
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
        FormPage={<FormHive buttonForm={buttonForm} hive={hive} 
        onDataUpdated={handleDataUpdated}
        // onSuccessSubmit={() => {
        //   fetchHives();  // recarga la tabla
        //   setIsOpen(false);  // cierra el modal
        // }}
        />}
        action={action}
      />

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={deleteHive}
        DeleteTitle={eliminar}
      />
    </div>
  );
}

export default HivePage;
