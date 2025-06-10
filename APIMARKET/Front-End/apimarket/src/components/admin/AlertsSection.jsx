// components/AlertsSection.jsx
"use client"
import { Activity, AlertTriangle, Droplets, CheckCircle2 } from "lucide-react";

function AlertsSection() {
  return (
    <div className="bg-white backdrop-blur-xl bg-opacity-80 p-6 rounded-2xl shadow-lg border border-white/20 relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-slate-500/5 to-slate-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
      <div className="relative z-10">
        <div className="flex justify-between items-center mb-6 w-full flex-wrap">
          <div className="flex items-center">
            <Activity className="w-5 h-5 text-slate-700 mr-2" />
            <h3 className="text-xl font-bold text-slate-800">Recomendaciones Apícolas</h3>
          </div>
          <span className="px-2.5 py-1 text-xs font-medium text-white bg-gradient-to-r from-red-500 to-rose-500 rounded-full shadow-sm mt-2 sm:mt-0">
            Sugerencias
          </span>
        </div>

        <div className="space-y-4">
          <div className="flex items-start p-4 rounded-xl bg-gradient-to-r from-amber-50 to-amber-100/50 border border-amber-200/50 shadow-sm">
            <div className="w-8 h-8 rounded-full bg-amber-200 flex items-center justify-center mr-3 flex-shrink-0">
              <AlertTriangle className="w-4 h-4 text-amber-700" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-amber-900">La alimentracion se realiza en tiempo de invierno</h4>
              <p className="text-xs text-amber-700 mt-1">Apicultura</p>
            </div>
          </div>
          <div className="flex items-start p-4 rounded-xl bg-gradient-to-r from-red-50 to-red-100/50 border border-red-200/50 shadow-sm">
            <div className="w-8 h-8 rounded-full bg-red-200 flex items-center justify-center mr-3 flex-shrink-0">
              <AlertTriangle className="w-4 h-4 text-red-700" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-red-900">El Ingreso a el apiario solo personal autorizado</h4>
              <p className="text-xs text-red-700 mt-1">Apicultura</p>
            </div>
          </div>
          <div className="flex items-start p-4 rounded-xl bg-gradient-to-r from-blue-50 to-blue-100/50 border border-blue-200/50 shadow-sm">
            <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center mr-3 flex-shrink-0">
              <Droplets className="w-4 h-4 text-blue-700" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-blue-900">El ingreso a la unidad es en silencio</h4>
              <p className="text-xs text-blue-700 mt-1">Apicultura</p>
            </div>
          </div>
          <div className="flex items-start p-4 rounded-xl bg-gradient-to-r from-green-50 to-green-100/50 border border-green-200/50 shadow-sm">
            <div className="w-8 h-8 rounded-full bg-green-200 flex items-center justify-center mr-3 flex-shrink-0">
              <CheckCircle2 className="w-4 h-4 text-green-700" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-green-900">El ingreso a el Apiario es con trajes </h4>
              <p className="text-xs text-green-700 mt-1">Apicultura</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default AlertsSection;