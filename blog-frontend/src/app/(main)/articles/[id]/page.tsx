'use client'

import { useQuery, useMutation } from '@tanstack/react-query'
import { useState, useEffect, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import {
  Heart, Eye, MessageCircle, Share2, Calendar,
  Clock, ArrowLeft, Copy, Check
} from 'lucide-react'
import { articleService } from '@/services/articleService'
import { useAuthStore } from '@/store/useAuthStore'
import { formatDate, formatNumber } from '@/utils/format'
import { copyToClipboard } from '@/utils/helpers'
import Badge from '@/components/common/Badge'
import Button from '@/components/common/Button'
import { Skeleton } from '@/components/common/Skeleton'
import { TableOfContents, CommentSection } from '@/components/ArticleDetail/ArticleDetailComponents'
import type { TocItem } from '@/components/ArticleDetail/ArticleDetailComponents'
import toast from 'react-hot-toast'
import { clsx } from 'clsx'

export default function ArticleDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  const { isAuthenticated } = useAuthStore()

  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const [copied, setCopied] = useState(false)
  const [tocItems, setTocItems] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState('')
  const contentRef = useRef<HTMLDivElement>(null)

  const { data: article, isLoading } = useQuery({
    queryKey: ['article', id],
    queryFn: () => articleService.getArticleById(id),
    enabled: !!id,
  })

  useEffect(() => {
    if (article) {
      setLiked(article.isLiked || false)
      setLikeCount(article.likeCount)
    }
  }, [article])

  useEffect(() => {
    if (!contentRef.current) return
    const headings = contentRef.current.querySelectorAll('h1,h2,h3,h4')
    const items: TocItem[] = []
    headings.forEach((el) => {
      const id = el.id || (el.textContent || '').replace(/\s+/g, '-').toLowerCase()
      if (!el.id) el.id = id
      items.push({ id, text: el.textContent || '', level: parseInt(el.tagName[1]) })
    })
    setTocItems(items)
  }, [article])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActiveId(e.target.id)),
      { rootMargin: '-80px 0px -60% 0px' }
    )
    const headings = contentRef.current?.querySelectorAll('h1,h2,h3,h4') || []
    headings.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [tocItems])

  const likeMutation = useMutation({
    mutationFn: () => liked ? articleService.unlikeArticle(id) : articleService.likeArticle(id),
    onMutate: () => {
      setLiked((v) => !v)
      setLikeCount((c) => liked ? c - 1 : c + 1)
    },
    onError: () => {
      setLiked((v) => !v)
      setLikeCount((c) => liked ? c + 1 : c - 1)
    },
  })

  const handleCopy = async () => {
    await copyToClipboard(window.location.href)
    setCopied(true)
    toast.success('链接已复制')
    setTimeout(() => setCopied(false), 2000)
  }

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <Skeleton className="h-10 w-3/4 mb-4" />
        <Skeleton className="h-4 w-1/2 mb-8" />
        <Skeleton className="h-64 w-full mb-6" rounded />
        <Skeleton lines={8} />
      </div>
    )
  }

  if (!article) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <p className="text-6xl">404</p>
        <p className="text-[var(--color-text-muted)]">文章不存在或已删除</p>
        <Button onClick={() => router.push('/')}>返回首页</Button>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_260px] gap-8">
        {/* Article Content */}
        <div>
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1.5 text-sm text-[var(--color-text-muted)] hover:text-primary-500 transition-colors mb-6"
          >
            <ArrowLeft size={15} /> 返回
          </button>

          <article className="card p-6 sm:p-8">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {article.isTop === 1 && <Badge variant="danger">置顶</Badge>}
              {article.category && (
                <Badge variant="primary">{article.category.name}</Badge>
              )}
              {article.tags?.map((tag) => (
                <Badge key={tag.id} variant="default">#{tag.name}</Badge>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)] leading-tight mb-4">
              {article.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--color-text-muted)] pb-5 mb-6 border-b border-[var(--color-border)]">
              <div className="flex items-center gap-1.5">
                <img
                  src={article.author?.avatar || `https://api.dicebear.com/7.x/notionists/svg?seed=${article.author?.username}`}
                  alt={article.author?.nickname}
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span>{article.author?.nickname}</span>
              </div>
              <span className="flex items-center gap-1"><Calendar size={13} />{formatDate(article.publishTime || article.createTime)}</span>
              {article.readingTime && (
                <span className="flex items-center gap-1"><Clock size={13} />{article.readingTime} 分钟阅读</span>
              )}
              <span className="flex items-center gap-1"><Eye size={13} />{formatNumber(article.viewCount)}</span>
              <span className="flex items-center gap-1"><MessageCircle size={13} />{article.commentCount}</span>
            </div>

            {/* Cover */}
            {article.cover && (
              <img
                src={article.cover}
                alt={article.title}
                className="w-full rounded-xl object-cover max-h-80 mb-8"
              />
            )}

            {/* Content */}
            <div
              ref={contentRef}
              className="prose-blog"
              dangerouslySetInnerHTML={{ __html: article.contentHtml || '' }}
            />

            {/* Actions */}
            <div className="flex items-center gap-3 pt-6 mt-8 border-t border-[var(--color-border)]">
              <button
                onClick={() => isAuthenticated ? likeMutation.mutate() : toast.error('请先登录')}
                className={clsx(
                  'flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all',
                  liked
                    ? 'bg-red-50 text-red-500 dark:bg-red-900/20'
                    : 'bg-[var(--color-bg-subtle)] text-[var(--color-text-muted)] hover:text-red-500'
                )}
              >
                <Heart size={15} className={liked ? 'fill-current' : ''} />
                {likeCount}
              </button>
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-[var(--color-bg-subtle)] text-[var(--color-text-muted)] hover:text-primary-500 transition-all"
              >
                {copied ? <Check size={15} className="text-green-500" /> : <Copy size={15} />}
                {copied ? '已复制' : '分享'}
              </button>
            </div>
          </article>

          {/* Comments */}
          {article.allowComment === 1 && <CommentSection articleId={id} />}
        </div>

        {/* TOC Sidebar */}
        <div className="hidden xl:block">
          <TableOfContents items={tocItems} activeId={activeId} />
        </div>
      </div>
    </div>
  )
}
