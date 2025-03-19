"use client"
import NavPrivate from "@/components/navs/NavPrivate";
import ContentPage from "@/components/utils/ContentPage";
import  Sidebar  from "@/components/navs/Siderbar";
import FormReview from "./FormReview";
import axiosInstance from "@/lib/axiosInstance";
import { useState, useEffect } from "react";
import ModalDialog from "@/components/utils/ModalDialog";
function ReviewPage() {
    const TitlePage = "Revisión";
    const [regisReview, setRegisReview] = useState([]);
    const [error , setError] = useState(null);
    const [isOpen, setIsOpen] = useState();
    const [selectedReview, setSelectedReview] = useState();
    const [action, setAction] = useState("Registrar");
    const [buttonForm, setButtonForm] = useState("Registrar");

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
    
    const [review, setReview] = useState({
      id_Review: "-",
      des_Review: "-",
      fec_Review: "-",
      tip_Protocol: "-",
      nom_Protocol: "-",
      nam_Responsible: "-",
      lasNam_Responsible: "-",
      tip_Responsible: "-",

    });

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
      }, []);

      const updateTextTitleForm =  (texto, rowData) => {
        console.log(rowData);
        setAction(texto);
        setButtonForm(texto);
        setReview({})

        if(texto === "Actualizar"){
          console.log("Actualizando..");

          setReview({
            id_Review: rowData[0],
            des_Review: rowData[1],
            fec_Review: rowData[2],
            tip_Protocol: rowData[3],
            nom_Protocol: rowData[4],
            nam_Responsible: rowData[5],
            lasNam_Responsible: rowData[6],
            tip_Responsible: rowData[7],
          });

        } else {
          console.log("Registrando..");
        }

        
      };

      const openModalForm = (isOpen) => {
        setSelectedReview(null);
        setIsOpen();

      }
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
            <ModalDialog
            FormPage={<FormReview buttonForm={buttonForm} review={review} />}
            />
          
          </div>
        </main>
      </div>
    </div>
        </>

     );
}

export default ReviewPage;