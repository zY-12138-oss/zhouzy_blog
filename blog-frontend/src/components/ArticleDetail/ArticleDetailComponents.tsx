'use client'

import Link from 'next/link'
import { clsx } from 'clsx'
import { BookOpen, MessageCircle } from 'lucide-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { commentService } from '@/services/commentService'
import { useAuthStore } from '@/store/useAuthStore'
import { formatRelativeTime } from '@/utils/format'
import { Skeleton } from '@/components/common/Skeleton'
import Button from '@/components/common/Button'
import type { Comment, CreateCommentDTO } from '@/types'
import toast from 'react-hot-toast'

export interface TocItem {
  id: string
  text: string
  level: number
}

export function TableOfContents({ items, activeId }: { items: TocItem[]; activeId: string }) {
  if (!items.length) return null
  return (
    <div className="card p-4 sticky top-20">
      <h4 className="flex items-center gap-2 text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-3">
        <BookOpen size={13} /> 目录
      </h4>
      <nav className="space-y-0.5 max-h-[60vh] overflow-y-auto pr-1">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => {
              e.preventDefault()
              document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })
            }}
            className={clsx(
              'block text-xs py-1 pr-2 rounded transition-colors truncate border-l-2',
              item.level === 1 ? 'pl-2' : item.level === 2 ? 'pl-4' : 'pl-6',
              activeId === item.id
                ? 'text-primary-500 font-medium border-primary-500'
                : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] border-transparent'
            )}
          >
            {item.text}
          </a>
        ))}
      </nav>
    </div>
  )
}

function CommentItem({
  comment,
  articleId,
  onReply,
}: {
  comment: Comment
  articleId: string
  onReply: (c: Comment) => void
}) {
  const { user, isAuthenticated } = useAuthStore()
  const queryClient = useQueryClient()

  const deleteMutation = useMutation({
    mutationFn: () => commentService.deleteComment(comment.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', articleId] })
      toast.success('评论已删除')
    },
  })

  const canDelete =
    isAuthenticated && (user?.id === comment.userId || user?.roles?.includes('ROLE_ADMIN'))

  return (
    <div className="flex gap-3">
      <img
        src={comment.author.avatar || `https://api.dicebear.com/7.x/notionists/svg?seed=${comment.author.username}`}
        alt={comment.author.nickname}
        className="w-8 h-8 rounded-full shrink-0 object-cover"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-medium text-[var(--color-text-primary)]">
            {comment.author.nickname}
          </span>
          <span className="text-xs text-[var(--color-text-muted)]">
            {formatRelativeTime(comment.createTime)}
          </span>
        </div>
        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed break-words">
          {comment.content}
        </p>
        <div className="flex items-center gap-3 mt-2">
          {isAuthenticated && (
            <button
              onClick={() => onReply(comment)}
              className="text-xs text-[var(--color-text-muted)] hover:text-primary-500 transition-colors"
            >
              回复
            </button>
          )}
          {canDelete && (
            <button
              onClick={() => deleteMutation.mutate()}
              className="text-xs text-[var(--color-text-muted)] hover:text-red-500 transition-colors"
            >
              删除
            </button>
          )}
        </div>
        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-3 space-y-3 pl-3 border-l-2 border-[var(--color-border)]">
            {comment.replies.map((reply) => (
              <CommentItem key={reply.id} comment={reply} articleId={articleId} onReply={onReply} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export function CommentSection({ articleId }: { articleId: string }) {
  const { isAuthenticated } = useAuthStore()
  const queryClient = useQueryClient()
  const [content, setContent] = useState('')
  const [replyTo, setReplyTo] = useState<Comment | null>(null)

  const { data: commentsData, isLoading } = useQuery({
    queryKey: ['comments', articleId],
    queryFn: () => commentService.getComments({ articleId, page: 1, size: 50 }),
  })

  const addCommentMutation = useMutation({
    mutationFn: (data: CreateCommentDTO) => commentService.createComment(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', articleId] })
      setContent('')
      setReplyTo(null)
      toast.success('评论成功')
    },
  })

  const handleSubmit = () => {
    if (!content.trim()) return toast.error('请输入评论内容')
    addCommentMutation.mutate({
      articleId,
      content: content.trim(),
      parentId: replyTo?.id,
      rootId: replyTo?.rootId || replyTo?.id,
    })
  }

  return (
    <div className="mt-10" id="comments">
      <h3 className="flex items-center gap-2 text-lg font-bold text-[var(--color-text-primary)] mb-6">
        <MessageCircle size={20} className="text-primary-500" /> 评论区
        {commentsData && (
          <span className="text-sm font-normal text-[var(--color-text-muted)]">({commentsData.total})</span>
        )}
      </h3>

      {isAuthenticated ? (
        <div className="card p-4 mb-6">
          {replyTo && (
            <div className="flex items-center justify-between mb-2 text-xs text-[var(--color-text-muted)] bg-[var(--color-bg-subtle)] px-3 py-2 rounded-lg">
              <span>回复 @{replyTo.author.nickname}</span>
              <button onClick={() => setReplyTo(null)} className="hover:text-red-500">取消</button>
            </div>
          )}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="写下你的评论..."
            rows={3}
            className="w-full resize-none rounded-lg border border-[var(--color-border)] bg-transparent p-3 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <div className="flex justify-end mt-2">
            <Button size="sm" onClick={handleSubmit} loading={addCommentMutation.isPending}>发布评论</Button>
          </div>
        </div>
      ) : (
        <div className="card p-4 mb-6 text-center">
          <p className="text-sm text-[var(--color-text-muted)]">
            <Link href="/login" className="text-primary-500 hover:underline">登录</Link> 后参与评论
          </p>
        </div>
      )}

      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex gap-3">
              <Skeleton circle width={32} height={32} />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton lines={2} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {commentsData?.records.map((comment) => (
            <CommentItem key={comment.id} comment={comment} articleId={articleId} onReply={setReplyTo} />
          ))}
          {commentsData?.records.length === 0 && (
            <p className="text-center text-[var(--color-text-muted)] py-8">暂无评论，来发表第一条吧！</p>
          )}
        </div>
      )}
    </div>
  )
}
