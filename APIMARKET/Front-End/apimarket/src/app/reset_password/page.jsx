
"use client"
export const dynamic = 'force-dynamic';
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useSearchParams } from 'next/navigation'; 
import axiosInstance from "@/lib/axiosInstance"
import { KeyRound, Eye, EyeOff, ShieldCheck, Lock, AlertCircle } from "lucide-react"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog"

function FormResetPassword({ buttonForm = "Restablecer" }) {

  const router = useRouter()
  // const searchParams = useSearchParams()

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [isSubmitting, setSubmitting] = useState(false)
  const [msSuccess, setMsSuccess] = useState("")
  const [isModalOpen, setModalOpen] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [tokenValidated, setTokenValidated] = useState(false)
  const [loadingToken, setLoadingToken] = useState(true)

  const [token, setToken] = useState("")

useEffect(() => {
  if (typeof window !== "undefined") {
    const params = new URLSearchParams(window.location.search)
    setToken(params.get("token") || "")
  }
}, [])


  useEffect(() => {
    if (!token) {
      // setError("Token inválido o no proporcionado.");
      // setLoadingToken(false)
      return;
    }
  
    const validateToken = async () => {
      try {
        const response = await axiosInstance.post("/Api/Responsible/ValidateToken", { Tok_Responsible: token });
  
        if (response.status === 200) {
          setTokenValidated(true)
        } else {
          setError("Token expirado o inválido.")
        }
      } catch (error) {
        setError(error.response?.data?.message || "Error al validar el token.");
      }
      finally {
        setLoadingToken(false)
      }
    };
  
    validateToken();
  }, [token]);  

  async function handlerSubmit(event) {
    event.preventDefault()
    setSubmitting(true)
    setError("") // Limpiar errores anteriores

    if (!password || !confirmPassword) {
      setError("Por favor, complete todos los campos.")
      setSubmitting(false)
      return
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.")
      setSubmitting(false)
      return
    }

    try {
      const response = await axiosInstance.post("/Api/Responsible/ResetPasswordConfirm", {
        token,
        newPassword: password,
      })

      if (response.status === 200) {
        setMsSuccess("Contraseña restablecida con éxito. Redirigiendo al inicio de sesión...")
        setModalOpen(true)
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error al conectar con el servidor.")

    } finally {
      setSubmitting(false)
    }
  }

  
  if (loadingToken) {
    return (
      <div className="text-center text-gray-500 py-10">Validando token...</div>
    )
  }

  if (!tokenValidated) {
    return (
      <div className="text-center text-red-500 py-10">
        <AlertCircle className="inline-block mr-2" />
        {error || "Token inválido."}
      </div>
    )
  }
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <form className="bg-white p-8 rounded-lg shadow-lg border border-gray-100" onSubmit={handlerSubmit}>
            {/* Título con animación */}
            <div className="flex flex-col items-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white mb-4 shadow-md transform hover:scale-105 transition-transform duration-300">
                <KeyRound className="h-8 w-8" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 text-center">Restablecer Contraseña</h2>
              <p className="text-sm text-gray-500 text-center mt-1">Ingrese los datos para restablecer su contraseña</p>
            </div>

            {/* Mensajes de error o éxito */}
            {error && (
              <div className="mb-6 p-3 bg-red-50 border-l-4 border-red-500 rounded-md flex items-start">
                <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {msSuccess && (
              <div className="mb-6 p-3 bg-green-50 border-l-4 border-green-500 rounded-md flex items-start">
                <ShieldCheck className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-green-700">{msSuccess}</p>
              </div>
            )}

            <div className="space-y-6">
              {/* Nueva Contraseña */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 flex items-center">
                  <Lock className="h-4 w-4 mr-1 text-gray-500" />
                  Nueva Contraseña
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm transition-all duration-200"
                    id="password"
                    placeholder="Ingrese su nueva contraseña"
                    required
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

              {/* Confirmar Contraseña */}
              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 flex items-center">
                  <Lock className="h-4 w-4 mr-1 text-gray-500" />
                  Confirmar Contraseña
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className={`w-full px-4 py-3 border ${
                      confirmPassword && password !== confirmPassword
                        ? "border-red-300 focus:ring-red-500"
                        : "border-gray-300 focus:ring-orange-500"
                    } rounded-md focus:outline-none focus:ring-2 focus:border-transparent text-sm transition-all duration-200`}
                    id="confirmPassword"
                    placeholder="Confirme su nueva contraseña"
                    required
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {confirmPassword && password !== confirmPassword && (
                  <p className="text-xs text-red-500 mt-1">Las contraseñas no coinciden</p>
                )}
              </div>

              {/* Botón Restablecer con efecto hover */}
              <div className="pt-4">
                <Button
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-md hover:from-orange-600 hover:to-red-600 focus:ring-4 focus:ring-orange-300 focus:ring-opacity-50 transition-all duration-300 transform hover:-translate-y-1 shadow-md"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Procesando...
                    </div>
                  ) : (
                    buttonForm
                  )}
                </Button>
              </div>
            </div>
          </form>

          {/* Información de seguridad */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500 flex items-center justify-center">
              <ShieldCheck className="h-4 w-4 mr-1 text-gray-400" />
              Sus datos están protegidos con encriptación de extremo a extremo
            </p>
          </div>
        </div>
      </div>


      {/* Modal de éxito */}
      <AlertDialog open={isModalOpen} onOpenChange={setModalOpen}>
        <AlertDialogContent className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-green-500">
          <AlertDialogHeader>
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
              <ShieldCheck className="h-6 w-6 text-green-600" />
            </div>
            <AlertDialogTitle className="text-center text-lg font-medium text-gray-900">
              ¡Operación Exitosa!
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center text-sm text-gray-500 mt-2">
              Su contraseña ha sido restablecida con éxito. Ahora puede iniciar sesión con su nueva contraseña.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-4">
            <AlertDialogAction
              onClick={() => router.push("responsible/login")}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 rounded-md hover:from-orange-600 hover:to-red-600 transition-all duration-300"
            >
              Ir al inicio de sesión
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default FormResetPassword;
