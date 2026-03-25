'use client'

import { useQuery } from '@tanstack/react-query'
import api from '@/services/api'
import type { FriendLink } from '@/types'
import { ExternalLink } from 'lucide-react'

export default function LinksPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-[var(--color-text-primary)] mb-2">友情链接</h1>
        <p className="text-[var(--color-text-muted)]">志同道合的朋友们 🤝</p>
      </div>
      <LinksGrid />
    </div>
  )
}

function LinksGrid() {
  const { data: links, isLoading } = useQuery({
    queryKey: ['friend-links'],
    queryFn: async () => {
      const res = await api.get('/friend-links')
      return res.data.data as FriendLink[]
    },
  })

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="card p-4 h-24 animate-pulse bg-[var(--color-bg-subtle)]" />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {links?.map((link) => (
        <a
          key={link.id}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="card p-4 flex items-center gap-3 hover:border-primary-300 hover:shadow-card-hover transition-all group"
        >
          {link.avatar ? (
            <img src={link.avatar} alt={link.name} className="w-12 h-12 rounded-xl object-cover shrink-0" />
          ) : (
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center text-white font-bold text-lg shrink-0">
              {link.name[0]}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <p className="font-semibold text-[var(--color-text-primary)] group-hover:text-primary-500 transition-colors truncate">{link.name}</p>
              <ExternalLink size={12} className="text-[var(--color-text-muted)] shrink-0" />
            </div>
            {link.description && (
              <p className="text-xs text-[var(--color-text-muted)] truncate mt-0.5">{link.description}</p>
            )}
          </div>
        </a>
      ))}
      {!links?.length && (
        <p className="col-span-full text-center text-[var(--color-text-muted)] py-10">暂无友链</p>
      )}
    </div>
  )
}
