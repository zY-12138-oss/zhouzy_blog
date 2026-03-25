export interface AnalyticsOverview {
  totalArticles: number
  totalViews: number
  totalLikes: number
  totalComments: number
  totalUsers: number
  todayViews: number
  todayLikes: number
}

export interface DailyStats {
  date: string
  pv: number
  uv: number
  likeCount: number
  commentCount: number
}

export interface ArticleRank {
  id: string
  title: string
  viewCount: number
  likeCount: number
  commentCount: number
}

export interface GeoStats {
  name: string
  value: number
}

export interface TrackEventDTO {
  type: 'pageview' | 'like' | 'comment' | 'share'
  targetId?: string
  url?: string
  extra?: Record<string, unknown>
}
