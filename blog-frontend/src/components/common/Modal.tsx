'use client'

import { useEffect } from 'react'
import { clsx } from 'clsx'
import { X } from 'lucide-react'
import Button from './Button'

interface ModalProps {
  open: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  footer?: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
  closable?: boolean
}

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-2xl',
}

export default function Modal({ open, onClose, title, children, footer, size = 'md', closable = true }: ModalProps) {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape' && closable) onClose() }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [closable, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
        onClick={closable ? onClose : undefined}
      />
      <div className={clsx('relative w-full bg-[var(--color-bg-card)] rounded-2xl shadow-2xl border border-[var(--color-border)] animate-scale-in', sizeClasses[size])}>
        {(title || closable) && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border)]">
            {title && <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">{title}</h2>}
            {closable && (
              <Button variant="ghost" size="sm" onClick={onClose} className="!p-1.5 ml-auto">
                <X size={16} />
              </Button>
            )}
          </div>
        )}
        <div className="px-6 py-5">{children}</div>
        {footer && (
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[var(--color-border)]">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}
