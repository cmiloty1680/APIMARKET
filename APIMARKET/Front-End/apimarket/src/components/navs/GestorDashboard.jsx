"use client"
import { useState, useEffect } from "react"
import { useAuth } from "@/app/context/authContext"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import AlertsSection from "../admin/AlertsSection"
import {
  Users,
  BookOpen,
  CheckCircle,
  Clock,
  TrendingUp,
  AlertTriangle,
  Calendar,
  Target,
  Plus,
  Eye,
} from "lucide-react"

function GestorDashboard() {
  const { user } = useAuth()
  const [stats, setStats] = useState({
    pasantesAsignados: 0,
    proyectosActivos: 0,
    tareasCompletadas: 0,
    tareasPendientes: 0,
    eficienciaEquipo: 0,
  })

  const [proyectos, setProyectos] = useState([])
  const [alertas, setAlertas] = useState([])
  const [actividades, setActividades] = useState([])

  useEffect(() => {
    const today = new Date()
    const todayStr = today.toISOString().split("T")[0]
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    const tomorrowStr = tomorrow.toISOString().split("T")[0]

    if (user?.rol === "gestor") {
      setStats({
        pasantesAsignados: 12,
        proyectosActivos: 5,
        tareasCompletadas: 89,
        tareasPendientes: 15,
        eficienciaEquipo: 92,
      })
    } else if (user?.rol === "pasante") {
      setStats({
        pasantesAsignados: 0,
        proyectosActivos: 2,
        tareasCompletadas: 23,
        tareasPendientes: 5,
        eficienciaEquipo: 88,
      })
    }

    setProyectos([
      {
        id: 1,
        name: "Gestores y Fechas de la unidad ",
        progress: 62,
        deadline: tomorrowStr,
        gestores: 2,
        prioridad: "Alta",
        estado: "Progreso",
      },
      {
        id: 2,
        name: " Software Centro Agropecuario La Granja",
        progress: 30,
        deadline: tomorrowStr,
        prioridad: "Alta",
        estado: "Progreso",
      },
      {
        id: 3,
        name: "Plataforma de Apicultores",
        progress: 85,
        deadline: todayStr,
        prioridad: "Alta",
        estado: "Progreso",
      },
    ])

    setAlertas([
      {
        id: 1,
        tipo: "urgente",
        mensaje: user?.rol === "gestor" ? "La alimentacion se realiza cuando esta en invierno" : "Tu tarea en 'Portal de Servicios' vence mañana",
      },
      {
        id: 2,
        tipo: "info",
        mensaje: "El ingreso a el apiario es con Traje ",
      },
      {
        id: 3,
        tipo: "warning",
        mensaje: user?.rol === "gestor" ? "El ingreso a la unidad es en silencio" : "Necesitas revisar los comentarios en tu código",
      },
      {
        id: 4,
        tipo: "info",
        mensaje: "Solo se permite personal Autorizado ",
      },
    ])

    setActividades([
      {
        id: 1,
        accion: user?.rol === "gestor" ? "Revisión de código completada" : "Código enviado para revisión",
        proyecto: "Sistema Académico",
        tiempo: "10:30 AM",
      },
      {
        id: 2,
        accion: user?.rol === "gestor" ? "Tarea asignada a María García" : "Nueva tarea asignada",
        proyecto: "App Móvil",
        tiempo: "09:15 AM",
      },
      {
        id: 3,
        accion: "Reunión de sprint finalizada",
        proyecto: "Portal Servicios",
        tiempo: "08:00 AM",
      },
    ])
  }, [user])

  const getTitle = () => {
    if (user?.rol === "gestor") return "Panel de Gestores"
    if (user?.rol === "pasante") return "Panel de Desarrollo - Pasantías"
    return "Panel de Gestor"
  }

  const getSubtitle = () => {
    if (user?.rol === "gestor") return "Supervisa el progreso de la unidad apicola"
    if (user?.rol === "pasante") return "Gestiona tus tareas y proyectos de pasantía"
    return "Gestiona tus proyectos y tareas"
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 min-h-screen overflow-auto">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border-l-4 border-l-orange-600">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{getTitle()}</h1>
              <p className="text-gray-600">{getSubtitle()}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Rol actual</p>
              <Badge variant="outline" className="text-sm font-medium">
                {user?.rol === "gestor" ? "Gestor" : "Pasante"}
              </Badge>
            </div>
          </div>
        </div>

        {/* Flickbox Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          {/* Activas */}
          <Card className="bg-white border-0 shadow-sm transition-transform duration-200 ease-in-out hover:scale-105 hover:shadow-md hover:ring-2 hover:ring-green-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Colmenas Activas</p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-1">1</h3>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                  Funcionando correctamente
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Inactivas */}
          <Card className="bg-white border-0 shadow-sm transition-transform duration-200 ease-in-out hover:scale-105 hover:shadow-md hover:ring-2 hover:ring-red-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Colmenas Inactivas</p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-1">1</h3>
                </div>
                <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-xs font-medium text-red-600 bg-red-100 px-2 py-1 rounded-full">
                  Inactivas
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Totales */}
          <Card className="bg-white border-0 shadow-sm transition-transform duration-200 ease-in-out hover:scale-105 hover:shadow-md hover:ring-2 hover:ring-blue-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total De Colmenas</p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-1">2</h3>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                  Estado actual
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Proyectos + Alertas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <Card className="lg:col-span-2 bg-white border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center">
                <Target className="mr-2 h-5 w-5 text-blue-600" />
                {user?.rol === "gestor" ? "Desarrollo APICULTURA" : "Mis Proyectos"}
              </CardTitle>
              <CardDescription>
                {user?.rol === "gestor"
                  ? "Unidad De Apicultura Del Centro Agropecuario La Granja"
                  : "Proyectos en los que estás participando"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {proyectos.map((proyecto) => (
                <div
                  key={proyecto.id}
                  className="border border-gray-200 rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">{proyecto.name}</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        {user?.rol === "gestor" && (
                          <span className="flex items-center">
                            <Users className="h-3 w-3 mr-1" />
                            {proyecto.gestores} gestores
                          </span>
                        )}
                        <span className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {proyecto.deadline}
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Badge className="bg-orange-100 text-orange-700 border border-orange-200">
                        {proyecto.prioridad}
                      </Badge>
                      <Badge variant="outline">{proyecto.estado}</Badge>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
          <AlertsSection />
        </div>
      </div>
    </div>
  )
}

export default GestorDashboard
