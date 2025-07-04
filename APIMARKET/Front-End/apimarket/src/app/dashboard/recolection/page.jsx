
// "use client";
// import NavPrivate from "@/components/navs/NavPrivate";
// import ContentPage from "@/components/utils/ContentPage";
// import Sidebar from "@/components/navs/Siderbar";
// import FormHoneyCollection from "./FormHoneyCollection";
// import ModalDialog from "@/components/utils/ModalDialog";
// import ConfirmationModal from "@/components/utils/ConfirmationModal";
// import React, { useState, useEffect } from "react";
// import axiosInstance from "@/lib/axiosInstance";
// import ExportToPDFDialog from "@/components/utils/ExportToPDFDialog"; // 👈 ya estaba importado
// import { Droplet } from "lucide-react";
// import PrivateRoute from "@/app/routes/privateRoute";


// function HoneyCollection() {
//   const TitlePage = "Recolección de Miel";
//   const DeleteRegistro = "¿Estás seguro de que deseas eliminar esta recolección de miel?";

//   const [regisHoney, setRegisHoney] = useState([]);
//   const [selectedHoney, setSelectedHoney] = useState(null);
//   const [isOpen, setIsOpen] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [action, setAction] = useState("Registrar");
//   const [buttonForm, setButtonForm] = useState("Registrar");
//   const [isExportModalOpen, setIsExportModalOpen] = useState(false); // 👈 Para controlar el modal de exportación
  

//   const titlesHoney = [
//     "ID",
//     "Descripción",
//     "Cantidad de Miel",
//     "Fecha",
//     "Frascos 125ml",
//     "Frascos 250ml",
//     "Unidad",
//     "Responsable",
//     "ID Producción",
//     "ID Responsable",
//     "Nombre de producción",
//     "Fecha de inicio de producción",
//     "Fecha de Fin de producción",
//     "Subcentro",
//     "Centro de costo",
//     "total Colmena",
//     // "total produccion",
//     "cantidad de cuadros",

//   ];

//   const [honeyCollection, setHoneyCollection] = useState({
//     id_HoneyCollection: "",
//     des_HoneyCollection: "",
//     tot_HoneyCollection: "",
//     fec_HoneyCollection: "",
//     canFra125_HoneyCollection: "",
//     canFra250_HoneyCollection: "",
//     uniMed_HoneyCollection: "",
//     id_Responsible: "",
//     id_Production: "",
//   });

//   function formatDateToISO(dateString) {
//     // Espera algo como "20/04/2025"
//     const [day, month, year] = dateString.split("/");
//     if (!day || !month || !year) return "";
//     return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
//   }
  

//   useEffect(() => {
//     fetchHoneyCollections();
//   }, []);

//   const fetchHoneyCollections = async () => {
//     try {
//       const response = await axiosInstance.get("/Api/HoneyCollection/GetAllHoneyCollection");
//       if(response.status === 200){
//         const data = response.data.map((honey) => [
//           honey.id_HoneyCollection || "-",
//           honey.des_HoneyCollection || "Sin descripción",
//           honey.tot_HoneyCollection || "-",
//           honey.fec_HoneyCollection ? new Date(honey.fec_HoneyCollection).toLocaleDateString("es-CO")
//           : "Sin descripción", 
//           honey.canFra125_HoneyCollection || "-",
//           honey.canFra250_HoneyCollection || "-",
//           honey.uniMed_HoneyCollection || "ml",
//           honey.nam_Responsible || "-",
//           honey.id_Production || "-",
//           honey.id_Responsible || "-",
//           honey.nom_Production || "-",
//           honey.fecIni_Production ? new Date(honey.fecIni_Production).toLocaleDateString("es-CO")
//           : "Sin descripción", 
//           honey.fecFin_Production ? new Date(honey.fecFin_Production).toLocaleDateString("es-CO")
//           : "Sin descripción", 
//           honey.subCen_Production || "-",
//           honey.cenCos_Production || "-",
//           honey.totColm_Hive || "-",
//           // honey.tot_Production || "-",
//           honey.canCua_Production || "-",
//         ]);
//         setRegisHoney(data);
//       }
//     } catch (error) {
//       console.error("Error al obtener la lista de recolecciones:", error);
//     } finally {
//       setIsLoading(false)
//     }
//   };



