export interface User {
  id: string
  username: string
  nickname: string
  email: string
  avatar?: string
  signature?: string
  location?: string
  github?: string
  website?: string
  status: 0 | 1
  createTime: string
  updateTime: string
  roles?: string[]
}

export interface UserProfile extends User {
  articleCount?: number
  totalViews?: number
  totalLikes?: number
}

export interface UpdateProfileDTO {
  nickname?: string
  signature?: string
  location?: string
  github?: string
  website?: string
  avatar?: string
}

export interface ChangePasswordDTO {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}
