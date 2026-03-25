import { create } from 'zustand'

interface UIState {
  sidebarOpen: boolean
  searchOpen: boolean
  mobileMenuOpen: boolean
  aiChatOpen: boolean
  setSidebarOpen: (open: boolean) => void
  setSearchOpen: (open: boolean) => void
  setMobileMenuOpen: (open: boolean) => void
  setAiChatOpen: (open: boolean) => void
  toggleSidebar: () => void
  toggleSearch: () => void
  toggleMobileMenu: () => void
  toggleAiChat: () => void
}

export const useUIStore = create<UIState>()((set) => ({
  sidebarOpen: true,
  searchOpen: false,
  mobileMenuOpen: false,
  aiChatOpen: false,

  setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
  setSearchOpen: (searchOpen) => set({ searchOpen }),
  setMobileMenuOpen: (mobileMenuOpen) => set({ mobileMenuOpen }),
  setAiChatOpen: (aiChatOpen) => set({ aiChatOpen }),

  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  toggleSearch: () => set((state) => ({ searchOpen: !state.searchOpen })),
  toggleMobileMenu: () => set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),
  toggleAiChat: () => set((state) => ({ aiChatOpen: !state.aiChatOpen })),
}))
