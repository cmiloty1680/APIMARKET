"use client"
import { useState, useEffect } from "react"
import { useAuth } from "@/app/context/authContext" // Para obtener el rol del usuario
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
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
  const { user } = useAuth() // Para personalizar según si es gestor o pasante
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
    // SOLUCIÓN: Usar user?.rol en lugar de user?.role
    if (user?.rol === "gestor") {
      // Datos para gestores
      setStats({
        pasantesAsignados: 12,
        proyectosActivos: 5,
        tareasCompletadas: 89,
        tareasPendientes: 15,
        eficienciaEquipo: 92,
      })
    } else if (user?.rol === "pasante") {
      // Datos para pasantes (más limitados)
      setStats({
        pasantesAsignados: 0, // Los pasantes no tienen asignados
        proyectosActivos: 2, // Proyectos en los que participa
        tareasCompletadas: 23,
        tareasPendientes: 5,
        eficienciaEquipo: 88, // Su rendimiento personal
      })
    }

    setProyectos([
      {
        id: 1,
        name: "Sistema de Gestión Académica",
        progress: 78,
        deadline: "2024-02-20",
        pasantes: 4,
        prioridad: "Alta",
        estado: "En Progreso",
      },
      {
        id: 2,
        name: "App Móvil Estudiantes",
        progress: 45,
        deadline: "2024-03-15",
        pasantes: 3,
        prioridad: "Media",
        estado: "En Desarrollo",
      },
      {
        id: 3,
        name: "Portal de Servicios",
        progress: 92,
        deadline: "2024-02-05",
        pasantes: 2,
        prioridad: "Alta",
        estado: "Casi Terminado",
      },
    ])

    setAlertas([
      {
        id: 1,
        tipo: "urgente",
        mensaje:
          user?.rol === "gestor"
            ? "Alimentacion se requiere"
            : "Tu tarea en 'Portal de Servicios' vence mañana",
      },
      {
        id: 2,
        tipo: "info",
        mensaje: "Reunión de seguimiento programada para mañana",
      },
      {
        id: 3,
        tipo: "warning",
        mensaje:
          user?.rol === "gestor"
            ? "Pasante Juan Pérez necesita apoyo en React"
            : "Necesitas revisar los comentarios en tu código",
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

  // Personalizar el título según el rol
  const getTitle = () => {
    if (user?.rol === "gestor") {
      return "Panel de Gestores"
    } else if (user?.rol === "pasante") {
      return "Panel de Desarrollo - Pasantías"
    }
    return "Panel de Gestión"
  }

  const getSubtitle = () => {
    if (user?.rol === "gestor") {
      return "Supervisa el progreso de la unidad apicola"
    } else if (user?.rol === "pasante") {
      return "Gestiona tus tareas y proyectos de pasantía"
    }
    return "Gestiona tus proyectos y tareas"
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 min-h-screen overflow-auto">
      <div className="max-w-7xl mx-auto">
        {/* Header personalizado según el rol */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border-l-4 border-l-blue-600">
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

        {/* Métricas principales - personalizadas según el rol */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {user?.rol === "gestor" && (
            <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Pasantes</CardTitle>
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="h-4 w-4 text-blue-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stats.pasantesAsignados}</div>
                <p className="text-xs text-blue-600 mt-1">Bajo supervisión</p>
              </CardContent>
            </Card>
          )}

          <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Proyectos</CardTitle>
              <div className="p-2 bg-green-100 rounded-lg">
                <BookOpen className="h-4 w-4 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stats.proyectosActivos}</div>
              <p className="text-xs text-green-600 mt-1">{user?.rol === "gestor" ? "En desarrollo" : "Participando"}</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Completadas</CardTitle>
              <div className="p-2 bg-emerald-100 rounded-lg">
                <CheckCircle className="h-4 w-4 text-emerald-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stats.tareasCompletadas}</div>
              <p className="text-xs text-emerald-600 mt-1">Este mes</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Pendientes</CardTitle>
              <div className="p-2 bg-orange-100 rounded-lg">
                <Clock className="h-4 w-4 text-orange-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stats.tareasPendientes}</div>
              <p className="text-xs text-orange-600 mt-1">Por completar</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {user?.rol === "gestor" ? "Eficiencia" : "Rendimiento"}
              </CardTitle>
              <div className="p-2 bg-purple-100 rounded-lg">
                <TrendingUp className="h-4 w-4 text-purple-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stats.eficienciaEquipo}%</div>
              <p className="text-xs text-purple-600 mt-1">{user?.rol === "gestor" ? "Del equipo" : "Personal"}</p>
            </CardContent>
          </Card>
        </div>

        {/* Resto del componente igual... */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Proyectos en curso */}
          <Card className="lg:col-span-2 bg-white border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center">
                <Target className="mr-2 h-5 w-5 text-blue-600" />
                {user?.rol === "gestor" ? "Proyectos en Desarrollo" : "Mis Proyectos"}
              </CardTitle>
              <CardDescription>
                {user?.rol === "gestor"
                  ? "Estado actual y progreso de los proyectos asignados"
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
                            {proyecto.pasantes} pasantes
                          </span>
                        )}
                        <span className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {proyecto.deadline}
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Badge variant={proyecto.prioridad === "Alta" ? "destructive" : "secondary"}>
                        {proyecto.prioridad}
                      </Badge>
                      <Badge variant="outline">{proyecto.estado}</Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">Progreso: {proyecto.progress}%</span>
                      <Button variant="ghost" size="sm" className="h-6 px-2">
                        <Eye className="h-3 w-3 mr-1" />
                        Ver detalles
                      </Button>
                    </div>
                    <Progress value={proyecto.progress} className="h-2" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          
          {/* Alertas y notificaciones */}
          <Card className="bg-white border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-green-600" />
                Actividades Apicola 
                <Badge variant="destructive" className="ml-auto">
                  {alertas.length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {alertas.map((alerta) => (
                <div
                  key={alerta.id}
                  className={`border-l-4 p-3 rounded-r-lg ${
                    alerta.tipo === "urgente"
                      ? "border-l-red-400 bg-red-50"
                      : alerta.tipo === "warning"
                        ? "border-l-orange-400 bg-orange-50"
                        : "border-l-blue-400 bg-blue-50"
                  }`}
                >
                  <p className="text-sm font-medium text-gray-900">{alerta.mensaje}</p>
                  <p className="text-xs text-gray-600 mt-1">{alerta.tiempo}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Actividades recientes y acciones rápidas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Actividades recientes */}
          <Card className="bg-white border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center">
                Actividad Apícola Reciente
              </CardTitle>
              <CardDescription>
                {user?.rol === "gestor"
                  ? "Últimas actividades realizadas en la unidad apícola"
                  : "Tu actividad reciente en las colmenas"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {actividades.map((actividad) => (
                <div
                  key={actividad.id}
                  className="flex items-start space-x-3 p-3 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors"
                >
                  <div className="w-2 h-2 bg-amber-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{actividad.accion}</p>
                    <p className="text-xs text-gray-600">{actividad.proyecto}</p>
                    <p className="text-xs text-gray-500">{actividad.tiempo}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        
         
          
                
        </div>
      </div>
  )
}
export default GestorDashboard
