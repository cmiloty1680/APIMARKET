"use client";

import Sidebar from "@/components/navs/Siderbar";
import Header from "@/components/navs/NavPrivate";
import { useState } from "react";
import "./page.css";

import axiosInstance from "@/lib/axiosInstance";

function ExtractionPage() {
  const [fecExtraction, setFecExtraction] = useState("");
  const [canExtraction, setCanExtraction] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [msSuccess, setMsSuccess] = useState("");

  async function handleSubmitExtraction(event) {
    event.preventDefault();
    setSubmitting(true);

    const body = {
      fec_Extraction: fecExtraction,
      can_Extraction: canExtraction,
    };

    if (!body.fec_Extraction || !body.can_Extraction) {
      setError("Todos los campos son requeridos.");
      setSubmitting(false);
      return;
    }

    try {
      const response = await axiosInstance.post(`Api/Extraction/CreateExtraction`, body);
      if (response.status === 200) {
        setMsSuccess(response.data);
        setSuccess(true);
        setError("");
      } else {
        setError("Error desconocido");
      }
    } catch (error) {
      setError(error.response ? error.response.data : "Error al conectar con el servidor");
      setSuccess(false);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="extraction">
          <div className="container mx-auto px-6 py-8">
          {(success || error) && (
            <div className="alert-overlay">
              <div className={`alert-box ${success ? "success" : "error"}`}>
                {success && <p>Extracción registrada exitosamente.</p>}
                {error && <p>{error}</p>}
                <button
                  className="close-btn"
                  onClick={() => {
                    setSuccess(false);
                    setError("");
                  }}
                >
                  Cerrar
                </button>
              </div>
            </div>
          )}

            <form className="extraction form shadow-lg" onSubmit={handleSubmitExtraction}>
              <h3 className="text-lg font-bold">Registrar Extraccion</h3>
              <div className="input-container">
                <label htmlFor="FecExtraction">Fecha del Extraction</label>
                <input
                  type="date"
                  placeholder="Fecha del extraction"
                  value={fecExtraction}
                  onChange={(e) => setFecExtraction(e.target.value)}
                  required
                  className="input-field"
                />
              </div>
              <div className="input-container">
                <label htmlFor="CanExtraction">Cantidad del Extraction</label>
                <input
                  type="number"
                  placeholder="Cantidad del extraction"
                  value={canExtraction}
                  onChange={(e) => setCanExtraction(parseInt(e.target.value))}
                  required
                  className="input-field"
                />
              </div>
              <button type="submit" className="btn" disabled={isSubmitting}>
                {isSubmitting ? "Enviando..." : "Guardar Extraction"}
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default ExtractionPage;
