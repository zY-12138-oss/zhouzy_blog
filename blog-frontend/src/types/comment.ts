import type { User } from './user'

export interface Comment {
  id: string
  articleId: string
  userId: string
  parentId?: string
  rootId?: string
  content: string
  likeCount: number
  status: 0 | 1 | 2
  createTime: string
  updateTime: string
  author: User
  replies?: Comment[]
  replyCount?: number
  isLiked?: boolean
}

export interface CreateCommentDTO {
  articleId: string
  content: string
  parentId?: string
  rootId?: string
}

export interface CommentQuery {
  articleId: string
  page?: number
  size?: number
  sortBy?: 'createTime' | 'likeCount'
  sortOrder?: 'asc' | 'desc'
}
