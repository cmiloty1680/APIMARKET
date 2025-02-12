"use client"
import NavPrivate from "@/components/navs/NavPrivate";
import ContentPage from "@/components/utils/ContentPage";
import  Sidebar  from "@/components/navs/Siderbar"
import FormProtocol from "./FormProtocol";
import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axiosInstance";

function Protocol() {
    const TitlePage = "Protocolo";
    const [regisProtocol, setRegisProtocol] = useState([]);
    const [error, setError] = useState(null);

    

      const titlesColmena = [
        "Codigo",
        "Nombre de protocolo",
        "Tipo de protocolo",
        "Fecha de creación",
        "Fecha de Actualización"
    ]

    async function fetchProtocol() {
      try {
        const response = await axiosInstance.get("/Api/Protocol/GetsAllProtocol");
        if (response.status === 200) {
          const data = response.data.map((protocol) => [
            protocol.id_Protocol || "-", // Código
            protocol.nom_Protocol || "Sin descripción", 
            protocol.tip_Protocol || "Sin estado", 
            protocol.fecCre_Protocol || "-", 
            protocol.fecAct_Protocol ||  "-", 
  
          ]);
          setRegisProtocol(data);
        }
      } catch (error) {
        console.error("Error al obtener los registros:", error);
        setError("No se pudieron cargar los datos de las producción.");
      }
    }
    
    useEffect(() => {
        fetchProtocol();
        // Actualización periódica (cada 5 segundos)
        const interval = setInterval(fetchProtocol, 5000);
        return () => clearInterval(interval);
      }, []);


    return ( 
        <>
        <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <NavPrivate TitlePage={TitlePage}/>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8 border-4 mt-10 bg-white">
          <div className="relative p-6">
                  {error ? (
                    <p className="text-destructive">{error}</p>
                  ) : (
                    <ContentPage 
                    TitlePage={TitlePage} 
                    Data={regisProtocol} 
                    TitlesTable={titlesColmena} 
                    FormPage={FormProtocol}/>
                  )}
                </div>
          </div>
        </main>
      </div>
    </div>
        </>

     );
}

export default Protocol;