'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import { Edit, Trash2, FileEdit } from 'lucide-react'
import { articleService } from '@/services/articleService'
import { formatDate } from '@/utils/format'
import { Skeleton } from '@/components/common/Skeleton'
import Button from '@/components/common/Button'
import Modal from '@/components/common/Modal'
import { useState } from 'react'
import toast from 'react-hot-toast'

export default function DraftsPage() {
  const queryClient = useQueryClient()
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const { data: drafts, isLoading } = useQuery({
    queryKey: ['drafts'],
    queryFn: () => articleService.getDrafts(),
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => articleService.deleteArticle(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['drafts'] })
      setDeleteId(null)
      toast.success('草稿已删除')
    },
  })

  return (
    <div className="space-y-5">
      <h1 className="text-xl font-bold text-[var(--color-text-primary)]">草稿箱</h1>

      <div className="card p-5">
        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-16 w-full" />)}
          </div>
        ) : !drafts?.length ? (
          <div className="text-center py-16 text-[var(--color-text-muted)]">
            <p className="text-4xl mb-3">📄</p>
            <p className="text-sm">暂无草稿</p>
            <Link href="/articles/edit" className="text-primary-500 text-sm hover:underline">
              开始写作
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-[var(--color-border)]">
            {drafts.map((draft) => (
              <div key={draft.id} className="flex items-center gap-4 py-4">
                <FileEdit size={18} className="text-[var(--color-text-muted)] shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-[var(--color-text-primary)] truncate">
                    {draft.title || '无标题草稿'}
                  </p>
                  <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                    上次编辑：{formatDate(draft.updateTime, 'YYYY-MM-DD HH:mm')}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Link href={`/articles/edit?id=${draft.id}`}>
                    <Button variant="outline" size="sm" icon={<Edit size={13} />}>继续编辑</Button>
                  </Link>
                  <button
                    onClick={() => setDeleteId(draft.id)}
                    className="p-2 rounded-lg text-[var(--color-text-muted)] hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Modal
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        title="确认删除草稿"
        footer={
          <>
            <Button variant="ghost" onClick={() => setDeleteId(null)}>取消</Button>
            <Button variant="danger" loading={deleteMutation.isPending} onClick={() => deleteId && deleteMutation.mutate(deleteId)}>删除</Button>
          </>
        }
      >
        <p className="text-sm text-[var(--color-text-secondary)]">确定要删除这篇草稿吗？</p>
      </Modal>
    </div>
  )
}
