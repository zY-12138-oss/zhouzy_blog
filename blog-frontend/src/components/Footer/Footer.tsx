import Link from 'next/link'
import { Github, Mail, Heart } from 'lucide-react'
import { siteConfig } from '@/config/site'
import { NAV_LINKS } from '@/config/constants'

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-[var(--color-border)] bg-[var(--color-bg-card)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-sm font-black">Z</span>
              <span className="font-bold text-lg text-gradient">{siteConfig.name}</span>
            </div>
            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
              {siteConfig.description}
            </p>
            <div className="flex items-center gap-3 mt-4">
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-[var(--color-bg-subtle)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
              >
                <Github size={16} />
              </a>
              <a
                href={`mailto:admin@${new URL(siteConfig.url).hostname}`}
                className="p-2 rounded-lg bg-[var(--color-bg-subtle)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold text-[var(--color-text-primary)] mb-3">快速导航</h4>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--color-text-muted)] hover:text-primary-500 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack */}
          <div>
            <h4 className="font-semibold text-[var(--color-text-primary)] mb-3">技术栈</h4>
            <ul className="space-y-2">
              {['Next.js 14', 'React 18', 'TypeScript', 'TailwindCSS', 'Spring Boot'].map((tech) => (
                <li key={tech} className="text-sm text-[var(--color-text-muted)]">{tech}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-[var(--color-text-muted)]">
            © {siteConfig.since}–{new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-xs text-[var(--color-text-muted)] flex items-center gap-1">
            Made with <Heart size={12} className="text-red-400" /> by {siteConfig.author}
          </p>
        </div>
      </div>
    </footer>
  )
}
