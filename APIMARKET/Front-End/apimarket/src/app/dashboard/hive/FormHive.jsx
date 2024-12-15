"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { Hexagon } from "lucide-react";
import { Alert } from '@/components/Alert';


function FormHive() {
  const router = useRouter();
  const [estado, setEstado] = useState("");
  const [descripcion, setDescripcion] = useState(""); // Nuevo campo Des_Hive
  const [Ncuadro, setNcuadro] = useState("");
  const [Nalza, setNalza] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const [msSuccess, setMsSuccess] = useState("");
  const [alert, setAlert] = useState(null);


  async function handlerSubmit(event) {
    event.preventDefault();
    setSubmitting(true);

    // Validación básica
    if (!estado || !descripcion || !Ncuadro || !Nalza) {
      setError("Por favor, complete todos los campos.");
      setSubmitting(false);
      return;
    }

    try {
      const response = await axiosInstance.post("/Api/Hive/Createhive", {
        est_Hive: estado,
        des_Hive: descripcion, // Nuevo campo enviado
        numCua_Hive: Ncuadro,
        numAlz_Hive: Nalza,
      });

      if (response.status === 200) {
        setMsSuccess(response.data.registrado);
        setAlert({ message: ` ${response.data.registrado}`, type: "success" });
        // alert(response.data.registrado);
        localStorage.setItem("registroColmena", response.data.registrado); // Guardar en localStorage
        // router.push("/dashboard"); // Redirigir al usuario
      }
    } catch (error) {
      console.error(error);
      if (error.response) {
        setError(`Error: ${error.response.data.title || "Error en la solicitud"}`);
      } else {
        setError("Error al intentar conectar con el servidor");
      }
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
              <Hexagon className="h-4 w-4" />
            </div>
            <div className="ml-3">
              <h2 className="text-xl font-bold text-gray-900">Colmena</h2>
              <p className="text-xs text-gray-500">Ingrese los datos de la colmena</p>
            </div>
          </div>
        </div>

        {/* Mensajes de error o éxito */}
        {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
        {msSuccess && <p className="text-green-500 mb-4 text-sm">{msSuccess}</p>}

        <div className="space-y-6">
          {/* Descripción */}
          <div className="space-y-1">
            <label htmlFor="descripcion" className="text-sm font-medium text-gray-700">
              Descripción
            </label>
            <input
              type="text"
              className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#e87204] focus:border-transparent"
              id="descripcion"
              placeholder="Ingrese una descripción (máximo 50 caracteres)"
              required
              maxLength={50}
              name="descripcion"
              value={descripcion}
              onChange={(event) => setDescripcion(event.target.value)}
            />
          </div>

          {/* Estado y Número de cuadro */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label htmlFor="estado" className="text-sm font-medium text-gray-700">
                Estado de la colmena
              </label>
              <select
                className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#e87204] focus:border-transparent"
                id="estado"
                required
                name="estado"
                value={estado}
                onChange={(event) => setEstado(event.target.value)}
              >
                <option value="">Seleccione el estado</option>
                <option value="activo">Activo</option>
                <option value="inactivo">Inactivo</option>
              </select>
            </div>
            <div className="space-y-1">
              <label htmlFor="Ncuadro" className="text-sm font-medium text-gray-700">
                Número de cuadro
              </label>
              <input
                type="number"
                className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#e87204] focus:border-transparent"
                id="Ncuadro"
                placeholder="Ingrese N° cuadros"
                required
                name="Ncuadro"
                value={Ncuadro}
                onChange={(event) => setNcuadro(event.target.value)}
              />
            </div>
          </div>

          {/* Número de Alzas */}
          <div className="space-y-1">
            <label htmlFor="Nalza" className="text-sm font-medium text-gray-700">
              Número de Alzas
            </label>
            <input
              type="number"
              className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#e87204] focus:border-transparent"
              id="Nalza"
              placeholder="Ingrese N° alzas"
              required
              name="Nalza"
              value={Nalza}
              onChange={(event) => setNalza(event.target.value)}
            />
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
      {alert && <Alert message={alert.message} type={alert.type} />}
    </>
  );
}

export default FormHive;