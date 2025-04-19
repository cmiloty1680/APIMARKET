"use client"

import { useRouter } from "next/navigation"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog"
import { ShieldCheck, AlertCircle } from "lucide-react"
function DynamicAlert({
  isOpen,
  onOpenChange,
  type = "success",
  title,
  message,
  actionLabel = "Ok",
  redirectPath,
  icon,
  closeModal,  // Asegúrate de pasar esta función desde el componente principal
}) {
  const router = useRouter()

  const handleAction = () => {
    onOpenChange(false)  // Cierra el Alert
    if (closeModal) closeModal()  // Cierra el modal principal (padre)
    if (redirectPath) {
      router.push(redirectPath)
    }
  }

  if (type === "success") {
    return (
      <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
        <AlertDialogContent className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-green-500">
          <AlertDialogHeader>
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
              {icon || <ShieldCheck className="h-6 w-6 text-green-600" />}
            </div>
            <AlertDialogTitle className="text-center text-lg font-medium text-gray-900">
              {title || "¡Operación Exitosa!"}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center text-sm text-gray-500 mt-2">
              {message || "Operación exitosa"}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-4">
            <AlertDialogAction
              onClick={handleAction}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 rounded-md hover:from-orange-600 hover:to-red-600 transition-all duration-300"
            >
              {actionLabel}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }

  // Error alert
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-red-500">
        <AlertDialogHeader>
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            {icon || <AlertCircle className="h-6 w-6 text-red-600" />}
          </div>
          <AlertDialogTitle className="text-center text-lg font-medium text-gray-900">
            {title || "¡Operación Fallida!"}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center text-sm text-gray-500 mt-2">
            {message || "Ha ocurrido un error inesperado"}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-4">
          <AlertDialogAction
            onClick={handleAction}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 rounded-md hover:from-orange-600 hover:to-red-600 transition-all duration-300"
          >
            {actionLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DynamicAlert;

