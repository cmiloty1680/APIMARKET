"use client"
import { useEffect, useState } from "react";
import NavPrivate from "@/components/navs/NavPrivate";
import ContentPage from "@/components/utils/ContentPage";
import  Sidebar  from "@/components/navs/Siderbar"
import FormFeeding from "./FormFeeding";
import axiosInstance from "@/lib/axiosInstance";
function FeedingPage() {
    const TitlePage = "Alimentación";
    const DeleteRegistro = "este registro de Alimentación?";
    const [regisFeeding, setRegisFeeding] = useState([]);
    const [error, setError] = useState(null);
    const [selectedFeeding, setSelectedFeeding] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
  
      const titlesColmena = [
        "Codigo",
        "Tipo de alimentación",
        "Fecha de alimentación",
        "Cantidad de alimentación",
        "Valor de alimentación",
    ]
    async function fecthFeeding(){
      try {
        const response = await axiosInstance.get("/Api/Feeding/GetsFedding");
        if (response.status === 200) {
          const data = response.data.map((feeding)=> [
            feeding.id_Feeding || "-",
            feeding.tip_Feeding || "Sin estado",
            feeding.fec_Feeding || "No valido",
            feeding.can_Feeding != null ? feeding.can_Feeding : "-",
            feeding.vlr_Feeding != null ? feeding.vlr_Feeding : "-",
          ]) ;
          setRegisFeeding(data);
        }
      
      }
      catch (error) {
        console.log("Error al obtener los registros", error);
        setError("No se pudieron cargar los datos de la alimenación.");
      }
    }

    useEffect(() => {
        fecthFeeding();
        // Actualización periódica (cada 5 segundos)
        const interval = setInterval(fecthFeeding, 5000);
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
            
          <ContentPage TitlePage={TitlePage} Data={regisFeeding} TitlesTable={titlesColmena} FormPage={FormFeeding}/>
          </div>
        </main>
      </div>
    </div>
        </>

     );
}

export default FeedingPage;