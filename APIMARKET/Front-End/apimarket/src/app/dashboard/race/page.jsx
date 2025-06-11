"use client";
import { useState, useEffect } from "react";
import NavPrivate from "@/components/navs/NavPrivate";
import ContentPage from "@/components/utils/ContentPage";
import Sidebar from "@/components/navs/Siderbar";
import axiosInstance from "@/lib/axiosInstance";
import ConfirmationModal from "@/components/utils/ConfirmationModal";
import ModalDialog from "@/components/utils/ModalDialog";
import FormRace from "./FormRace";
import DynamicAlert from "@/components/utils/DynamicAlert";
import { ShieldCheck, AlertCircle } from "lucide-react";
import ExportToPDFDialog from "@/components/utils/ExportToPDFDialog"; // 👈 ya estaba importado
import { Bug } from "lucide-react";
import PrivateRoute from "@/app/routes/privateRoute";

function RacePage() {
  const TitlePage = "Raza";
  const eliminar = "¿Estás seguro de que deseas eliminar esta raza?";
  const [action, setAction] = useState("Registrar");
  const [isOpen, setIsOpen] = useState(false);
  const [regisRace, setRegisRace] = useState([]);
  const [selectedRace, setSelectedRace] = useState(null);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [buttonForm, setButtonForm] = useState("Registrar");
  const [isExportModalOpen, setIsExportModalOpen] = useState(false); // 👈 Para controlar el modal de exportación

  // Estados para las alertas (éxito y fallo)
  const [isModalOpen, setModalOpen] = useState(false); // Para alerta de éxito
  const [isModalOpenFall, setModalOpenFall] = useState(false); // Para alerta de fallo
  const [msSuccess, setMsSuccess] = useState("");
  const [error, setError] = useState("");

  const titlesRaza = ["Código", "Nombre", "Descripción"];

  const [race, setRace] = useState({
    id_Race: "",
    nom_Race: "",
    des_Race: "",
  });

  // Función para obtener las razas
  async function fetchRaces() {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get("/Api/Race/GetsAllRace");
      if (response.status === 200) {
        const data = response.data.map((Race) => [
          Race.id_Race || "-",
          Race.nom_Race || "Sin descripción",
          Race.des_Race || "Sin estado",
        ]);
        setRegisRace(data);
      }
    } catch (err) {
      setError("No se pudo cargar la Raza.");
      setModalOpenFall(true);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchRaces();
  }, []);

  // Función para cambiar el título del formulario y cargar datos (para actualizar)
  const updateTextTitleForm = (texto, rowData) => {
    setAction(texto);
    setButtonForm(texto);
    if (texto === "Actualizar") {
      setRace({
        id_Race: rowData[0],
        nom_Race: rowData[1],
        des_Race: rowData[2],
      });
    } else {
      setRace({ id_Race: "", nom_Race: "", des_Race: "" });
    }
  };

  const handleDataUpdated = () => {
    fetchRaces(); // Refresca los datos de la tabla
  };
  // Función para abrir o cerrar el modal del formulario
  const openModalForm = (open) => {
    setIsOpen(open);
  };

  // Función para manejar el éxito al registrar o actualizar la raza
  const handleSuccess = () => {
    const message =
      action === "Registrar"
        ? "La raza ha sido registrada correctamente."
        : "La raza ha sido actualizada correctamente.";
    setMsSuccess(message);
    setModalOpen(true);
    fetchRaces();
    setIsOpen(false);
  };

  // Función para eliminar una raza
  async function deleteRace() {
    if (!selectedRace) {
      setError("Debe seleccionar una Raza.");
      setModalOpenFall(true);
      return;
    }
    try {
      await axiosInstance.delete(`/Api/Race/DeleteRace?id=${selectedRace}`);
      setMsSuccess("La raza ha sido eliminada correctamente.");
      setModalOpen(true);
      fetchRaces();
      setIsModalOpenDelete(false);
    } catch (err) {
      setError("No se pudo eliminar la Raza.");
      setModalOpenFall(true);
    }
  }

  // Acciones para la tabla
  const actions = {
    update: (rowData) => {
      updateTextTitleForm("Actualizar", rowData);
      openModalForm(true);
    },
  };

  return (
    <PrivateRoute requiredRole={["instructor","pasante", "gestor"]}>

    <div className="flex h-screen bg-gray-200">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden text-white">
        <NavPrivate TitlePage={TitlePage} Icon={<Bug/>}/>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background">
          <div className="container mx-auto px-6 py-8 mt-10">
            <div className="rounded-lg border-2 bg-white text-card-foreground shadow-lg">
              <div className="relative p-6">
                <ContentPage
                  Data={regisRace}
                  TitlesTable={titlesRaza}
                  Actions={actions}
                  updateTextTitleForm={updateTextTitleForm}
                  openModalForm={openModalForm}
                  ignorar={[]}
                  setIsExportModalOpen={setIsExportModalOpen}

                  tableName="Raza"

                  showAddButton={true} // 👈 aquí indicas que NO lo muestre
                  showPdfButton={false} // ← aquí se oculta
                />
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Modal del formulario para registrar/actualizar raza */}
      <ModalDialog
        isOpen={isOpen}
        setIsOpen={openModalForm}
        FormPage={
          <FormRace
            buttonForm={buttonForm}
            race={race}
            onDataUpdated={handleDataUpdated}
            closeModal={openModalForm}
          />
        }
        action={action}
      />

      {/* Modal de confirmación para eliminación */}
      <ConfirmationModal
        isOpen={isModalOpenDelete}
        onClose={() => setIsModalOpenDelete(false)}
        onConfirm={deleteRace}
        DeleteTitle={eliminar}
      />

      {/* Modal de éxito usando DynamicAlert */}
      <DynamicAlert
        isOpen={isModalOpen}
        onOpenChange={setModalOpen}
        type="success"
        message={msSuccess || "Operación exitosa"}
        redirectPath=""
      />

      {/* Modal de error usando DynamicAlert */}
      <DynamicAlert
        isOpen={isModalOpenFall}
        onOpenChange={setModalOpenFall}
        type="error"
        message={error || "Ha ocurrido un error inesperado"}
        redirectPath=""

      />

      {/* Modal de exportación a PDF */}
      <ExportToPDFDialog
        isOpen={isExportModalOpen}
        setIsOpen={setIsExportModalOpen}
        TitlePage={TitlePage}
        Data={regisRace}
        TitlesTable={titlesRaza}
      />
    </div>
    </PrivateRoute>
  );
}

export default RacePage;
