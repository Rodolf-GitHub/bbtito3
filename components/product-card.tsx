"use client"

import { Producto } from "@/lib/types"
import { buildImageUrl } from "@/lib/api"
import { Tag } from "lucide-react"

type ProductCardProps = {
  producto: Producto
  onImageClick: (src: string, alt: string) => void
  onConsultar: (producto: Producto) => void
}

export function ProductCard({
  producto,
  onImageClick,
  onConsultar,
}: ProductCardProps) {
  const imgSrc = buildImageUrl(producto.imagen)

  return (
    <article className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md text-center">
      <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
        {imgSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className="h-full w-full cursor-zoom-in object-cover transition duration-500 group-hover:scale-105"
            src={imgSrc}
            alt={producto.nombre}
            loading="lazy"
            onClick={() => onImageClick(imgSrc, producto.nombre)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
            Sin imagen
          </div>
        )}
        {producto.en_oferta && (
          <span className="absolute left-2.5 top-2.5 flex items-center gap-1 rounded-full bg-primary px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground">
            <Tag className="h-3 w-3" />
            Oferta
          </span>
        )}
        <span className="absolute right-2.5 top-2.5 rounded-full bg-card/90 px-2 py-0.5 text-[10px] font-medium text-muted-foreground backdrop-blur-sm">
          #{producto.id}
        </span>
        <span className="absolute bottom-2.5 right-2.5 rounded-full bg-card/90 px-2 py-0.5 text-[10px] font-medium text-muted-foreground backdrop-blur-sm">
          {producto.para_mujer ? "Mujer" : "Hombre"}
        </span>
      </div>
      <div className="flex flex-col gap-2.5 p-3.5">
        <p className="text-sm font-medium text-foreground line-clamp-2 leading-snug mx-auto">
          {producto.nombre}
        </p>
        <div className="flex flex-col items-center gap-2">
          <p className="text-lg font-bold text-primary">
            ${producto.precio}
          </p>
          <button
            type="button"
            onClick={() => onConsultar(producto)}
            className="rounded-full border border-primary px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-primary transition hover:bg-primary hover:text-primary-foreground w-full max-w-[140px]"
          >
            Consultar
          </button>
        </div>
      </div>
    </article>
  )
}
