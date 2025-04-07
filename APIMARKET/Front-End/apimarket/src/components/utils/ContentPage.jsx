import { useState } from "react";
import { Button } from "../ui/button";
import DataTable from "./DataTable";

function ContentPage({ TitlePage, Data, TitlesTable, Actions, updateTextTitleForm, openModalForm,ignorar}) {


  return (
    <div>
      <h1 className="text-xl font-bold mb-5">{TitlePage}</h1>

      {/* Contenedor de botones */}
      <div className="flex justify-end items-center space-x-3 mb-5">
        {/* Botón para abrir el modal */}
        <Button 
          className="border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#e87204] hover:bg-[#30712] focus:outline-none"
          onClick={() => {updateTextTitleForm("Registrar", {}); openModalForm(true) }} // Abre el modal
        >
          Agregar
        </Button>

        <Button className="border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#e87204] hover:bg-[#30712] focus:outline-none">
          Exportar
        </Button>
      </div>

      

      {/* Tabla de datos */}
      <DataTable Data={Data} TitlesTable={TitlesTable} Actions={Actions} updateTextTitleForm={updateTextTitleForm} openModalForm={openModalForm} ignorar={ignorar} />
    </div>
  );
}

export default ContentPage;














// import { Button } from "../ui/button";
// import DataTable from "./DataTable";
// import ModalDialog from "./ModalDialog";
// import { useState } from "react";

// function ContentPage({ TitlePage, Data, TitlesTable, FormPage, Actions, action , updateTextTitleForm}) 

// { 
//     // console.log(TitlePage)
//     return (
//         <>
//             {/* Título de la página */}
//             <div>
//                 <h1 className="text-xl font-bold mb-5">{TitlePage}</h1>
//             </div>
            
//             {/* Contenedor de botones */}
//             <div className="flex justify-end items-center space-x-3 mb-5">
//                 <ModalDialog action={action} FormPage={FormPage} />
//                 <Button className="border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#e87204] hover:bg-[#030712] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
//                     Exportar
//                 </Button>
//             </div>

//             {/* Tabla de datos */}
//             <div>
//                 <DataTable Data={Data} TitlesTable={TitlesTable} Actions={Actions} updateTextTitleForm={updateTextTitleForm}/>
//             </div>
//         </>
//     );
// }

// export default ContentPage;
