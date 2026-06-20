// Thin fetch wrapper for the FastAPI backend.
// Configure with: VITE_API_BASE_URL=http://localhost:8000

export const API_BASE_URL =
  (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/$/, "") ||
  "http://localhost:8000";

const TOKEN_KEY = "reel.token";

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string | null) {
  if (typeof window === "undefined") return;
  if (token) window.localStorage.setItem(TOKEN_KEY, token);
  else window.localStorage.removeItem(TOKEN_KEY);
}

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export async function api<T = unknown>(
  path: string,
  opts: RequestInit & { auth?: boolean } = {},
): Promise<T> {
  const { auth = false, headers, ...rest } = opts;
  const h: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...((headers as Record<string, string>) || {}),
  };
  if (auth) {
    const t = getToken();
    if (t) h.Authorization = `Bearer ${t}`;
  }

  let res: Response;
  try {
    res = await fetch(`${API_BASE_URL}${path}`, { ...rest, headers: h });
  } catch {
    throw new ApiError("Network error — is the API running?", 0);
  }

  const text = await res.text();
  const data = text ? safeJson(text) : null;

  if (!res.ok) {
    const msg =
      (data && typeof data === "object" && ("detail" in data || "message" in data)
        ? String((data as Record<string, unknown>).detail ?? (data as Record<string, unknown>).message)
        : null) || res.statusText || "Request failed";
    throw new ApiError(msg, res.status);
  }
  return data as T;
}

function safeJson(s: string): unknown {
  try {
    return JSON.parse(s);
  } catch {
    return s;
  }
}

// Auth-specific helpers --------------------------------------------------

export type User = { id: string | number; email: string };
type TokenResponse = { access_token: string; token_type?: string; user?: User };

export const authApi = {
  signup: (email: string, password: string) =>
    api<TokenResponse>("/auth/signup", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
  signin: (email: string, password: string) =>
    api<TokenResponse>("/auth/signin", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
  me: () => api<User>("/auth/me", { auth: true }),
  update: (payload: { email?: string; password?: string; current_password?: string }) =>
    api<User>("/auth/me", {
      method: "PATCH",
      auth: true,
      body: JSON.stringify(payload),
    }),
};
