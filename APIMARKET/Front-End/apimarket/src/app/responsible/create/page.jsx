"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axiosInstance";
import PublicNav from "@/components/navs/PublicNav";
import { useState } from "react";
import { User } from "lucide-react";
import DynamicAlert from "@/components/utils/DynamicAlert";
import { Eye, EyeOff } from "lucide-react";

function CreateResponsible() {
  const router = useRouter();
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [documento, setDocumento] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [confirmarContraseña, setConfirmarContraseña] = useState("");
  const [isModalOpen, setModalOpen] = useState(false)
  const [isModalOpenFall, setModalOpenFall] = useState(false)
  const [msSuccess, setMsSuccess] = useState("")
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  async function handlerSubmit(event) {
    event.preventDefault();
    setError(""); // Limpiar errores previos
    setIsSubmitting(true);

    // Validaciones en el cliente
    if (!nombre || !apellido || !documento || !telefono || !email || !contraseña || !confirmarContraseña) {
      setError("Todos los campos son obligatorios.");
      setModalOpenFall(true)
      setIsSubmitting(false);
      return;
    }

    if (contraseña !== confirmarContraseña) {
      setError("Las contraseñas no coinciden.");
      setModalOpenFall(true)
      setIsSubmitting(false);
      return;
    }
    // Validación del teléfono: debe tener exactamente 10 dígitos
    if (telefono.length !== 10) {
      setError("El número de teléfono debe tener exactamente 10 dígitos.");
      setModalOpenFall(true);
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
      });
    
      if (response.status === 200) {
        setMsSuccess(response.data);
        setModalOpen(true);
      }
    } catch (error) {
      // Verificar si el error tiene la estructura 'response'
      if (error.response) {
        // Si el código de error es 409 (conflicto), significa que el correo ya está registrado
        if (error.response.status === 409) {
          setError("El correo electrónico ya está registrado.");
          setModalOpenFall(true);
        } else {
          // Otros errores del servidor o validaciones
          setError("Error al registrar el responsable.");
          setModalOpenFall(true);
        }
      } else {
        // Si el error no tiene 'response', es un error que no proviene del servidor (por ejemplo, un error de red)
        setError("Error al conectar con el servidor.");
        setModalOpenFall(true);
      }
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
                  className="w-full px-3 py-1.5 border border-gray-300 rounded-md leading-5 focus:outline-none focus:ring-1 focus:ring-[#e87204] text-sm"
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
                  className="w-full px-3 py-1.5 border border-gray-300 rounded-md leading-5 focus:outline-none focus:ring-1 focus:ring-[#e87204] text-sm"
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
                  className="w-full px-3 py-1.5 border border-gray-300 rounded-md leading-5 focus:outline-none focus:ring-1 focus:ring-[#e87204] text-sm"
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
                  className="w-full px-3 py-1.5 border border-gray-300 rounded-md leading-5 focus:outline-none focus:ring-1 focus:ring-[#e87204] text-sm"
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
                  className="w-full px-3 py-1.5 border border-gray-300 rounded-md leading-5 focus:outline-none focus:ring-1 focus:ring-[#e87204] text-sm"
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
                <div className="relative w-full">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="contraseña"
                    placeholder="Ingrese Contraseña"
                    className="w-full px-3 pr-10 py-1.5 border border-gray-300 rounded-md leading-5 focus:outline-none focus:ring-1 focus:ring-[#e87204] text-sm"
                    value={contraseña}
                    onChange={(e) => setContraseña(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>

              </div>
            </div>

            {/* Confirmar Contraseña */}
            <div className="flex flex-col">
              <label htmlFor="confirmarContraseña" className="text-xs font-medium text-gray-700">
                Confirmar Contraseña
              </label>
              <div className="relative w-full">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmarContraseña"
                  placeholder="Confirmar Contraseña"
                  className="w-full px-3 pr-10 py-1.5 border border-gray-300 rounded-md leading-5 focus:outline-none focus:ring-1 focus:ring-[#e87204] text-sm"
                  value={confirmarContraseña}
                  onChange={(e) => setConfirmarContraseña(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>

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


      {/* Modal de éxito usando el componente dinámico */}
      <DynamicAlert
        isOpen={isModalOpen}
        onOpenChange={setModalOpen}
        type="success"
        message={msSuccess?.message || "Operación exitosa"}
        redirectPath="/responsible/login"
      />

      {/* Modal de fallido usando el componente dinámico */}
      <DynamicAlert
        isOpen={isModalOpenFall}
        onOpenChange={setModalOpenFall}
        type="error"
        message={error || "Ha ocurrido un error inesperado"}
        redirectPath=""
      />

    </>
  );
}

export default CreateResponsible;