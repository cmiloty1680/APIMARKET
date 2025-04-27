"use client"
import { BarChart, Droplets, CheckCircle2 } from "lucide-react";
import CircularProgress from "./CircularProgress";
import axiosInstance from "@/lib/axiosInstance";
import { useState, useEffect } from "react";



function ProgressCards() {
    const [totColm, setTotColm] = useState("");
    
  
    useEffect(() => {
            // Obtener el total de colmenas desde el backend
            async function fetchTotalColmenas() {
                try {
                    const response = await axiosInstance.get("/Api/Hive/GetTotalHives"); // Asumiendo que el endpoint es correcto
                    setTotColm(response.data.total); // Establecer el total de colmenas en el estado
                } catch (error) {
                    console.error("Error al obtener total de colmenas:", error);
                }
            }
            fetchTotalColmenas();
        }, []);

  const cards = [
    { title: 'Colmenas Saludables', icon: <CheckCircle2 className="w-4 h-4 text-emerald-600" />, value: 80, color: '#10b981', track: '#d1fae5', stats: [{ num: totColm, label: 'Saludables', bg: 'from-emerald-50 to-emerald-100/30', border: 'border-emerald-100' }, { num: 12, label: 'En riesgo', bg: 'from-slate-50 to-slate-100/30', border: 'border-slate-200' }] },
    { title: 'Producción Actual', icon: <BarChart className="w-4 h-4 text-rose-600" />, value: 68, color: '#e11d48', track: '#ffe4e6', stats: [{ num: 68, label: 'Kg Producidos', bg: 'from-rose-50 to-rose-100/30', border: 'border-rose-100' }, { num: 100, label: 'Meta', bg: 'from-slate-50 to-slate-100/30', border: 'border-slate-200' }] },
    { title: 'Miel Recolectada', icon: <Droplets className="w-4 h-4 text-amber-600" />, value: 39, color: '#f59e0b', track: '#fef3c7', stats: [{ num: 39, label: 'Kg Recolectados', bg: 'from-amber-50 to-amber-100/30', border: 'border-amber-100' }, { num: 100, label: 'Meta', bg: 'from-slate-50 to-slate-100/30', border: 'border-slate-200' }] },
    { title: 'Revisiones', icon: <CheckCircle2 className="w-4 h-4 text-cyan-600" />, value: 95, color: '#0891b2', track: '#e0f2fe', stats: [{ num: 95, label: 'Completadas', bg: 'from-cyan-50 to-cyan-100/30', border: 'border-cyan-100' }, { num: 100, label: 'Total', bg: 'from-slate-50 to-slate-100/30', border: 'border-slate-200' }] }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, i) => (
        <div key={i} className="bg-white backdrop-blur-xl bg-opacity-80 p-6 rounded-2xl shadow-lg border border-white/20 relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-sky-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
          <div className="relative z-10">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 rounded-full bg-[rgba(0,0,0,0.05)] flex items-center justify-center mr-3">
                {card.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-800">{card.title}</h3>
            </div>
            <div className="flex justify-center mb-6">
              <CircularProgress value={card.value} color={card.color} trackColor={card.track} size={140} strokeWidth={10} />
            </div>
            <div className="grid grid-cols-2 gap-4">
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
  );
}

export default ProgressCards;