"use client"
import NavPrivate from "@/components/navs/NavPrivate";
import ContentPage from "@/components/utils/ContentPage";
import  Sidebar  from "@/components/navs/Siderbar";
import FormReview from "./FormReview";
import axiosInstance from "@/lib/axiosInstance";
import { useState, useEffect } from "react";
function ReviewPage() {
    const TitlePage = "Revisión";
    const [regisReview, setRegisReview] = useState([]);
    const [error , setError] = useState(null);
    const titlesColmena = [
        "Codigo",
        "Descripción",
        "Fecha de Revisión",
        "Tip_protocolo",
        "Nom_protocolo",
        "Nom_responsable",
        "Ape_responsable",
        "Tip_responsable"
    ];
    

    async function fetchReview(){
      try {
        const response = await axiosInstance.get("/Api/Review/GetsAllReview");
        if (response.status === 200){
          const data = response.data.map((review) =>[
            review.id_Review || "-",
            review.des_Review || "-",
            review.fec_Review || "-",
            review.tip_Protocol != null ? review.tip_Protocol: "-",
            review.nom_Protocol != null ? review.nom_Protocol: "-",
            review.nam_Responsible != null ? review.nam_Responsible: "-",
            review.lasNam_Responsible != null ? review.lasNam_Responsible: "-",
            review.tip_Responsible != null ? review.tip_Responsible: "-",
          ]);
          setRegisReview(data);
        }
      } catch(error) {
        console.log("Error al obtener los registros:", error);
        setError("No se pudieron cargar los datos de las revisiones.");
      }
    }
    useEffect(() => {
        fetchReview();
        // Actualización periódica (cada 5 segundos)
        const interval = setInterval(fetchReview, 5000);
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
                  Data={regisReview} 
                  TitlesTable={titlesColmena} 
                  FormPage={FormReview}/>
                )}
            </div>
          
          </div>
        </main>
      </div>
    </div>
        </>

     );
}

export default ReviewPage;