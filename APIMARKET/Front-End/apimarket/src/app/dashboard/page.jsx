"use client"
import { useState, useEffect } from "react"
import Siderbar from "@/components/navs/Siderbar"
import NavPrivate from "@/components/navs/NavPrivate"
import WelcomeSection from "@/components/navs/WelcomeSection"
import PrivateRoute from "../routes/privateRoute"
import { useAuth } from "../context/authContext" // Ajusta la ruta según tu estructura

function Dashboard() {
  const { user } = useAuth()
  const [titlePage, setTitlePage] = useState("Bienvenidos al dashboard")

  // SOLUCIÓN: Usar user.rol en lugar de user.role
  useEffect(() => {
    // SOLUCIÓN: Usar user?.rol en lugar de user?.role
    if (user?.rol === "administrador" || user?.rol === "instructor") {
      setTitlePage("Panel de Administración")
    } else if (user?.rol === "gestor" || user?.rol === "pasante") {
      setTitlePage("Panel de Gestión")
    } else {
      setTitlePage("Bienvenidos al dashboard")
    }
  }, [user])

  return (
    <>
      <PrivateRoute requiredRole={["administrador", "instructor", "gestor", "pasante"]}>
        <div className="flex h-screen bg-gray-100">
          <Siderbar />
          <div className="flex flex-col flex-1 text-white">
            <NavPrivate TitlePage={titlePage} />
            <main className="flex-grow overflow-y-auto">
              <WelcomeSection />
            </main>
          </div>
        </div>
      </PrivateRoute>
    </>
  )
}

export default Dashboard
