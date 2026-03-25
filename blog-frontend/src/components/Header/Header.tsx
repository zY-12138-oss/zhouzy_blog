'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import {
  Sun, Moon, Monitor, Search, Menu, X, PenSquare,
  LayoutDashboard, LogOut, User, Rss
} from 'lucide-react'
import { clsx } from 'clsx'
import { useAuthStore } from '@/store/useAuthStore'
import { useUIStore } from '@/store/useUIStore'
import { authService } from '@/services/authService'
import { NAV_LINKS } from '@/config/constants'
import Button from '@/components/common/Button'
import toast from 'react-hot-toast'

export default function Header() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const { user, isAuthenticated, logout } = useAuthStore()
  const { mobileMenuOpen, setMobileMenuOpen, setSearchOpen } = useUIStore()
  const [scrolled, setScrolled] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = async () => {
    try {
      await authService.logout()
      logout()
      toast.success('已退出登录')
    } catch {
      logout()
    }
    setUserMenuOpen(false)
  }

  const themeIcon = !mounted ? <Monitor size={17} />
    : theme === 'dark' ? <Sun size={17} />
    : theme === 'light' ? <Moon size={17} />
    : <Monitor size={17} />

  const nextTheme = theme === 'dark' ? 'light' : theme === 'light' ? 'system' : 'dark'

  return (
    <>
      <header
        className={clsx(
          'fixed top-0 left-0 right-0 z-40 h-16 transition-all duration-300',
          scrolled
            ? 'glass shadow-md'
            : 'bg-[var(--color-bg)]/80 backdrop-blur-sm'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-lg shrink-0">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-sm font-black">Z</span>
            <span className="hidden sm:block text-gradient font-display">zhouzy</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 ml-4 flex-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  'px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-150',
                  pathname === link.href
                    ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400'
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-subtle)]'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 ml-auto">
            {/* Search */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 rounded-lg text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-subtle)] hover:text-[var(--color-text-primary)] transition-colors"
              aria-label="搜索"
            >
              <Search size={17} />
            </button>

            {/* Theme */}
            <button
              onClick={() => setTheme(nextTheme)}
              className="p-2 rounded-lg text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-subtle)] hover:text-[var(--color-text-primary)] transition-colors"
              aria-label="切换主题"
            >
              {themeIcon}
            </button>

            {/* RSS */}
            <Link
              href="/feed"
              className="hidden sm:flex p-2 rounded-lg text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-subtle)] hover:text-amber-500 transition-colors"
              aria-label="RSS订阅"
            >
              <Rss size={17} />
            </Link>

            {/* Auth */}
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-xl hover:bg-[var(--color-bg-subtle)] transition-colors"
                >
                  <img
                    src={user.avatar || `https://api.dicebear.com/7.x/notionists/svg?seed=${user.username}`}
                    alt={user.nickname}
                    className="w-7 h-7 rounded-full object-cover ring-2 ring-primary-200 dark:ring-primary-800"
                  />
                  <span className="hidden sm:block text-sm font-medium text-[var(--color-text-primary)] max-w-[80px] truncate">
                    {user.nickname}
                  </span>
                </button>

                {userMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setUserMenuOpen(false)} />
                    <div className="absolute right-0 top-full mt-2 w-48 bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl shadow-[var(--shadow-dropdown)] z-20 overflow-hidden animate-slide-down">
                      <Link
                        href="/dashboard"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-subtle)] hover:text-[var(--color-text-primary)] transition-colors"
                      >
                        <LayoutDashboard size={15} /> 控制台
                      </Link>
                      <Link
                        href="/dashboard/profile"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-subtle)] hover:text-[var(--color-text-primary)] transition-colors"
                      >
                        <User size={15} /> 个人资料
                      </Link>
                      <Link
                        href="/articles/edit"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-subtle)] hover:text-[var(--color-text-primary)] transition-colors"
                      >
                        <PenSquare size={15} /> 写文章
                      </Link>
                      <div className="border-t border-[var(--color-border)] my-1" />
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      >
                        <LogOut size={15} /> 退出登录
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm">登录</Button>
                </Link>
                <Link href="/register">
                  <Button size="sm">注册</Button>
                </Link>
              </div>
            )}

            {/* Mobile menu toggle */}
            <button
              className="lg:hidden p-2 rounded-lg text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-subtle)] transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="菜单"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileMenuOpen(false)} />
          <div className="absolute top-16 left-0 right-0 bg-[var(--color-bg-card)] border-b border-[var(--color-border)] shadow-lg animate-slide-down">
            <nav className="flex flex-col p-4 gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={clsx(
                    'px-4 py-2.5 rounded-lg text-sm font-medium transition-colors',
                    pathname === link.href
                      ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400'
                      : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-subtle)]'
                  )}
                >
                  {link.label}
                </Link>
              ))}
              {!isAuthenticated && (
                <div className="flex gap-2 pt-2 border-t border-[var(--color-border)] mt-2">
                  <Link href="/login" className="flex-1" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" fullWidth>登录</Button>
                  </Link>
                  <Link href="/register" className="flex-1" onClick={() => setMobileMenuOpen(false)}>
                    <Button fullWidth>注册</Button>
                  </Link>
                </div>
              )}
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
