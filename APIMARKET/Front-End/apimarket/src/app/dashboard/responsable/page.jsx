"use client"
import NavPrivate from "@/components/navs/NavPrivate";
import ContentPage from "@/components/utils/ContentPage";
import Sidebar from "@/components/navs/Siderbar";
import axiosInstance from "@/lib/axiosInstance";
import React, { useState, useEffect } from "react";


function
  ResponsiblePage() {
  const TitlePage = "Responsable";
  const [regisResponsible, setRegisResponsible] = useState([]);
  const titlesResponsable = [
    "Codigo",
    "Nombre",
    "Apellido",
    "N° documento",
    "Tipo",
    "Telefono",
    "Correo"

  ];
  

  useEffect(() => {
    const fetchResponsibles = async () => {
      try {
        const response = await axiosInstance.get("/Api/Responsible/GetsAllResponsible");
        setRegisResponsible(response.data);
      } catch (error) {
        console.error("Error al obtener la lista de responsables:", error);
      }
    };

    fetchResponsibles();
  }, []);

  const formattedData = regisResponsible.map((responsible) => [
    responsible.id_Responsible || "-",
    responsible.nam_Responsible || "-",
    responsible.lasNam_Responsible || "-",
    responsible.numDoc_Responsible != null ? responsible.numDoc_Responsible : "-",
    responsible.tip_Responsible != null ? responsible.tip_Responsible : "-",
    responsible.pho_Responsible != null ? responsible.pho_Responsible : "-",
    responsible.emai_Responsible != null ? responsible.emai_Responsible : "-",

  ]);



  return (
    <>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <NavPrivate />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
            <div className="container mx-auto px-6 py-8 border-4 mt-10 bg-white">
              <div className="relative p-6">
                <ContentPage
                  TitlePage={TitlePage}
                  Data={formattedData}
                  TitlesTable={titlesResponsable}
                // FormPage={}
                />
              </div>

            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default
  ResponsiblePage;