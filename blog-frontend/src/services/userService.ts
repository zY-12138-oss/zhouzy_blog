import api from './api'
import type { User, UserProfile, UpdateProfileDTO, ChangePasswordDTO } from '@/types'
import { API_ENDPOINTS } from '@/config/api'

export const userService = {
  async getUserInfo(): Promise<UserProfile> {
    const res = await api.get(API_ENDPOINTS.USER_INFO)
    return res.data.data
  },

  async updateProfile(data: UpdateProfileDTO): Promise<User> {
    const res = await api.put(API_ENDPOINTS.USER_PROFILE, data)
    return res.data.data
  },

  async uploadAvatar(file: File): Promise<string> {
    const formData = new FormData()
    formData.append('file', file)
    const res = await api.post(API_ENDPOINTS.USER_AVATAR, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return res.data.data.fileUrl
  },

  async changePassword(data: ChangePasswordDTO): Promise<void> {
    await api.put(API_ENDPOINTS.USER_PASSWORD, data)
  },
}
