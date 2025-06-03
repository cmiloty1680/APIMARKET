"use client"
import { useAuth } from "@/app/context/authContext" // Ajusta la ruta según tu estructura
import StatsCards from "../admin/StatsCards"
import ProductionAnalytics from "../admin/ProductionAnalytics"
import AlertsSection from "../admin/AlertsSection"
import ProgressCards from "../admin/ProgressCards"
import GestorDashboard from "./GestorDashboard" // Dashboard para gestores y pasantes

function WelcomeSection() {
  const { user } = useAuth() // Obtener información del usuario logueado

  // SOLUCIÓN: Usar user.rol en lugar de user.role
  console.log("🔍 DEBUG - Usuario completo:", user)
  console.log("🔍 DEBUG - Rol del usuario:", user?.rol) // Cambiado de user?.role a user?.rol
  console.log("🔍 DEBUG - Tipo del rol:", typeof user?.rol)

  // Función para renderizar el dashboard según el rol
  const renderDashboardByRole = () => {
    if (!user) {
      console.log("❌ Usuario no encontrado")
      return (
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-8 min-h-screen overflow-auto">
          <div className="max-w-7xl mx-auto flex items-center justify-center h-full">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Cargando información del usuario...</p>
            </div>
          </div>
        </div>
      )
    }

    // SOLUCIÓN: Usar user.rol en lugar de user.role
    const isAdmin = user.rol === "administrador"
    const isInstructor = user.rol === "instructor"
    const isGestor = user.rol === "gestor"
    const isPasante = user.rol === "pasante"

    console.log("🔍 DEBUG - Verificaciones de rol:")
    console.log("  - Es administrador:", isAdmin)
    console.log("  - Es instructor:", isInstructor)
    console.log("  - Es gestor:", isGestor)
    console.log("  - Es pasante:", isPasante)

    // Dashboard para ADMINISTRADOR e INSTRUCTOR (tu código original)
    if (isPasante || isInstructor) {
      console.log("✅ Mostrando dashboard de administrador")
      return (
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-8 min-h-screen overflow-auto">
          <div className="max-w-7xl mx-auto">
            <ProgressCards />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <ProductionAnalytics />
              <AlertsSection />
            </div>
            <StatsCards />
          </div>
        </div>
      )
    }

    // Dashboard para GESTOR y PASANTE (mismo dashboard de gestión)
    if (isGestor || isPasante) {
      console.log("✅ Mostrando dashboard de gestor")
      return <GestorDashboard />
    }

    // Para otros roles o sin permisos
    console.log("❌ Rol no reconocido, mostrando acceso denegado")
    return (
      <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-8 min-h-screen overflow-auto">
        <div className="max-w-7xl mx-auto flex items-center justify-center h-full">
          <div className="text-center">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-red-800 mb-2">Acceso Denegado</h3>
              <p className="text-red-600 mb-4">No tienes permisos para acceder a este dashboard.</p>
              <p className="text-sm text-red-500">
                Rol actual: <span className="font-medium">{user.rol || "Sin rol asignado"}</span>
              </p>
              <p className="text-sm text-red-500 mt-2">
                Tipo de dato: <span className="font-medium">{typeof user.rol}</span>
              </p>
              <p className="text-sm text-red-500 mt-2">
                Contacta al administrador para obtener los permisos necesarios.
              </p>

              {/* DEBUGGING: Mostrar información completa del usuario */}
              <details className="mt-4 text-left">
                <summary className="cursor-pointer text-sm text-red-600 hover:text-red-800">
                  Ver información de debugging
                </summary>
                <pre className="mt-2 p-2 bg-gray-100 rounded text-xs text-gray-800 overflow-auto">
                  {JSON.stringify(user, null, 2)}
                </pre>
              </details>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return renderDashboardByRole()
}

export default WelcomeSection
