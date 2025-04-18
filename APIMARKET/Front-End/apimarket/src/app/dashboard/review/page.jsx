"use client";
import NavPrivate from "@/components/navs/NavPrivate";
import ContentPage from "@/components/utils/ContentPage";
import Sidebar from "@/components/navs/Siderbar";
import FormReview from "./FormReview";
import axiosInstance from "@/lib/axiosInstance";
import ModalDialog from "@/components/utils/ModalDialog";
import ConfirmationModal from "@/components/utils/ConfirmationModal"; // si luego deseas agregar eliminar
import { useState, useEffect } from "react";
import DynamicAlert from "@/components/utils/DynamicAlert";


function ReviewPage() {
  const TitlePage = "Revisión";
  const eliminar = "¿Estás seguro de que deseas eliminar esta revisión?";
  const [regisReview, setRegisReview] = useState([]);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [action, setAction] = useState("Registrar");
  const [buttonForm, setButtonForm] = useState("Registrar");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpenSuccess, setIsModalOpenSuccess] = useState(false);
  const [isModalOpenError, setIsModalOpenError] = useState(false);
  
  

  const titlesColmena = [
    "ID",
    "Descripción",
    "Fecha",
    "ID Colmena",
    "Nombre",
    "Apellido",
    "ID Responsable"

    
  ];

  const [review, setReview] = useState({
    id_Review: '',
    des_Review: '',
    fec_Review: '',
    id_Responsible: '',
    id_Hive: '',  

  });

  // Obtener revisiones
  async function fetchReview() {
    setIsLoading(true)
    try {
      const response = await axiosInstance.get("/Api/Review/GetsAllReview");
      if (response.status === 200) {
        const data = response.data.map((review) => [
          review.id_Review || "-",
          review.des_Review || "-",
          review.fec_Review || "-",
          review.id_Hive || "-",
          review.nam_Responsible || "-",
          review.lasNam_Responsible || "-",
          review.id_Responsible || "-",

        ]);
        setRegisReview(data);
      }
    } catch (error) {
      console.log("Error al obtener los registros:", error);
      setError("No se pudieron cargar los datos de las revisiones.");
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchReview();
  }, []);

  const handleDataUpdated = () => {
    fetchHives(); // Refresca los datos de la tabla
  };

  // Configurar formulario para actualizar o registrar
  const updateTextTitleForm = (texto, rowData) => {
    console.log(rowData);
    setAction(texto);
    setButtonForm(texto);

    setReview({});

    if (texto === "Actualizar") {
      console.log("Actualizando...")


      setReview({
        id_Review: rowData[0],
        des_Review: rowData[1],
        fec_Review: rowData[2],
        id_Hive: rowData[3],
        id_Responsible: rowData[6]
      });

      console.log(rowData)
    } else {
      console.log("Registrando...");
    }
  };

  const openModalForm = (isOpen) => {
    setSelectedReview(null);
    setIsOpen(isOpen);
  };
  
  //coliminar revicion 
  async function deleteReview() {
    if (!selectedReview){
      setError("Debe seleccionar una colmena.");
      return;
    }
    try {
      await axiosInstance.delete(`/Api/Review/DeleteReview?id=${selectedReview}`);
      fetchReview();
      setIsModalOpen(false);
      setIsModalOpenSuccess(true); 

    } catch (error) {
      console.error("Error al eliminar la revicion:",error);
      setError("No se puede eliminar la colmena.");
      setIsModalOpenError(true); 

    }
  };

  // Acciones de la tabla
  const actions = {
    delete: (rowData) => {
      setSelectedReview(rowData[0]);
      setIsModalOpen(true);
    },
    update: (rowData) => {
    
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <NavPrivate TitlePage={TitlePage} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8 mt-10">
            <div className="rounded-lg border-2 bg-white text-card-foreground shadow-lg">
              <div className="relative p-6">

                <ContentPage
                  Data={regisReview}
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
        FormPage={<FormReview buttonForm={buttonForm} review={review} />}
        action={action}
      />

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={deleteReview}
        DeleteTitle={eliminar}
      />

       {/* MODALES DE ALERTA */}
       <DynamicAlert
        isOpen={isModalOpenSuccess}
        onOpenChange={setIsModalOpenSuccess}
        type="success"
        redirectPath="" // o déjalo vacío si no deseas redirigir
      />

      <DynamicAlert
        isOpen={isModalOpenError}
        onOpenChange={setIsModalOpenError}
        type="error"
        message={error || "Ha ocurrido un error inesperado"}
        redirectPath=""
      />
    </div>
  );
}

export default ReviewPage;