"use client"
import { useState } from "react";

function ProductionAnalytics() {
  const [range, setRange] = useState("Este año");

  return (
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
  );
}

export default ProductionAnalytics;