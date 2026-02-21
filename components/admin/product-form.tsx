"use client"

import { useState, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Loader2, Upload, X, ImageIcon } from "lucide-react"
import type { ProductoFormData } from "@/lib/types"
import { buildImageUrl } from "@/lib/api"

type ProductFormProps = {
  initialData?: ProductoFormData & { imagenUrl?: string | null }
  onSubmit: (data: ProductoFormData, imagen?: File) => Promise<void>
  submitLabel: string
  isEditing?: boolean
}

export function ProductForm({
  initialData,
  onSubmit,
  submitLabel,
  isEditing = false,
}: ProductFormProps) {
  const [nombre, setNombre] = useState(initialData?.nombre ?? "")
  const [precio, setPrecio] = useState(initialData?.precio ?? "")
  const [paraMujer, setParaMujer] = useState(initialData?.para_mujer ?? true)
  const [enOferta, setEnOferta] = useState(initialData?.en_oferta ?? false)
  const [imagen, setImagen] = useState<File | null>(null)
  const [imagenPreview, setImagenPreview] = useState<string | null>(
    initialData?.imagenUrl ? buildImageUrl(initialData.imagenUrl) : null
  )
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const fileRef = useRef<HTMLInputElement>(null)

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      setImagen(file)
      const reader = new FileReader()
      reader.onload = () => setImagenPreview(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  function removeImage() {
    setImagen(null)
    setImagenPreview(null)
    if (fileRef.current) fileRef.current.value = ""
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      await onSubmit(
        {
          nombre,
          precio,
          para_mujer: paraMujer,
          en_oferta: enOferta,
        },
        imagen ?? undefined
      )
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ocurrio un error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="nombre" className="text-sm font-medium">
            Nombre del producto
          </Label>
          <Input
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej: Camiseta Nike Dri-FIT"
            required
            className="h-11 rounded-xl"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="precio" className="text-sm font-medium">
            Precio
          </Label>
          <Input
            id="precio"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            placeholder="Ej: 1500"
            required
            className="h-11 rounded-xl"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-8">
        <div className="flex items-center gap-3">
          <Switch
            id="para_mujer"
            checked={paraMujer}
            onCheckedChange={setParaMujer}
          />
          <Label htmlFor="para_mujer" className="text-sm">
            {paraMujer ? "Para mujer" : "Para hombre"}
          </Label>
        </div>
        <div className="flex items-center gap-3">
          <Switch
            id="en_oferta"
            checked={enOferta}
            onCheckedChange={setEnOferta}
          />
          <Label htmlFor="en_oferta" className="text-sm">
            {enOferta ? "En oferta" : "Sin oferta"}
          </Label>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label className="text-sm font-medium">Imagen</Label>
        {imagenPreview ? (
          <div className="relative w-fit">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imagenPreview}
              alt="Preview"
              className="h-48 w-48 rounded-xl border border-border object-cover"
            />
            <button
              type="button"
              onClick={removeImage}
              className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-destructive-foreground shadow-sm"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="flex h-48 w-48 flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-secondary/30 text-muted-foreground transition hover:border-primary hover:text-primary"
          >
            {isEditing ? (
              <ImageIcon className="h-8 w-8" />
            ) : (
              <Upload className="h-8 w-8" />
            )}
            <span className="text-xs">
              {isEditing ? "Cambiar imagen" : "Subir imagen"}
            </span>
          </button>
        )}
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {error && (
        <div className="rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="flex gap-3">
        <Button
          type="submit"
          disabled={loading || !nombre || !precio}
          className="h-11 rounded-xl px-8 text-sm font-semibold"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Guardando...
            </>
          ) : (
            submitLabel
          )}
        </Button>
        <Button
          type="button"
          variant="outline"
          className="h-11 rounded-xl"
          asChild
        >
          <a href="/admin">Cancelar</a>
        </Button>
      </div>
    </form>
  )
}
