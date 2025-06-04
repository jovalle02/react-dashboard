// components/ui/ConfirmDialog.tsx
"use client";

import { Dialog, DialogContent, DialogOverlay } from "@radix-ui/react-dialog";
import { Button } from "./button";

interface ConfirmDialogProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
}

export default function ConfirmDialog({
  open,
  onConfirm,
  onCancel,
  title = "¿Estás seguro?",
  message = "Esta acción no se puede deshacer.",
  confirmText = "Confirmar",
  cancelText = "Cancelar",
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogOverlay className="fixed inset-0 bg-black/50 z-50" />
      <DialogContent className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-lg font-bold">{title}</h2>
        <p className="text-sm text-gray-700 mt-2">{message}</p>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="outline" onClick={onCancel}>
            {cancelText}
          </Button>
          <Button onClick={onConfirm} className="bg-blue-600 text-white">
            {confirmText}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
