"use client"
import { BarChart, Droplets, AlertTriangle, ArrowUpRight, TrendingUp, Activity, CheckCircle2 } from "lucide-react"

function WelcomeSection() {
  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-8 overflow-auto">
      <div className="max-w-7xl mx-auto">
        {/* Top Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Card 1 - Producción Total */}
          <div className="bg-white backdrop-blur-xl bg-opacity-80 p-6 rounded-2xl shadow-lg border border-white/20 overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="flex items-center mb-1">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                </div>
                <h3 className="text-sm font-medium text-slate-500">Producción Total</h3>
              </div>
              <div className="flex items-end justify-between">
                <p className="text-3xl font-bold text-slate-800">85.50 kg</p>
                <span className="flex items-center px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">
                  <ArrowUpRight className="w-3 h-3 mr-1" />
                  7.5%
                </span>
              </div>
              <div className="mt-4 h-24 w-full">
                <svg className="w-full h-full" viewBox="0 0 300 100" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="rgba(59, 130, 246, 0.5)" />
                      <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0,50 C30,30 60,70 90,50 C120,30 150,70 180,50 C210,30 240,70 270,50 L300,50 L300,100 L0,100 Z"
                    fill="url(#gradient1)"
                    strokeWidth="3"
                    stroke="#3b82f6"
                  />
                </svg>
              </div>
              <div className="flex justify-between items-center mt-2">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mr-1"></div>
                  <span className="text-xs text-slate-500">Meta: 100kg</span>
                </div>
                <span className="text-sm font-semibold text-blue-600">85.5%</span>
              </div>
            </div>
          </div>

          {/* Card 2 - Ingresos */}
          <div className="bg-white backdrop-blur-xl bg-opacity-80 p-6 rounded-2xl shadow-lg border border-white/20 overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-amber-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="flex items-center mb-1">
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-sm font-medium text-slate-500">Ingresos Estimados</h3>
              </div>
              <div className="flex items-end justify-between">
                <p className="text-3xl font-bold text-slate-800">$12,548</p>
                <span className="flex items-center px-2 py-1 text-xs font-medium text-red-800 bg-red-100 rounded-full">
                  <ArrowUpRight className="w-3 h-3 mr-1 rotate-90" />
                  4.6%
                </span>
              </div>
              <div className="mt-4 h-24 w-full">
                <svg className="w-full h-full" viewBox="0 0 300 100" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="gradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="rgba(245, 158, 11, 0.5)" />
                      <stop offset="100%" stopColor="rgba(245, 158, 11, 0)" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0,30 C30,50 60,20 90,40 C120,60 150,30 180,50 C210,70 240,40 270,60 L300,60 L300,100 L0,100 Z"
                    fill="url(#gradient2)"
                    strokeWidth="3"
                    stroke="#f59e0b"
                  />
                </svg>
              </div>
              <div className="flex justify-between items-center mt-2">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-amber-500 mr-1"></div>
                  <span className="text-xs text-slate-500">Precio/kg: $145</span>
                </div>
                <span className="text-sm font-semibold text-amber-600">Ver detalles</span>
              </div>
            </div>
          </div>

          {/* Card 3 - Colmenas Activas */}
          <div className="bg-white backdrop-blur-xl bg-opacity-80 p-6 rounded-2xl shadow-lg border border-white/20 overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-emerald-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="flex items-center mb-1">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                </div>
                <h3 className="text-sm font-medium text-slate-500">Colmenas Activas</h3>
              </div>
              <div className="flex items-end justify-between">
                <p className="text-3xl font-bold text-slate-800">112</p>
                <span className="flex items-center px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">
                  <ArrowUpRight className="w-3 h-3 mr-1" />
                  13.3%
                </span>
              </div>
              <div className="mt-4 h-24 w-full">
                <svg className="w-full h-full" viewBox="0 0 300 100" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="gradient3" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="rgba(16, 185, 129, 0.5)" />
                      <stop offset="100%" stopColor="rgba(16, 185, 129, 0)" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0,40 C30,20 60,60 90,40 C120,20 150,60 180,40 C210,20 240,60 270,40 L300,40 L300,100 L0,100 Z"
                    fill="url(#gradient3)"
                    strokeWidth="3"
                    stroke="#10b981"
                  />
                </svg>
              </div>
              <div className="flex justify-between items-center mt-2">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 mr-1"></div>
                  <span className="text-xs text-slate-500">Total: 125</span>
                </div>
                <span className="text-sm font-semibold text-emerald-600">89.6%</span>
              </div>
            </div>
          </div>

          {/* Card 4 - Gastos */}
          <div className="bg-white backdrop-blur-xl bg-opacity-80 p-6 rounded-2xl shadow-lg border border-white/20 overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-rose-500/5 to-rose-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="flex items-center mb-1">
                <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-sm font-medium text-slate-500">Gastos</h3>
              </div>
              <div className="flex items-end justify-between">
                <p className="text-3xl font-bold text-slate-800">$8,451</p>
                <span className="flex items-center px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">
                  <ArrowUpRight className="w-3 h-3 mr-1" />
                  3.5%
                </span>
              </div>
              <div className="mt-4 h-24 w-full">
                <svg className="w-full h-full" viewBox="0 0 300 100" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="gradient4" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="rgba(225, 29, 72, 0.5)" />
                      <stop offset="100%" stopColor="rgba(225, 29, 72, 0)" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0,60 C30,40 60,70 90,50 C120,30 150,60 180,40 C210,20 240,50 270,30 L300,30 L300,100 L0,100 Z"
                    fill="url(#gradient4)"
                    strokeWidth="3"
                    stroke="#e11d48"
                  />
                </svg>
              </div>
              <div className="flex justify-between items-center mt-2">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-rose-500 mr-1"></div>
                  <span className="text-xs text-slate-500">Presupuesto: $10,000</span>
                </div>
                <span className="text-sm font-semibold text-rose-600">84.5%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Section - Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Production Analytics */}
          <div className="bg-white backdrop-blur-xl bg-opacity-80 p-6 rounded-2xl shadow-lg border border-white/20 lg:col-span-2 relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
            <div className="relative z-10">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="text-xl font-bold text-slate-800">Producción Anual</h3>
                  <p className="text-sm text-slate-500 mt-1">Comparativa de los últimos 10 años</p>
                </div>
                <div className="flex items-center space-x-3">
                  <button className="px-3 py-1.5 text-xs font-medium bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors">
                    Este año
                  </button>
                  <button className="px-3 py-1.5 text-xs font-medium bg-white text-slate-600 rounded-lg hover:bg-slate-50 transition-colors border border-slate-200">
                    5 años
                  </button>
                  <button className="px-3 py-1.5 text-xs font-medium bg-white text-slate-600 rounded-lg hover:bg-slate-50 transition-colors border border-slate-200">
                    10 años
                  </button>
                </div>
              </div>
              <div className="h-72 flex items-end space-x-4 px-4">
                {[80, 120, 100, 90, 110, 100, 120, 110, 150, 130].map((value, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div className="w-full relative group/bar" style={{ height: `${value * 0.45}px` }}>
                      <div className="absolute inset-x-0 bottom-0 rounded-t-lg bg-gradient-to-t from-indigo-600 to-violet-500 w-full h-full opacity-80 group-hover/bar:opacity-100 transition-opacity"></div>
                      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white px-2 py-1 rounded text-xs opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap">
                        {value} kg en {2014 + index}
                      </div>
                    </div>
                    <span className="text-xs mt-3 text-slate-500 font-medium">{2014 + index}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center mt-6 pt-6 border-t border-slate-100">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-gradient-to-r from-indigo-600 to-violet-500 rounded-full mr-2"></div>
                  <span className="text-sm text-slate-500">Producción en kilogramos</span>
                </div>
                <button className="text-sm text-indigo-600 font-medium hover:text-indigo-800 flex items-center">
                  Ver reporte completo
                  <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Alerts Section */}
          <div className="bg-white backdrop-blur-xl bg-opacity-80 p-6 rounded-2xl shadow-lg border border-white/20 relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-slate-500/5 to-slate-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
            <div className="relative z-10">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                  <Activity className="w-5 h-5 text-slate-700 mr-2" />
                  <h3 className="text-xl font-bold text-slate-800">Alertas</h3>
                </div>
                <span className="px-2.5 py-1 text-xs font-medium text-white bg-gradient-to-r from-red-500 to-rose-500 rounded-full shadow-sm">
                  4 nuevas
                </span>
              </div>
              <div className="space-y-4">
                <div className="flex items-start p-4 rounded-xl bg-gradient-to-r from-amber-50 to-amber-100/50 border border-amber-200/50 shadow-sm">
                  <div className="w-8 h-8 rounded-full bg-amber-200 flex items-center justify-center mr-3 flex-shrink-0">
                    <AlertTriangle className="w-4 h-4 text-amber-700" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-amber-900">Revisión pendiente</h4>
                    <p className="text-xs text-amber-700 mt-1">Colmena #45 requiere revisión urgente</p>
                  </div>
                </div>
                <div className="flex items-start p-4 rounded-xl bg-gradient-to-r from-red-50 to-red-100/50 border border-red-200/50 shadow-sm">
                  <div className="w-8 h-8 rounded-full bg-red-200 flex items-center justify-center mr-3 flex-shrink-0">
                    <AlertTriangle className="w-4 h-4 text-red-700" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-red-900">Alimentación baja</h4>
                    <p className="text-xs text-red-700 mt-1">12 colmenas con niveles críticos</p>
                  </div>
                </div>
                <div className="flex items-start p-4 rounded-xl bg-gradient-to-r from-blue-50 to-blue-100/50 border border-blue-200/50 shadow-sm">
                  <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center mr-3 flex-shrink-0">
                    <Droplets className="w-4 h-4 text-blue-700" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-blue-900">Recolección programada</h4>
                    <p className="text-xs text-blue-700 mt-1">Mañana: 15 colmenas listas</p>
                  </div>
                </div>
                <div className="flex items-start p-4 rounded-xl bg-gradient-to-r from-green-50 to-green-100/50 border border-green-200/50 shadow-sm">
                  <div className="w-8 h-8 rounded-full bg-green-200 flex items-center justify-center mr-3 flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-green-700" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-green-900">Alimentación completada</h4>
                    <p className="text-xs text-green-700 mt-1">35 colmenas alimentadas hoy</p>
                  </div>
                </div>
              </div>
              <button className="w-full mt-5 py-2.5 text-sm text-center text-slate-600 hover:text-slate-800 font-medium bg-slate-100 hover:bg-slate-200 transition-colors rounded-xl">
                Ver todas las alertas
              </button>
            </div>
          </div>
        </div>

        {/* Circular Progress Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Progress Card 1 */}
          <div className="bg-white backdrop-blur-xl bg-opacity-80 p-6 rounded-2xl shadow-lg border border-white/20 relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
            <div className="relative z-10">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center mr-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-800">Colmenas Saludables</h3>
              </div>
              <div className="flex justify-center mb-6">
                <CircularProgress value={80} color="#10b981" trackColor="#d1fae5" size={140} strokeWidth={10} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-gradient-to-br from-emerald-50 to-emerald-100/30 rounded-xl border border-emerald-100">
                  <p className="text-lg font-bold text-emerald-700">75</p>
                  <p className="text-xs text-emerald-600 mt-1">Saludables</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-slate-50 to-slate-100/30 rounded-xl border border-slate-200">
                  <p className="text-lg font-bold text-slate-700">12</p>
                  <p className="text-xs text-slate-500 mt-1">En riesgo</p>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Card 2 */}
          <div className="bg-white backdrop-blur-xl bg-opacity-80 p-6 rounded-2xl shadow-lg border border-white/20 relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-rose-500/5 to-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
            <div className="relative z-10">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center mr-3">
                  <BarChart className="w-4 h-4 text-rose-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-800">Producción Actual</h3>
              </div>
              <div className="flex justify-center mb-6">
                <CircularProgress value={68} color="#e11d48" trackColor="#ffe4e6" size={140} strokeWidth={10} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-gradient-to-br from-rose-50 to-rose-100/30 rounded-xl border border-rose-100">
                  <p className="text-lg font-bold text-rose-700">68</p>
                  <p className="text-xs text-rose-600 mt-1">Kg Producidos</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-slate-50 to-slate-100/30 rounded-xl border border-slate-200">
                  <p className="text-lg font-bold text-slate-700">100</p>
                  <p className="text-xs text-slate-500 mt-1">Meta</p>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Card 3 */}
          <div className="bg-white backdrop-blur-xl bg-opacity-80 p-6 rounded-2xl shadow-lg border border-white/20 relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-yellow-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
            <div className="relative z-10">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                  <Droplets className="w-4 h-4 text-amber-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-800">Miel Recolectada</h3>
              </div>
              <div className="flex justify-center mb-6">
                <CircularProgress value={39} color="#f59e0b" trackColor="#fef3c7" size={140} strokeWidth={10} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-gradient-to-br from-amber-50 to-amber-100/30 rounded-xl border border-amber-100">
                  <p className="text-lg font-bold text-amber-700">39</p>
                  <p className="text-xs text-amber-600 mt-1">Kg Recolectados</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-slate-50 to-slate-100/30 rounded-xl border border-slate-200">
                  <p className="text-lg font-bold text-slate-700">100</p>
                  <p className="text-xs text-slate-500 mt-1">Meta</p>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Card 4 */}
          <div className="bg-white backdrop-blur-xl bg-opacity-80 p-6 rounded-2xl shadow-lg border border-white/20 relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-sky-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
            <div className="relative z-10">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-full bg-cyan-100 flex items-center justify-center mr-3">
                  <CheckCircle2 className="w-4 h-4 text-cyan-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-800">Revisiones</h3>
              </div>
              <div className="flex justify-center mb-6">
                <CircularProgress value={95} color="#0891b2" trackColor="#e0f2fe" size={140} strokeWidth={10} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-gradient-to-br from-cyan-50 to-cyan-100/30 rounded-xl border border-cyan-100">
                  <p className="text-lg font-bold text-cyan-700">95</p>
                  <p className="text-xs text-cyan-600 mt-1">Completadas</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-slate-50 to-slate-100/30 rounded-xl border border-slate-200">
                  <p className="text-lg font-bold text-slate-700">100</p>
                  <p className="text-xs text-slate-500 mt-1">Total</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Circular Progress Component
function CircularProgress({ value, color, trackColor, size = 120, strokeWidth = 8 }) {
  const radius = size / 2 - strokeWidth * 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (value / 100) * circumference

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          className="transition-all duration-300"
          strokeWidth={strokeWidth}
          stroke={trackColor || "#f1f5f9"}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className="transition-all duration-500"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke={color}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{
            transition: "stroke-dashoffset 1s ease 0s, stroke 0.5s ease",
            transform: "rotate(-90deg)",
            transformOrigin: "50% 50%",
          }}
        />
      </svg>
      <span className="absolute text-2xl font-bold" style={{ color }}>
        {value}
      </span>
    </div>
  )
}

export default WelcomeSection;