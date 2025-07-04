
// "use client"
// import { useState, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import {
//     ArrowLeftRight,
//     Droplet,
//     Calculator,
//     X,
//     Trash2,
//     AlertTriangle,
//     CheckCircle,
//     Info,
//     ArrowRight,
// } from "lucide-react"

// function HoneyConverter({ isOpen, onClose }) {
//     const [activeTab, setActiveTab] = useState("converter")

//     // Estados para el conversor básico
//     const [inputValue, setInputValue] = useState("")
//     const [fromUnit, setFromUnit] = useState("kg")
//     const [result, setResult] = useState("")

//     // Estados para el calculador de frascos
//     const [jars125, setJars125] = useState("")
//     const [jars250, setJars250] = useState("")
//     const [jarResult, setJarResult] = useState("")

//     // Estados para la referencia de miel disponible
//     const [availableHoney, setAvailableHoney] = useState(null)
//     const [comparisonResult, setComparisonResult] = useState("")

//     // Densidad promedio de la miel: 1.4 kg/litro
//     const HONEY_DENSITY = 1.4

//     // Limpiar todo cuando se cierre el modal
//     useEffect(() => {
//         if (!isOpen) {
//             setInputValue("")
//             setFromUnit("kg")
//             setResult("")
//             setJars125("")
//             setJars250("")
//             setJarResult("")
//             setAvailableHoney(null)
//             setComparisonResult("")
//             setActiveTab("converter")
//         }
//     }, [isOpen])

//     const convertValue = () => {
//         const value = Number.parseFloat(inputValue)
//         if (isNaN(value) || value <= 0) {
//             setResult("⚠️ Por favor ingrese un valor válido mayor a 0")
//             setAvailableHoney(null)
//             return
//         }

//         let convertedValue
//         let resultUnit

//         if (fromUnit === "kg") {
//             convertedValue = value / HONEY_DENSITY
//             resultUnit = "litros"
//             setAvailableHoney({
//                 kg: value,
//                 liters: convertedValue,
//                 originalUnit: "kg",
//                 originalValue: value,
//             })
//         } else {
//             convertedValue = value * HONEY_DENSITY
//             resultUnit = "kg"
//             setAvailableHoney({
//                 kg: convertedValue,
//                 liters: value,
//                 originalUnit: "litros",
//                 originalValue: value,
//             })
//         }

//         setResult(`✅ ${convertedValue.toFixed(3)} ${resultUnit}`)
//     }

//     const calculateJars = () => {
//         const count125 = Number.parseFloat(jars125) || 0
//         const count250 = Number.parseFloat(jars250) || 0

//         if (count125 < 0 || count250 < 0) {
//             setJarResult("⚠️ Por favor ingrese valores válidos (no negativos)")
//             setComparisonResult("")
//             return
//         }

//         if (count125 === 0 && count250 === 0) {
//             setJarResult("⚠️ Debe ingresar al menos un frasco")
//             setComparisonResult("")
//             return
//         }

//         // Calcular volumen total en ml
//         const volume125 = count125 * 125
//         const volume250 = count250 * 250
//         const totalVolumeML = volume125 + volume250

//         // Convertir a litros y kg
//         const totalVolumeLiters = totalVolumeML / 1000
//         const totalWeightKg = totalVolumeLiters * HONEY_DENSITY

//         // Comparar con miel disponible
//         let comparison = ""
//         if (availableHoney) {
//             const availableKg = availableHoney.kg
//             const availableLiters = availableHoney.liters

//             if (totalWeightKg > availableKg) {
//                 const excessKg = totalWeightKg - availableKg
//                 const excessLiters = totalVolumeLiters - availableLiters
//                 comparison = `🚨 ¡ATENCIÓN! TE FALTA MIEL

// 📋 RESUMEN:
// • Miel que tienes: ${availableHoney.originalValue} ${availableHoney.originalUnit}
// • Miel que necesitas: ${totalWeightKg.toFixed(3)} kg (${totalVolumeLiters.toFixed(3)} L)
// • Te faltan: ${excessKg.toFixed(3)} kg (${excessLiters.toFixed(3)} L)

// ❌ SOLUCIONES:
// 1. Reduce la cantidad de frascos
// 2. Consigue más miel
// 3. Usa frascos más pequeños`
//             } else {
//                 const remainingKg = availableKg - totalWeightKg
//                 const remainingLiters = availableLiters - totalVolumeLiters
//                 const percentageUsed = (totalWeightKg / availableKg) * 100

//                 comparison = `✅ ¡PERFECTO! TIENES SUFICIENTE MIEL

