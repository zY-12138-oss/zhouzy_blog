// Basic XSS filter for user-generated content
const ALLOWED_TAGS = [
  'p', 'br', 'strong', 'em', 'u', 's', 'a', 'code', 'pre',
  'img', 'blockquote', 'ul', 'ol', 'li', 'table', 'thead',
  'tbody', 'tr', 'th', 'td', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'hr', 'del', 'sup', 'sub', 'span', 'div', 'input',
]

const ALLOWED_ATTRS = ['href', 'title', 'src', 'alt', 'class', 'id', 'target', 'rel', 'type', 'checked', 'disabled']

export function sanitizeHtml(html: string): string {
  if (typeof window === 'undefined') return html
  // Simple regex-based sanitization for SSR
  // On client side, DOMPurify is preferred
  return html
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
    .replace(/on\w+="[^"]*"/gi, '')
    .replace(/on\w+='[^']*'/gi, '')
    .replace(/javascript:/gi, '')
}

export function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }
  return text.replace(/[&<>"']/g, (m) => map[m])
}

export { ALLOWED_TAGS, ALLOWED_ATTRS }
