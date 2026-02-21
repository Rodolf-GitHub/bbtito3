"use client"

import { MapPin, Clock, MessageCircle } from "lucide-react"
import { WHATSAPP_CONTACTOS, buildWhatsappLink } from "./whatsapp-selector"

export function ContactSection() {
  return (
    <section id="contacto" className="mx-auto max-w-6xl px-6 pb-20">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-primary">
            <MessageCircle className="h-3.5 w-3.5" strokeWidth={1.8} />
            <p>Contacto</p>
          </div>
          <h2 className="font-display text-2xl text-foreground sm:text-3xl text-balance">
            Escribenos para separar tu prenda
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Nuestro catalogo va variando y lo actualizamos cada semana.
            Escribenos para mantenerte al tanto y enviarte el detalle de la
            prenda que te interesa.
          </p>
        </div>

        <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6">
          <div>
            <p className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
              <MessageCircle className="h-3.5 w-3.5" />
              WhatsApp
            </p>
            <div className="mt-3 flex flex-col gap-2">
              {WHATSAPP_CONTACTOS.map((contacto) => (
                <a
                  key={contacto.wa}
                  className="flex items-center justify-between rounded-xl border border-border px-4 py-3 transition hover:border-primary hover:bg-accent/30"
                  href={buildWhatsappLink(contacto.wa)}
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
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#25d366] text-primary-foreground">
                    <MessageCircle className="h-4 w-4" />
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-6 border-t border-border pt-4">
            <div className="flex items-start gap-2">
              <Clock className="mt-0.5 h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  Horario
                </p>
                <p className="text-sm text-foreground">
                  Lun - Sab, 9:00 a 19:00
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  Ubicacion
                </p>
                <p className="text-sm text-foreground">
                  Montevideo, Uruguay
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
