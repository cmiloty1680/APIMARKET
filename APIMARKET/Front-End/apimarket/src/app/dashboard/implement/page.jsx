"use client";
import { useEffect, useState } from "react";
import NavPrivate from "@/components/navs/NavPrivate";
import ContentPage from "@/components/utils/ContentPage";
import  Sidebar  from "@/components/navs/Siderbar";
import axiosInstance from "@/lib/axiosInstance";
import FormImplement from "./FormImplement";

function ImplementPage() {
    const TitlePage = "Implemento";
    // const DeleteRegistro = "este registro de producción?";
    const [regisImplement, setRegisImplement] = useState([]);
    const [error, setError] = useState(null);
    // const [selectedProduction, setSelectedProduction] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const titlesImplement = [
        "Codigo",
        "Nombre del Implemento",
        "Tipo de Implemento",
        "Fecha de Ingreso",
        "Valor del Implemento",
        "Existencia"
      ]

      async function fetchImplement() {
        try {
            const response = await axiosInstance.get("/Api/Implement/GetsImplement");
            if (response.status === 200) {
                const data = response.data.map((implement) =>[
                    implement.id_Implement || "-",
                    implement.nom_Implement || "-",
                    implement.tip_Implement || "-",
                    implement.fechIng_Implement || "-",
                    implement.vlr_Implement != null ? implement.vlr_Implement: "-",
                    implement.exi_Implement || "-",
                ]);
                setRegisImplement(data);
        }
      } catch (error) {
        console.error("Error al obtener los registros:", error);
        setError("No se pudieron cargar los datos de las producción.");  
      }
    }
    useEffect(() => {
        fetchImplement();
        // Actualización periódica (cada 5 segundos)
        const interval = setInterval(fetchImplement, 5000);
        return () => clearInterval(interval);
      }, []);
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
                      Data={regisImplement}
                      TitlesTable={titlesImplement}
                    //   Actions={actions}
                      FormPage={FormImplement}
                    />
                  )}
                </div>
              </div>
            </div>
          </main>

        </div>
      </div>
        </>
    );
}

export default ImplementPage;