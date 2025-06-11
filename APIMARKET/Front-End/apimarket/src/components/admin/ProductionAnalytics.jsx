"use client"
import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axiosInstance";
import PrivateRoute from "@/app/routes/privateRoute";

function ProductionAnalytics() {
  const [range, setRange] = useState("10 años");
  const [allData, setAllData] = useState([]);
  const [productionData, setProductionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [availableYears, setAvailableYears] = useState(0); // Cantidad total de años disponibles

  // Función para obtener todos los datos de HoneyCollection
  const fetchAllData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/Api/HoneyCollection/GetAllHoneyCollection');

      if (response.status === 200) {
        setAllData(response.data);
      }
    } catch (error) {
      console.error('Error al obtener datos:', error);
      setAllData([]);
    } finally {
      setLoading(false);
    }
  };

  // Función para agrupar todos los datos por año
  const groupAllDataByYear = (data) => {
    if (!data || data.length === 0) return [];

    const groupedData = data.reduce((acc, item) => {
      const dateField = item.fec_HoneyCollection || item.Fec_HoneyCollection;
      const year = new Date(dateField).getFullYear();

      const productionField = item.tot_HoneyCollection || item.Tot_HoneyCollection;
      const production = parseFloat(productionField) || 0;

      if (!isNaN(year)) {
        if (acc[year]) {
          acc[year] += production;
        } else {
          acc[year] = production;
        }
      }

      return acc;
    }, {});

    return Object.entries(groupedData)
      .map(([year, production]) => ({
        year: parseInt(year),
        production: production
      }))
      .sort((a, b) => a.year - b.year);
  };

  // Función para filtrar las barras según el rango seleccionado
  const filterBarsToShow = (allBars, selectedRange) => {
    if (!allBars || allBars.length === 0) return [];

    switch (selectedRange) {
      case "Este año":
        return allBars.slice(-1);
      case "5 años":
        return allBars.slice(-5);
      case "10 años":
        return allBars.slice(-10);
      case "15 años":
        return allBars.slice(-15);
      case "20 años":
        return allBars.slice(-20);
      case "Todos":
        return allBars;
      default:
        return allBars.slice(-10);
    }
  };

  // Generar opciones de filtro dinámicamente
  const getFilterOptions = (totalYears) => {
    const options = [
      { label: "Este año", value: "Este año" },
      { label: "5 años", value: "5 años" }
    ];

    if (totalYears >= 10) {
      options.push({ label: "10 años", value: "10 años" });
    }

    if (totalYears >= 15) {
      options.push({ label: "15 años", value: "15 años" });
    }

    if (totalYears >= 20) {
      options.push({ label: "20 años", value: "20 años" });
    }

    // Si hay más de 10 años, agregar opción "Todos"
    if (totalYears > 10) {
      options.push({ label: "Todos", value: "Todos" });
    }

    return options;
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  useEffect(() => {
    if (allData.length > 0) {
      const allGroupedData = groupAllDataByYear(allData);
      setAvailableYears(allGroupedData.length);

      const filteredBars = filterBarsToShow(allGroupedData, range);
      setProductionData(filteredBars);
    }
  }, [allData, range]);

  const handleRangeChange = (newRange) => {
    setRange(newRange);
  };

  const handleViewFullReport = () => {
    alert(`Ver reporte completo para: ${range}\nTotal de registros: ${productionData.length}`);
  };

  const maxValue = productionData.length > 0 ? Math.max(...productionData.map(item => item.production)) : 100;
  const filterOptions = getFilterOptions(availableYears);

  return (
    <PrivateRoute requiredRole={["instructor", "pasante"]}>
      <div className="bg-white backdrop-blur-xl bg-opacity-80 p-6 rounded-2xl shadow-lg border border-white/20 lg:col-span-2 relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-xl font-bold text-slate-800">Producción Anual</h3>
              <p className="text-sm text-slate-500 mt-1">
                {range === "Este año" ? "Datos del año más reciente" :
                  range === "Todos" ? `Todos los ${availableYears} años disponibles` :
                    `Comparativa de los últimos ${range}`}
              </p>
            </div>

            {/* Filtros dinámicos */}
            <div className="flex items-center space-x-2 flex-wrap">
              {filterOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleRangeChange(option.value)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors mb-1 ${range === option.value
                      ? "bg-indigo-50 text-indigo-600"
                      : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                    }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Información adicional */}
          <div className="mb-4 text-xs text-gray-500">
            Mostrando: {productionData.length} de {availableYears} años disponibles
          </div>

          <div className="h-72 flex items-end space-x-1 px-4 overflow-x-auto">
            {loading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="flex-shrink-0 flex flex-col items-center" style={{ minWidth: '40px' }}>
                  <div className="w-full bg-slate-200 animate-pulse rounded-t-lg" style={{ height: '60px' }}></div>
                  <span className="text-xs mt-3 text-slate-300 font-medium">----</span>
                </div>
              ))
            ) : productionData.length > 0 ? (
              productionData.map((item, index) => {
                const normalizedHeight = Math.max((item.production / maxValue) * 120, 10);
                // Ajustar el ancho según la cantidad de barras
                const barWidth = productionData.length > 15 ? '30px' : productionData.length > 10 ? '40px' : 'auto';

                return (
                  <div
                    key={index}
                    className={`${productionData.length > 10 ? 'flex-shrink-0' : 'flex-1'} flex flex-col items-center`}
                    style={{ minWidth: barWidth }}
                  >
                    <div className="w-full relative group/bar" style={{ height: `${normalizedHeight}px` }}>
                      <div className="absolute inset-x-0 bottom-0 rounded-t-lg bg-gradient-to-t from-indigo-600 to-violet-500 w-full h-full opacity-80 group-hover/bar:opacity-100 transition-opacity"></div>
                      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white px-2 py-1 rounded text-xs opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap z-10
  sm:opacity-0 sm:group-hover/bar:opacity-100
  opacity-100 sm:opacity-0
">
                        {item.production.toFixed(1)} kg en {item.year}
                      </div>
                    </div>
                    <span className="text-xs mt-3 text-slate-500 font-medium">{item.year}</span>
                  </div>
                );
              })
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <p className="text-slate-500">No hay datos disponibles</p>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center mt-6 pt-6 border-t border-slate-100">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-gradient-to-r from-indigo-600 to-violet-500 rounded-full mr-2"></div>
              <span className="text-sm text-slate-500">Producción en kilogramos</span>
            </div>
            <button
              onClick={handleViewFullReport}
              className="text-sm text-indigo-600 font-medium hover:text-indigo-800 flex items-center transition-colors"
            >
              Ver reporte completo
              <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
}

export default ProductionAnalytics;