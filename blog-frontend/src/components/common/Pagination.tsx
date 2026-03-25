'use client'

import { clsx } from 'clsx'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
  page: number
  total: number
  size?: number
  onChange: (page: number) => void
  className?: string
}

export default function Pagination({ page, total, size = 12, onChange, className }: PaginationProps) {
  const totalPages = Math.ceil(total / size)
  if (totalPages <= 1) return null

  const getPages = () => {
    const pages: (number | '...')[] = []
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      pages.push(1)
      if (page > 3) pages.push('...')
      const start = Math.max(2, page - 1)
      const end = Math.min(totalPages - 1, page + 1)
      for (let i = start; i <= end; i++) pages.push(i)
      if (page < totalPages - 2) pages.push('...')
      pages.push(totalPages)
    }
    return pages
  }

  return (
    <div className={clsx('flex items-center justify-center gap-1', className)}>
      <button
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        className="p-2 rounded-lg text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-subtle)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft size={16} />
      </button>

      {getPages().map((p, i) =>
        p === '...' ? (
          <span key={`dots-${i}`} className="px-2 text-[var(--color-text-muted)]">…</span>
        ) : (
          <button
            key={p}
            onClick={() => onChange(p as number)}
            className={clsx(
              'min-w-[36px] h-9 px-2 rounded-lg text-sm font-medium transition-all',
              p === page
                ? 'bg-primary-500 text-white shadow-sm'
                : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-subtle)]'
            )}
          >
            {p}
          </button>
        )
      )}

      <button
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        className="p-2 rounded-lg text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-subtle)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  )
}
