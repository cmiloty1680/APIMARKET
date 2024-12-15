"use client"
import NavPrivate from "@/components/navs/NavPrivate";
import ContentPage from "@/components/utils/ContentPage";
import  Sidebar  from "@/components/navs/Siderbar";
import FormReview from "./FormReview";
function ReviewPage() {
    const TitlePage = "Revisión";
    const regisColmena = [
        [ 1, "Juan Pérez", "Apicultor"], 
        [ 2, "Miguel tomp", "Supervisor"], 
        [ 3, "Pablo Huepa", "Apicultor"], 
        [ 4, "Diego Tique", "Supervisor"], 
        [ 5, "Yimi Ducuara", "Apicultor"], 
        [ 6, "Wuillam Ducuara", "Supervisor"], 
        [ 7, "Raul Sanchez", "Apicultor"], 
        [ 5, "Yimi Ducuara", "Apicultor"], 
        [ 6, "Wuillam Ducuara", "Supervisor"], 
        [ 7, "Raul Sanchez", "Apicultor"], 
        
      ]
      const titlesColmena = [
        "Codigo",
        "Fecha de Revisión",
        "Descripción",
    ]
    return ( 
        <>
        <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <NavPrivate TitlePage={TitlePage}/>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8 border-4 mt-10 bg-white">
            
          <ContentPage TitlePage={TitlePage} Data={regisColmena} TitlesTable={titlesColmena} FormPage={FormReview}/>
          </div>
        </main>
      </div>
    </div>
        </>

     );
}

export default ReviewPage;