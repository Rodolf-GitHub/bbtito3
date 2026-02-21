"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { loginUser } from "@/lib/auth"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Loader2, Eye, EyeOff } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [nombre, setNombre] = useState("")
  const [contraseña, setContraseña] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      await loginUser(nombre, contraseña)
      router.push("/admin")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al iniciar sesion")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary px-4 text-center">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <div className="logo-float flex h-20 w-20 items-center justify-center rounded-full bg-accent shadow-md">
            <span className="font-display text-2xl font-bold text-primary">
              BB
            </span>
          </div>
          <h1 className="font-display text-3xl font-bold tracking-wide text-foreground text-center">
            BBTito Admin
          </h1>
          <p className="text-sm text-muted-foreground text-center">
            Ingresa tus credenciales para continuar
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-border bg-card p-6 shadow-sm"
        >
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <Label htmlFor="nombre" className="text-sm font-medium text-foreground">
                Usuario
              </Label>
              <Input
                id="nombre"
                type="text"
                placeholder="Tu nombre de usuario"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
                autoFocus
                autoComplete="username"
                className="h-11 rounded-xl bg-secondary/50"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="password" className="text-sm font-medium text-foreground">
                Contrasena
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Tu contrasena"
                  value={contraseña}
                  onChange={(e) => setContraseña(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="h-11 rounded-xl bg-secondary/50 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition hover:text-foreground"
                  aria-label={showPassword ? "Ocultar contrasena" : "Mostrar contrasena"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading || !nombre || !contraseña}
              className="h-11 rounded-xl text-sm font-semibold uppercase tracking-wider"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Ingresando...
                </>
              ) : (
                "Iniciar sesion"
              )}
            </Button>
          </div>
        </form>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          <a href="/" className="transition hover:text-primary">
            Volver a la tienda
          </a>
        </p>
      </div>
    </div>
  )
}
