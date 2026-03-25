import { create } from 'zustand'
import type { ArticleListItem, ArticleQuery } from '@/types'

interface ArticleState {
  articles: ArticleListItem[]
  total: number
  page: number
  size: number
  query: ArticleQuery
  isLoading: boolean
  setArticles: (articles: ArticleListItem[], total: number) => void
  setPage: (page: number) => void
  setQuery: (query: Partial<ArticleQuery>) => void
  setLoading: (loading: boolean) => void
  resetQuery: () => void
}

const DEFAULT_QUERY: ArticleQuery = {
  page: 1,
  size: 12,
  sortBy: 'createTime',
  sortOrder: 'desc',
}

export const useArticleStore = create<ArticleState>()((set) => ({
  articles: [],
  total: 0,
  page: 1,
  size: 12,
  query: DEFAULT_QUERY,
  isLoading: false,

  setArticles: (articles, total) => set({ articles, total }),
  setPage: (page) => set((state) => ({ page, query: { ...state.query, page } })),
  setQuery: (query) => set((state) => ({ query: { ...state.query, ...query } })),
  setLoading: (isLoading) => set({ isLoading }),
  resetQuery: () => set({ query: DEFAULT_QUERY, page: 1 }),
}))