//   const updateTextTitleForm = (texto, rowData) => {
//     setAction(texto);
//     setButtonForm(texto);
//     setHoneyCollection({});

//     if (texto === "Actualizar") {
//       setHoneyCollection({
//         id_HoneyCollection: rowData[0],
//         des_HoneyCollection: rowData[1],
//         tot_HoneyCollection: rowData[2],
//         fec_HoneyCollection: formatDateToISO(rowData[3]),
//         canFra125_HoneyCollection: rowData[4],
//         canFra250_HoneyCollection: rowData[5],
//         uniMed_HoneyCollection: rowData[6],
//         id_Responsible: rowData[9],
//         id_Production: rowData[8],
//         // fecIni_Production: formatDateToISO(rowData[11]),
//         // fecFin_Production: formatDateToISO(rowData[12])
//       });
//       console.log(rowData);
//     } else {
     
//       console.log("Registrando...");
//     }
//   };

//   const openModalForm = (isOpen) => {
//     setSelectedHoney(null);
//     setIsOpen(isOpen);
//   };

//   async function deleteHoney() {
//     if (!selectedHoney) {
//       setError("Debe seleccionar una recolección.");
//       return;
//     }

//     try {
//       await axiosInstance.delete(`/Api/HoneyCollection/DeleteHoneyCollection?id=${selectedHoney}`);
//       fetchHoneyCollections();
//       setIsModalOpen(false);
//     } catch (error) {
//       console.error("Error al eliminar la recolección:", error);
//       setError("No se pudo eliminar la recolección.");
//     }
//   }

//   const handleDataUpdated = () => {
//     fetchHoneyCollections();
//   };

//    // Acciones de la tabla
//    const actions = {
//     update: (rowData) => {
    
//     }

 
//   };

//   return (
//     <>
//       <PrivateRoute requiredRole={["instructor","pasante", "gestor"]}>

//       <div className="flex h-screen bg-gray-100">
//         <Sidebar />
//         <div className="flex flex-col flex-1 overflow-hidden">
//           <NavPrivate TitlePage={TitlePage} Icon={<Droplet/>}/>
//           <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background">
//             <div className="container mx-auto px-6 py-8 mt-10">
//               <div className="rounded-lg border-2 bg-white text-card-foreground shadow-lg">

//               <div className="relative p-6">
//               {error && (
//                   <div className="bg-red-500 text-white p-2 rounded mb-4">
//                     {error}
//                   </div>
//                 )}
//                   <ContentPage
//                     Data={regisHoney}
//                     TitlesTable={titlesHoney}
//                     Actions={actions}
//                     action={action}
//                     updateTextTitleForm={updateTextTitleForm}
//                     openModalForm={openModalForm}
//                     ignorar={[ 9, 10, 11, 12, 13, 14, 15, 16 ]}
//                     setIsExportModalOpen={setIsExportModalOpen}
//                     tableName="Recoleccion de miel"

//                     showAddButton={true} // 👈 aquí indicas que NO lo muestre
//                   />
             
//                 </div>
//               </div>
//             </div>
//           </main>
//         </div>
//       </div>

//       <ModalDialog
//         isOpen={isOpen}
//         setIsOpen={openModalForm}
//         FormPage={
//           <FormHoneyCollection
//             honeyCollection={honeyCollection}
//             buttonForm={buttonForm}
//             onDataUpdated={handleDataUpdated}
//             closeModal={openModalForm}
//           />
//         }
//         action={action}
//       />

//       <ConfirmationModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onConfirm={deleteHoney}
//         DeleteTitle={DeleteRegistro}
//       />

