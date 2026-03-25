'use client'

import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { articleService } from '@/services/articleService'
import { Skeleton } from '@/components/common/Skeleton'
import Badge from '@/components/common/Badge'

export default function TagsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-[var(--color-text-primary)] mb-2">全部标签</h1>
        <p className="text-[var(--color-text-muted)]">通过标签发现更多文章</p>
      </div>
      <TagsList />
    </div>
  )
}

function TagsList() {
  const { data: tags, isLoading } = useQuery({
    queryKey: ['tags'],
    queryFn: () => articleService.getTags(),
  })

  if (isLoading) {
    return (
      <div className="flex flex-wrap gap-3">
        {Array.from({ length: 20 }).map((_, i) => (
          <Skeleton key={i} className="h-8" style={{ width: `${60 + (i % 5) * 20}px` }} rounded />
        ))}
      </div>
    )
  }

  return (
    <div className="card p-8">
      <div className="flex flex-wrap gap-3">
        {tags?.map((tag) => (
          <Link key={tag.id} href={`/tag/${tag.slug}`}>
            <Badge
              variant="outline"
              size="md"
              className="cursor-pointer hover:border-primary-400 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all text-sm px-3 py-1.5"
            >
              #{tag.name}
              {tag.articleCount !== undefined && (
                <span className="ml-1 text-[var(--color-text-muted)] text-xs">({tag.articleCount})</span>
              )}
            </Badge>
          </Link>
        ))}
      </div>
    </div>
  )
}
