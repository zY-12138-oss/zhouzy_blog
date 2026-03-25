import api from './api'
import type { Comment, CreateCommentDTO, CommentQuery, PageResult } from '@/types'
import { API_ENDPOINTS } from '@/config/api'

export const commentService = {
  async getComments(query: CommentQuery): Promise<PageResult<Comment>> {
    const res = await api.get(API_ENDPOINTS.ARTICLE_COMMENTS(query.articleId), {
      params: { page: query.page, size: query.size, sortBy: query.sortBy },
    })
    return res.data.data
  },

  async createComment(data: CreateCommentDTO): Promise<Comment> {
    const res = await api.post(API_ENDPOINTS.COMMENTS, data)
    return res.data.data
  },

  async deleteComment(id: string): Promise<void> {
    await api.delete(API_ENDPOINTS.DELETE_COMMENT(id))
  },

  async likeComment(id: string): Promise<void> {
    await api.post(`/comments/${id}/like`)
  },
}