// 📋 RESUMEN:
// • Miel que tienes: ${availableHoney.originalValue} ${availableHoney.originalUnit}
// • Miel que usarás: ${totalWeightKg.toFixed(3)} kg (${totalVolumeLiters.toFixed(3)} L)
// • Te sobrará: ${remainingKg.toFixed(3)} kg (${remainingLiters.toFixed(3)} L)
// • Porcentaje usado: ${percentageUsed.toFixed(1)}%

// ${remainingKg < 0.2 ? "⚠️ NOTA: Quedará muy poca miel de reserva" : "✅ Excelente planificación"}`
//             }
//         }

//         setComparisonResult(comparison)

//         setJarResult(`📊 CÁLCULO DETALLADO

// 🏺 FRASCOS SOLICITADOS:
// ${count125 > 0 ? `• ${count125} frascos de 125ml = ${volume125}ml` : ""}
// ${count250 > 0 ? `• ${count250} frascos de 250ml = ${volume250}ml` : ""}

// 🍯 MIEL NECESARIA:
// • Volumen total: ${totalVolumeML}ml
// • En litros: ${totalVolumeLiters.toFixed(3)} L
// • En kilogramos: ${totalWeightKg.toFixed(3)} kg
// `)
//     }

//     const swapUnits = () => {
//         setFromUnit(fromUnit === "kg" ? "litros" : "kg")
//         setInputValue("")
//         setResult("")
//         setAvailableHoney(null)
//     }

//     const clearAll = () => {
//         if (activeTab === "converter") {
//             setInputValue("")
//             setResult("")
//             setAvailableHoney(null)
//         } else {
//             setJars125("")
//             setJars250("")
//             setJarResult("")
//             setComparisonResult("")
//         }
//     }

//     const handleClose = () => {
//         onClose()
//     }

//     const handleJarInputChange = (type, value) => {
//         if (type === "125") {
//             setJars125(value)
//         } else {
//             setJars250(value)
//         }

//         const count125 = type === "125" ? Number.parseFloat(value) || 0 : Number.parseFloat(jars125) || 0
//         const count250 = type === "250" ? Number.parseFloat(value) || 0 : Number.parseFloat(jars250) || 0

//         if ((count125 > 0 || count250 > 0) && count125 >= 0 && count250 >= 0) {
//             setTimeout(() => calculateJars(), 300)
//         } else {
//             setComparisonResult("")
//         }
//     }

//     if (!isOpen) return null

//     return (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//             <div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
//                 {/* Header */}
//                 <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white rounded-t-lg">
//                     <div className="flex items-center">
//                         <div className="w-10 h-10 bg-gradient-to-r from-[#e87204] to-[#f59e0b] rounded-full flex items-center justify-center text-white shadow-lg">
//                             <Droplet className="h-5 w-5" />
//                         </div>
//                         <div className="ml-3">
//                             <h2 className="text-xl font-bold text-gray-900">Conversor de Miel</h2>
//                             <p className="text-xs text-gray-500">Herramientas para apicultores profesionales</p>
//                         </div>
//                     </div>
//                     <button
//                         onClick={handleClose}
//                         className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-2 transition-colors"
//                     >
//                         <X className="h-5 w-5" />
//                     </button>
//                 </div>

//                 {/* 👈 GUÍA DE PASOS */}
//                 <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b p-4">
//                     <div className="flex items-center mb-2">
//                         <Info className="h-4 w-4 text-blue-600 mr-2" />
//                         <span className="text-sm font-semibold text-blue-800">Guía de uso:</span>
//                     </div>
//                     <div className="text-xs text-blue-700 space-y-1">
//                         <div className="flex items-center">
//                             <span className="w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-2">
//                                 1
//                             </span>
//                             <span>Convierte tu miel total en "Conversor Básico"</span>
//                         </div>
//                         <div className="flex items-center">
//                             <span className="w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-2">
//                                 2
//                             </span>
//                             <span>Ve a "Calculadora de Enfrascado" para planificar</span>
//                         </div>
//                         <div className="flex items-center">
//                             <span className="w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-2">
//                                 3
//                             </span>
//                             <span>El sistema te dirá si tienes suficiente miel</span>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Tabs */}
//                 <div className="flex border-b bg-gray-50">
//                     <button
//                         onClick={() => setActiveTab("converter")}
//                         className={`flex-1 py-4 px-4 text-sm font-medium transition-all relative ${activeTab === "converter"
//                                 ? "border-b-2 border-[#e87204] text-[#e87204] bg-white shadow-sm"
//                                 : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
//                             }`}
//                     >
//                         <ArrowLeftRight className="h-4 w-4 inline mr-2" />
//                         Paso 1: Conversor Básico
//                         {!availableHoney && activeTab !== "converter" && (
//                             <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
//                         )}
//                     </button>
//                     <button
//                         onClick={() => setActiveTab("jars")}
//                         className={`flex-1 py-4 px-4 text-sm font-medium transition-all relative ${activeTab === "jars"
//                                 ? "border-b-2 border-[#e87204] text-[#e87204] bg-white shadow-sm"
//                                 : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
//                             }`}
//                     >
//                         <Calculator className="h-4 w-4 inline mr-2" />
//                         Paso 2: Calculadora de Enfrascado
//                         {availableHoney && <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"></span>}
//                     </button>
//                 </div>

