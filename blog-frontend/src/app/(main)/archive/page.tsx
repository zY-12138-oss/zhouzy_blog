'use client'

import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { articleService } from '@/services/articleService'
import { Skeleton } from '@/components/common/Skeleton'
import { formatDate } from '@/utils/format'
import type { ArticleListItem } from '@/types'

type YearGroup = {
  year: number
  articles: ArticleListItem[]
}

function groupByYear(articles: ArticleListItem[]): YearGroup[] {
  const map = new Map<number, ArticleListItem[]>()
  for (const article of articles) {
    const year = new Date(article.createTime).getFullYear()
    if (!map.has(year)) map.set(year, [])
    map.get(year)!.push(article)
  }
  return Array.from(map.entries())
    .sort((a, b) => b[0] - a[0])
    .map(([year, articles]) => ({ year, articles }))
}

export default function ArchivePage() {
  const { data, isLoading } = useQuery({
    queryKey: ['archive'],
    queryFn: async () => {
      const res = await articleService.getArticles({ page: 1, size: 200 })
      const list = Array.isArray(res) ? res : res?.content ?? []
      return groupByYear(list)
    },
  })

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-[var(--color-text-primary)] mb-2">文章归档</h1>
        <p className="text-[var(--color-text-muted)]">所有文章按时间归档</p>
      </div>

      {isLoading ? (
        <div className="space-y-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i}>
              <Skeleton className="h-8 w-24 mb-4" />
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, j) => (
                  <Skeleton key={j} className="h-6" />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-10">
          {data?.map(({ year, articles }) => (
            <div key={year}>
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">{year}</h2>
                <span className="text-sm text-[var(--color-text-muted)] bg-[var(--color-bg-secondary)] px-2 py-0.5 rounded-full">
                  {articles.length} 篇
                </span>
              </div>
              <div className="card divide-y divide-[var(--color-border)]">
                {articles.map((article) => (
                  <Link
                    key={article.id}
                    href={`/articles/${article.id}`}
                    className="flex items-center justify-between px-5 py-3 hover:bg-[var(--color-bg-secondary)] transition-colors group"
                  >
                    <span className="text-sm text-[var(--color-text-primary)] group-hover:text-primary-500 transition-colors line-clamp-1 flex-1 mr-4">
                      {article.title}
                    </span>
                    <span className="text-xs text-[var(--color-text-muted)] shrink-0">
                      {formatDate(article.createTime)}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
          {data?.length === 0 && (
            <p className="text-center text-[var(--color-text-muted)] py-10">暂无文章</p>
          )}
        </div>
      )}
    </div>
  )
}
