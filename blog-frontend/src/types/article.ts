import type { User } from './user'

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  sort: number
  articleCount?: number
}

export interface Tag {
  id: string
  name: string
  slug: string
  articleCount?: number
}

export type ArticleStatus = 0 | 1 | 2

export interface Article {
  id: string
  userId: string
  title: string
  summary?: string
  contentMd?: string
  contentHtml?: string
  cover?: string
  categoryId?: string
  category?: Category
  tags?: Tag[]
  status: ArticleStatus
  isTop: 0 | 1
  allowComment: 0 | 1
  viewCount: number
  likeCount: number
  commentCount: number
  publishTime?: string
  createTime: string
  updateTime: string
  author?: User
  isLiked?: boolean
  wordCount?: number
  readingTime?: number
}

export interface ArticleListItem {
  id: string
  title: string
  summary?: string
  cover?: string
  category?: Category
  tags?: Tag[]
  status: ArticleStatus
  isTop: 0 | 1
  viewCount: number
  likeCount: number
  commentCount: number
  publishTime?: string
  createTime: string
  author?: User
  wordCount?: number
  readingTime?: number
}

export interface CreateArticleDTO {
  title: string
  summary?: string
  contentMd: string
  contentHtml?: string
  cover?: string
  categoryId?: string
  tagIds?: string[]
  status: ArticleStatus
  isTop?: 0 | 1
  allowComment?: 0 | 1
}

export interface UpdateArticleDTO extends Partial<CreateArticleDTO> {
  id: string
}

export interface ArticleQuery {
  page?: number
  size?: number
  keyword?: string
  categoryId?: string
  tagId?: string
  status?: ArticleStatus
  sortBy?: 'createTime' | 'viewCount' | 'likeCount' | 'commentCount'
  sortOrder?: 'asc' | 'desc'
}

export interface Draft {
  id: string
  userId: string
  title?: string
  contentMd?: string
  summary?: string
  categoryId?: string
  cover?: string
  createTime: string
  updateTime: string
}
