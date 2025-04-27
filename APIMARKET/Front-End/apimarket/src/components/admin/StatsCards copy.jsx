"use client"
import { TrendingUp, ArrowUpRight } from "lucide-react"

function StatsCards() {
  return (
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
  )
}

export default StatsCards;