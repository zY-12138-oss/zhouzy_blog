import { siteConfig } from '@/config/site'
import { Github, Mail, MapPin, Calendar } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <div className="card p-8 text-center mb-8">
        <img
          src={siteConfig.avatar}
          alt={siteConfig.author}
          className="w-24 h-24 rounded-2xl object-cover mx-auto mb-4 ring-4 ring-primary-100 dark:ring-primary-900"
        />
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-1">{siteConfig.author}</h1>
        <p className="text-[var(--color-text-muted)] mb-4">{siteConfig.description}</p>
        <div className="flex items-center justify-center gap-6 text-sm text-[var(--color-text-muted)]">
          <span className="flex items-center gap-1.5"><MapPin size={14} />{siteConfig.location}</span>
          <span className="flex items-center gap-1.5"><Calendar size={14} />写作于 {siteConfig.since}</span>
        </div>
        <div className="flex items-center justify-center gap-3 mt-5">
          <a href={siteConfig.github} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--color-bg-subtle)] text-sm hover:text-primary-500 transition-colors">
            <Github size={16} /> GitHub
          </a>
          <a href={`mailto:admin@zhouzy.com`}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--color-bg-subtle)] text-sm hover:text-primary-500 transition-colors">
            <Mail size={16} /> 邮件
          </a>
        </div>
      </div>

      <div className="card p-8 prose-blog">
        <h2>关于本站</h2>
        <p>这是一个基于 <strong>Next.js 14</strong> + <strong>Spring Boot 3</strong> 构建的现代全栈博客系统。</p>
        <p>前端采用 React 18 + TypeScript + TailwindCSS，后端采用 Spring Boot + MyBatis-Plus + MySQL + Redis，追求高性能与优雅的开发体验。</p>
        <h2>技术栈</h2>
        <ul>
          <li>前端：Next.js 14、React 18、TypeScript、TailwindCSS、Zustand</li>
          <li>后端：Spring Boot 3、MyBatis-Plus、MySQL 8、Redis 7</li>
          <li>部署：Vercel（前端）+ 云服务器（后端）</li>
        </ul>
        <h2>联系我</h2>
        <p>如果你有任何问题或合作意向，欢迎通过邮件或 GitHub 联系我。</p>
      </div>
    </div>
  )
}
