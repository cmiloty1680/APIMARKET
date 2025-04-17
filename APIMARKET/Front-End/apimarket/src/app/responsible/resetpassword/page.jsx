
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import axiosInstance from "@/lib/axiosInstance"
import PublicNav from "@/components/navs/PublicNav"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MailOpenIcon as Envelope } from "lucide-react"
// import DynamicAlert from "@/components/ui/dynamic-alert"
import DynamicAlert from "@/components/utils/DynamicAlert"
import { useRouter } from "next/navigation"

function ResetPassword() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setSubmitting] = useState(false)
  const [isModalOpen, setModalOpen] = useState(false)
  const [isModalOpenFall, setModalOpenFall] = useState(false)
  const [error, setError] = useState(null)
  const [msSuccess, setMsSuccess] = useState("")
  const router = useRouter()

  async function handlerSubmit(event) {
    event.preventDefault()
    setSubmitting(true)

    if (email === "") {
      alert("El email es requerido.")
      setSubmitting(false)
      return
    }

    try {
      const response = await axiosInstance.post("Api/Responsible/ResetPassUser", { emai_Responsible: email })
      console.log(response)
      setModalOpen(true)
      setMsSuccess(response.data)
    } catch (error) {
      console.log(error)
      setError(error.response.data.message)
      setModalOpenFall(true)
      // alert(error.response.data.message);
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <PublicNav />
      <div className="flex items-center justify-center h-[calc(100vh-64px)] bg-white overflow-hidden">
        <Card className="w-full max-w-lg">
          <div className="p-8">
            <h3 className="text-2xl font-semibold text-center">Recuperar contraseña</h3>
            <p className="text-gray-600 text-center mt-2 mb-6">
              Digita el correo para reenviar un token al email y poder restablecer la contraseña
            </p>
            <form onSubmit={handlerSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Ingrese Email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="pl-10"
                    required
                  />
                  <Envelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                </div>
              </div>
              <Button disabled={isSubmitting} type="submit" className="w-full bg-[#e87204] hover:bg-[#030712]">
                {isSubmitting ? "Enviando.." : "Restablecer"}
              </Button>
            </form>
          </div>
        </Card>
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
  )
}

export default ResetPassword

