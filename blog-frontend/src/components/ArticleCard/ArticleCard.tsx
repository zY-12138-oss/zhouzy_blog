import Link from 'next/link'
import Image from 'next/image'
import { Eye, Heart, MessageCircle, Clock, Calendar } from 'lucide-react'
import { clsx } from 'clsx'
import type { ArticleListItem } from '@/types'
import { formatDate, formatRelativeTime, formatNumber } from '@/utils/format'
import Badge from '@/components/common/Badge'

interface ArticleCardProps {
  article: ArticleListItem
  variant?: 'default' | 'compact' | 'featured'
}

export default function ArticleCard({ article, variant = 'default' }: ArticleCardProps) {
  if (variant === 'compact') {
    return (
      <Link href={`/articles/${article.id}`} className="flex gap-3 group py-2">
        {article.cover && (
          <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
            <Image src={article.cover} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-[var(--color-text-primary)] group-hover:text-primary-500 transition-colors line-clamp-2 leading-snug">
            {article.isTop === 1 && <span className="text-red-500 mr-1">[置顶]</span>}
            {article.title}
          </p>
          <p className="text-xs text-[var(--color-text-muted)] mt-1">
            {formatRelativeTime(article.publishTime || article.createTime)}
          </p>
        </div>
      </Link>
    )
  }

  if (variant === 'featured') {
    return (
      <article className="card group overflow-hidden animate-slide-up">
        <Link href={`/articles/${article.id}`}>
          <div className="relative h-64 overflow-hidden">
            {article.cover ? (
              <Image
                src={article.cover}
                alt={article.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                priority
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center">
                <span className="text-6xl opacity-20">📝</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <div className="flex flex-wrap gap-1.5 mb-2">
                {article.isTop === 1 && <Badge variant="danger" size="sm">置顶</Badge>}
                {article.category && <Badge variant="primary" size="sm">{article.category.name}</Badge>}
              </div>
              <h2 className="text-xl font-bold text-white line-clamp-2 mb-1">{article.title}</h2>
              <div className="flex items-center gap-3 text-white/70 text-xs">
                <span className="flex items-center gap-1"><Calendar size={11} />{formatDate(article.publishTime || article.createTime)}</span>
                <span className="flex items-center gap-1"><Eye size={11} />{formatNumber(article.viewCount)}</span>
                <span className="flex items-center gap-1"><Heart size={11} />{formatNumber(article.likeCount)}</span>
              </div>
            </div>
          </div>
        </Link>
      </article>
    )
  }

  return (
    <article className="card group overflow-hidden hover:translate-y-[-2px] transition-all duration-200">
      {/* Cover */}
      {article.cover && (
        <Link href={`/articles/${article.id}`} className="block relative h-44 overflow-hidden">
          <Image
            src={article.cover}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {article.isTop === 1 && (
            <span className="absolute top-2 left-2">
              <Badge variant="danger" size="sm">置顶</Badge>
            </span>
          )}
        </Link>
      )}

      <div className="p-4">
        {/* Category + Tags */}
        <div className="flex flex-wrap gap-1.5 mb-2">
          {!article.cover && article.isTop === 1 && (
            <Badge variant="danger" size="sm">置顶</Badge>
          )}
          {article.category && (
            <Link href={`/category/${article.category.slug}`}>
              <Badge variant="primary" size="sm">{article.category.name}</Badge>
            </Link>
          )}
          {article.tags?.slice(0, 2).map((tag) => (
            <Link key={tag.id} href={`/tag/${tag.slug}`}>
              <Badge variant="default" size="sm">#{tag.name}</Badge>
            </Link>
          ))}
        </div>

        {/* Title */}
        <Link href={`/articles/${article.id}`}>
          <h2 className="font-bold text-[var(--color-text-primary)] group-hover:text-primary-500 transition-colors line-clamp-2 leading-snug mb-2 text-base">
            {article.title}
          </h2>
        </Link>

        {/* Summary */}
        {article.summary && (
          <p className="text-sm text-[var(--color-text-muted)] line-clamp-2 leading-relaxed mb-3">
            {article.summary}
          </p>
        )}

        {/* Meta */}
        <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)]">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Calendar size={11} />
              {formatDate(article.publishTime || article.createTime)}
            </span>
            {article.readingTime && (
              <span className="flex items-center gap-1">
                <Clock size={11} />
                {article.readingTime} 分钟
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1"><Eye size={11} />{formatNumber(article.viewCount)}</span>
            <span className="flex items-center gap-1"><Heart size={11} />{formatNumber(article.likeCount)}</span>
            <span className="flex items-center gap-1"><MessageCircle size={11} />{formatNumber(article.commentCount)}</span>
          </div>
        </div>
      </div>
    </article>
  )
}
