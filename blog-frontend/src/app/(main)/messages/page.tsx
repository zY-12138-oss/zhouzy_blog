'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/services/api'
import { useAuthStore } from '@/store/useAuthStore'
import { formatRelativeTime } from '@/utils/format'
import { Skeleton } from '@/components/common/Skeleton'
import Button from '@/components/common/Button'
import type { Message } from '@/types'
import toast from 'react-hot-toast'

export default function MessagesPage() {
  const { isAuthenticated, user } = useAuthStore()
  const queryClient = useQueryClient()
  const [content, setContent] = useState('')
  const [nickname, setNickname] = useState('')

  const { data: messages, isLoading } = useQuery({
    queryKey: ['messages'],
    queryFn: async () => {
      const res = await api.get('/messages')
      const data = res.data.data
      // 兼容分页结构 { content: [] } 或直接数组
      return (Array.isArray(data) ? data : data?.content ?? []) as Message[]
    },
  })

  const addMutation = useMutation({
    mutationFn: async () => {
      await api.post('/messages', { content, nickname: isAuthenticated ? undefined : nickname })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] })
      setContent('')
      toast.success('留言成功，等待审核后显示')
    },
  })

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-[var(--color-text-primary)] mb-2">留言板</h1>
        <p className="text-[var(--color-text-muted)]">有什么想说的？欢迎留言 ✨</p>
      </div>

      {/* Leave a message */}
      <div className="card p-6 mb-8">
        <h2 className="font-semibold text-[var(--color-text-primary)] mb-4">发表留言</h2>
        {!isAuthenticated && (
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="你的昵称（必填）"
            className="w-full mb-3 rounded-lg border border-[var(--color-border)] bg-transparent p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        )}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="写下你想说的话..."
          rows={4}
          className="w-full resize-none rounded-lg border border-[var(--color-border)] bg-transparent p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 mb-3"
        />
        <div className="flex justify-end">
          <Button
            onClick={() => {
              if (!content.trim()) {
                toast.error('请输入留言内容')
                return
              }
              if (!isAuthenticated && !nickname.trim()) {
                toast.error('请输入昵称')
                return
              }
              addMutation.mutate()
            }}
            loading={addMutation.isPending}
          >
            发表留言
          </Button>
        </div>
      </div>

      {/* Messages list */}
      <div className="space-y-4">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="card p-4 flex gap-3">
                <Skeleton circle width={40} height={40} />
                <div className="flex-1 space-y-2"><Skeleton lines={2} /></div>
              </div>
            ))
          : messages?.map((msg) => (
              <div key={msg.id} className="card p-4 flex gap-3">
                <img
                  src={msg.author?.avatar || `https://api.dicebear.com/7.x/notionists/svg?seed=${msg.nickname || msg.userId}`}
                  alt="avatar"
                  className="w-10 h-10 rounded-full shrink-0"
                />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm text-[var(--color-text-primary)]">
                      {msg.author?.nickname || msg.nickname || '匿名'}
                    </span>
                    <span className="text-xs text-[var(--color-text-muted)]">
                      {formatRelativeTime(msg.createTime)}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{msg.content}</p>
                </div>
              </div>
            ))}
        {!isLoading && !messages?.length && (
          <p className="text-center text-[var(--color-text-muted)] py-10">暂无留言，来发表第一条吧！</p>
        )}
      </div>
    </div>
  )
}
