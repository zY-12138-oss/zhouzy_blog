export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'zhouzy的博客',
  description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION || '技术博客，分享编程与生活',
  author: process.env.NEXT_PUBLIC_AUTHOR_NAME || 'zhouzy',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  icp: '',
  since: 2024,
  github: 'https://github.com/zhouzy',
  avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=zhouzy',
  signature: '热爱技术，热爱生活',
  location: '中国',
} as const
