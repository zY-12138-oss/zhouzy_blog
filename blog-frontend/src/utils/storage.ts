import { TOKEN_KEY, REFRESH_TOKEN_KEY, THEME_KEY, LOCALE_KEY } from '@/config/constants'

export function getToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token)
}

export function removeToken(): void {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(REFRESH_TOKEN_KEY)
}

export function getRefreshToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(REFRESH_TOKEN_KEY)
}

export function setRefreshToken(token: string): void {
  localStorage.setItem(REFRESH_TOKEN_KEY, token)
}

export function getTheme(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(THEME_KEY)
}

export function setTheme(theme: string): void {
  localStorage.setItem(THEME_KEY, theme)
}

export function getLocale(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(LOCALE_KEY)
}

export function setLocale(locale: string): void {
  localStorage.setItem(LOCALE_KEY, locale)
}

export function getDraft(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('blog_draft')
}

export function setDraft(content: string): void {
  localStorage.setItem('blog_draft', content)
}

export function clearDraft(): void {
  localStorage.removeItem('blog_draft')
}
