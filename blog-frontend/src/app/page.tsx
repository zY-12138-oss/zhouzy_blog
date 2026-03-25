'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { LayoutGrid, List } from 'lucide-react'
import { articleService } from '@/services/articleService'
import ArticleCard from '@/components/ArticleCard/ArticleCard'
import { ArticleCardSkeleton } from '@/components/common/Skeleton'
import Pagination from '@/components/common/Pagination'
import Sidebar from '@/components/Sidebar/Sidebar'
import RightSidebar from '@/components/Sidebar/RightSidebar'
import { clsx } from 'clsx'

export default function HomePage() {
  const [page, setPage] = useState(1)
  const [view, setView] = useState<'grid' | 'list'>('grid')

  const { data, isLoading } = useQuery({
    queryKey: ['articles', page],
    queryFn: () => articleService.getArticles({ page, size: 12, status: 1, sortBy: 'createTime', sortOrder: 'desc' }),
    staleTime: 60 * 1000,
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr_280px] gap-6">
        {/* Left Sidebar */}
        <div className="hidden lg:block">
          <div className="sticky top-20">
            <Sidebar />
          </div>
        </div>

        {/* Main Content */}
        <main>
          {/* Header bar */}
          <div className="flex items-center justify-between mb-5">
            <h1 className="font-bold text-lg text-[var(--color-text-primary)]">
              最新文章
              {data && <span className="ml-2 text-sm font-normal text-[var(--color-text-muted)]">共 {data.total} 篇</span>}
            </h1>
            <div className="flex items-center gap-1 bg-[var(--color-bg-subtle)] rounded-lg p-1">
              <button
                onClick={() => setView('grid')}
                className={clsx(
                  'p-1.5 rounded-md transition-colors',
                  view === 'grid' ? 'bg-[var(--color-bg-card)] text-primary-500 shadow-sm' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
                )}
              >
                <LayoutGrid size={15} />
              </button>
              <button
                onClick={() => setView('list')}
                className={clsx(
                  'p-1.5 rounded-md transition-colors',
                  view === 'list' ? 'bg-[var(--color-bg-card)] text-primary-500 shadow-sm' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
                )}
              >
                <List size={15} />
              </button>
            </div>
          </div>

          {/* Article Grid */}
          {isLoading ? (
            <div className={clsx(
              'grid gap-4',
              view === 'grid' ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'
            )}>
              {Array.from({ length: 6 }).map((_, i) => (
                <ArticleCardSkeleton key={i} />
              ))}
            </div>
          ) : data?.records.length === 0 ? (
            <div className="text-center py-20 text-[var(--color-text-muted)]">
              <p className="text-4xl mb-4">📭</p>
              <p>暂无文章</p>
            </div>
          ) : (
            <div className={clsx(
              'grid gap-4',
              view === 'grid' ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'
            )}>
              {data?.records.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {data && data.total > 12 && (
            <Pagination
              page={page}
              total={data.total}
              size={12}
              onChange={(p) => { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
              className="mt-8"
            />
          )}
        </main>

        {/* Right Sidebar */}
        <div className="hidden lg:block">
          <div className="sticky top-20">
            <RightSidebar />
          </div>
        </div>
      </div>
    </div>
  )
}
