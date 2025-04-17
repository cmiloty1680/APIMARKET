"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title = "¿Estás seguro?",
  message = "Esta acción no se puede deshacer.",
  confirmLabel = "Eliminar",
  cancelLabel = "Cancelar",
  DeleteTitle = "",
  icon,
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-red-500">
        <DialogHeader>
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            {icon || <Trash2 className="h-6 w-6 text-red-600" />}
          </div>
          <DialogTitle className="text-center text-lg font-medium text-gray-900">
            {title}
          </DialogTitle>
          <p className="text-center text-sm text-gray-500 mt-2">
            {message} <br />
            <span className="font-semibold text-gray-700">{DeleteTitle}</span>
          </p>
        </DialogHeader>
        <DialogFooter className="mt-4 flex justify-between">
          <Button
            variant="outline"
            onClick={onClose}
            className="w-full mr-2 border-gray-300"
          >
            {cancelLabel}
          </Button>
          <Button
            onClick={() => {
              onConfirm()
              onClose()
            }}
            className="w-full ml-2 bg-gradient-to-r from-red-600 to-red-800 text-white hover:from-red-700 hover:to-red-900 transition-all duration-300"
          >
            {confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ConfirmationModal
