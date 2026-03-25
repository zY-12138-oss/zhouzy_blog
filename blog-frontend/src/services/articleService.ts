import api from './api'
import type {
  Article,
  ArticleListItem,
  CreateArticleDTO,
  UpdateArticleDTO,
  ArticleQuery,
  Draft,
  PageResult,
  Category,
  Tag,
} from '@/types'
import { API_ENDPOINTS } from '@/config/api'

export const articleService = {
  async getArticles(query?: ArticleQuery): Promise<PageResult<ArticleListItem>> {
    const res = await api.get(API_ENDPOINTS.ARTICLES, { params: query })
    return res.data.data
  },

  async getArticleById(id: string): Promise<Article> {
    const res = await api.get(API_ENDPOINTS.ARTICLE_DETAIL(id))
    return res.data.data
  },

  async createArticle(data: CreateArticleDTO): Promise<Article> {
    const res = await api.post(API_ENDPOINTS.ARTICLES, data)
    return res.data.data
  },

  async updateArticle(id: string, data: UpdateArticleDTO): Promise<Article> {
    const res = await api.put(API_ENDPOINTS.ARTICLE_DETAIL(id), data)
    return res.data.data
  },

  async deleteArticle(id: string): Promise<void> {
    await api.delete(API_ENDPOINTS.ARTICLE_DETAIL(id))
  },

  async publishArticle(id: string): Promise<void> {
    await api.post(API_ENDPOINTS.ARTICLE_PUBLISH(id))
  },

  async getMyArticles(query?: ArticleQuery): Promise<PageResult<ArticleListItem>> {
    const res = await api.get(API_ENDPOINTS.MY_ARTICLES, { params: query })
    return res.data.data
  },

  async getDrafts(): Promise<Draft[]> {
    const res = await api.get(API_ENDPOINTS.DRAFTS)
    return res.data.data
  },

  async likeArticle(id: string): Promise<void> {
    await api.post(API_ENDPOINTS.LIKE_ARTICLE(id))
  },

  async unlikeArticle(id: string): Promise<void> {
    await api.delete(API_ENDPOINTS.LIKE_ARTICLE(id))
  },

  async getCategories(): Promise<Category[]> {
    const res = await api.get(API_ENDPOINTS.CATEGORIES)
    return res.data.data
  },

  async getTags(): Promise<Tag[]> {
    const res = await api.get(API_ENDPOINTS.TAGS)
    return res.data.data
  },

  async getArticlesByCategory(slug: string, query?: ArticleQuery): Promise<PageResult<ArticleListItem>> {
    const res = await api.get(API_ENDPOINTS.CATEGORY_BY_SLUG(slug), { params: query })
    return res.data.data
  },

  async getArticlesByTag(slug: string, query?: ArticleQuery): Promise<PageResult<ArticleListItem>> {
    const res = await api.get(API_ENDPOINTS.TAG_BY_SLUG(slug), { params: query })
    return res.data.data
  },

  async searchArticles(keyword: string, page = 1): Promise<PageResult<ArticleListItem>> {
    const res = await api.get(API_ENDPOINTS.SEARCH, { params: { keyword, page } })
    return res.data.data
  },
}
