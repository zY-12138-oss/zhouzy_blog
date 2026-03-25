'use client'

import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { FileText, Eye, Heart, MessageCircle, PenSquare, Edit, Trash2 } from 'lucide-react'
import { analyticsService } from '@/services/analyticsService'
import { articleService } from '@/services/articleService'
import { useAuthStore } from '@/store/useAuthStore'
import { formatNumber, formatDate } from '@/utils/format'
import { Skeleton } from '@/components/common/Skeleton'
import Button from '@/components/common/Button'

function StatCard({ label, value, icon, color }: { label: string; value: number; icon: React.ReactNode; color: string }) {
  return (
    <div className="card p-5">
      <div className="flex items-center justify-between mb-3">
        <div className={`p-2.5 rounded-xl ${color}`}>{icon}</div>
      </div>
      <p className="text-2xl font-bold text-[var(--color-text-primary)]">{formatNumber(value)}</p>
      <p className="text-sm text-[var(--color-text-muted)] mt-0.5">{label}</p>
    </div>
  )
}

export default function DashboardPage() {
  const { user } = useAuthStore()

  const { data: overview, isLoading: overviewLoading } = useQuery({
    queryKey: ['analytics-overview'],
    queryFn: () => analyticsService.getOverview(),
  })

  const { data: myArticles, isLoading: articlesLoading } = useQuery({
    queryKey: ['my-articles', 1],
    queryFn: () => articleService.getMyArticles({ page: 1, size: 5, sortBy: 'createTime', sortOrder: 'desc' }),
  })

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">
            你好，{user?.nickname} 👋
          </h1>
          <p className="text-[var(--color-text-muted)] text-sm mt-1">欢迎回到你的创作中心</p>
        </div>
        <Link href="/articles/edit">
          <Button icon={<PenSquare size={15} />}>写文章</Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {overviewLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="card p-5"><Skeleton className="h-16 w-full" /></div>
          ))
        ) : (
          <>
            <StatCard label="文章总数" value={overview?.totalArticles || 0} icon={<FileText size={18} className="text-blue-500" />} color="bg-blue-50 dark:bg-blue-900/20" />
            <StatCard label="总浏览量" value={overview?.totalViews || 0} icon={<Eye size={18} className="text-green-500" />} color="bg-green-50 dark:bg-green-900/20" />
            <StatCard label="总点赞数" value={overview?.totalLikes || 0} icon={<Heart size={18} className="text-red-500" />} color="bg-red-50 dark:bg-red-900/20" />
            <StatCard label="总评论数" value={overview?.totalComments || 0} icon={<MessageCircle size={18} className="text-purple-500" />} color="bg-purple-50 dark:bg-purple-900/20" />
          </>
        )}
      </div>

      {/* Recent Articles */}
      <div className="card p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-[var(--color-text-primary)]">最近发布</h2>
          <Link href="/dashboard/articles" className="text-sm text-primary-500 hover:underline">查看全部</Link>
        </div>

        {articlesLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
          </div>
        ) : myArticles?.records.length === 0 ? (
          <div className="text-center py-10 text-[var(--color-text-muted)]">
            <p className="text-3xl mb-2">📝</p>
            <p className="text-sm">还没有发布文章</p>
            <Link href="/articles/edit" className="text-primary-500 text-sm hover:underline">立即创作</Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--color-border)] text-[var(--color-text-muted)]">
                  <th className="text-left py-2 font-medium">标题</th>
                  <th className="text-center py-2 font-medium w-20">浏览</th>
                  <th className="text-center py-2 font-medium w-20">点赞</th>
                  <th className="text-center py-2 font-medium w-20">评论</th>
                  <th className="text-right py-2 font-medium w-24">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border)]">
                {myArticles?.records.map((article) => (
                  <tr key={article.id} className="hover:bg-[var(--color-bg-subtle)] transition-colors">
                    <td className="py-3 pr-4">
                      <Link href={`/articles/${article.id}`} className="font-medium text-[var(--color-text-primary)] hover:text-primary-500 line-clamp-1 transition-colors">
                        {article.title}
                      </Link>
                      <p className="text-xs text-[var(--color-text-muted)] mt-0.5">{formatDate(article.createTime)}</p>
                    </td>
                    <td className="py-3 text-center text-[var(--color-text-muted)]">{formatNumber(article.viewCount)}</td>
                    <td className="py-3 text-center text-[var(--color-text-muted)]">{formatNumber(article.likeCount)}</td>
                    <td className="py-3 text-center text-[var(--color-text-muted)]">{article.commentCount}</td>
                    <td className="py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link href={`/articles/edit?id=${article.id}`}>
                          <button className="p-1.5 rounded-lg hover:bg-[var(--color-bg-card)] text-[var(--color-text-muted)] hover:text-primary-500 transition-colors">
                            <Edit size={14} />
                          </button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
