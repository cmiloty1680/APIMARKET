"use client";
import { useState, useEffect } from "react";
import NavPrivate from "@/components/navs/NavPrivate";
import ContentPage from "@/components/utils/ContentPage";
import Sidebar from "@/components/navs/Siderbar";
import axiosInstance from "@/lib/axiosInstance";
import ConfirmationModal from "@/components/utils/ConfirmationModal";
import ModalDialog from "@/components/utils/ModalDialog";
import FormFeeding from "./FormFeeding";
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


function FeedingPage() {
  const TitlePage = "Alimentación";
  const eliminar = "La alimentación";
  const [action, setAction] = useState("Registrar");
  const [isOpen, setIsOpen] = useState(false);
  const [regisFeeding, setRegisFeeding] = useState([]);
  const [selectedFeeding, setSelectedFeeding] = useState(null);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [buttonForm, setButtonForm] = useState("Registrar");
  const [isModalOpen, setModalOpen] = useState(false); // Para alerta de éxito
  const [isModalOpenFall, setModalOpenFall] = useState(false); // Para alerta de fallo
  const [msSuccess, setMsSuccess] = useState("");
  const [error, setError] = useState("");
 

  const titlesFeeding = [
    "Código", "Tipo de alimentación", "Fecha de alimentación", "Cantidad de alimentación", "Valor de alimentación", "Descripción de la colmena","Nombre Responsable","Tipo Responsable","Numero de documento", "Id_Responsible",
  ];

  const [feeding, setFeeding] = useState({
    id_Feeding: '',
    tip_Feeding: '',
    fec_Feeding: '',
    can_Feeding: '',
    vlr_Feeding: '',
    des_Hive: '',
    nam_Responsible: '',
    tip_Responsible: '',
    numDoc_Responsible: '',
    id_Responsible:'',
    id_Hive: ''
  });

  async function fetchFeeding() {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get("/Api/Feeding/GetAllFeeding");
      if (response.status === 200) {
        // console.log(response.data.id_Hive?.id_responsible);
        // console.log("Data de alimentación:", response.data);

        const data = response.data.map((feeding) => [
          feeding.id_Feeding || "-",
          feeding.tip_Feeding || "-",
          feeding.fec_Feeding 
          ? new Date(feeding.fec_Feeding).toLocaleDateString("es-CO", {
            })
          : "Sin descripción",    
          // feeding.fec_Feeding || "Sin descripción",
          feeding.can_Feeding || "-",
          feeding.vlr_Feeding || "-",
          feeding.des_Hive  || "-",
          feeding.nam_Responsible || "-",
          feeding.tip_Responsible ||"-",
          feeding.numDoc_Responsible ||"",
          feeding.id_Responsible || "",   
          feeding.id_Hive || ""
          
        ]);
        setRegisFeeding(data);
      }
    } catch (error) {
      console.error("Error al obtener la alimentación:", error);
      setModalOpenFall(true);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchFeeding();
  }, []);
  const updateTextTitleForm = (texto, rowData ) => {
    setAction(texto);
    setButtonForm(texto);
    setFeeding({})


    if (texto === "Actualizar") {
      console.log("Actualizando...");

     
      setFeeding({
        id_Feeding: rowData[0],
        tip_Feeding: rowData[1],
        fec_Feeding: rowData[2] !== "Sin descripción" ? new Date().toISOString().split('T')[0] : '',
        can_Feeding: rowData[3],
        vlr_Feeding: rowData[4],
        des_Hive: rowData[5],         
        nam_Responsible: rowData[6],
        tip_Responsible: rowData[7],
        numDoc_Responsible: rowData[8],
        id_Responsible: rowData[9],
        id_Hive: rowData[10],     
      });
      console.log("tod", rowData)
    } else {
      console.log("Registrando...");
      
    }
  };



  
  // Función para abrir el modal
  const openModalForm = (Open) => {
    setSelectedFeeding(null);
    setIsOpen(Open);
  };
 // Función para manejar el éxito al registrar o actualizar la raza
 const handleSuccess = () => {
  const message =
    action === "Registrar"
      ? "alimentacion ha sido registrada correctamente."
      : "alimentacion ha sido actualizada correctamente.";
  setMsSuccess(message);
  setModalOpen(true);
  fetchFeeding();
  setIsOpen(false);
};




  async function deleteFeeding() {
    if (!selectedFeeding) {
      setError("Debe seleccionar una alimentación.");
      setIsAlertFail(true);
      return;
    }
    try {
      await axiosInstance.delete(`/Api/Feeding/DeleteFeeding?id=${selectedFeeding}`);
      setMsSuccess("Alimentacion ha sido eliminada correctamente.");
      fetchFeeding();
      setIsModalOpenDelete(false);
      setModalOpen(true);


    } catch (error) {
      console.error("Error al eliminar la alimentación:", error);
      setError("No se pudo eliminar la alimentación.");
      setModalOpenFall(true);

    }
  }
  const actions = {
    delete: (rowData) => {
      setSelectedFeeding(rowData[0]);
      setIsModalOpenDelete(true);

    },
    update: (rowData) => {
      // updateTextTitleForm("Actualizar", rowData);

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
                  {error}</div>)}

                
                  <ContentPage
                    Data={regisFeeding}
                    TitlesTable={titlesFeeding}
                    Actions={actions}
                    // action={action}
                    updateTextTitleForm={updateTextTitleForm}
                    openModalForm={openModalForm}
                    ignorar={[9,10]}
                  />

              </div>
            </div>
          </div>
        </main>
      </div>

      <ModalDialog
        isOpen={isOpen}
        setIsOpen={openModalForm}
        FormPage={<FormFeeding buttonForm={buttonForm} feeding={feeding} onSuccess={handleSuccess}  />}
        action={action}
      />

      <ConfirmationModal
        isOpen={isModalOpenDelete}
        onClose={() => setIsModalOpenDelete(false)}
        onConfirm={deleteFeeding}
        DeleteTitle={eliminar}
      />
      {/* AlertDialog para operaciones exitosas */}
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
              {msSuccess || "Operación exitosa"}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-4">
            <AlertDialogAction

className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 rounded-md hover:from-orange-600 hover:to-red-600 transition-all duration-300"
            >
              Ok
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* AlertDialog para operaciones fallidas */}
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
              {error || "Ha ocurrido un error inesperado"}
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

export default FeedingPage;
