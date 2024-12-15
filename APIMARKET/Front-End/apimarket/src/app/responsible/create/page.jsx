"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axiosInstance";
import PublicNav from "@/components/navs/PublicNav";
import { useState } from "react";
import { User } from "lucide-react";

function CreateResponsible() {
  const router = useRouter();
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [documento, setDocumento] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [confirmarContraseña, setConfirmarContraseña] = useState("");
  // const [tipoResponsable, setTipoResponsable] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handlerSubmit(event) {
    event.preventDefault();
    setError(""); // Limpiar errores previos
    setIsSubmitting(true);

    // Validaciones en el cliente
    if (!nombre || !apellido || !documento || !telefono || !email || !contraseña || !confirmarContraseña) {
      alert("Todos los campos son obligatorios.");
      setIsSubmitting(false);
      return;
    }

    if (contraseña !== confirmarContraseña) {
      alert("Las contraseñas no coinciden.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await axiosInstance.post("/Api/Responsible/CreateResponsible", {
        nam_Responsible: nombre,
        lasNam_Responsible: apellido,
        numDoc_Responsible: documento,
        pho_Responsible: telefono,
        emai_Responsible: email,
        tok_Responsible: "", // Inicializamos como vacío
        hashed_Password: contraseña,
        salt: "", // Inicializamos como vacío
        // tip_Responsible: tipoResponsable, 
      });

      if (response.status === 200) {
        alert("Registro creado con éxito.");
        localStorage.setItem("registroCreate", response.data.creado);
        router.push("/responsible/login");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Error al registrar el responsable.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <PublicNav />
      <div className="min-h-screen bg-gray-50 py-8">
  <form
    className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md"
    onSubmit={handlerSubmit}
  >
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center">
        <div className="w-8 h-8 bg-[#e87204] rounded-full flex items-center justify-center text-white">
          <User className="h-4 w-4" />
        </div>
        <div className="ml-3">
          <h3 className="text-md font-medium">Crear Cuenta</h3>
          <p className="text-xs text-gray-500">Complete sus datos personales</p>
        </div>
      </div>
    </div>

    <div className="space-y-4">
      {/* Nombre y Apellido */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="flex flex-col">
          <label htmlFor="nombre" className="text-xs font-medium text-gray-700">
            Nombre
          </label>
          <input
            type="text"
            id="nombre"
            placeholder="Ingrese Nombre"
            className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#e87204] focus:border-transparent"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            maxLength={20}
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="apellido" className="text-xs font-medium text-gray-700">
            Apellido
          </label>
          <input
            type="text"
            id="apellido"
            placeholder="Ingrese Apellido"
            className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#e87204] focus:border-transparent"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            maxLength={20}
            required
          />
        </div>
      </div>

      {/* Documento y Teléfono */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="flex flex-col">
          <label htmlFor="documento" className="text-xs font-medium text-gray-700">
            Número de Documento
          </label>
          <input
            type="number"
            id="documento"
            placeholder="Ingrese Documento"
            className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#e87204] focus:border-transparent"
            value={documento}
            onChange={(e) => setDocumento(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="telefono" className="text-xs font-medium text-gray-700">
            Teléfono
          </label>
          <input
            type="number"
            id="telefono"
            placeholder="Ingrese Teléfono"
            className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#e87204] focus:border-transparent"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            required
          />
        </div>
      </div>

      {/* Email y Contraseña */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="flex flex-col">
          <label htmlFor="email" className="text-xs font-medium text-gray-700">
            Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            placeholder="Ingrese Correo Electrónico"
            className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#e87204] focus:border-transparent"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            maxLength={40}
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="contraseña" className="text-xs font-medium text-gray-700">
            Contraseña
          </label>
          <input
            type="password"
            id="contraseña"
            placeholder="Ingrese Contraseña"
            className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#e87204] focus:border-transparent"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            required
          />
        </div>
      </div>

      {/* Confirmar Contraseña */}
      <div className="flex flex-col">
        <label htmlFor="confirmarContraseña" className="text-xs font-medium text-gray-700">
          Confirmar Contraseña
        </label>
        <input
          type="password"
          id="confirmarContraseña"
          placeholder="Confirmar Contraseña"
          className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#e87204] focus:border-transparent"
          value={confirmarContraseña}
          onChange={(e) => setConfirmarContraseña(e.target.value)}
          required
        />
      </div>

      {/* Botón */}
      <div className="flex justify-end">
        <Button
          type="submit"
          className="bg-[#e87204] hover:bg-[#e87204]/90 text-white text-sm px-4 py-2 rounded"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Registrando..." : "Registrar"}
        </Button>
      </div>
    </div>
  </form>
</div>

    </>
  );
}

export default CreateResponsible;