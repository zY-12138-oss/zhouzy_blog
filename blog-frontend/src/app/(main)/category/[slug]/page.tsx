'use client'

import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { LayoutGrid, List } from 'lucide-react'
import { articleService } from '@/services/articleService'
import ArticleCard from '@/components/ArticleCard/ArticleCard'
import { ArticleCardSkeleton } from '@/components/common/Skeleton'
import Pagination from '@/components/common/Pagination'
import { clsx } from 'clsx'

export default function CategoryPage() {
  const { slug } = useParams() as { slug: string }
  const [page, setPage] = useState(1)
  const [view, setView] = useState<'grid' | 'list'>('grid')

  const { data, isLoading } = useQuery({
    queryKey: ['category-articles', slug, page],
    queryFn: () => articleService.getArticlesByCategory(slug, { page, size: 12 }),
    enabled: !!slug,
  })

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)] capitalize">{slug}</h1>
          {data && <p className="text-sm text-[var(--color-text-muted)] mt-1">共 {data.total} 篇文章</p>}
        </div>
        <div className="flex items-center gap-1 bg-[var(--color-bg-subtle)] rounded-lg p-1">
          <button onClick={() => setView('grid')} className={clsx('p-1.5 rounded-md transition-colors', view === 'grid' ? 'bg-[var(--color-bg-card)] text-primary-500 shadow-sm' : 'text-[var(--color-text-muted)]')}><LayoutGrid size={15} /></button>
          <button onClick={() => setView('list')} className={clsx('p-1.5 rounded-md transition-colors', view === 'list' ? 'bg-[var(--color-bg-card)] text-primary-500 shadow-sm' : 'text-[var(--color-text-muted)]')}><List size={15} /></button>
        </div>
      </div>

      {isLoading ? (
        <div className={clsx('grid gap-4', view === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1')}>
          {Array.from({ length: 6 }).map((_, i) => <ArticleCardSkeleton key={i} />)}
        </div>
      ) : (
        <>
          <div className={clsx('grid gap-4', view === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1')}>
            {data?.records.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
          {data && data.total > 12 && (
            <Pagination page={page} total={data.total} size={12} onChange={setPage} className="mt-8" />
          )}
        </>
      )}
    </div>
  )
}
