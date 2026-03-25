export interface PageResult<T> {
  records: T[]
  total: number
  page: number
  size: number
  pages: number
}

export interface ApiResponse<T = unknown> {
  code: number
  message: string
  data: T
  timestamp: number
}

export interface FriendLink {
  id: string
  name: string
  url: string
  avatar?: string
  description?: string
  sort: number
  status: 0 | 1
}

export interface Message {
  id: string
  userId?: string
  nickname?: string
  content: string
  status: 0 | 1
  createTime: string
  author?: import('./user').User
}

export interface FileInfo {
  id: string
  fileName: string
  fileUrl: string
  fileSize: number
  fileType?: string
  createTime: string
}

export type ThemeMode = 'light' | 'dark' | 'system'

export interface SiteConfig {
  name: string
  description: string
  author: string
  url: string
  icp?: string
  since?: number
}
