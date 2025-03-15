"use client";
import React, { useState, useEffect } from "react";
import NavPrivate from "@/components/navs/NavPrivate";
import ContentPage from "@/components/utils/ContentPage";
import Sidebar from "@/components/navs/Siderbar";
import axiosInstance from "@/lib/axiosInstance";
import ConfirmationModal from "@/components/utils/ConfirmationModal";
import ModalDialog from "@/components/utils/ModalDialog";
import FormProduction from "./FormProduction";

function ProductionPage() {
  const TitlePage = "Producción";
  const eliminar = "La producción";
  const [action , setAction] = useState("Registrar");
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar el modal
  const [regisProduction, setRegisProduction] = useState([]);
  const [error, setError] = useState(null);
  const [selectedProduction, setSelectedProduction] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [buttonForm, setButtonForm] = useState("Registrar")

  const titlesProduction = [
    "Código",
    "Fecha de Inicio",
    "Fecha de Fin",
    "Cantidad de Abejas",
    "Cantidad de Colmenas",
    "Cantidad de Producción",
    "Nom_Raza"
  ];

  const [production, setProduction] = useState({
    id_Production: '',
    fecIni_Production: '',
    fecFin_Production: '',
    cant_Abejas: '',
    tot_Colmen: '', // Faltaba este campo
    can_Production: '',
    nom_Race: ''
});


  // Obtener producción
  async function fetchProduction() {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get("/Api/Production/GetsAllProduction");
      if (response.status === 200) {
        const data = response.data.map((production) => [
          production.id_Production || "-",
          production.fecIni_Production || "Sin descripción",
          production.fecFin_Production || "Sin estado",
          production.cant_Abejas != null ? production.cant_Abejas : "-",
          production.tot_Colmen != null ? production.tot_Colmen : "-",
          production.can_Production != null ? production.can_Production: "-",
          production.nom_Race != null ? production.nom_Race: "-"
        ]);
        setRegisProduction(data);
        console.log(data);
      }
    } catch (error) {
      console.error("Error al obtener la producción:", error);
      setError("No se pudo cargar la producción.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProduction();
  }, []);

  const getProduction = async (id_Production) => {
    try {
      const response = await axiosInstance.get(`/Api/Production/GetProduction?id=${id_Production}`);
      if (response.status === 200) {
        setProduction({
          id_Production: response.data.id_Production,
          fecIni_Production: response.data.fecIni_Production,
          fecFin_Production: response.data.fecFin_Production,
          cant_Abejas: response.data.cant_Abejas,
          tot_Colmen: response.data.tot_Colmen,
          can_Production: response.data.can_Production,
          nom_Race: response.data.nom_Race,
        });
  
        setAction("Actualizar");
        setIsOpen(true); // Abre el modal de edición
      }
    } catch (error) {
      console.error("Error al obtener la producción:", error);
    }
  };
  

  //funcion para cambiar el titulo del formulario
  const updateTextTitleForm = (texto, rowData) => {
    setAction(texto)
    if (texto === "Actualizar"){
      console.log("Actualizando....")
      actions.update(rowData)
      console.log(rowData)
    } else {
      console.log("Registrando...")
    }
  }


  //open modal para abrir form
  const openModalForm = (isOpen) => {
    setSelectedProduction();
    // console.log(isOpen);
    setIsOpen(isOpen);
    
  }

  // Eliminar producción
  async function deleteProduction() {
    if (!selectedProduction) {
      setError("Debe seleccionar una producción.");
      return;
    }

    try {
      await axiosInstance.delete(`/Api/Production/DeleteProduction?id=${selectedProduction}`);
      fetchProduction();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error al eliminar la producción:", error);
      setError("No se pudo eliminar la producción.");
    }
  }

  
  // Acciones de la tabla
  const actions = {
    delete: (rowData) => {
      setSelectedProduction(rowData[0]);
      setIsModalOpen(true);
    },


    update: (rowData) => {
      getProduction(rowData[0])
      // setProduction({
      //   id: rowData[0],
      //   fecIni_Production: rowData[1],
      //   fecFin_Production: rowData[2],
      //   cant_Abejas: rowData[3],
      //   tot_Colmen: rowData[4],
      //   can_Production: rowData[5],
      //   nom_Race: rowData[6],
      // });
      
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
                {error && (
                  <div className="bg-red-500 text-white p-2 rounded mb-4">
                    {error}
                  </div>
                )}

                {isLoading ? (
                  <p className="text-gray-500 text-center">Cargando datos...</p>
                ) : regisProduction.length === 0 ? (
                  <p className="text-gray-500 text-center">No hay datos de producción disponibles.</p>
                ) : (
                  <ContentPage
                    TitlePage={TitlePage}
                    Data={regisProduction}
                    TitlesTable={titlesProduction}
                    Actions={actions}
                    action={action}
                    updateTextTitleForm={updateTextTitleForm}
                    openModalForm={openModalForm}
                  />
                  
                )}
              </div>
              
            </div>
          </div>
        </main>
      </div>

      {/* Modal que se abrirá al hacer clic en "Agregar" */}
      <ModalDialog
       isOpen={isOpen} 
       setIsOpen={openModalForm} 
       FormPage={FormProduction} 
       action={action} 
       production={production}
       buttonForm={buttonForm}
       />
       {/* Modal de confirmación */}
      <ConfirmationModal
         isOpen={isModalOpen}
         onClose={() => setIsModalOpen(false)}
         onConfirm={deleteProduction}
         DeleteTitle={eliminar}
      />
    </div>
  );
}

export default ProductionPage;
