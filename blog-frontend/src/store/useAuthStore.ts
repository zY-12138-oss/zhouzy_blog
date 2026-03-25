import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '@/types'
import { removeToken } from '@/utils/storage'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
  logout: () => void
  isAdmin: () => boolean
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      setUser: (user) => set({ user, isAuthenticated: !!user }),

      setLoading: (isLoading) => set({ isLoading }),

      logout: () => {
        removeToken()
        set({ user: null, isAuthenticated: false })
      },

      isAdmin: () => {
        const { user } = get()
        return user?.roles?.includes('ROLE_ADMIN') ?? false
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
)
