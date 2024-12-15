import React from "react";
import PublicNav from "@/components/navs/PublicNav";
import './pageDoc.css'; // Importar el archivo CSS

const Documentacion = () => {
  return (
    <>
      <PublicNav />
      <div className="documentacion-container">
        <h1 className="documentacion-title">Manual Técnico Apimarket</h1>
        <div className="documentacion-frame">
          <iframe
            src="/assets/docs/APIMARKET.pdf"
            width="100%"
            height="100%"
            frameBorder="0"
          ></iframe>
        </div>
        <h1 className="documentacion-title">Manual De Usuario</h1>
        <div className="documentacion-frame">
          <iframe
            src="/assets/docs/APIMARKET.pdf"
            width="100%"
            height="100%"
            frameBorder="0"
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default Documentacion;
