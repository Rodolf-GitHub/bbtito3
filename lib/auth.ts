const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
const TOKEN_KEY = "bbtito_auth_token"

export function getToken(): string | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token)
}

export function removeToken() {
  localStorage.removeItem(TOKEN_KEY)
}

export function isAuthenticated(): boolean {
  return !!getToken()
}

export async function loginUser(nombre: string, contraseña: string) {
  const res = await fetch(`${API_BASE}/api/usuarios/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, contraseña }),
  })

  if (!res.ok) {
    const errorData = await res.json().catch(() => null)
    throw new Error(errorData?.detail || "Credenciales incorrectas")
  }

  const data = await res.json()
  setToken(data.token)
  return data
}
