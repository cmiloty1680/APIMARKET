"use client";

import Sidebar from "@/components/navs/Siderbar";
import Header from "@/components/navs/NavPrivate";
import { useState } from "react";
import "./page.css";

import axiosInstance from "@/lib/axiosInstance";

function CollecdronePage() {
  const [fecCollecDrone, setFecCollecDrone] = useState("");
  const [canCollecDrone, setCanCollecDrone] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [msSuccess, setMsSuccess] = useState("");

  async function handleSubmitCollecdrone(event) {
    event.preventDefault();
    setSubmitting(true);

    const body = {
      fec_CollecDrone: fecCollecDrone,
      can_CollecDrone: canCollecDrone,
    };

    if (!body.fec_CollecDrone || !body.can_CollecDrone) {
      setError("Todos los campos son requeridos.");
      setSubmitting(false);
      return;
    }

    try {
      const response = await axiosInstance.post(`Api/Collecdrone/CreateCollecdrone`, body);
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
        <main className="collecdrone">
          <div className="container mx-auto px-6 py-8">
          {(success || error) && (
            <div className="alert-overlay">
              <div className={`alert-box ${success ? "success" : "error"}`}>
                {success && <p>Colección registrada exitosamente.</p>}
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

            <form className="collecdrone form shadow-lg" onSubmit={handleSubmitCollecdrone}>
              <h3 className="text-lg font-bold">Registrar Recoleccion de Sanganos</h3>
              <div className="input-container">
                <label htmlFor="FecCollecDrone">Fecha del CollecDrone</label>
                <input
                  type="date"
                  placeholder="Fecha del collecdrone"
                  value={fecCollecDrone}
                  onChange={(e) => setFecCollecDrone(e.target.value)}
                  required
                  className="input-field"
                />
              </div>
              <div className="input-container">
                <label htmlFor="CanCollecDrone">Cantidad del CollecDrone</label>
                <input
                  type="number"
                  placeholder="Cantidad del collecdrone"
                  value={canCollecDrone}
                  onChange={(e) => setCanCollecDrone(parseInt(e.target.value))}
                  required
                  className="input-field"
                />
              </div>
              <button type="submit" className="btn" disabled={isSubmitting}>
                {isSubmitting ? "Enviando..." : "Guardar Collecdrone"}
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default CollecdronePage;
