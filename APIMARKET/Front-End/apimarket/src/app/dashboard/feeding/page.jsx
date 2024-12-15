"use client"
import NavPrivate from "@/components/navs/NavPrivate";
import ContentPage from "@/components/utils/ContentPage";
import  Sidebar  from "@/components/navs/Siderbar"
import FormFeeding from "./FormFeeding";
function FeedingPage() {
    const TitlePage = "Alimentación";
    const regisColmena = [
        [ 1, "Juan Pérez", "Apicultor", "5 años"], 
        [ 2, "Miguel tomp", "Supervisor", "8 años"], 
        [ 3, "Pablo Huepa", "Apicultor", "5 años"], 
        [ 4, "Diego Tique", "Supervisor", "8 años"], 
        [ 5, "Yimi Ducuara", "Apicultor", "5 años"], 
        [ 6, "Wuillam Ducuara", "Supervisor", "8 años"], 
        [ 7, "Raul Sanchez", "Apicultor", "5 años"], 
        [ 5, "Yimi Ducuara", "Apicultor", "5 años"], 
        [ 6, "Wuillam Ducuara", "Supervisor", "8 años"], 
        [ 7, "Raul Sanchez", "Apicultor", "5 años"], 
        
      ]
      const titlesColmena = [
        "Codigo",
        "Tipo de alimentación",
        "Fecha de alimentación",
        "Cantidad de alimentación",
        "Valor de alimentación",
    ]
    return ( 
        <>
        <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <NavPrivate TitlePage={TitlePage}/>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8 border-4 mt-10 bg-white">
            
          <ContentPage TitlePage={TitlePage} Data={regisColmena} TitlesTable={titlesColmena} FormPage={FormFeeding}/>
          </div>
        </main>
      </div>
    </div>
        </>

     );
}

export default FeedingPage;