"use client"

import { Producto } from "@/lib/types"
import { buildImageUrl } from "@/lib/api"

type HeroHeaderProps = {
  destacados: Producto[]
  totalMujer: number
  totalHombre: number
  onWhatsappClick: () => void
  onImageClick: (src: string, alt: string) => void
}

export function HeroHeader({
  destacados,
  totalMujer,
  totalHombre,
  onWhatsappClick,
  onImageClick,
}: HeroHeaderProps) {
  const heroProducts = destacados.slice(0, 3)

  return (
    <header className="relative overflow-hidden bg-secondary text-center">
      <SparkleOverlay />

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-5">
        {/* Navigation */}
        <nav className="flex flex-col items-center gap-5 text-center w-full">
          <div className="flex flex-col items-center gap-2">
            <div className="logo-float flex h-28 w-28 items-center justify-center rounded-full bg-accent shadow-sm sm:h-36 sm:w-36 overflow-hidden">
              <img
                src="/bbtito_logo.png"
                alt="BBTito Logo"
                className="h-full w-full object-contain"
                loading="lazy"
              />
            </div>
            <p className="font-display text-3xl font-bold tracking-wide text-foreground sm:text-4xl">
              BBTito
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-1 rounded-full border border-border bg-card/80 p-1.5 text-sm backdrop-blur-sm">
            <a
              className="rounded-full px-4 py-2 text-sm font-medium text-foreground transition hover:bg-accent hover:text-primary"
              href="#catalogo"
            >
              Catalogo
            </a>
            <a
              className="rounded-full px-4 py-2 text-sm font-medium text-foreground transition hover:bg-accent hover:text-primary"
              href="#contacto"
            >
              Contacto
            </a>
            <button
              className="rounded-full bg-primary px-4 py-2 text-xs font-semibold uppercase tracking-widest text-primary-foreground transition hover:opacity-90"
              type="button"
              onClick={onWhatsappClick}
            >
              WhatsApp
            </button>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="mt-12 grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:mt-16">
          <div className="flex flex-col gap-5">
            <p className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card/60 px-3.5 py-1.5 text-[11px] uppercase tracking-widest text-muted-foreground backdrop-blur-sm mx-auto">
              Reventa de marcas
              <span className="h-1 w-1 rounded-full bg-primary" />
              Outfits destacados
            </p>
            <h1 className="font-display text-4xl leading-[1.15] text-foreground sm:text-5xl lg:text-6xl text-balance">
              Tu estilo, tu esencia.
            </h1>
            <p className="max-w-lg text-base text-muted-foreground leading-relaxed">
              Descubre lo ultimo en moda para mujer y hombre en un solo lugar.
              Renueva tu guardarropa con las ultimas tendencias.
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              <button
                className="rounded-full bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-widest text-primary-foreground shadow-sm transition hover:-translate-y-0.5 hover:shadow-md mx-auto"
                type="button"
                onClick={onWhatsappClick}
              >
                Consultar por WhatsApp
              </button>
              <a
                className="rounded-full border border-primary bg-card/60 px-6 py-3 text-sm font-semibold uppercase tracking-widest text-primary transition hover:-translate-y-0.5 hover:bg-card mx-auto"
                href="#catalogo"
              >
                Ver catalogo
              </a>
            </div>
            <div className="flex gap-8 pt-2 text-sm text-muted-foreground">
              <div>
                <p className="font-display text-2xl text-foreground">
                  {totalMujer}
                </p>
                <p>Productos para ella</p>
              </div>
              <div>
                <p className="font-display text-2xl text-foreground">
                  {totalHombre}
                </p>
                <p>Productos para el</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

function SparkleOverlay() {
  const dots = Array.from({ length: 12 }, (_, i) => ({
    left: `${6 + i * 8}%`,
    delay: `${-i * 1.2}s`,
    duration: `${7 + (i % 3) * 2}s`,
    size: 3 + (i % 3),
  }))

  return (
    <div className="sparkle-container">
      {dots.map((d, i) => (
        <span
          key={i}
          className="sparkle-dot"
          style={
            {
              "--left": d.left,
              "--delay": d.delay,
              "--duration": d.duration,
              left: d.left,
              animationDelay: d.delay,
              animationDuration: d.duration,
              width: d.size,
              height: d.size,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  )
}