//                 {/* Content */}
//                 <div className="p-6 space-y-6">
//                     {activeTab === "converter" ? (
//                         // Conversor básico
//                         <>
//                             <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-lg p-4">
//                                 <h3 className="text-sm font-semibold text-orange-800 mb-2">📝 Paso 1: Ingresa tu miel total</h3>
//                                 <p className="text-xs text-orange-700">
//                                     Ingresa la cantidad total de miel que recolectaste. Esto será tu referencia para calcular los frascos.
//                                 </p>
//                             </div>

//                             <div className="space-y-3">
//                                 <label className="text-sm font-semibold text-gray-700 flex items-center">
//                                     <span className="w-2 h-2 bg-[#e87204] rounded-full mr-2"></span>
//                                     Cantidad total recolectada en {fromUnit}
//                                 </label>
//                                 <input
//                                     type="number"
//                                     value={inputValue}
//                                     onChange={(e) => setInputValue(e.target.value)}
//                                     placeholder={`Ej: ${fromUnit === "kg" ? "5.2 (cinco kilos y 200 gramos)" : "3.7 (tres litros y 700ml)"}`}
//                                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e87204] focus:border-transparent transition-all"
//                                 />
//                             </div>

//                             <div className="flex justify-center">
//                                 <Button
//                                     onClick={swapUnits}
//                                     variant="outline"
//                                     className="flex items-center gap-2 bg-white text-gray-700 border-gray-300 hover:bg-orange-50 hover:border-[#e87204] transition-all"
//                                 >
//                                     <ArrowLeftRight className="h-4 w-4" />
//                                     Cambiar a {fromUnit === "kg" ? "litros" : "kg"}
//                                 </Button>
//                             </div>

//                             <div className="space-y-3">
//                                 <label className="text-sm font-semibold text-gray-700 flex items-center">
//                                     <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
//                                     Resultado de la conversión
//                                 </label>
//                                 <div className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 min-h-[50px] flex items-center">
//                                     <span className="text-gray-700 font-medium">
//                                         {result || "💡 Ingrese la cantidad total y presione 'Convertir'"}
//                                     </span>
//                                 </div>
//                             </div>

//                             {availableHoney && (
//                                 <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
//                                     <div className="flex items-center justify-between">
//                                         <div className="flex items-center">
//                                             <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
//                                             <div>
//                                                 <p className="text-sm text-green-800 font-medium">¡Conversión guardada!</p>
//                                                 <p className="text-xs text-green-700">
//                                                     Tienes {availableHoney.originalValue} {availableHoney.originalUnit} de miel disponible
//                                                 </p>
//                                             </div>
//                                         </div>
//                                         <Button
//                                             onClick={() => setActiveTab("jars")}
//                                             size="sm"
//                                             className="bg-green-600 hover:bg-green-700 text-white"
//                                         >
//                                             Siguiente <ArrowRight className="h-4 w-4 ml-1" />
//                                         </Button>
//                                     </div>
//                                 </div>
//                             )}

