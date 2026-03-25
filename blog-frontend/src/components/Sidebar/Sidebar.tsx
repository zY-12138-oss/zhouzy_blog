'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import {
  Home, Folder, Tag, Archive, MessageSquare,
  Link2, Info, Github, ChevronDown, ChevronRight,
  TrendingUp, Clock, Hash
} from 'lucide-react'
import { clsx } from 'clsx'
import { useAuthStore } from '@/store/useAuthStore'
import { siteConfig } from '@/config/site'

const navItems = [
  { label: '首页', href: '/', icon: Home },
  { label: '分类', href: '/categories', icon: Folder },
  { label: '标签', href: '/tags', icon: Tag },
  { label: '归档', href: '/archive', icon: Archive },
  { label: '留言板', href: '/messages', icon: MessageSquare },
  { label: '友链', href: '/links', icon: Link2 },
  { label: '关于', href: '/about', icon: Info },
]

export function UserCard() {
  const { user } = useAuthStore()
  const displayUser = user || {
    nickname: siteConfig.author,
    username: 'zhouzy',
    avatar: siteConfig.avatar,
    signature: siteConfig.signature,
    location: siteConfig.location,
    github: siteConfig.github,
  }

  return (
    <div className="card p-5 text-center">
      <div className="relative inline-block mb-3">
        <img
          src={displayUser.avatar || `https://api.dicebear.com/7.x/notionists/svg?seed=${displayUser.username}`}
          alt={displayUser.nickname}
          className="w-20 h-20 rounded-2xl object-cover ring-4 ring-[var(--color-primary-light)] mx-auto"
        />
        <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-[var(--color-bg-card)]" />
      </div>
      <h3 className="font-bold text-lg text-[var(--color-text-primary)] mb-0.5">{displayUser.nickname}</h3>
      <p className="text-xs text-primary-500 font-medium mb-2">@{displayUser.username}</p>
      {displayUser.signature && (
        <p className="text-xs text-[var(--color-text-muted)] leading-relaxed mb-3">
          {displayUser.signature}
        </p>
      )}
      {(displayUser as { location?: string }).location && (
        <p className="text-xs text-[var(--color-text-muted)] mb-3">
          📍 {(displayUser as { location?: string }).location}
        </p>
      )}
      <div className="flex justify-center gap-3">
        {displayUser.github && (
          <a
            href={displayUser.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-[var(--color-bg-subtle)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
          >
            <Github size={15} />
          </a>
        )}
      </div>
    </div>
  )
}

export default function Sidebar() {
  const pathname = usePathname()
  const [navOpen, setNavOpen] = useState(true)

  return (
    <aside className="flex flex-col gap-4 w-full">
      <UserCard />

      {/* Navigation */}
      <div className="card overflow-hidden">
        <button
          className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-subtle)] transition-colors"
          onClick={() => setNavOpen(!navOpen)}
        >
          <span className="flex items-center gap-2"><Hash size={14} /> 导航</span>
          {navOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </button>
        {navOpen && (
          <nav className="px-2 pb-2">
            {navItems.map(({ label, href, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={clsx(
                  'flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-150',
                  pathname === href
                    ? 'bg-primary-50 text-primary-600 font-medium dark:bg-primary-900/30 dark:text-primary-400'
                    : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-subtle)] hover:text-[var(--color-text-primary)]'
                )}
              >
                <Icon size={15} />
                {label}
              </Link>
            ))}
          </nav>
        )}
      </div>

      {/* Site info */}
      <div className="card p-4 text-center">
        <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
          © {new Date().getFullYear()} {siteConfig.name}
          <br />
          <span className="text-primary-400">用文字记录思考与成长</span>
        </p>
      </div>
    </aside>
  )
}
