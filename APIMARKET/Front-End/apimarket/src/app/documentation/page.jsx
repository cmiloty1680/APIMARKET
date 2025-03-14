import React from "react";
import PublicNav from "@/components/navs/PublicNav";
import "./pageDoc.css"; // Importar el archivo CSS

const Documentacion = () => {
  return (
    <>
      <PublicNav />
      <div className="flex flex-col min-h-screen p-6">
        {/* Contenedor principal en fila */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-6">
          {/* Contenedor izquierdo con el texto y espacio */}
          <div className="md:w-1/2 flex flex-col justify-center">
            <h1 className="mt-40 max-w-[500px] font-Arial tracking-tighter sm:text-2xl md:text-3xl lg:text-4xl">
              Manual Técnico
            </h1>
           
            {/* Contenedor extra para posicionar el texto en el cuadro rojo */}
            <div className="mt-10 p-4 bg-gray-100 border border-gray-300 rounded-md shadow-md mt">
              <p className="text-gray-600 md:text-lg">
              Este manual técnico documenta en detalle todas las actividades realizadas durante el desarrollo del proyecto.              </p>
            </div>
          </div>

          {/* Contenedor del PDF alineado a la derecha */}
          <div className="md:w-1/2 bg-gray-300 p-1 rounded-md shadow-md">
            <div className="overflow-hidden shadow-lg rounded-md">
              <iframe
                src="/assets/docs/APIMARKET.pdf"
                title="Documentación"
                className="w-full h-[600px] border-none"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Documentacion;
