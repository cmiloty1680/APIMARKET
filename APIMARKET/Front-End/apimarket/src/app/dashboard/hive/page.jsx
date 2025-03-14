"use client"
import { useEffect, useState } from "react";
import NavPrivate from "@/components/navs/NavPrivate";
import ContentPage from "@/components/utils/ContentPage";
import Sidebar from "@/components/navs/Siderbar";
import FormHive from "./FormHive";
import FormUpdateHive from "./FormUpdateHive";
import axiosInstance from "@/lib/axiosInstance";
import ConfirmationModal from "@/components/utils/ConfirmationModal";
import ModalDialog from "@/components/utils/ModalDialog";


function HivePage() {
  const eliminar = "Las colmenas";
  const TitlePage = "COLMENA";
  const TitlesPage = "Gestionar Información de las Colmena";
  const [regisColmena, setRegisColmena] = useState([]);
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar el modal
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedHive, setSelectedHive] = useState(null);
  const [selectedRowData, setSelectedRowData] = useState(null);


  const titlesColmena = [
    "Código",
    "Descripción",
    "Estado",
    "N° Cuadros",
    "N° Alzas",
  ];


  async function fetchHives() {
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
        setRegisColmena(data);
      }
    } catch (error) {
      console.error("Error al obtener los registros:", error);
      setError("No se pudieron cargar los datos de las colmenas.");
    }
  }

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
  async function updateHive(formData) {
    try {
      const formattedData = {
        id_Hive: formData.id_Hive,
        des_Hive: formData.des_Hive,
        est_Hive: formData.est_Hive,
        numCua_Hive: parseInt(formData.numCua_Hive, 10),
        numAlz_Hive: parseInt(formData.numAlz_Hive, 10),
      };

      console.log("Datos enviados al backend:", formattedData);

      const response = await axiosInstance.put("/Api/Hive/UpdateHive", formattedData);

      if (response.status === 200) {
        console.log(response.data.message);
        await fetchHives();
        setIsUpdateModalOpen(false);
      } else {
        console.error("Error al actualizar:", response.data);
      }
    } catch (error) {
      console.error("Error en la solicitud PUT:", error);
    }
  }

  

  const openModalForm = (isOpen) => {
    setSelectedProduction();
    // console.log(isOpen);
    setIsOpen(isOpen);
    
  }


  useEffect(() => {
    fetchHives();
    const interval = setInterval(fetchHives, 5000);
    return () => clearInterval(interval);
  }, []);

  const actions = {
    delete: (rowData) => {
      setSelectedHive(rowData[0]);
      setIsModalOpen(true);
    },
    update: (rowData) => {
      setSelectedRowData({
        id_Hive: rowData[0], // Código
        des_Hive: rowData[1], // Descripción
        est_Hive: rowData[2], // Estado
        numCua_Hive: isNaN(rowData[3]) ? 0 : parseInt(rowData[3], 10), // Número de cuadros
        numAlz_Hive: isNaN(rowData[4]) ? 0 : parseInt(rowData[4], 10), // Número de alzas
      });
      setIsUpdateModalOpen(true);
    },
  };

  return (
    <div className="flex h-screen bg-gray-200">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden text-white">
        <NavPrivate TitlePage={TitlesPage} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background">
          <div className="container mx-auto px-6 py-8 mt-10">
            <div className="rounded-lg border-2 bg-white text-card-foreground shadow-lg">
              <div className="relative p-6">
                {error ? (
                  <p className="text-destructive">{error}</p>
                ) : (
                  <ContentPage
                    TitlesPage={TitlePage}
                    Data={regisColmena}
                    TitlesTable={titlesColmena}
                    Actions={actions}
                    // FormPage={FormHive}
                  />
                  
                )}
              </div>
              <ModalDialog
       isOpen={isOpen} 
       setIsOpen={openModalForm} 
       FormPage={FormHive} 
      //  action={action} 
      //  production={production}
       />
            </div>
          </div>
        </main>

      </div>

      {/* Modal de Confirmación para eliminación */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={deleteHive}
        DeleteTitle={eliminar}
      />

      {/* Modal de Actualización */}
      {isUpdateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-md">
            <FormUpdateHive
              hiveData={selectedRowData}
              onClose={() => setIsUpdateModalOpen(false)}
              onUpdate={updateHive}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default HivePage;