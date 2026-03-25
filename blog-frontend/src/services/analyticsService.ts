import api from './api'
import type {
  AnalyticsOverview,
  DailyStats,
  ArticleRank,
  GeoStats,
  TrackEventDTO,
} from '@/types'
import { API_ENDPOINTS } from '@/config/api'

export const analyticsService = {
  async getOverview(): Promise<AnalyticsOverview> {
    const res = await api.get(API_ENDPOINTS.ANALYTICS_OVERVIEW)
    return res.data.data
  },

  async getViewsTrend(days = 30): Promise<DailyStats[]> {
    const res = await api.get(API_ENDPOINTS.ANALYTICS_VIEWS_TREND, { params: { days } })
    return res.data.data
  },

  async getArticleRank(limit = 10): Promise<ArticleRank[]> {
    const res = await api.get(API_ENDPOINTS.ANALYTICS_ARTICLE_RANK, { params: { limit } })
    return res.data.data
  },

  async getGeoStats(): Promise<GeoStats[]> {
    const res = await api.get(API_ENDPOINTS.ANALYTICS_GEO)
    return res.data.data
  },

  async trackEvent(data: TrackEventDTO): Promise<void> {
    try {
      await api.post(API_ENDPOINTS.ANALYTICS_TRACK, data)
    } catch {
      // Silent fail for analytics
    }
  },
}
