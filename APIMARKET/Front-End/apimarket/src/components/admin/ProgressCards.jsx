"use client"

import { BarChart, Droplets, CheckCircle2 } from "lucide-react"
import CircularProgress from "./CircularProgress"
import axiosInstance from "@/lib/axiosInstance"
import { useState, useEffect } from "react"
import PrivateRoute from "@/app/routes/privateRoute"

function ProgressCards() {
  const [totColmenasTotal, setTotColmenasTotal] = useState(0)
  const [totColm, setTotColm] = useState("")
  const [totColmInactiva, setTotColmInactiva] = useState("")
  const [produccionTotal, setProduccionTotal] = useState(0)
  const [metaProduccion, setMetaProduccion] = useState(100)
  const [produccionPorcentaje, setProduccionPorcentaje] = useState(0)
  const [percentage, setPercentage] = useState(0)
  const [totResponsable, setResponsable] = useState(0)
  const [totRes, setTotalRes] = useState(0)
  const [totalImplements, setTotalImplements] = useState(0);
const [implementTotal, setImplementTotal] = useState(0);
const [implementValueAccumulated, setImplementValueAccumulated] = useState(0);

  const [alimentacionPorcentaje, setAlimentacionPorcentaje] = useState(0)
  const [implementUsed, setImplementUsed] = useState(0)
  const [totResponsablesTotal, setTotResponsablesTotal] = useState(0);
  // Colmenas activas
  useEffect(() => {
    async function fetchTotalColmenas() {
      try {
        const response = await axiosInstance.get("/Api/Hive/GetTotalHives")
        setTotColm(response.data.total)
      } catch (error) {
        console.error("Error al obtener total de colmenas:", error)
      }
    }
    fetchTotalColmenas()
  }, [])

  // Colmenas inactivas
  useEffect(() => {
    async function fetchTotalInactiva() {
      try {
        const response = await axiosInstance.get("/Api/Hive/GetTotalHivesInactivo")
        setTotColmInactiva(response.data.total)
      } catch (error) {
        console.error("Error al traer las colmenas inactivas", error)
      }
    }
    fetchTotalInactiva()
  }, [])

//implement

useEffect(() => {
    async function fetchImplementCount() {
      try {
        const response = await axiosInstance.get("/Api/Implement/GetImplementCount");
        setTotalImplements(response.data.count || 0);
      } catch (error) {
        console.error("Error al obtener total de implementos:", error);
      }
    }
    fetchImplementCount();
  }, []);


  useEffect(() => {
  async function fetchImplementData() {
    try {
      const response = await axiosInstance.get("/Api/Implement/GetImplementCount");
      setImplementTotal(response.data.count || 0);
    } catch (error) {
      console.error("Error al obtener total de implementos:", error);
    }
  }
  fetchImplementData();
}, []);




useEffect(() => {
  async function fetchImplementValueAccumulated() {
    try {
      const response = await axiosInstance.get("/Api/Implement/GetValorTotalImplementos");
      setImplementValueAccumulated(response.data.total || 0);
    } catch (error) {
      console.error("Error al obtener el valor acumulado de implementos:", error);
    }
  }
  fetchImplementValueAccumulated();
}, []);







  //TODOS
  useEffect(() => {
    async function fetchTotalColmenasGeneral() {
      try {
        const response = await axiosInstance.get("/Api/Hive/GetTotalAllHives")
        setTotColmenasTotal(response.data.total)
      } catch (error) {
        console.error("Error al obtener total general de colmenas:", error)
      }
    }
    fetchTotalColmenasGeneral()
  }, [])



  //toptak de responsable
  useEffect(() => {
    async function fetchTotalResponsables() {
      try {
        const response = await axiosInstance.get("/Api/Responsible/GetTotalResponsables");
        setTotResponsablesTotal(response.data.total);
      } catch (error) {
        console.error("Error al obtener total de responsables:", error);
      }
    }
    fetchTotalResponsables();
  }, []);





  // Porcentaje colmenas saludables
  useEffect(() => {
    async function fetchPorcentaje() {
      try {
        const response = await axiosInstance.get("/Api/Hive/healthy-percentage")
        setPercentage(Number(response.data) || 0)
      } catch (error) {
        console.error("Error al traer el porcentaje de colmenas saludables", error)
      }
    }
    fetchPorcentaje()
  }, [])

  // Producción actual dinámica
  useEffect(() => {
    async function fetchProduccion() {
      try {
        const response = await axiosInstance.get("/Api/Production/GetDynamicProductionPercentage")
        console.log("📦 Producción recibida:", response.data)

        const { cantidad, porcentaje } = response.data

        setProduccionTotal(Number(cantidad) || 0)
        setProduccionPorcentaje(Math.min(Math.max(Number(porcentaje), 0), 100))
      } catch (error) {
        console.error("❌ Error al obtener la producción dinámica:", error)
        setProduccionTotal(0)
        setProduccionPorcentaje(0)
      }
    }
    fetchProduccion()
  }, [])



  // Responsables activos
  useEffect(() => {
    async function fetchTotalResponsable() {
      try {
        const response = await axiosInstance.get("/Api/Responsible/GetTotalCuaMielResponsables")
        setResponsable(response.data.total)
      } catch (error) {
        console.error("Error al obtener total de responsables activos:", error)
      }
    }
    fetchTotalResponsable()
  }, [])

  // Responsables inactivos
  useEffect(() => {
    async function fetchTotalInactivos() {
      try {
        const response = await axiosInstance.get("/Api/Responsible/GetTotalResponsablesInactivo")
        setTotalRes(response.data.total)
      } catch (error) {
        console.error("Error al obtener responsables inactivos:", error)
      }
    }
    fetchTotalInactivos()
  }, [])

  // Implement
  useEffect(() => {
    async function fetchImplementData() {
      try {
        const [usedResponse, totalResponse] = await Promise.all([
          axiosInstance.get("/Api/Implement/GetTotalImplementUsed"),
          axiosInstance.get("/Api/Implement/GetTotalImplement"),
        ])

        const used = usedResponse.data.used || 0
        const total = totalResponse.data.total || 0

        setImplementUsed(used)
        setImplementTotal(total)

        const porcentaje = total > 0 ? (used / total) * 100 : 0
        setAlimentacionPorcentaje(porcentaje)
      } catch (error) {
        console.error("Error al obtener datos de protocolo:", error)
      }
    }
    fetchImplementData()
  }, [])

  // Porcentaje responsables activo (ejemplo dado)
  const porcentajeResponsables = totResponsable > 0 ? Math.max(100 - (totResponsable - 1) * 10, 0) : 0

  const cards = [

    {
      title: "Colmenas Saludables",
      icon: <CheckCircle2 className="w-4 h-4 text-emerald-600" />,
      value: totColmenasTotal,
      color: "#10b981",
      track: "#d1fae5",
      stats: [
        { num: totColm, label: "Activas", bg: "from-emerald-50 to-emerald-100/30", border: "border-emerald-100" },
        { num: totColmInactiva, label: "Inactivas", bg: "from-slate-50 to-slate-100/30", border: "border-slate-200" },
      ],
    },

    {
      title: "Producción Anual",
      icon: <BarChart className="w-4 h-4 text-rose-600" />,
      value: produccionPorcentaje,
      color: "#e11d48",
      track: "#ffe4e6",
      stats: [
        { num: produccionTotal, label: "Cantidad Producción", bg: "from-rose-50 to-rose-100/30", border: "border-rose-100" },
        { num: metaProduccion, label: "Meta", bg: "from-slate-50 to-slate-100/30", border: "border-slate-200" },
      ],
    },
    {
      title: "Responsables activo / inactivo",
      icon: <Droplets className="w-4 h-4 text-amber-600" />,
      value: totResponsablesTotal,
      color: "#f59e0b",
      track: "#fef3c7",
      stats: [
        { num: totResponsable, label: "Activos" },
        { num: totRes, label: "Inactivos" },

      ],
    },
{
  title: "Implemento",
  icon: (
    <div className="w-14h-10 rounded-full bg-amber-100 flex items-center justify-center mr-1">
      <svg className="w-8 h-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </div>
  ),
  value: implementTotal,
  color: "#0D09F8FF",
  track: "#2898E2FF",
  stats: [
    { num: implementTotal, label: "Cantidad de implementos", bg: "from-amber-50 to-amber-100/30", border: "border-amber-100" },
    { num: implementValueAccumulated.toLocaleString("es-CO", { style: "currency", currency: "COP" }), label: "Valor total",bg: "from-slate-50 to-slate-100/30", border: "border-slate-200" }, // Aquí usas el acumulado
  ],
},



  ]

  return (
    <PrivateRoute requiredRole={["pasante", "instructor", "gestor"]}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cards.map((card, i) => (
          <div
            key={i}
            className="bg-white backdrop-blur-xl bg-opacity-80 p-6 rounded-2xl shadow-lg border border-white/20 overflow-hidden relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-sky-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
            <div className="relative z-10">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-full bg-[rgba(0,0,0,0.05)] flex items-center justify-center mr-3">
                  {card.icon}
                </div>
                <h3 className="text-sm font-medium text-slate-500">{card.title}</h3>
              </div>
              <div className="flex justify-center">
                <CircularProgress
                  value={isNaN(card.value) ? 0 : Math.min(Math.max(card.value, 0), 100)}
                  color={card.color}
                  trackColor={card.track}
                  size={120}
                  strokeWidth={10}
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                {card.stats.map((s, j) => (
                  <div key={j} className={`p-3 bg-gradient-to-br ${s.bg} rounded-xl ${s.border}`}>
                    <p className="text-lg font-bold text-slate-700">{s.num}</p>
                    <p className="text-xs text-slate-500 mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </PrivateRoute>
  )
}

export default ProgressCards
