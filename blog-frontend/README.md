# zhouzy 博客系统 - 前端

基于 **Next.js 14 + React 18 + TypeScript + TailwindCSS** 构建的现代博客前端系统。

## 技术栈

- **框架**: Next.js 14 (App Router)
- **UI**: React 18 + TailwindCSS
- **语言**: TypeScript (严格模式)
- **状态管理**: Zustand
- **数据获取**: TanStack Query (React Query)
- **HTTP**: Axios
- **编辑器**: Vditor (Markdown)
- **主题**: next-themes (亮色/暗色)
- **表单**: React Hook Form
- **图标**: Lucide React
- **字体**: Sora + Noto Sans SC + JetBrains Mono

## 快速开始

### 环境要求
- Node.js 18+
- pnpm (推荐) 或 npm

### 安装依赖

```bash
pnpm install
```

### 配置环境变量

```bash
cp .env.example .env.local
# 修改 .env.local 中的 API 地址等配置
```

### 启动开发服务器

```bash
pnpm dev
```

访问 http://localhost:3000

### 构建生产版本

```bash
pnpm build
pnpm start
```

## 项目结构

```
src/
├── app/                    # Next.js App Router 页面
│   ├── (auth)/             # 登录/注册
│   ├── (main)/             # 主内容页面
│   └── (dashboard)/        # 用户中心
├── components/             # 可复用组件
│   ├── common/             # 通用组件 (Button, Input, Badge...)
│   ├── Header/             # 导航头部
│   ├── Sidebar/            # 侧边栏
│   ├── Footer/             # 页脚
│   ├── ArticleCard/        # 文章卡片
│   ├── ArticleDetail/      # 文章详情子组件
│   └── MarkdownEditor/     # Markdown 编辑器
├── services/               # API 服务层
├── store/                  # Zustand 状态管理
├── types/                  # TypeScript 类型定义
├── utils/                  # 工具函数
├── config/                 # 配置文件
└── layouts/                # 页面布局
```

## 主要页面

| 路由 | 说明 |
|------|------|
| `/` | 首页（文章列表） |
| `/articles/[id]` | 文章详情 |
| `/articles/edit` | 文章编辑器 |
| `/category/[slug]` | 分类文章列表 |
| `/tag/[slug]` | 标签文章列表 |
| `/categories` | 全部分类 |
| `/tags` | 全部标签 |
| `/messages` | 留言板 |
| `/links` | 友情链接 |
| `/about` | 关于 |
| `/login` | 登录 |
| `/register` | 注册 |
| `/dashboard` | 用户仪表盘 |
| `/dashboard/profile` | 个人资料 |
| `/dashboard/articles` | 我的文章 |
| `/dashboard/drafts` | 草稿箱 |

## 环境变量说明

| 变量名 | 说明 | 默认值 |
|--------|------|--------|
| `NEXT_PUBLIC_API_BASE_URL` | 后端 API 地址 | `http://localhost:8080/api` |
| `NEXT_PUBLIC_SITE_URL` | 网站地址 | `http://localhost:3000` |
| `NEXT_PUBLIC_SITE_NAME` | 网站名称 | `zhouzy的博客` |
| `NEXT_PUBLIC_AUTHOR_NAME` | 作者名称 | `zhouzy` |

## 部署

推荐部署到 **Vercel**：

```bash
npx vercel deploy
```

## 后端项目

配套后端：Spring Boot 3 + MyBatis-Plus + MySQL 8 + Redis 7

---

© 2024-2026 zhouzy博客. All rights reserved.
