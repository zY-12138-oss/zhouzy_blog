'use client'

import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { articleService } from '@/services/articleService'
import { Skeleton } from '@/components/common/Skeleton'

export default function CategoriesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-[var(--color-text-primary)] mb-2">全部分类</h1>
        <p className="text-[var(--color-text-muted)]">按主题浏览文章</p>
      </div>
      <CategoriesList />
    </div>
  )
}

function CategoriesList() {
  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: () => articleService.getCategories(),
  })

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-24" rounded />
        ))}
      </div>
    )
  }

  const colors = [
    'from-blue-400 to-blue-600',
    'from-green-400 to-green-600',
    'from-purple-400 to-purple-600',
    'from-orange-400 to-orange-600',
    'from-pink-400 to-pink-600',
    'from-teal-400 to-teal-600',
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {categories?.map((cat, i) => (
        <Link
          key={cat.id}
          href={`/category/${cat.slug}`}
          className="card p-6 text-center hover:scale-105 transition-transform duration-200 group"
        >
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colors[i % colors.length]} flex items-center justify-center text-white text-xl font-bold mx-auto mb-3`}>
            {cat.name[0]}
          </div>
          <p className="font-semibold text-[var(--color-text-primary)] group-hover:text-primary-500 transition-colors">{cat.name}</p>
          {cat.articleCount !== undefined && (
            <p className="text-xs text-[var(--color-text-muted)] mt-1">{cat.articleCount} 篇</p>
          )}
        </Link>
      ))}
    </div>
  )
}
