"use client"
import { useEffect, useState } from "react";
import NavPrivate from "@/components/navs/NavPrivate";
import ContentPage from "@/components/utils/ContentPage";
import Sidebar from "@/components/navs/Siderbar"
import FormProduction from "./FormProduction";
import axiosInstance from "@/lib/axiosInstance";
import ConfirmationModal from "@/components/utils/ConfirmationModal";


function ProductionPage() {
  const TitlePage = "Producción";
  const DeleteRegistro = "este registro de producción?";
  const [regisProduction, setRegisProduction] = useState([]);
  const [error, setError] = useState(null);
  const [selectedProduction, setSelectedProduction] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const titlesProduction = [
    "Codigo",
    "Fecha de Inicio",
    "Fecha de Fin",
    "Cantidad de abejas",
    "Cantidad de Colmenas",
    "Cantidad de Producción"
  ]
  async function fetchProduction() {
    try {
      const response = await axiosInstance.get("/Api/Production/GetsAllProduction");
      if (response.status === 200) {
        const data = response.data.map((production) => [
          production.id_Production || "-", // Código
          production.fecIni_Production || "Sin descripción", // Descripción
          production.fecFin_Production || "Sin estado", // Estado
          production.cant_Abejas != null ? production.cant_Abejas : "-", // N° Cuadros
          production.tot_Colmen != null ? production.tot_Colmen : "-", // N° Alzas
          production.can_Production != null ? production.can_Production : "-", // N° Alzas

        ]);
        setRegisProduction(data);
      }
    } catch (error) {
      console.error("Error al obtener los registros:", error);
      setError("No se pudieron cargar los datos de las producción.");
    }
  }
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
  // Ejecuta fetchHives al montar el componente y configura un intervalo
  useEffect(() => {
    fetchProduction();
    // Actualización periódica (cada 5 segundos)
    const interval = setInterval(fetchProduction, 5000);
    return () => clearInterval(interval);
  }, []);


  const actions = {
    delete: (rowData) => {
      setSelectedProduction(rowData[0]);
      setIsModalOpen(true);
    }
  }


  return (
    <>

      <div className="flex h-screen bg-gray-200">
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-hidden text-white">
          <NavPrivate TitlePage={TitlePage} />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background">
            <div className="container mx-auto px-6 py-8 mt-10">
              <div className="rounded-lg border-2 bg-white text-card-foreground shadow-lg">
                <div className="relative p-6">
                  {error ? (
                    <p className="text-destructive">{error}</p>
                  ) : (
                    <ContentPage
                      TitlePage={TitlePage}
                      Data={regisProduction}
                      TitlesTable={titlesProduction}
                      Actions={actions}
                      FormPage={FormProduction}
                    />
                  )}
                </div>
              </div>
            </div>
          </main>

        </div>

        {/* Modal de Confirmación para eliminación */}
        <ConfirmationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={deleteProduction}
          DeleteTitle={DeleteRegistro}
        />
      </div>
    </>

  );
}

export default ProductionPage;