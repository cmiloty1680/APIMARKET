
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
import ExportToPDFDialog from "@/components/utils/ExportToPDFDialog"; // 👈 ya estaba importado
import { ClipboardCheck } from "lucide-react";
import PrivateRoute from "@/app/routes/privateRoute";


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
  const [isExportModalOpen, setIsExportModalOpen] = useState(false); // 👈 Para controlar el modal de exportación
  
  

  const titlesColmena = [
    "ID",
    "Descripción",
    "Fecha",
    "ID Colmena",
    "ID Responsable",
    "Nombre",
    "Apellido",

    
  ];

  const [review, setReview] = useState({
    id_Review: '',
    des_Review: '',
    fec_Review: '',
    id_Responsible: '',
    id_Hive: '',  

  });

  function formatDateToISO(dateString) {
    // Espera algo como "20/04/2025"
    const [day, month, year] = dateString.split("/");
    if (!day || !month || !year) return "";
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  }
  

  // Obtener revisiones
  async function fetchReview() {
    setIsLoading(true)
    try {
      const response = await axiosInstance.get("/Api/Review/GetsAllReview");
      if (response.status === 200) {
        const data = response.data.map((review) => [
          review.id_Review || "-",
          review.des_Review || "-",
          review.fec_Review ? new Date(review.fec_Review).toLocaleDateString("es-CO")
          : "Sin descripción", 
          // review.fec_Review || "-",
          review.id_Hive || "-",
          review.id_Responsible || "-",
          review.nam_Responsible || "-",
          review.lasNam_Responsible || "-",

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
    fetchReview(); // Refresca los datos de la tabla
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
        fec_Review: formatDateToISO(rowData[2]),
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
    update: (rowData) => {
    
    }
  };

  return (
    <PrivateRoute requiredRole={["instructor","pasante", "gestor"]}>

    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <NavPrivate TitlePage={TitlePage} Icon={<ClipboardCheck/>}/>
        <main className="flex-1 overflow-x-hidden overflow-y-auto  bg-background">
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
                  setIsExportModalOpen={setIsExportModalOpen}
                  ignorar={[4]}
                  tableName="Revisiòn"

                  showAddButton={true} // 👈 aquí indicas que NO lo muestre
                />
              </div>
            </div>
          </div>
        </main>
      </div>

      <ModalDialog
        isOpen={isOpen}
        setIsOpen={openModalForm}
        FormPage={<FormReview buttonForm={buttonForm} review={review} 
        onDataUpdated={handleDataUpdated}
        closeModal={openModalForm}/>}
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

      {/* Modal de exportación a PDF */}
            <ExportToPDFDialog
              isOpen={isExportModalOpen}
              setIsOpen={setIsExportModalOpen}
              TitlePage={TitlePage}
              Data={regisReview}
              TitlesTable={titlesColmena}
            />
    </div>
    </PrivateRoute>
  );
}

export default ReviewPage;
