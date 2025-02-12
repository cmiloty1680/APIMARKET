"use client";

import { useState } from "react";
import  {Button}  from "@/components/ui/button";
import { Clipboard } from "lucide-react";


import axiosInstance from "@/lib/axiosInstance";


function FormFeeding() {
    const [tipFeeding, setTipFeeding] = useState("");
    const [fecFeeding, setFecFeeding] = useState("");
    const [canFeeding, setCanFeeding] = useState("");
    const [valFeeding, setValFeeding] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setSubmitting] = useState(false);
    const [msSuccess, setMsSuccess] = useState("");

    async function handlerSubmit(event) {
        event.preventDefault();
        setSubmitting(true);

        const body = {
            Tip_Feeding: tipFeeding,
            Fec_Feeding: fecFeeding,
            Can_Feeding: canFeeding,
            Val_Feeding: valFeeding,
        };

        if (!body) {
            setError("Todos los campos son requeridos.");
            setSubmitting(false);
            return;
        }

        try {
            const response = await axiosInstance.post(`Api/Feeding/CreateFeeding`, body);
            if (response.status === 200) {
                setMsSuccess(response.data.creada);
                console.log(response.data.data);
                setMsSuccess(true);
                setError("");
            } else {
                setError("Error desconocido");
            }
        } catch (error) {
            console.log(error);
            setError(error.response ? error.response.data : "Error al conectar con el servidor");
            setMsSuccess(false);
        } finally {
            setSubmitting(false);
        }
    }

    return (
     <>
     <form
        className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md"
        onSubmit={handlerSubmit}
      >
        {/* Título */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-[#e87204] rounded-full flex items-center justify-center text-white">
              <Clipboard className="h-5 w-5" />
            </div>
            <div className="ml-3">
              <h2 className="text-xl font-bold text-gray-900">Alimentación</h2>
              <p className="text-xs text-gray-500">Ingrese los datos de la alimentación</p>
            </div>
          </div>
        </div>

        {/* Mensajes de error o éxito */}
        {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
        {msSuccess && <p className="text-green-500 mb-4 text-sm">{msSuccess}</p>}

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label htmlFor="descripcion" className="text-sm font-medium text-gray-700">
              Tipo de Alimentación
              </label>
              <select
                      id="TipFeeding"
                      value={tipFeeding}
                      onChange={(e) => setTipFeeding(e.target.value)}
                className="w-full px-3 py-1.5 border border-gray-300 rounded-md leading-5 focus:outline-none focus:ring-1 focus:ring-[#e87204] text-sm"
                    >
                      <option value="">Seleccione el tipo</option>
                      <option value="mango">Mango</option>
                      <option value="azucar">Azúcar</option>
                    </select>
            </div>
            <div className="space-y-1">
              <label htmlFor="Ncuadro" className="text-sm font-medium text-gray-700">
                Fecha de alimentación
              </label>
              <input
                type="date"
                id="FecFeeding"
                value={fecFeeding}
                onChange={(e) => setFecFeeding(e.target.value)}
                className="w-full px-3 py-1.5 border border-gray-300 rounded-md leading-5 focus:outline-none focus:ring-1 focus:ring-[#e87204] text-sm"
              />
            </div>
          </div>


          {/* Estado y Número de cuadro */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label htmlFor="estado" className="text-sm font-medium text-gray-700">
              Cantidad de Alimentación
              </label>
              <input
                      type="number"
                      id="CanFeeding"
                      placeholder="Ingrese la cantidad"
                      value={canFeeding}
                      onChange={(e) => setCanFeeding(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
            </div>
            <div className="space-y-1">
              <label htmlFor="Ncuadro" className="text-sm font-medium text-gray-700">
              Valor de Alimentación
              </label>
              <input
                      type="number"
                      id="ValFeeding"
                      placeholder="Ingrese el valor"
                      value={valFeeding}
                      onChange={(e) => setValFeeding(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      />
            </div>
          </div>
          {/* Botón Guardar */}
          <div className="flex justify-end pt-3">
            <Button
              disabled={isSubmitting}
              type="submit"
              className="bg-[#e87204] text-white px-6 py-2 text-sm rounded-lg hover:bg-[#030712] focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50 transition-colors"
            >
              {isSubmitting ? "Guardando..." : "Guardar"}
            </Button>
          </div>
        </div>
      </form>

      </> 
    );
}

export default FormFeeding;
