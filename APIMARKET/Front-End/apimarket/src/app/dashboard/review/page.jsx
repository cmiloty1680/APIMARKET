"use client";
import NavPrivate from "@/components/navs/NavPrivate";
import ContentPage from "@/components/utils/ContentPage";
import Sidebar from "@/components/navs/Siderbar";
import FormReview from "./FormReview";
import axiosInstance from "@/lib/axiosInstance";
import ModalDialog from "@/components/utils/ModalDialog";
import ConfirmationModal from "@/components/utils/ConfirmationModal"; // si luego deseas agregar eliminar
import { useState, useEffect } from "react";

function ReviewPage() {
  const TitlePage = "Revisión";
  const eliminar = "La revisión";

  const [regisReview, setRegisReview] = useState([]);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [action, setAction] = useState("Registrar");
  const [buttonForm, setButtonForm] = useState("Registrar");

  const titlesColmena = [
    "Código",
    "Descripción",
    "Fecha de Revisión",
    "Tip. protocolo",
    "Nom. protocolo",
    "Nom. responsable",
    "Ape. responsable",
    "Tip. responsable"
  ];

  const [review, setReview] = useState({
    id_Review: "",
    des_Review: "",
    fec_Review: "",
    tip_Protocol: "",
    nom_Protocol: "",
    nam_Responsible: "",
    lasNam_Responsible: "",
    tip_Responsible: ""
  });

  // Obtener revisiones
  async function fetchReview() {
    try {
      const response = await axiosInstance.get("/Api/Review/GetsAllReview");
      if (response.status === 200) {
        const data = response.data.map((review) => [
          review.id_Review || "-",
          review.des_Review || "-",
          review.fec_Review || "-",
          review.tip_Protocol || "-",
          review.nom_Protocol || "-",
          review.nam_Responsible || "-",
          review.lasNam_Responsible || "-",
          review.tip_Responsible || "-"
        ]);
        setRegisReview(data);
      }
    } catch (error) {
      console.log("Error al obtener los registros:", error);
      setError("No se pudieron cargar los datos de las revisiones.");
    }
  }

  useEffect(() => {
    fetchReview();
  }, []);

  // Abrir modal para crear o actualizar
  const openModalForm = (open) => {
    setSelectedReview(null);
    setIsOpen(open);
  };

  // Configurar formulario para actualizar o registrar
  const updateTextTitleForm = (texto, rowData) => {
    setAction(texto);
    setButtonForm(texto);

    setReview({});

    if (texto === "Actualizar") {
      setReview({
        id_Review: rowData[0],
        des_Review: rowData[1],
        fec_Review: rowData[2],
        tip_Protocol: rowData[3],
        nom_Protocol: rowData[4],
        nam_Responsible: rowData[5],
        lasNam_Responsible: rowData[6],
        tip_Responsible: rowData[7]
      });
    }
  };

  // Acciones de la tabla
  const actions = {
    delete: (rowData) => {
      setSelectedReview(rowData[0]);
      setIsModalOpen(true);
    },
    update: (rowData) => {
      updateTextTitleForm("Actualizar", rowData);
      openModalForm(true);
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
                {error && (
                  <div className="bg-red-500 text-white p-2 rounded mb-4">
                    {error}
                  </div>
                )}

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
        FormPage={
          <FormReview
            buttonForm={buttonForm}
            review={review}
            setIsOpen={openModalForm}
            action={action}
          />
        }
        action={action}
      />

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => {
          // Implementar la lógica de eliminación si lo deseas
        }}
        DeleteTitle={eliminar}
      />
    </div>
  );
}

export default ReviewPage;
