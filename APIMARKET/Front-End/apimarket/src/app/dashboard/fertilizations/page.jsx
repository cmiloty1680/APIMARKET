"use client";

import Sidebar from "@/components/navs/Siderbar";
import Header from "@/components/navs/NavPrivate";
import { useState } from "react";
import "./page.css";

import axiosInstance from "@/lib/axiosInstance";

function FertilizationPage() {
  const [fecFertilization, setFecFertilization] = useState("");
  const [canFertilization, setCanFertilization] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [msSuccess, setMsSuccess] = useState("");

  async function handleSubmitFertilization(event) {
    event.preventDefault();
    setSubmitting(true);

    const body = {
      fec_Fertilization: fecFertilization,
      can_Fertilization: parseInt(canFertilization),
    };

    if (!body.fec_Fertilization || !body.can_Fertilization) {
      setError("Todos los campos son requeridos.");
      setSubmitting(false);
      return;
    }

    try {
      const response = await axiosInstance.post(`Api/Fertilization/CreateFertilization`, body);
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
        <main className="fertilization">
          <div className="container mx-auto px-6 py-8">
          {(success || error) && (
            <div className="alert-overlay">
              <div className={`alert-box ${success ? "success" : "error"}`}>
                {success && <p>Fertilización registrada exitosamente.</p>}
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

            <form className="fertilization form shadow-lg" onSubmit={handleSubmitFertilization}>
              <h3 className="text-lg font-bold">Registrar Fertilización</h3>
              <div className="input-container">
                <label htmlFor="FecFertilization">Fecha del Fertilization</label>
                <input
                  type="date"
                  placeholder="Fecha del fertilization"
                  value={fecFertilization}
                  onChange={(e) => setFecFertilization(e.target.value)}
                  required
                  className="input-field"
                />
              </div>
              <div className="input-container">
                <label htmlFor="CanFertilization">Cantidad del Fertilization</label>
                <input
                  type="number"
                  placeholder="Cantidad del fertilization"
                  value={canFertilization}
                  onChange={(e) => setCanFertilization(e.target.value)}
                  required
                  className="input-field"
                />
              </div>
              <button type="submit" className="btn" disabled={isSubmitting}>
                {isSubmitting ? "Enviando..." : "Guardar Fertilization"}
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default FertilizationPage;
