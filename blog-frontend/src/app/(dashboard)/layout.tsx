'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard, User, FileText, FileEdit,
  BarChart2, Settings, LogOut, PenSquare
} from 'lucide-react'
import { clsx } from 'clsx'
import { useAuthStore } from '@/store/useAuthStore'
import { authService } from '@/services/authService'
import Button from '@/components/common/Button'
import Header from '@/components/Header/Header'
import toast from 'react-hot-toast'

const menuItems = [
  { label: '仪表盘', href: '/dashboard', icon: LayoutDashboard },
  { label: '个人资料', href: '/dashboard/profile', icon: User },
  { label: '我的文章', href: '/dashboard/articles', icon: FileText },
  { label: '草稿箱', href: '/dashboard/drafts', icon: FileEdit },
  { label: '数据分析', href: '/dashboard/analytics', icon: BarChart2 },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const { user, isAuthenticated, logout } = useAuthStore()

  if (!isAuthenticated) {
    if (typeof window !== 'undefined') router.push('/login')
    return null
  }

  const handleLogout = async () => {
    try { await authService.logout() } catch { /* ignore */ }
    logout()
    toast.success('已退出登录')
    router.push('/')
  }

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg)]">
      <Header />
      <div className="flex flex-1 pt-16 max-w-7xl mx-auto w-full px-4 sm:px-6 gap-6 py-6">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-56 shrink-0">
          <div className="card p-4 sticky top-20">
            {/* User info */}
            <div className="flex items-center gap-3 pb-4 mb-3 border-b border-[var(--color-border)]">
              <img
                src={user?.avatar || `https://api.dicebear.com/7.x/notionists/svg?seed=${user?.username}`}
                alt={user?.nickname}
                className="w-10 h-10 rounded-xl object-cover"
              />
              <div className="min-w-0">
                <p className="font-semibold text-sm text-[var(--color-text-primary)] truncate">{user?.nickname}</p>
                <p className="text-xs text-[var(--color-text-muted)] truncate">@{user?.username}</p>
              </div>
            </div>

            {/* New Article Button */}
            <Link href="/articles/edit" className="block mb-3">
              <Button size="sm" fullWidth icon={<PenSquare size={14} />}>写文章</Button>
            </Link>

            {/* Navigation */}
            <nav className="space-y-0.5">
              {menuItems.map(({ label, href, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className={clsx(
                    'flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all',
                    pathname === href
                      ? 'bg-primary-50 text-primary-600 font-medium dark:bg-primary-900/30 dark:text-primary-400'
                      : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-subtle)]'
                  )}
                >
                  <Icon size={15} /> {label}
                </Link>
              ))}
            </nav>

            {/* Logout */}
            <div className="pt-3 mt-3 border-t border-[var(--color-border)]">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              >
                <LogOut size={15} /> 退出登录
              </button>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  )
}
