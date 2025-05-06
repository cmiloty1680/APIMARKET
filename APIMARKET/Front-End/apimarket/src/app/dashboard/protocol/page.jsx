
"use client";
import React, { useState, useEffect } from "react";
import NavPrivate from "@/components/navs/NavPrivate";
import ContentPage from "@/components/utils/ContentPage";
import Sidebar from "@/components/navs/Siderbar";
import { Eye, Download } from "lucide-react";
import ExportToPDFDialog from "@/components/utils/ExportToPDFDialog"; // 👈 ya estaba importado

import axiosInstance from "@/lib/axiosInstance";
import ConfirmationModal from "@/components/utils/ConfirmationModal";
import ModalDialog from "@/components/utils/ModalDialog";
import FormProtocol from "./FormProtocol";
import DynamicAlert from "@/components/utils/DynamicAlert";
// import ExportToPDFDialog from "@/components/utils/ExportToPDFDialog"; // 👈 ya estaba importado


function ProtocolPage() {
  const TitlePage = "Protocolo";
  const eliminar = "¿Estás seguro de que deseas eliminar este protocolo?";
  const [regisProtocol, setRegisProtocol] = useState([]);
  const [action, setAction] = useState("Registrar");
  const [msSuccess, setMsSuccess] = useState("");
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [isModalOpenFall, setModalOpenFall] = useState(false); // Para alerta de fallo
  const [isExportModalOpen, setIsExportModalOpen] = useState(false); // 👈 Para controlar el modal de exportación
  const [isModalOpen, setModalOpen] = useState(false); // Para alerta de éxito
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProtocol, setSelectedProtocol] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [buttonForm, setButtonForm] = useState("Registrar");

  const titlesProtocol = [
    "Código",
    "Nombre de protocolo",
    "Tipo de protocolo",
    "Fecha de creación",
    "Fecha de Actualización",
    "Nombre de Archivo",
  ];

  const [protocol, setProtocol] = useState({
    id_Protocol: "",
    nom_Protocol: "",
    tip_Protocol: "",
    fecCre_Protocol: "",
    fecAct_Protocol: "",
    archivo_Protocol: "",
  });


  function formatDateToISO(dateString) {
    // Espera algo como "20/04/2025"
    const [day, month, year] = dateString.split("/");
    if (!day || !month || !year) return "";
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  }
  console.log("Archivo", protocol.data);

  async function fetchProtocol() {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get("/Api/Protocol/GetsAllProtocol");
      if (response.status === 200) {
        console.log()

        const data = response.data.map((item) => [
          item.id_Protocol || "-",
          item.nom_Protocol || "Sin descripción",
          item.tip_Protocol || "Sin estado",
          item.fecCre_Protocol ? new Date(item.fecCre_Protocol).toLocaleDateString("es-CO") : "Sin descripción",
          item.fecAct_Protocol ? new Date(item.fecAct_Protocol).toLocaleDateString("es-CO") : "Sin descripción",
          item.archivo_Protocol ? (

            <div className="center gap-2 justify-center items-center">

              <button
                onClick={() => handleDownload(item.archivo_Protocol, `Protocolo_${item.id_Protocol}`)}
                className="text-green-600 hover:text-black-800"
                title="Descargar archivo"
              >
                <Download size={29} />
              </button>
            </div>
          ) : "-"
        ]);

        setRegisProtocol(data);
      }
    } catch (error) {
      console.error("Error al obtener los protocolos:", error);
      setError("No se pudo cargar los protocolos.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchProtocol();
  }, []);

  // Función para obtener el tipo MIME y la extensión del archivo
  const getFileType = (base64) => {
    if (base64.startsWith("JVBER")) {  // Verifica si es un PDF
      return { type: "application/pdf", extension: ".pdf" };
    } else if (base64.startsWith("data:image")) {  // Si es una imagen
      return { type: "image/jpeg", extension: ".jpg" };
    }
    return { type: "application/octet-stream", extension: ".pdf" };  // Otro tipo genérico
  };

  // Función para descargar archivo base64
  const handleDownload = (base64, nombreArchivo) => {
    const byteCharacters = atob(base64);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
      const slice = byteCharacters.slice(offset, offset + 1024);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      byteArrays.push(new Uint8Array(byteNumbers));
    }

    // Obtener tipo MIME y extensión del archivo
    const { type, extension } = getFileType(base64);

    const blob = new Blob(byteArrays, { type });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = nombreArchivo + extension; // Usar la extensión correcta
    link.click();
  };

  // Abrir formulario con acción
  const updateTextTitleForm = (texto, rowData) => {
    setAction(texto);
    setButtonForm(texto);
    setProtocol({});

    if (texto === "Actualizar") {
      setProtocol({
        id_Protocol: rowData[0],
        nom_Protocol: rowData[1],
        tip_Protocol: rowData[2],
        fecCre_Protocol: formatDateToISO(rowData[3]),
        fecAct_Protocol: formatDateToISO(rowData[4]),
        archivo_Protocol: rowData[5],
      });
    }
  };
  const handleDataUpdated = () => {
    fetchProtocol();

    // Refresca los datos de la tabla
  };

  const openModalForm = (isOpen) => {
    setIsOpen(isOpen);
  };
  const handleSuccess = () => {
    const message =
      action === "Registrar"
        ? "El protocolo ha sido registrado correctamente."
        : "El protocolo ha sido actualizado correctamente.";

    setMsSuccess(message);
    setModalOpen(true);
    fetchProtocol();
    setIsOpen(false);
  };
  // Eliminar protocolo
  async function deleteProtocol() {
    if (!selectedProtocol) {
      setError("Debe seleccionar un protocolo.");
      return;
    }

    try {
      await axiosInstance.delete(`/Api/Protocol/DeleteProtocol?id=${selectedProtocol}`);
      fetchProtocol();
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Error al eliminar el protocolo:", error);
      setError("No se pudo eliminar el protocolo.");
      setModalOpenFall(true);

    }
  }

  const actions = {
    delete: (rowData) => {
      setSelectedProtocol(rowData[0]);
      setIsModalOpenDelete(true); // ✅ Esto abre el modal correcto
    },

    // update: (rowData) => {
    //   updateTextTitleForm("Actualizar", rowData);
    //   setIsOpen(true);
    // },
  };







  return (
    <div className="flex h-screen bg-gray-200">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <NavPrivate TitlePage={TitlePage} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="rounded-lg border-2 bg-white text-card-foreground shadow-lg">
            <div className="container mx-auto px-6 py-8 border-4 mt-10 bg-white">
              <div className="relative p-6">
                {error && (
                  <div className="bg-red-500 text-white p-2 rounded mb-4">
                    {error}
                  </div>
                )}
                <ContentPage
                  Data={regisProtocol}
                  TitlesTable={titlesProtocol}
                  Actions={actions}
                  action={action}
                  updateTextTitleForm={updateTextTitleForm}
                  openModalForm={openModalForm}
                  ignorar={[]}
                  tableName="protocol"
                  setIsExportModalOpen={setIsExportModalOpen}

                />
              </div>
            </div>
          </div>
        </main>
      </div>

      <ModalDialog
        isOpen={isOpen}
        setIsOpen={openModalForm}
        FormPage={<FormProtocol buttonForm={buttonForm} protocol={protocol} onSuccess={handleSuccess}
          onDataUpdated={handleDataUpdated}
          closeModal={openModalForm}
        />}
        action={action}
      />

      <ConfirmationModal
        isOpen={isModalOpenDelete}
        onClose={() => setIsModalOpenDelete(false)}
        onConfirm={deleteProtocol}
        DeleteTitle={eliminar}
      />
      {/* MODALES DE ALERTA */}
      <DynamicAlert
        isOpen={isModalOpen}
        onOpenChange={setModalOpen}
        type="success"
        redirectPath="" // o déjalo vacío si no deseas redirigir
      />

      <DynamicAlert
        isOpen={isModalOpen}
        onOpenChange={setModalOpen}
        type="success"
        message={msSuccess}
        redirectPath=""
      />


      {/* Modal de exportación a PDF */}
      <ExportToPDFDialog
        isOpen={isExportModalOpen}
        setIsOpen={setIsExportModalOpen}
        TitlePage={TitlePage}
        Data={regisProtocol}
        TitlesTable={titlesProtocol}
      />
    </div>
  );
}

export default ProtocolPage;