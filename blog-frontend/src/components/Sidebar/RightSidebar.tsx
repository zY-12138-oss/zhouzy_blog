'use client'

import Link from 'next/link'
import { TrendingUp, Tag, MessageCircle, Info } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { articleService } from '@/services/articleService'
import { ArticleCard } from '@/components/ArticleCard/ArticleCard'
import { Skeleton } from '@/components/common/Skeleton'
import Badge from '@/components/common/Badge'

export default function RightSidebar() {
  const { data: tags, isLoading: tagsLoading } = useQuery({
    queryKey: ['tags'],
    queryFn: () => articleService.getTags(),
    staleTime: 5 * 60 * 1000,
  })

  const { data: hotArticles, isLoading: hotLoading } = useQuery({
    queryKey: ['hot-articles'],
    queryFn: () => articleService.getArticles({ size: 5, sortBy: 'viewCount', sortOrder: 'desc', status: 1 }),
    staleTime: 5 * 60 * 1000,
  })

  return (
    <aside className="flex flex-col gap-4 w-full">
      {/* Hot Articles */}
      <div className="card p-4">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-[var(--color-text-primary)] mb-3">
          <TrendingUp size={15} className="text-primary-500" /> 热门文章
        </h3>
        <div className="divide-y divide-[var(--color-border)]">
          {hotLoading
            ? Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="py-2 space-y-1">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              ))
            : hotArticles?.records.map((article) => (
                <Link
                  key={article.id}
                  href={`/articles/${article.id}`}
                  className="flex gap-3 py-2.5 group"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-[var(--color-text-primary)] group-hover:text-primary-500 transition-colors line-clamp-2 leading-snug">
                      {article.title}
                    </p>
                    <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                      👁 {article.viewCount}
                    </p>
                  </div>
                </Link>
              ))}
        </div>
      </div>

      {/* Tag Cloud */}
      <div className="card p-4">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-[var(--color-text-primary)] mb-3">
          <Tag size={15} className="text-accent-500" /> 标签云
        </h3>
        {tagsLoading ? (
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-6 w-16" rounded />
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {tags?.map((tag) => (
              <Link key={tag.id} href={`/tag/${tag.slug}`}>
                <Badge variant="outline" size="sm" className="hover:border-primary-400 hover:text-primary-500 cursor-pointer transition-colors">
                  #{tag.name}
                  {tag.articleCount !== undefined && (
                    <span className="text-[var(--color-text-muted)] ml-1">{tag.articleCount}</span>
                  )}
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* About Card */}
      <div className="card p-4">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-[var(--color-text-primary)] mb-2">
          <Info size={15} className="text-green-500" /> 关于本站
        </h3>
        <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
          这是一个用 Next.js 14 + Spring Boot 构建的现代博客系统，专注于分享技术与生活。
        </p>
        <Link
          href="/about"
          className="inline-block mt-2 text-xs text-primary-500 hover:underline"
        >
          了解更多 →
        </Link>
      </div>
    </aside>
  )
}
