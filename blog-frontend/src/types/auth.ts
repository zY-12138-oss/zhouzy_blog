export interface LoginDTO {
  username: string
  password: string
  remember?: boolean
}

export interface RegisterDTO {
  username: string
  nickname: string
  email: string
  password: string
  confirmPassword: string
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
  expiresIn: number
}

export interface LoginResponse {
  user: import('./user').User
  tokens: AuthTokens
}
