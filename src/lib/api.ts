const BASE = (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, '') || 'http://127.0.0.1:8000';

// Access token lives in memory only — never localStorage/sessionStorage. It is
// re-minted on page load (and on 401) from an HttpOnly refresh cookie.
let token: string | null = null;

export function setToken(next: string | null): void {
  token = next;
}

export function getToken(): string | null {
  return token;
}

function csrfFromCookie(): string {
  const hit = document.cookie.split('; ').find((c) => c.startsWith('dentrix_csrf='));
  return hit ? decodeURIComponent(hit.split('=').slice(1).join('=')) : '';
}

export class ApiError extends Error {
  status: number;
  detail: unknown;
  constructor(status: number, detail: unknown, message: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.detail = detail;
  }
}

let refreshing: Promise<boolean> | null = null;

/** Try to mint a fresh access token from the refresh cookie. De-duped across callers. */
export function refreshAccessToken(): Promise<boolean> {
  if (!refreshing) {
    refreshing = (async () => {
      try {
        const res = await fetch(`${BASE}/auth/refresh`, {
          method: 'POST',
          credentials: 'include',
          headers: { 'X-CSRF-Token': csrfFromCookie() },
        });
        if (!res.ok) return false;
        const data = (await res.json()) as { accessToken?: string };
        if (!data.accessToken) return false;
        setToken(data.accessToken);
        return true;
      } catch {
        return false;
      } finally {
        refreshing = null;
      }
    })();
  }
  return refreshing;
}

interface Options {
  method?: string;
  body?: unknown;
  query?: Record<string, string | number | boolean | undefined | null>;
  _retried?: boolean;
}

export async function api<T>(path: string, opts: Options = {}): Promise<T> {
  const url = new URL(BASE + path);
  if (opts.query) {
    for (const [k, v] of Object.entries(opts.query)) {
      if (v !== undefined && v !== null) url.searchParams.set(k, String(v));
    }
  }

  const headers: Record<string, string> = {};
  if (opts.body !== undefined) headers['Content-Type'] = 'application/json';
  if (token) headers['Authorization'] = `Bearer ${token}`;
  if (path === '/auth/logout') headers['X-CSRF-Token'] = csrfFromCookie();

  const res = await fetch(url.toString(), {
    method: opts.method ?? 'GET',
    headers,
    credentials: 'include', // send/receive the auth cookies on /auth/*
    body: opts.body !== undefined ? JSON.stringify(opts.body) : undefined,
  });

  // Session expired mid-use: try one silent refresh + retry, else fall through to 401.
  if (res.status === 401 && !path.startsWith('/auth/') && !opts._retried) {
    if (await refreshAccessToken()) {
      return api<T>(path, { ...opts, _retried: true });
    }
    setToken(null);
    window.dispatchEvent(new Event('dentrix:unauthorized'));
  }
  if (res.status === 204) return undefined as T;

  const isJson = res.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await res.json() : await res.text();

  if (!res.ok) {
    const detail =
      data && typeof data === 'object' && 'detail' in data ? (data as { detail: unknown }).detail : data;
    const message =
      typeof detail === 'string'
        ? detail
        : detail && typeof detail === 'object' && 'message' in detail
          ? String((detail as { message: unknown }).message)
          : `Request failed (${res.status})`;
    throw new ApiError(res.status, detail, message);
  }

  return data as T;
}
