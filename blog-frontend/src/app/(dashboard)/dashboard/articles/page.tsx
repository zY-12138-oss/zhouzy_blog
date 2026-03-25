'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import { Edit, Trash2, Eye, Plus } from 'lucide-react'
import { articleService } from '@/services/articleService'
import { formatDate, formatNumber } from '@/utils/format'
import { Skeleton } from '@/components/common/Skeleton'
import Badge from '@/components/common/Badge'
import Button from '@/components/common/Button'
import Pagination from '@/components/common/Pagination'
import Modal from '@/components/common/Modal'
import toast from 'react-hot-toast'
import { clsx } from 'clsx'

const STATUS_MAP = {
  0: { label: '草稿', variant: 'warning' as const },
  1: { label: '已发布', variant: 'success' as const },
  2: { label: '已下架', variant: 'danger' as const },
}

export default function MyArticlesPage() {
  const queryClient = useQueryClient()
  const [page, setPage] = useState(1)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const { data, isLoading } = useQuery({
    queryKey: ['my-articles', page],
    queryFn: () => articleService.getMyArticles({ page, size: 10, sortBy: 'createTime', sortOrder: 'desc' }),
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => articleService.deleteArticle(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-articles'] })
      setDeleteId(null)
      toast.success('文章已删除')
    },
  })

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-[var(--color-text-primary)]">我的文章</h1>
        <Link href="/articles/edit">
          <Button size="sm" icon={<Plus size={15} />}>写文章</Button>
        </Link>
      </div>

      <div className="card overflow-hidden">
        {isLoading ? (
          <div className="p-4 space-y-3">
            {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-14 w-full" />)}
          </div>
        ) : data?.records.length === 0 ? (
          <div className="text-center py-16 text-[var(--color-text-muted)]">
            <p className="text-4xl mb-3">📝</p>
            <p className="text-sm">还没有文章，开始创作吧</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-[var(--color-border)] bg-[var(--color-bg-subtle)]">
                <tr className="text-[var(--color-text-muted)]">
                  <th className="text-left px-4 py-3 font-medium">标题</th>
                  <th className="text-center px-3 py-3 font-medium w-20">状态</th>
                  <th className="text-center px-3 py-3 font-medium w-20">浏览</th>
                  <th className="text-center px-3 py-3 font-medium w-20">点赞</th>
                  <th className="text-center px-3 py-3 font-medium w-24">发布时间</th>
                  <th className="text-right px-4 py-3 font-medium w-24">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border)]">
                {data?.records.map((article) => (
                  <tr key={article.id} className="hover:bg-[var(--color-bg-subtle)] transition-colors">
                    <td className="px-4 py-3">
                      <p className="font-medium text-[var(--color-text-primary)] line-clamp-1">{article.title}</p>
                      <p className="text-xs text-[var(--color-text-muted)] mt-0.5">{article.category?.name || '未分类'}</p>
                    </td>
                    <td className="px-3 py-3 text-center">
                      <Badge variant={STATUS_MAP[article.status].variant}>
                        {STATUS_MAP[article.status].label}
                      </Badge>
                    </td>
                    <td className="px-3 py-3 text-center text-[var(--color-text-muted)]">{formatNumber(article.viewCount)}</td>
                    <td className="px-3 py-3 text-center text-[var(--color-text-muted)]">{formatNumber(article.likeCount)}</td>
                    <td className="px-3 py-3 text-center text-xs text-[var(--color-text-muted)]">
                      {formatDate(article.publishTime || article.createTime)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <Link href={`/articles/${article.id}`} target="_blank">
                          <button className="p-1.5 rounded-lg text-[var(--color-text-muted)] hover:text-primary-500 hover:bg-[var(--color-bg-card)] transition-colors"><Eye size={14} /></button>
                        </Link>
                        <Link href={`/articles/edit?id=${article.id}`}>
                          <button className="p-1.5 rounded-lg text-[var(--color-text-muted)] hover:text-blue-500 hover:bg-[var(--color-bg-card)] transition-colors"><Edit size={14} /></button>
                        </Link>
                        <button
                          onClick={() => setDeleteId(article.id)}
                          className="p-1.5 rounded-lg text-[var(--color-text-muted)] hover:text-red-500 hover:bg-[var(--color-bg-card)] transition-colors"
                        ><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {data && data.total > 10 && (
        <Pagination page={page} total={data.total} size={10} onChange={setPage} className="mt-4" />
      )}

      {/* Delete Confirm */}
      <Modal
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        title="确认删除"
        footer={
          <>
            <Button variant="ghost" onClick={() => setDeleteId(null)}>取消</Button>
            <Button variant="danger" loading={deleteMutation.isPending} onClick={() => deleteId && deleteMutation.mutate(deleteId)}>确认删除</Button>
          </>
        }
      >
        <p className="text-sm text-[var(--color-text-secondary)]">确定要删除这篇文章吗？此操作不可恢复。</p>
      </Modal>
    </div>
  )
}
