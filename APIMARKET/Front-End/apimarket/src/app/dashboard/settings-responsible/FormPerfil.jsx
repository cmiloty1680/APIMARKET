"use client"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useEffect, useState, useRef } from "react"
import axiosInstance from "@/lib/axiosInstance"
import { User, Camera, Mail, Phone, Lock, Shield, IdCard, UserCheck, Zap, ShieldCheck } from "lucide-react"
import DynamicAlert from "@/components/utils/DynamicAlert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"


function FormPerfil() {
  const router = useRouter()
  const fileInputRef = useRef(null)

  // Estados para los campos del formulario
  const [nombre, setNombre] = useState("")
  const [apellidos, setApellidos] = useState("")
  const [email, setEmail] = useState("")
  const [telefono, setTelefono] = useState("")
  const [documento, setDocumento] = useState("")
  const [ciudad, setCiudad] = useState("")
  const [contraseña, setContraseña] = useState("")
  const [verificarContraseña, setVerificarContraseña] = useState("")
  const [userRole, setUserRole] = useState("")
  const [avatarPreview, setAvatarPreview] = useState(null)
  const [id_Responsible, setIdResponsible] = useState(null)

  // Estados para el manejo de la UI
  const [error, setError] = useState("")
  const [msSuccess, setMsSuccess] = useState("")
  const [isModalOpen, setModalOpen] = useState(false)
  const [isModalOpenFall, setModalOpenFall] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Función para cargar los datos del perfil
  async function fetchProfileData() {
    setIsLoading(true)
    setError("")

    try {
      const response = await axiosInstance.get("/Api/Responsible/Profile")
      // console.log("carga", response);
      if (response.status === 200) {
        const data = response.data

        // Actualizar estados con los datos recibidos

        setNombre(data.nam_Responsible || "")
        setApellidos(data.lasNam_Responsible || "")
        setEmail(data.emai_Responsible || "")
        setTelefono(data.pho_Responsible || "")
        setDocumento(data.numDoc_Responsible || "")
        setUserRole(data.tip_Responsible || "")
        setIdResponsible(data.id_Responsible || null);
      }
      console.log("malo", id_Responsible)
    } catch (error) {
      // console.error("Error al cargar el perfil:", error)
      setError("No se pudo cargar la información del perfil. Por favor, intenta de nuevo.")
      setModalOpenFall(true)
    } finally {
      setIsLoading(false)
    }
  }

  // Cargar los datos del perfil al montar el componente
  useEffect(() => {
    fetchProfileData()
  }, [])

  // Función para manejar el envío del formulario
  async function handlerSubmit(event) {
    event.preventDefault()
    setIsSubmitting(true)
    setError("")

    // Validación de campos
    if (!nombre || !apellidos || !email || !telefono || !documento || !userRole) {
      setError("Por favor, complete todos los campos obligatorios.")
      setModalOpenFall(true)
      setIsSubmitting(false)
      return
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError("Por favor, ingrese un correo electrónico válido.")
      setModalOpenFall(true)
      setIsSubmitting(false)
      return
    }

    // Validar que las contraseñas coincidan si se están cambiando
    if (contraseña && contraseña !== verificarContraseña) {
      setError("Las contraseñas no coinciden.")
      setModalOpenFall(true)
      setIsSubmitting(false)
      return
    }

    function capitalizarNombreCompleto(texto) {
      return texto
        .toLowerCase()                            // todo en minúscula
        .replace(/\s+/g, " ")                     // elimina espacios múltiples
        .trim()                                   // quita espacios al inicio/final
        .split(" ")                               // separa por palabra
        .map(p => p.charAt(0).toUpperCase() + p.slice(1)) // primera en mayúscula
        .join(" ");                               // une de nuevo
    }

    
    const nombreFormateado = capitalizarNombreCompleto(nombre);
    const apellidoFormateado = capitalizarNombreCompleto(apellidos);

    try {
      // Preparar los datos para enviar al servidor
      const profileData = {
        id_Responsible: id_Responsible,
        nam_Responsible: nombreFormateado,
        lasNam_Responsible: apellidoFormateado,
        emai_Responsible: email,
        pho_Responsible: telefono,
        numDoc_Responsible: documento,
        tip_Responsible: userRole,
      }

      // console.log("update", profileData)

      // Si hay contraseña nueva, incluirla
      if (contraseña) {
        profileData.Hashed_Password = contraseña
      }

      const response = await axiosInstance.put(`/Api/Responsible/UpdateResponsible/${id_Responsible}`, profileData)

      if (response.status === 200) {
        setMsSuccess("Perfil actualizado correctamente")
        setModalOpen(true)

        // Limpiar campos de contraseña después de actualizar
        setContraseña("")
        setVerificarContraseña("")
      }
    } catch (error) {
      // console.error("Error al actualizar el perfil:", error)
      setError(error.response?.data?.message || "Error al conectar con el servidor.")
      setModalOpenFall(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setAvatarPreview(e.target?.result)
      }
      reader.readAsDataURL(file)
    }
  }



  // Mostrar un estado de carga mientras se obtienen los datos
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 border-4 border-t-transparent border-orange-500 rounded-full animate-spin"></div>
          <p className="text-lg font-medium text-gray-700">Cargando información del perfil...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="max-w-6xl mx-auto p-4 md:p-6 bg-gradient-to-b from-orange-50 to-white dark:from-gray-900 dark:to-gray-950 rounded-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-[#e87204] rounded-full flex items-center justify-center text-white">
              <User className="h-5 w-5" />
            </div>
            <div className="ml-3">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Información de Perfil</h1>
              <p className="text-sm text-gray-500">Actualiza tus datos personales</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-[350px_1fr] gap-8">
          {/* Columna izquierda */}
          <div className="space-y-6">
            {/* Avatar Card */}
            <Card className="border-none shadow-2xl overflow-hidden bg-white dark:bg-gray-950 transition-all duration-200 backdrop-blur-sm bg-white/80 dark:bg-gray-950/80">
              <div className="h-2 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500 animate-gradient-x"></div>
              <div className="p-6">
                <div className="flex flex-col items-center">
                  <div className="relative group z-10 mb-4">
                    <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-blue-500 to-amber-500 opacity-75 blur-sm group-hover:opacity-100 transition duration-300 animate-pulse"></div>
                    <Avatar
                      className="h-48 w-48 border-4 border-white dark:border-gray-800 shadow-lg relative cursor-pointer hover:scale-105 transition-transform duration-300"
                      onClick={handleAvatarClick}
                    >
                      <AvatarImage
                        src={avatarPreview || "/placeholder.svg?height=192&width=192"}
                        alt="Avatar"
                        className="object-cover"
                      />
                      <AvatarFallback className="text-4xl text-white bg-gradient-to-br from-blue-900 to-[#030712]">
                        {nombre.charAt(0) || "U"}
                        {apellidos.charAt(0) || "S"}
                      </AvatarFallback>
                      <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </Avatar>
                    <Button
                      size="icon"
                      className="absolute bottom-2 right-2 h-12 w-12 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-md transition-transform duration-200 hover:scale-110"
                      type="button"
                      onClick={handleAvatarClick}
                    >
                      <Camera className="h-5 w-5" />
                    </Button>
                  </div>
                  <p className="text-sm text-blue-600 mb-4">Cambiar foto de perfil...</p>
                  <div className="w-full">
                    <input type="file" id="photo-upload" className="hidden" />
                    <label
                      htmlFor="photo-upload"
                      className="flex items-center justify-between border border-orange-200 dark:border-orange-900/30 rounded px-3 py-2 w-full text-sm cursor-pointer hover:bg-orange-50 dark:hover:bg-orange-900/10 transition-colors"
                    >
                      <span>Seleccionar archivo</span>
                      <span className="text-gray-500">Ningún archivo seleccionado</span>
                    </label>
                  </div>
                </div>
              </div>
            </Card>

            {/* Role Card */}
            <Card className="border-none shadow-2xl overflow-hidden bg-gradient-to-br from-white via-orange-50/30 to-amber-50/50 dark:from-gray-950 dark:via-orange-950/20 dark:to-amber-950/30 transition-all duration-300 backdrop-blur-sm hover:shadow-3xl group">
              <div className="h-1 bg-gradient-to-r from-orange-500 via-amber-400 to-orange-500 animate-gradient-x"></div>
              <div className="p-5">
                <div className="space-y-5">
                  <div className="relative">
                    <div className="relative group/status">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-red-400 via-orange-400 to-red-400 rounded-xl blur opacity-40 group-hover/status:opacity-60 transition duration-300"></div>
                      <div className="relative bg-gradient-to-br from-red-500 via-orange-600 to-red-700 rounded-xl p-5 shadow-2xl flex items-center gap-4 text-white border border-orange-400/30 hover:shadow-3xl transition-all duration-300 hover:scale-[1.03] cursor-pointer overflow-hidden">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
                        <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-8 -translate-x-8"></div>

                        <div className="relative bg-white/25 backdrop-blur-sm rounded-xl flex items-center justify-center w-12 h-12 flex-shrink-0 shadow-lg">
                          <Zap className="w-6 h-6 text-white drop-shadow-sm" />
                        </div>
                        <div className="relative flex flex-col">
                          <div className="text-orange-100 text-xs font-medium mb-1 tracking-wide">
                            Estado del Usuario
                          </div>
                          <div className="text-xl font-bold text-white drop-shadow-sm">Activo</div>
                          <div className="w-8 h-0.5 bg-white/40 rounded-full mt-1">
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Columna derecha - Formulario */}
          <div>
            <Card className="border-none shadow-2xl overflow-hidden bg-white dark:bg-gray-950 transition-all duration-200 backdrop-blur-sm bg-white/80 dark:bg-gray-950/80">
              <div className="h-2 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500 animate-gradient-x"></div>
              <CardContent className="p-8">
                <form onSubmit={handlerSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="nombre" className="flex items-center gap-2 text-sm font-medium">
                        <User className="h-4 w-4 text-orange-500" />
                        Nombre
                      </Label>
                      <Input
                        id="nombre"
                        name="nombre"
                        placeholder="Nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        className="transition-all duration-200 focus-visible:ring-orange-500 border-orange-200 dark:border-orange-900/30"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="apellidos" className="flex items-center gap-2 text-sm font-medium">
                        <UserCheck className="h-4 w-4 text-orange-500" />
                        Apellidos
                      </Label>
                      <Input
                        id="apellidos"
                        name="apellidos"
                        placeholder="Apellidos"
                        value={apellidos}
                        onChange={(e) => setApellidos(e.target.value)}
                        className="transition-all duration-200 focus-visible:ring-orange-500 border-orange-200 dark:border-orange-900/30"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="telefono" className="flex items-center gap-2 text-sm font-medium">
                        <Phone className="h-4 w-4 text-orange-500" />
                        Teléfono
                      </Label>
                      <Input
                        id="telefono"
                        name="telefono"
                        placeholder="Teléfono"
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                        className="transition-all duration-200 focus-visible:ring-orange-500 border-orange-200 dark:border-orange-900/30"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="movil" className="flex items-center gap-2 text-sm font-medium">
                        <IdCard className="h-4 w-4 text-orange-500" />
                        N° Documento
                      </Label>
                      <Input
                        id="movil"
                        name="movil"
                        placeholder="Introduce tu móvil"
                        value={documento}
                        onChange={(e) => setDocumento(e.target.value)}
                        className="transition-all duration-200 focus-visible:ring-orange-500 border-orange-200 dark:border-orange-900/30"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center gap-2 text-sm font-medium">
                        <Mail className="h-4 w-4 text-orange-500" />
                        Email
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="transition-all duration-200 focus-visible:ring-orange-500 border-orange-200 dark:border-orange-900/30"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ciudad" className="flex items-center gap-2 text-sm font-medium">
                        <ShieldCheck className="h-4 w-4 text-orange-500" />
                        Rol
                      </Label>
                      <div className="w-full px-3 py-2 text-sm transition-all duration-200 border border-orange-200 rounded-md bg-gray-100 text-gray-700 dark:text-gray-300 dark:border-orange-900/30">
                        {userRole}
                      </div>


                    </div>
                  </div>

                  <div className="flex justify-end pt-6 border-t border-orange-200/50">
                    <Button
                      disabled={isSubmitting}
                      type="submit"
                      className={cn(
                        "bg-[#e87204] text-white px-6 py-2 text-sm rounded-lg hover:bg-[#030712] focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50 transition-colors",
                        isSubmitting && "opacity-70 cursor-not-allowed",
                      )}
                    >
                      {isSubmitting ? "Guardando..." : "Actualizar Perfil"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Modal de éxito usando el componente dinámico */}
      <DynamicAlert
        isOpen={isModalOpen}
        onOpenChange={(isOpen) => {
          setModalOpen(isOpen)
        }}
        type="success"
        message={msSuccess || "Perfil actualizado correctamente"}
        redirectPath=""
      />

      {/* Modal de fallido usando el componente dinámico */}
      <DynamicAlert
        isOpen={isModalOpenFall}
        onOpenChange={(isOpen) => {
          setModalOpenFall(isOpen)
        }}
        type="error"
        message={error || "Ha ocurrido un error inesperado"}
        redirectPath=""
      />
    </>
  )
}

export default FormPerfil;