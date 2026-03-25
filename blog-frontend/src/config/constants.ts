export const PAGE_SIZE = 12
export const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']

export const TOKEN_KEY = 'blog_access_token'
export const REFRESH_TOKEN_KEY = 'blog_refresh_token'
export const THEME_KEY = 'blog_theme'
export const LOCALE_KEY = 'blog_locale'
export const DRAFT_KEY = 'blog_draft'

export const ROLES = {
  ADMIN: 'ROLE_ADMIN',
  USER: 'ROLE_USER',
} as const

export const ARTICLE_STATUS = {
  DRAFT: 0,
  PUBLISHED: 1,
  UNPUBLISHED: 2,
} as const

export const COMMENT_STATUS = {
  PENDING: 0,
  APPROVED: 1,
  REJECTED: 2,
} as const

export const SORT_OPTIONS = [
  { label: '最新', value: 'createTime' },
  { label: '最热', value: 'viewCount' },
  { label: '最多点赞', value: 'likeCount' },
  { label: '最多评论', value: 'commentCount' },
] as const

export const NAV_LINKS = [
  { label: '首页', href: '/', icon: 'Home' },
  { label: '分类', href: '/categories', icon: 'Folder' },
  { label: '标签', href: '/tags', icon: 'Tag' },
  { label: '归档', href: '/archive', icon: 'Archive' },
  { label: '留言板', href: '/messages', icon: 'MessageSquare' },
  { label: '友链', href: '/links', icon: 'Link' },
  { label: '关于', href: '/about', icon: 'User' },
] as const