//                             <div className="flex gap-3 pt-2">
//                                 <Button
//                                     onClick={convertValue}
//                                     className="flex-1 bg-gradient-to-r from-[#e87204] to-[#f59e0b] hover:from-[#d66203] hover:to-[#e08e0b] text-white shadow-lg"
//                                     disabled={!inputValue}
//                                 >
//                                     Convertir y Guardar
//                                 </Button>
//                                 <Button
//                                     onClick={clearAll}
//                                     variant="outline"
//                                     className="px-4 bg-white text-gray-700 border-gray-300 hover:bg-red-50 hover:border-red-300 hover:text-red-600"
//                                 >
//                                     <Trash2 className="h-4 w-4" />
//                                 </Button>
//                             </div>
//                         </>
//                     ) : (
//                         // Calculadora de enfrascado
//                         <>
//                             {availableHoney ? (
//                                 <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-4">
//                                     <div className="flex items-center justify-between mb-2">
//                                         <div className="flex items-center">
//                                             <Droplet className="h-5 w-5 text-blue-600 mr-2" />
//                                             <h3 className="text-sm font-semibold text-blue-800">🍯 Miel Disponible</h3>
//                                         </div>
//                                         <Button onClick={() => setActiveTab("converter")} size="sm" variant="outline" className="text-xs">
//                                             Cambiar
//                                         </Button>
//                                     </div>
//                                     <div className="bg-white rounded-md p-3 border border-blue-100">
//                                         <p className="text-sm text-blue-700 font-medium">
//                                             <strong>
//                                                 {availableHoney.originalValue} {availableHoney.originalUnit}
//                                             </strong>
//                                             {" = "}
//                                             <strong>{availableHoney.kg.toFixed(3)} kg</strong>
//                                             {" = "}
//                                             <strong>{availableHoney.liters.toFixed(3)} litros</strong>
//                                         </p>
//                                     </div>
//                                     <p className="text-xs text-blue-600 mt-2">
//                                         ✅ Perfecto. Ahora calcula cuántos frascos puedes llenar con esta cantidad.
//                                     </p>
//                                 </div>
//                             ) : (
//                                 <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-lg p-4">
//                                     <div className="flex items-center justify-between">
//                                         <div className="flex items-center">
//                                             <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
//                                             <div>
//                                                 <p className="text-sm text-red-800 font-medium">⚠️ Falta información</p>
//                                                 <p className="text-xs text-red-700">Primero debes convertir tu miel total en el "Paso 1"</p>
//                                             </div>
//                                         </div>
//                                         <Button
//                                             onClick={() => setActiveTab("converter")}
//                                             size="sm"
//                                             className="bg-red-600 hover:bg-red-700 text-white"
//                                         >
//                                             Ir al Paso 1
//                                         </Button>
//                                     </div>
//                                 </div>
//                             )}

//                             <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-4">
//                                 <h3 className="text-sm font-semibold text-purple-800 mb-2">🏺 Paso 2: Planifica tus frascos</h3>
//                                 <p className="text-xs text-purple-700">
//                                     Ingresa cuántos frascos quieres llenar. El sistema te dirá si tienes suficiente miel.
//                                 </p>
//                             </div>

//                             <div className="grid grid-cols-2 gap-4">
//                                 <div className="space-y-3">
//                                     <label className="text-sm font-semibold text-gray-700 flex items-center">
//                                         <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
//                                         Frascos de 125ml
//                                     </label>
//                                     <input
//                                         type="number"
//                                         value={jars125}
//                                         onChange={(e) => handleJarInputChange("125", e.target.value)}
//                                         placeholder="Ej: 10"
//                                         min="0"
//                                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                                         disabled={!availableHoney}
//                                     />
//                                 </div>

//                                 <div className="space-y-3">
//                                     <label className="text-sm font-semibold text-gray-700 flex items-center">
//                                         <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
//                                         Frascos de 250ml
//                                     </label>
//                                     <input
//                                         type="number"
//                                         value={jars250}
//                                         onChange={(e) => handleJarInputChange("250", e.target.value)}
//                                         placeholder="Ej: 5"
//                                         min="0"
//                                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
//                                         disabled={!availableHoney}
//                                     />
//                                 </div>
//                             </div>

//                             {comparisonResult && (
//                                 <div
//                                     className={`border rounded-lg p-4 ${comparisonResult.includes("FALTA")
//                                             ? "bg-gradient-to-r from-red-50 to-pink-50 border-red-200"
//                                             : "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200"
//                                         }`}
//                                 >
//                                     <pre
//                                         className={`text-sm whitespace-pre-wrap font-mono leading-relaxed ${comparisonResult.includes("FALTA") ? "text-red-700" : "text-green-700"
//                                             }`}
//                                     >
//                                         {comparisonResult}
//                                     </pre>
//                                 </div>
//                             )}

//                             <div className="space-y-3">
//                                 <label className="text-sm font-semibold text-gray-700 flex items-center">
//                                     <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
//                                     Detalles del cálculo
//                                 </label>
//                                 <div className="w-full px-4 py-4 border border-gray-200 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 min-h-[120px] overflow-auto">
//                                     <pre className="text-gray-700 text-sm whitespace-pre-wrap font-mono leading-relaxed">
//                                         {jarResult || "🍯 Ingrese la cantidad de frascos para ver el cálculo detallado"}
//                                     </pre>
//                                 </div>
//                             </div>

