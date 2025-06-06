"use client"

import { CheckCircle2 } from "lucide-react"
import CircularProgress from "./CircularProgress"
import axiosInstance from "@/lib/axiosInstance"
import { useState, useEffect } from "react"
import PrivateRoute from "@/app/routes/privateRoute"

function HiveProgressCards() {
  const [totColmenasTotal, setTotColmenasTotal] = useState(0)
  const [totColm, setTotColm] = useState("")
  const [totColmInactiva, setTotColmInactiva] = useState("")
  const [percentage, setPercentage] = useState(0)

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
        console.log("Dashboard Gestor: Colmenas Inactivas - Response", response.data)
        setTotColmInactiva(response.data.total)
      } catch (error) {
        console.error("Error al traer las colmenas inactivas", error)
      }
    }
    fetchTotalInactiva()
  }, [])

  // Total general colmenas
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
    }
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

export default HiveProgressCards