//        {/* Modal de exportación a PDF */}
//        <ExportToPDFDialog
//         isOpen={isExportModalOpen}
//         setIsOpen={setIsExportModalOpen}
//         TitlePage={TitlePage}
//         Data={regisHoney}
//         TitlesTable={titlesHoney}
//       />
//       </PrivateRoute>
//     </>
//   );
// }

// export default HoneyCollection;

"use client"
import NavPrivate from "@/components/navs/NavPrivate"
import ContentPage from "@/components/utils/ContentPage"
import Sidebar from "@/components/navs/Siderbar"
import FormHoneyCollection from "./FormHoneyCollection"
import ModalDialog from "@/components/utils/ModalDialog"
import ConfirmationModal from "@/components/utils/ConfirmationModal"
import HoneyConverter from "@/components/navs/HoneyConverter"
import { useState, useEffect } from "react"
import axiosInstance from "@/lib/axiosInstance"
import ExportToPDFDialog from "@/components/utils/ExportToPDFDialog"
import { Droplet, Calculator } from "lucide-react" // 👈 Añadido Calculator
import { Button } from "@/components/ui/button" // 👈 Nuevo import
import PrivateRoute from "@/app/routes/privateRoute"

function HoneyCollection() {
  const TitlePage = "Recolección de Miel"
  const DeleteRegistro = "¿Estás seguro de que deseas eliminar esta recolección de miel?"

  const [regisHoney, setRegisHoney] = useState([])
  const [selectedHoney, setSelectedHoney] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [action, setAction] = useState("Registrar")
  const [buttonForm, setButtonForm] = useState("Registrar")
  const [isExportModalOpen, setIsExportModalOpen] = useState(false)
  const [isConverterOpen, setIsConverterOpen] = useState(false) // 👈 Nuevo estado

  const titlesHoney = [
    "ID",
    "Descripción",
    "Cantidad de Miel",
    "Fecha",
    "Frascos 125ml",
    "Frascos 250ml",
    "Unidad",
    "Responsable",
    "ID Producción",
    "ID Responsable",
    "Nombre de producción",
    "Fecha de inicio de producción",
    "Fecha de Fin de producción",
    "Subcentro",
    "Centro de costo",
    "total Colmena",
    "cantidad de cuadros",
  ]

  const [honeyCollection, setHoneyCollection] = useState({
    id_HoneyCollection: "",
    des_HoneyCollection: "",
    tot_HoneyCollection: "",
    fec_HoneyCollection: "",
    canFra125_HoneyCollection: "",
    canFra250_HoneyCollection: "",
    uniMed_HoneyCollection: "",
    id_Responsible: "",
    id_Production: "",
  })

  function formatDateToISO(dateString) {
    const [day, month, year] = dateString.split("/")
    if (!day || !month || !year) return ""
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`
  }

  useEffect(() => {
    fetchHoneyCollections()
  }, [])

  const fetchHoneyCollections = async () => {
    try {
      const response = await axiosInstance.get("/Api/HoneyCollection/GetAllHoneyCollection")
      if (response.status === 200) {
        const data = response.data.map((honey) => [
          honey.id_HoneyCollection || "-",
          honey.des_HoneyCollection || "Sin descripción",
          honey.tot_HoneyCollection || "-",
          honey.fec_HoneyCollection
            ? new Date(honey.fec_HoneyCollection).toLocaleDateString("es-CO")
            : "Sin descripción",
          honey.canFra125_HoneyCollection || "-",
          honey.canFra250_HoneyCollection || "-",
          honey.uniMed_HoneyCollection || "ml",
          honey.nam_Responsible || "-",
          honey.id_Production || "-",
          honey.id_Responsible || "-",
          honey.nom_Production || "-",
          honey.fecIni_Production ? new Date(honey.fecIni_Production).toLocaleDateString("es-CO") : "Sin descripción",
          honey.fecFin_Production ? new Date(honey.fecFin_Production).toLocaleDateString("es-CO") : "Sin descripción",
          honey.subCen_Production || "-",
          honey.cenCos_Production || "-",
          honey.totColm_Hive || "-",
          honey.canCua_Production || "-",
        ])
        setRegisHoney(data)
      }
    } catch (error) {
      console.error("Error al obtener la lista de recolecciones:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const updateTextTitleForm = (texto, rowData) => {
    setAction(texto)
    setButtonForm(texto)
    setHoneyCollection({})

    if (texto === "Actualizar") {
      setHoneyCollection({
        id_HoneyCollection: rowData[0],
        des_HoneyCollection: rowData[1],
        tot_HoneyCollection: rowData[2],
        fec_HoneyCollection: formatDateToISO(rowData[3]),
        canFra125_HoneyCollection: rowData[4],
        canFra250_HoneyCollection: rowData[5],
        uniMed_HoneyCollection: rowData[6],
        id_Responsible: rowData[9],
        id_Production: rowData[8],
      })
      console.log(rowData)
    } else {
      console.log("Registrando...")
    }
  }

  const openModalForm = (isOpen) => {
    setSelectedHoney(null)
    setIsOpen(isOpen)
  }

  async function deleteHoney() {
    if (!selectedHoney) {
      setError("Debe seleccionar una recolección.")
      return
    }

    try {
      await axiosInstance.delete(`/Api/HoneyCollection/DeleteHoneyCollection?id=${selectedHoney}`)
      fetchHoneyCollections()
      setIsModalOpen(false)
    } catch (error) {
      console.error("Error al eliminar la recolección:", error)
      setError("No se pudo eliminar la recolección.")
    }
  }

  const handleDataUpdated = () => {
    fetchHoneyCollections()
  }

  const actions = {
    update: (rowData) => {
      // Lógica de actualización
    },
  }

  return (
    <>
      <PrivateRoute requiredRole={["instructor", "pasante", "gestor"]}>
        <div className="flex h-screen bg-gray-100">
          <Sidebar />
          <div className="flex flex-col flex-1 overflow-hidden">
            <NavPrivate TitlePage={TitlePage} Icon={<Droplet />} />
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background">
              <div className="container mx-auto px-6 py-8 mt-10">
                <div className="rounded-lg border-2 bg-white text-card-foreground shadow-lg">
                  <div className="relative p-6">
                    {error && <div className="bg-red-500 text-white p-2 rounded mb-4">{error}</div>}

                    {/* 👈 BOTÓN DEL CONVERSOR - AÑADIDO AQUÍ */}
                    <div className="mb-4 flex justify-end">
                      <Button
                        onClick={() => setIsConverterOpen(true)}
                        className="bg-[#e87204] hover:bg-[#d66203] text-white flex items-center gap-2"
                      >
                        <Calculator className="h-4 w-4" />
                        Conversor Kg ↔ Litros
                      </Button>
                    </div>

                    <ContentPage
                      Data={regisHoney}
                      TitlesTable={titlesHoney}
                      Actions={actions}
                      action={action}
                      updateTextTitleForm={updateTextTitleForm}
                      openModalForm={openModalForm}
                      ignorar={[9, 10, 11, 12, 13, 14, 15, 16]}
                      setIsExportModalOpen={setIsExportModalOpen}
                      tableName="Recoleccion de miel"
                      showAddButton={true}
                    />
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>

        <ModalDialog
          isOpen={isOpen}
          setIsOpen={openModalForm}
          FormPage={
            <FormHoneyCollection
              honeyCollection={honeyCollection}
              buttonForm={buttonForm}
              onDataUpdated={handleDataUpdated}
              closeModal={openModalForm}
            />
          }
          action={action}
        />

        <ConfirmationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={deleteHoney}
          DeleteTitle={DeleteRegistro}
        />

        <ExportToPDFDialog
          isOpen={isExportModalOpen}
          setIsOpen={setIsExportModalOpen}
          TitlePage={TitlePage}
          Data={regisHoney}
          TitlesTable={titlesHoney}
        />

        {/* 👈 MODAL DEL CONVERSOR - AÑADIDO AQUÍ */}
        <HoneyConverter isOpen={isConverterOpen} onClose={() => setIsConverterOpen(false)} />
      </PrivateRoute>
    </>
  )
}

export default HoneyCollection
;