"use client"

import { useEffect, useCallback } from "react"
import { MessageCircle, X } from "lucide-react"
import type { Producto } from "@/lib/types"

const WHATSAPP_MENSAJE =
  "Hola, estoy interesado/a en ver que prendas tienen disponibles"

const WHATSAPP_CONTACTOS = [
  { nombre: "Bexi", numero: "+598 91 956 716", wa: "59891956716" },
  { nombre: "Beatriz", numero: "+598 96 716 411", wa: "59896716411" },
]

function buildWhatsappLink(waNumber: string, producto?: Producto) {
  const mensaje = producto
    ? `Hola, estoy interesado/a en el producto:\n- ID: #${producto.id}\n- Nombre: ${producto.nombre}\n- Precio: $${producto.precio}`
    : WHATSAPP_MENSAJE
  return `https://wa.me/${waNumber}?text=${encodeURIComponent(mensaje)}`
}

type WhatsappSelectorProps = {
  isOpen: boolean
  onClose: () => void
  producto?: Producto
}

export function WhatsappSelector({
  isOpen,
  onClose,
  producto,
}: WhatsappSelectorProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    },
    [onClose]
  )

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
  }, [isOpen, handleKeyDown])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[85] flex items-center justify-center bg-foreground/60 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Contactos WhatsApp"
    >
      <div
        className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h3 className="font-display text-xl text-foreground">
            Contactos WhatsApp
          </h3>
          <button
            className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition hover:bg-secondary hover:text-foreground"
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        {producto && (
          <div className="mt-3 rounded-xl border border-border bg-secondary/50 p-3">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              Consultando sobre
            </p>
            <p className="mt-1 font-medium text-foreground">{producto.nombre}</p>
            <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
              <span>ID: #{producto.id}</span>
              <span className="h-1 w-1 rounded-full bg-muted-foreground" />
              <span className="font-semibold text-primary">${producto.precio}</span>
            </div>
          </div>
        )}
        <div className="mt-4 flex flex-col gap-2">
          {WHATSAPP_CONTACTOS.map((contacto) => (
            <a
              key={contacto.wa}
              className="flex items-center justify-between rounded-xl border border-border px-4 py-3 transition hover:border-primary hover:bg-accent/30"
              href={buildWhatsappLink(contacto.wa, producto)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div>
                <p className="font-medium text-foreground">
                  {contacto.nombre}
                </p>
                <p className="text-sm text-muted-foreground">
                  {contacto.numero}
                </p>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#25d366] text-primary-foreground">
                <MessageCircle className="h-4 w-4" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export function WhatsappFab({ onClick }: { onClick: () => void }) {
  return (
    <button
      className="fixed bottom-6 right-6 z-[90] flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] shadow-md transition hover:shadow-lg hover:scale-105"
      aria-label="WhatsApp"
      type="button"
      onClick={onClick}
    >
      <MessageCircle className="h-7 w-7 text-primary-foreground" />
    </button>
  )
}

export { WHATSAPP_CONTACTOS, buildWhatsappLink }
