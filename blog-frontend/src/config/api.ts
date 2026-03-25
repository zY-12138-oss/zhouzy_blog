export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api'

export const API_TIMEOUT = 10000

export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  REFRESH: '/auth/refresh',

  // User
  USER_INFO: '/user/info',
  USER_PROFILE: '/user/profile',
  USER_AVATAR: '/user/avatar',
  USER_PASSWORD: '/user/password',

  // Articles
  ARTICLES: '/articles',
  ARTICLE_DETAIL: (id: string) => `/articles/${id}`,
  ARTICLE_PUBLISH: (id: string) => `/articles/${id}/publish`,
  MY_ARTICLES: '/articles/my',
  DRAFTS: '/articles/drafts',

  // Categories & Tags
  CATEGORIES: '/categories',
  TAGS: '/tags',
  CATEGORY_BY_SLUG: (slug: string) => `/category/${slug}`,
  TAG_BY_SLUG: (slug: string) => `/tag/${slug}`,

  // Comments
  COMMENTS: '/comments',
  ARTICLE_COMMENTS: (articleId: string) => `/comments/article/${articleId}`,
  DELETE_COMMENT: (id: string) => `/comments/${id}`,

  // Likes
  LIKE_ARTICLE: (id: string) => `/articles/${id}/like`,

  // Analytics
  ANALYTICS_OVERVIEW: '/analytics/overview',
  ANALYTICS_VIEWS_TREND: '/analytics/views/trend',
  ANALYTICS_ARTICLE_RANK: '/analytics/article/rank',
  ANALYTICS_GEO: '/analytics/geo',
  ANALYTICS_TRACK: '/analytics/track',

  // Upload
  UPLOAD: '/upload',

  // AI
  AI_SUGGEST: '/ai/suggest',
  AI_CHAT: '/ai/chat',

  // Other
  SEARCH: '/search',
  FRIEND_LINKS: '/friend-links',
  MESSAGES: '/messages',
} as const
