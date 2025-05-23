"use client";
import React, { useState, useEffect } from "react";
import NavPrivate from "@/components/navs/NavPrivate";
import ContentPage from "@/components/utils/ContentPage";
import Sidebar from "@/components/navs/Siderbar";
import axiosInstance from "@/lib/axiosInstance";
// import ConfirmationModal from "@/components/utils/ConfirmationModal";
// import ModalDialog from "@/components/utils/ModalDialog";
// import FormHive from "./FormHive";
// import DynamicAlert from "@/components/utils/DynamicAlert";
import { Hexagon, User } from "lucide-react";
import PrivateRoute from "@/app/routes/privateRoute";
import FormPerfil from "./FormPerfil";



function settingsPage() {
        const TitlePage = "Configuraciòn de perfil";

    return ( 
        <>
        <PrivateRoute requiredRole={["instructor","pasante", "gestor"]}>
            <div className="flex h-screen bg-gray-200">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden text-white">
        <NavPrivate TitlePage={TitlePage} Icon={<User/>}/>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background">
             <div className="rounded-lg border-2 bg-white text-card-foreground shadow-lg">
              <div className="relative p-6">

                <FormPerfil/>

              </div>
            </div>
          {/* <div className="container mx-auto px-6 py-8 mt-10">
           
          </div> */}
        </main>
      </div>
    </div>

        </PrivateRoute>

        </>
     );
}

export default settingsPage;