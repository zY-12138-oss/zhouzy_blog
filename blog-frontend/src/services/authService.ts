import api from './api'
import type { LoginDTO, RegisterDTO, AuthTokens, LoginResponse } from '@/types'
import { API_ENDPOINTS } from '@/config/api'
import { setToken, setRefreshToken, removeToken } from '@/utils/storage'

export const authService = {
  async login(data: LoginDTO): Promise<LoginResponse> {
    const res = await api.post(API_ENDPOINTS.LOGIN, data)
    const raw = res.data.data
    // 适配后端返回结构: { accessToken, refreshToken, tokenType, expiresIn, userInfo }
    setToken(raw.accessToken)
    setRefreshToken(raw.refreshToken)
    // 转换为前端 LoginResponse 格式
    const result: LoginResponse = {
      user: {
        ...raw.userInfo,
        id: String(raw.userInfo.id),
        roles: raw.userInfo.roleCode ? [raw.userInfo.roleCode] : [],
        updateTime: raw.userInfo.updateTime || raw.userInfo.createTime,
      },
      tokens: {
        accessToken: raw.accessToken,
        refreshToken: raw.refreshToken,
        expiresIn: raw.expiresIn,
      },
    }
    return result
  },

  async register(data: RegisterDTO): Promise<void> {
    await api.post(API_ENDPOINTS.REGISTER, data)
  },

  async logout(): Promise<void> {
    try {
      await api.post(API_ENDPOINTS.LOGOUT)
    } finally {
      removeToken()
    }
  },

  async refreshToken(refreshToken: string): Promise<AuthTokens> {
    const res = await api.post(API_ENDPOINTS.REFRESH, { refreshToken })
    return res.data.data
  },
}