//                             <div className="flex gap-3 pt-2">
//                                 <Button
//                                     onClick={calculateJars}
//                                     className="flex-1 bg-gradient-to-r from-[#e87204] to-[#f59e0b] hover:from-[#d66203] hover:to-[#e08e0b] text-white shadow-lg"
//                                     disabled={(!jars125 && !jars250) || !availableHoney}
//                                 >
//                                     Recalcular
//                                 </Button>
//                                 <Button
//                                     onClick={clearAll}
//                                     variant="outline"
//                                     className="px-4 bg-white text-gray-700 border-gray-300 hover:bg-red-50 hover:border-red-300 hover:text-red-600"
//                                 >
//                                     <Trash2 className="h-4 w-4" />
//                                 </Button>
//                             </div>
//                         </>
//                     )}

//                     {/* Info técnica */}
//                     <div className="bg-gradient-to-r from-gray-50 to-slate-50 border border-gray-200 rounded-lg p-4">
//                         <div className="flex items-start">
//                             <div className="w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center text-white text-xs font-bold mr-3 mt-0.5">
//                                 i
//                             </div>
//                             <div>
//                                 <p className="text-sm text-gray-800 font-medium mb-1">Información técnica:</p>
//                                 <p className="text-xs text-gray-700 leading-relaxed">
//                                     • Densidad de la miel: <strong>1.4 kg/litro</strong> (promedio estándar)
//                                     <br />• Los cálculos son aproximados y pueden variar según el tipo de miel
//                                     <br />• Se recomienda tener un 5-10% extra para compensar pérdidas durante el enfrascado
//                                     <br />• Siempre verifica que tus frascos estén limpios y secos antes del enfrascado
//                                 </p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default HoneyConverter
//     ;


"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
    ArrowLeftRight,
    Droplet,
    Calculator,
    X,
    Trash2,
    AlertTriangle,
    CheckCircle,
    Info,
    ArrowRight,
} from "lucide-react"

function HoneyConverter({ isOpen, onClose }) {
    const [activeTab, setActiveTab] = useState("converter")

    // Estados para el conversor básico
    const [inputValue, setInputValue] = useState("")
    const [fromUnit, setFromUnit] = useState("kg")
    const [result, setResult] = useState("")

    // Estados para el calculador de frascos
    const [jars125, setJars125] = useState("")
    const [jars250, setJars250] = useState("")
    const [jarResult, setJarResult] = useState("")

    // Estados para la referencia de miel disponible
    const [availableHoney, setAvailableHoney] = useState(null)
    const [comparisonResult, setComparisonResult] = useState("")

    // Densidad promedio de la miel: 1.4 kg/litro
    const HONEY_DENSITY = 1.4

    // Limpiar todo cuando se cierre el modal
    useEffect(() => {
        if (!isOpen) {
            setInputValue("")
            setFromUnit("kg")
            setResult("")
            setJars125("")
            setJars250("")
            setJarResult("")
            setAvailableHoney(null)
            setComparisonResult("")
            setActiveTab("converter")
        }
    }, [isOpen])

    const convertValue = () => {
        const value = Number.parseFloat(inputValue)
        if (isNaN(value) || value <= 0) {
            setResult("⚠️ Por favor ingrese un valor válido mayor a 0")
            setAvailableHoney(null)
            return
        }

        let convertedValue
        let resultUnit

        if (fromUnit === "kg") {
            convertedValue = value / HONEY_DENSITY
            resultUnit = "litros"
            setAvailableHoney({
                kg: value,
                liters: convertedValue,
                originalUnit: "kg",
                originalValue: value,
            })
        } else {
            convertedValue = value * HONEY_DENSITY
            resultUnit = "kg"
            setAvailableHoney({
                kg: convertedValue,
                liters: value,
                originalUnit: "litros",
                originalValue: value,
            })
        }

        setResult(`✅ ${convertedValue.toFixed(3)} ${resultUnit}`)
    }

    const calculateJars = () => {
        const count125 = Number.parseFloat(jars125) || 0
        const count250 = Number.parseFloat(jars250) || 0

        if (count125 < 0 || count250 < 0) {
            setJarResult("⚠️ Por favor ingrese valores válidos (no negativos)")
            setComparisonResult("")
            return
        }

        if (count125 === 0 && count250 === 0) {
            setJarResult("⚠️ Debe ingresar al menos un frasco")
            setComparisonResult("")
            return
        }

        // Calcular volumen total en ml
        const volume125 = count125 * 125
        const volume250 = count250 * 250
        const totalVolumeML = volume125 + volume250

        // Convertir a litros y kg
        const totalVolumeLiters = totalVolumeML / 1000
        const totalWeightKg = totalVolumeLiters * HONEY_DENSITY

        // Comparar con miel disponible
        let comparison = ""
        if (availableHoney) {
            const availableKg = availableHoney.kg
            const availableLiters = availableHoney.liters

            if (totalWeightKg > availableKg) {
                const excessKg = totalWeightKg - availableKg
                const excessLiters = totalVolumeLiters - availableLiters
                comparison = `🚨 ¡ATENCIÓN! TE FALTA MIEL

📋 RESUMEN:
• Miel que tienes: ${availableHoney.originalValue} ${availableHoney.originalUnit}
• Miel que necesitas: ${totalWeightKg.toFixed(3)} kg (${totalVolumeLiters.toFixed(3)} L)
• Te faltan: ${excessKg.toFixed(3)} kg (${excessLiters.toFixed(3)} L)

❌ SOLUCIONES:
1. Reduce la cantidad de frascos
2. Consigue más miel
3. Usa frascos más pequeños`
            } else {
                const remainingKg = availableKg - totalWeightKg
                const remainingLiters = availableLiters - totalVolumeLiters
                const percentageUsed = (totalWeightKg / availableKg) * 100

                comparison = `✅ ¡PERFECTO! TIENES SUFICIENTE MIEL

📋 RESUMEN:
• Miel que tienes: ${availableHoney.originalValue} ${availableHoney.originalUnit}
• Miel que usarás: ${totalWeightKg.toFixed(3)} kg (${totalVolumeLiters.toFixed(3)} L)
• Te sobrará: ${remainingKg.toFixed(3)} kg (${remainingLiters.toFixed(3)} L)
• Porcentaje usado: ${percentageUsed.toFixed(1)}%

${remainingKg < 0.2 ? "⚠️ NOTA: Quedará muy poca miel de reserva" : "✅ Excelente planificación"}`
            }
        }

        setComparisonResult(comparison)

        setJarResult(`📊 CÁLCULO DETALLADO

🏺 FRASCOS SOLICITADOS:
${count125 > 0 ? `• ${count125} frascos de 125ml = ${volume125}ml` : ""}
${count250 > 0 ? `• ${count250} frascos de 250ml = ${volume250}ml` : ""}

🍯 MIEL NECESARIA:
• Volumen total: ${totalVolumeML}ml
• En litros: ${totalVolumeLiters.toFixed(3)} L
• En kilogramos: ${totalWeightKg.toFixed(3)} kg
`)
    }

    const swapUnits = () => {
        setFromUnit(fromUnit === "kg" ? "litros" : "kg")
        setInputValue("")
        setResult("")
        setAvailableHoney(null)
    }

    const clearAll = () => {
        if (activeTab === "converter") {
            setInputValue("")
            setResult("")
            setAvailableHoney(null)
        } else {
            setJars125("")
            setJars250("")
            setJarResult("")
            setComparisonResult("")
        }
    }

    const handleClose = () => {
        onClose()
    }

    const handleJarInputChange = (type, value) => {
        if (type === "125") {
            setJars125(value)
        } else {
            setJars250(value)
        }

        const count125 = type === "125" ? Number.parseFloat(value) || 0 : Number.parseFloat(jars125) || 0
        const count250 = type === "250" ? Number.parseFloat(value) || 0 : Number.parseFloat(jars250) || 0

        if ((count125 > 0 || count250 > 0) && count125 >= 0 && count250 >= 0) {
            setTimeout(() => calculateJars(), 300)
        } else {
            setComparisonResult("")
        }
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white rounded-t-lg">
                    <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-r from-[#e87204] to-[#f59e0b] rounded-full flex items-center justify-center text-white shadow-lg">
                            <Droplet className="h-5 w-5" />
                        </div>
                        <div className="ml-3">
                            <h2 className="text-xl font-bold text-gray-900">Conversor de Miel</h2>
                            <p className="text-xs text-gray-500">Herramientas para apicultores profesionales</p>
                        </div>
                    </div>
                    <button
                        onClick={handleClose}
                        className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-2 transition-colors"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* 👈 GUÍA DE PASOS */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b p-4">
                    <div className="flex items-center mb-2">
                        <Info className="h-4 w-4 text-blue-600 mr-2" />
                        <span className="text-sm font-semibold text-blue-800">Guía de uso:</span>
                    </div>
                    <div className="text-xs text-blue-700 space-y-1">
                        <div className="flex items-center">
                            <span className="w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-2">
                                1
                            </span>
                            <span>Convierte tu miel total en &quot;Conversor Básico&quot;</span>
                        </div>
                        <div className="flex items-center">
                            <span className="w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-2">
                                2
                            </span>
                            <span>Ve a &quot;Calculadora de Enfrascado&quot; para planificar</span>
                        </div>
                        <div className="flex items-center">
                            <span className="w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-2">
                                3
                            </span>
                            <span>El sistema te dirá si tienes suficiente miel</span>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex border-b bg-gray-50">
                    <button
                        onClick={() => setActiveTab("converter")}
                        className={`flex-1 py-4 px-4 text-sm font-medium transition-all relative ${activeTab === "converter"
                                ? "border-b-2 border-[#e87204] text-[#e87204] bg-white shadow-sm"
                                : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                            }`}
                    >
                        <ArrowLeftRight className="h-4 w-4 inline mr-2" />
                        Paso 1: Conversor Básico
                        {!availableHoney && activeTab !== "converter" && (
                            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab("jars")}
                        className={`flex-1 py-4 px-4 text-sm font-medium transition-all relative ${activeTab === "jars"
                                ? "border-b-2 border-[#e87204] text-[#e87204] bg-white shadow-sm"
                                : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                            }`}
                    >
                        <Calculator className="h-4 w-4 inline mr-2" />
                        Paso 2: Calculadora de Enfrascado
                        {availableHoney && <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"></span>}
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {activeTab === "converter" ? (
                        // Conversor básico
                        <>
                            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-lg p-4">
                                <h3 className="text-sm font-semibold text-orange-800 mb-2">📝 Paso 1: Ingresa tu miel total</h3>
                                <p className="text-xs text-orange-700">
                                    Ingresa la cantidad total de miel que recolectaste. Esto será tu referencia para calcular los frascos.
                                </p>
                            </div>

                            <div className="space-y-3">
                                <label className="text-sm font-semibold text-gray-700 flex items-center">
                                    <span className="w-2 h-2 bg-[#e87204] rounded-full mr-2"></span>
                                    Cantidad total recolectada en {fromUnit}
                                </label>
                                <input
                                    type="number"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder={`Ej: ${fromUnit === "kg" ? "5.2 (cinco kilos y 200 gramos)" : "3.7 (tres litros y 700ml)"}`}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e87204] focus:border-transparent transition-all"
                                />
                            </div>

                            <div className="flex justify-center">
                                <Button
                                    onClick={swapUnits}
                                    variant="outline"
                                    className="flex items-center gap-2 bg-white text-gray-700 border-gray-300 hover:bg-orange-50 hover:border-[#e87204] transition-all"
                                >
                                    <ArrowLeftRight className="h-4 w-4" />
                                    Cambiar a {fromUnit === "kg" ? "litros" : "kg"}
                                </Button>
                            </div>

                            <div className="space-y-3">
                                <label className="text-sm font-semibold text-gray-700 flex items-center">
                                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                    Resultado de la conversión
                                </label>
                                <div className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 min-h-[50px] flex items-center">
                                    <span className="text-gray-700 font-medium">
                                        {result || "💡 Ingrese la cantidad total y presione 'Convertir'"}
                                    </span>
                                </div>
                            </div>

                            {availableHoney && (
                                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                                            <div>
                                                <p className="text-sm text-green-800 font-medium">¡Conversión guardada!</p>
                                                <p className="text-xs text-green-700">
                                                    Tienes {availableHoney.originalValue} {availableHoney.originalUnit} de miel disponible
                                                </p>
                                            </div>
                                        </div>
                                        <Button
                                            onClick={() => setActiveTab("jars")}
                                            size="sm"
                                            className="bg-green-600 hover:bg-green-700 text-white"
                                        >
                                            Siguiente <ArrowRight className="h-4 w-4 ml-1" />
                                        </Button>
                                    </div>
                                </div>
                            )}

                            <div className="flex gap-3 pt-2">
                                <Button
                                    onClick={convertValue}
                                    className="flex-1 bg-gradient-to-r from-[#e87204] to-[#f59e0b] hover:from-[#d66203] hover:to-[#e08e0b] text-white shadow-lg"
                                    disabled={!inputValue}
                                >
                                    Convertir y Guardar
                                </Button>
                                <Button
                                    onClick={clearAll}
                                    variant="outline"
                                    className="px-4 bg-white text-gray-700 border-gray-300 hover:bg-red-50 hover:border-red-300 hover:text-red-600"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </>
                    ) : (
                        // Calculadora de enfrascado
                        <>
                            {availableHoney ? (
                                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center">
                                            <Droplet className="h-5 w-5 text-blue-600 mr-2" />
                                            <h3 className="text-sm font-semibold text-blue-800">🍯 Miel Disponible</h3>
                                        </div>
                                        <Button onClick={() => setActiveTab("converter")} size="sm" variant="outline" className="text-xs">
                                            Cambiar
                                        </Button>
                                    </div>
                                    <div className="bg-white rounded-md p-3 border border-blue-100">
                                        <p className="text-sm text-blue-700 font-medium">
                                            <strong>
                                                {availableHoney.originalValue} {availableHoney.originalUnit}
                                            </strong>
                                            {" = "}
                                            <strong>{availableHoney.kg.toFixed(3)} kg</strong>
                                            {" = "}
                                            <strong>{availableHoney.liters.toFixed(3)} litros</strong>
                                        </p>
                                    </div>
                                    <p className="text-xs text-blue-600 mt-2">
                                        ✅ Perfecto. Ahora calcula cuántos frascos puedes llenar con esta cantidad.
                                    </p>
                                </div>
                            ) : (
                                <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-lg p-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
                                            <div>
                                                <p className="text-sm text-red-800 font-medium">⚠️ Falta información</p>
                                                <p className="text-xs text-red-700">Primero debes convertir tu miel total en el &quot;Paso 1&quot;</p>
                                            </div>
                                        </div>
                                        <Button
                                            onClick={() => setActiveTab("converter")}
                                            size="sm"
                                            className="bg-red-600 hover:bg-red-700 text-white"
                                        >
                                            Ir al Paso 1
                                        </Button>
                                    </div>
                                </div>
                            )}

                            <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-4">
                                <h3 className="text-sm font-semibold text-purple-800 mb-2">🏺 Paso 2: Planifica tus frascos</h3>
                                <p className="text-xs text-purple-700">
                                    Ingresa cuántos frascos quieres llenar. El sistema te dirá si tienes suficiente miel.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-3">
                                    <label className="text-sm font-semibold text-gray-700 flex items-center">
                                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                                        Frascos de 125ml
                                    </label>
                                    <input
                                        type="number"
                                        value={jars125}
                                        onChange={(e) => handleJarInputChange("125", e.target.value)}
                                        placeholder="Ej: 10"
                                        min="0"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        disabled={!availableHoney}
                                    />
                                </div>

                                <div className="space-y-3">
                                    <label className="text-sm font-semibold text-gray-700 flex items-center">
                                        <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                                        Frascos de 250ml
                                    </label>
                                    <input
                                        type="number"
                                        value={jars250}
                                        onChange={(e) => handleJarInputChange("250", e.target.value)}
                                        placeholder="Ej: 5"
                                        min="0"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                        disabled={!availableHoney}
                                    />
                                </div>
                            </div>

                            {comparisonResult && (
                                <div
                                    className={`border rounded-lg p-4 ${comparisonResult.includes("FALTA")
                                            ? "bg-gradient-to-r from-red-50 to-pink-50 border-red-200"
                                            : "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200"
                                        }`}
                                >
                                    <pre
                                        className={`text-sm whitespace-pre-wrap font-mono leading-relaxed ${comparisonResult.includes("FALTA") ? "text-red-700" : "text-green-700"
                                            }`}
                                    >
                                        {comparisonResult}
                                    </pre>
                                </div>
                            )}

                            <div className="space-y-3">
                                <label className="text-sm font-semibold text-gray-700 flex items-center">
                                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                    Detalles del cálculo
                                </label>
                                <div className="w-full px-4 py-4 border border-gray-200 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 min-h-[120px] overflow-auto">
                                    <pre className="text-gray-700 text-sm whitespace-pre-wrap font-mono leading-relaxed">
                                        {jarResult || "🍯 Ingrese la cantidad de frascos para ver el cálculo detallado"}
                                    </pre>
                                </div>
                            </div>

                            <div className="flex gap-3 pt-2">
                                <Button
                                    onClick={calculateJars}
                                    className="flex-1 bg-gradient-to-r from-[#e87204] to-[#f59e0b] hover:from-[#d66203] hover:to-[#e08e0b] text-white shadow-lg"
                                    disabled={(!jars125 && !jars250) || !availableHoney}
                                >
                                    Recalcular
                                </Button>
                                <Button
                                    onClick={clearAll}
                                    variant="outline"
                                    className="px-4 bg-white text-gray-700 border-gray-300 hover:bg-red-50 hover:border-red-300 hover:text-red-600"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </>
                    )}

                    {/* Info técnica */}
                    <div className="bg-gradient-to-r from-gray-50 to-slate-50 border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start">
                            <div className="w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center text-white text-xs font-bold mr-3 mt-0.5">
                                i
                            </div>
                            <div>
                                <p className="text-sm text-gray-800 font-medium mb-1">Información técnica:</p>
                                <p className="text-xs text-gray-700 leading-relaxed">
                                    • Densidad de la miel: <strong>1.4 kg/litro</strong> (promedio estándar)
                                    <br />• Los cálculos son aproximados y pueden variar según el tipo de miel
                                    <br />• Se recomienda tener un 5-10% extra para compensar pérdidas durante el enfrascado
                                    <br />• Siempre verifica que tus frascos estén limpios y secos antes del enfrascado
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HoneyConverter;