# 🚀 博客系统前端完整开发提示词

**项目名称**：zhouzy的博客系统前端
**创建日期**：2026-03-23
**技术栈**：Next.js 14 + React 18 + TypeScript + TailwindCSS

---

## 📋 一、项目概述

你是一名高级前端工程师，负责从零开始构建一个**现代化、功能完整的博客系统前端**。

### 项目目标
- 为用户提供优雅的 Markdown 写作体验
- 支持内容创作、发布、管理、数据分析
- 提供社交互动功能（评论、点赞、评论）
- 集成 AI 助手辅助写作
- 支持国际化和主题切换

### 目标用户
- 技术博主、内容创作者、知识分享者

### 项目特色
1. **Markdown 写作系统** - 所见即所得编辑
2. **AI 助手** - 智能写作辅助
3. **数据分析** - 可视化阅读统计
4. **响应式设计** - PC/平板/手机完美适配
5. **国际化** - 中英文支持
6. **主题切换** - 亮色/暗色主题（可选，待定，可能有其他主题）

---

## 🛠️ 二、技术栈规范

### 核心框架
- **框架**：Next.js 14（App Router）
- **UI 库**：React 18 + Hooks
- **语言**：TypeScript（严格模式）
- **样式**：TailwindCSS + CSS Modules
- **包管理**：pnpm（推荐）或 npm

### 状态管理
- **客户端状态**：Zustand
- **全局 Store**：useAuthStore, useThemeStore, useArticleStore, useUIStore

### API 通信
- **HTTP 客户端**：axios
- **数据获取**：SWR / React Query
- **实时更新**：WebSocket（可选）

### Markdown 编辑与渲染
- **编辑器**：Monaco Editor 或 Vditor
- **渲染**：markdown-it + remark-rehype
- **代码高亮**：Prism.js
- **公式支持**：KaTeX / MathJax
- **图片处理**：next/image

### UI 组件
- **图表库**：ECharts / Recharts
- **弹窗**：自定义 Modal 或 Radix UI
- **表单**：React Hook Form + Zod
- **日期处理**：Day.js

### 国际化
- **i18n 库**：next-i18next
- **语言**：中文（zh-CN）、英文（en-US）

### 主题与暗黑模式
- **主题库**：next-themes
- **CSS 变量**：TailwindCSS dark mode

### 开发工具
- **代码检查**：ESLint
- **代码格式化**：Prettier
- **类型检查**：TypeScript strict mode
- **包管理**：pnpm

### 部署
- **托管平台**：Vercel（推荐）或自建服务器
- **CI/CD**：GitHub Actions

---

## 📁 三、项目目录结构

```
blog-frontend/
├── public/                          # 静态资源
│   ├── images/
│   ├── icons/
│   └── fonts/
│
├── src/
│   ├── app/                         # Next.js App Router
│   │   ├── layout.tsx               # 根布局
│   │   ├── page.tsx                 # 首页
│   │   ├── globals.css              # 全局样式
│   │   ├── (auth)/                  # 认证相关页面
│   │   │   ├── login/page.tsx
│   │   │   ├── register/page.tsx
│   │   │   └── layout.tsx
│   │   ├── (main)/                  # 主内容区
│   │   │   ├── layout.tsx
│   │   │   ├── articles/
│   │   │   │   ├── page.tsx         # 文章列表
│   │   │   │   ├── [id]/page.tsx    # 文章详情
│   │   │   │   └── edit/page.tsx    # 编辑器
│   │   │   ├── category/[slug]/page.tsx
│   │   │   ├── tag/[slug]/page.tsx
│   │   │   ├── messages/page.tsx    # 留言板
│   │   │   ├── links/page.tsx       # 友链
│   │   │   └── about/page.tsx
│   │   ├── (dashboard)/             # 用户中心
│   │   │   ├── layout.tsx
│   │   │   ├── dashboard/page.tsx   # 仪表盘
│   │   │   ├── profile/page.tsx     # 个人资料
│   │   │   ├── articles/page.tsx    # 我的文章
│   │   │   ├── drafts/page.tsx      # 草稿箱
│   │   │   └── analytics/page.tsx   # 数据分析
│   │   └── api/                     # API 路由（可选）
│   │       ├── articles/
│   │       ├── comments/
│   │       └── analytics/
│   │
│   ├── components/                  # 可复用组件
│   │   ├── Header/
│   │   │   ├── Header.tsx
│   │   │   └── Header.module.css
│   │   ├── Sidebar/
│   │   │   ├── Sidebar.tsx
│   │   │   ├── UserCard.tsx
│   │   │   └── Sidebar.module.css
│   │   ├── ArticleCard/
│   │   │   ├── ArticleCard.tsx
│   │   │   └── ArticleCard.module.css
│   │   ├── ArticleList/
│   │   │   ├── ArticleList.tsx
│   │   │   └── ArticleList.module.css
│   │   ├── CommentList/
│   │   │   ├── CommentList.tsx
│   │   │   ├── CommentItem.tsx
│   │   │   └── CommentList.module.css
│   │   ├── MarkdownEditor/
│   │   │   ├── MarkdownEditor.tsx
│   │   │   ├── EditorToolbar.tsx
│   │   │   └── MarkdownEditor.module.css
│   │   ├── MarkdownPreview/
│   │   │   ├── MarkdownPreview.tsx
│   │   │   └── MarkdownPreview.module.css
│   │   ├── ThemeToggle/
│   │   │   ├── ThemeToggle.tsx
│   │   │   └── ThemeToggle.module.css
│   │   ├── LanguageSwitcher/
│   │   │   ├── LanguageSwitcher.tsx
│   │   │   └── LanguageSwitcher.module.css
│   │   ├── AIChat/
│   │   │   ├── AIChat.tsx
│   │   │   ├── ChatMessage.tsx
│   │   │   └── AIChat.module.css
│   │   ├── DataChart/
│   │   │   ├── ViewsChart.tsx
│   │   │   ├── LikesChart.tsx
│   │   │   └── GeoMap.tsx
│   │   ├── Pagination/
│   │   │   ├── Pagination.tsx
│   │   │   └── Pagination.module.css
│   │   ├── Modal/
│   │   │   ├── Modal.tsx
│   │   │   └── Modal.module.css
│   │   ├── Loading/
│   │   │   ├── Skeleton.tsx
│   │   │   └── Spinner.tsx
│   │   └── common/
│   │       ├── Button.tsx
│   │       ├── Input.tsx
│   │       ├── Badge.tsx
│   │       └── Icon.tsx
│   │
│   ├── layouts/                     # 页面布局
│   │   ├── MainLayout.tsx           # 主布局（头部+侧栏）
│   │   ├── AuthLayout.tsx           # 认证布局
│   │   └── DashboardLayout.tsx      # 仪表板布局
│   │
│   ├── services/                    # API 抽象层
│   │   ├── api.ts                   # axios ���例配置
│   │   ├── articleService.ts        # 文章相关 API
│   │   ├── userService.ts           # 用户相关 API
│   │   ├── commentService.ts        # 评论相关 API
│   │   ├── analyticsService.ts      # 数据分析 API
│   │   ├── authService.ts           # 认证 API
│   │   └── uploadService.ts         # 文件上传 API
│   │
│   ├── store/                       # 全局状态管理（Zustand）
│   │   ├── useAuthStore.ts          # 认证状态
│   │   ├── useThemeStore.ts         # 主题状态
│   │   ├── useArticleStore.ts       # 文章状态
│   │   ├── useUIStore.ts            # UI 状态
│   │   └── useCommentStore.ts       # 评论状态
│   │
│   ├── hooks/                       # 自定义 Hooks
│   │   ├── useTheme.ts              # 主题切换 Hook
│   │   ├── useMarkdown.ts           # Markdown 解析 Hook
│   │   ├── useArticle.ts            # 文章操作 Hook
│   │   ├── useAnalytics.ts          # 数据分析 Hook
│   │   ├── useFetch.ts              # 数据获取 Hook
│   │   ├── useForm.ts               # 表单处理 Hook
│   │   ├── useLocalStorage.ts       # LocalStorage Hook
│   │   └���─ useDebounce.ts           # 防抖 Hook
│   │
│   ├── utils/                       # 工具函数
│   │   ├── markdown.ts              # Markdown 处理工具
│   │   ├── format.ts                # 日期、数字格式化
│   │   ├── xss-filter.ts            # XSS 防护
│   │   ├── cache.ts                 # 缓存工具
│   │   ├── constants.ts             # 常量定义
│   │   ├── validator.ts             # 数据验证
│   │   ├── storage.ts               # 本地存储工具
│   │   └── helpers.ts               # 通用辅助函数
│   │
│   ├── types/                       # TypeScript 类型定义
│   │   ├── index.ts                 # 类型导出
│   │   ├── article.ts               # 文章类型
│   │   ├── user.ts                  # 用户类型
│   │   ├── comment.ts               # 评论类型
│   │   ├── analytics.ts             # 分析类型
│   │   ├── auth.ts                  # 认证类型
│   │   └── common.ts                # 通用类型
│   │
│   ├── locales/                     # 国际化文件
│   │   ├── en-US.json               # 英文
│   │   ├── zh-CN.json               # 中文
│   │   └── index.ts                 # i18n 配置
│   │
│   ├── styles/                      # 全局样式
│   │   ├── globals.css              # 全局样式
│   │   ├── variables.css            # CSS 变量
│   │   ├── animations.css           # 动画定义
│   │   └── responsive.css           # 响应式样式
│   │
│   ├── config/                      # 配置文件
│   │   ├── site.ts                  # 网站配置
│   │   ├── api.ts                   # API 配置
│   │   ├── env.ts                   # 环境变量类型
│   │   └── constants.ts             # 常量配置
│   │
│   └── middleware.ts                # Next.js 中间件
│
├── .env.local                       # 环境变量（本地）
├── .env.example                     # 环境变量示例
├── .eslintrc.json                   # ESLint 配置
├── .prettierrc.json                 # Prettier 配置
├── .gitignore                       # Git 忽略文件
├── tsconfig.json                    # TypeScript 配置
├── next.config.ts                   # Next.js 配置
├── tailwind.config.ts               # TailwindCSS 配置
├── postcss.config.mjs               # PostCSS 配置
├── package.json                     # 项目依赖
├── pnpm-lock.yaml                   # 依赖锁定
├── README.md                        # 项目文档
└── DEVELOPMENT.md                   # 开发指南
```

---

## 🎨 四、核心页面详细规范

### 4.1 首页（Home Page）

**页面路由**：`/`

**页面布局结构**：
```
┌─────────────────────────────────────────────────────────────────────────────┐
│ Header (固定/粘性导航)                                                      │
│ [LOGO / 博客名]   主页  分类  归档  关于  留言板  AI聊天  ...  [搜索框] [主题切换] │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────┬───────────────────────────────────────┬─────────────────────┐
│ 左侧边栏 (可选收起) │             主内容区                  │     右侧边栏        │
│                     │                                       │                     │
│ • 个人资料卡片      │  ┌─────────────────────────────┐    │ • 热门文章          │
│   (头像+签名)       │  │     置顶/推荐大图 / 横幅        │    │ • 标签云            │
│ • 导航菜单          │  │     (或最新文章大卡片)          │    │ • 最新评论          │
│   - 首页            │  └─────────────────────────────────┘    │ • 关于本站小卡      │
│   - 分类            │                                       │ • 友情链接          │
│   - 标签            │  ┌───────┐ ┌───────┐ ┌───────┐      │ • 二维码/订阅       │
│   - 归档            │  │文章卡1│ │文章卡2│ │文章卡3│      │                     │
│   - 留言板          │  └───────┘ └───────┘ └───────┘      │                     │
│   - 关于            │          • • • (网格/列表)           │                     │
│ • 其他小部件        │                                       │                     │
│                     │          分页 / 加载更多              │                     │
└─────────────────────┴───────────────────────────────────────┴─────────────────────┘

                               Footer
                  © 202x zhouzy博客 | 备案号 | ICP | 主题信息
```

**功能需求**：
- [ ] 显示最新发布的文章列表（分页，每页 10-12 篇）
- [ ] 文章卡片包含：封面、标题、摘要、作者、日期、标签、浏览/点赞数
- [ ] 左侧边栏显示用户信息（头像、用户名、认证标签、签名、位置、注册日期）
- [ ] 快速链接（GitHub、订阅）
- [ ] 右侧推荐区域（广告位、热门文章）
- [ ] 支持按分类/标签筛选
- [ ] 搜索功能（可选）
- [ ] 响应式设计：PC 三栏布局，平板两栏，手机单栏

**数据加载**：
- 首页加载时获取：文章列表 + 用户信息 + 热门标签（并行加载）
- 实现 SWR 缓存，避免重复请求
- 分页懒加载或无限滚动

---

### 4.2 文章详情页（Article Detail Page）

**页面路由**：`/articles/[id]`

**页面布局**：
```
┌──────────────────────────────────────────────────────┐
│ Header                                               │
├──────────────────────────────────────────────────────┤
│                                                      │
│  【文章标题】                                         │
│  作者头像 作者名 | 发布日期 | 阅读时长 | 字数统计    │
│  [分享] [收藏] [举报] [AI 评论建议]                  │
│                                                      │
│  ◄ 文章内容区 ► ┃ 【文章目录（TOC）】             │
│  Markdown 渲染    ┃ • 标题 1                        │
│  - 代码高亮       ┃ • 标题 2                        │
│  - 公式渲染       ┃ • 标题 3                        │
│  - 图片懒加载     ┃                                 │
│                                                      │
├──────────────────────────────────────────────────────┤
│ 点赞数 | 评论数 | 标签 1 标签 2 标签 3               │
├──────────────────────────────────────────────────────┤
│ 【相关推荐】                                         │
│ 推荐文章 1 | 推荐文章 2 | 推荐文章 3                 │
├──────────────────────────────────────────────────────┤
│ 【评论区】                                           │
│ 评论输入框 [AI 智能建议]                             │
│ ─────────────────────────────────────                │
│ 评论 1 (99 条回复)                                   │
│ 　└─ 回复 1                                          │
│ 　└─ 回复 2                                          │
│ 评论 2                                               │
│ ─ 更多评论 ─                                         │
│                                                      │
│ ◄ 上一篇 | 下一篇 ►                                  │
└──────────────────────────────────────────────────────┘
```

**功能需求**：
- [ ] 渲染 Markdown 内容（支持代码块、公式、表格、列表）
- [ ] 代码块语法高亮（Prism.js）
- [ ] 自动生成目录（TOC）并支持点击跳转
- [ ] 图片懒加载和预览
- [ ] 点赞功能（防重复，实时更新）
- [ ] 标签列表，可点击跳转
- [ ] 相关推荐（推荐同分类下的 3 篇文章）
- [ ] 评论系统（分页、排序、嵌套回复）
- [ ] 支持 @ 提及评论者
- [ ] 表情符号支持
- [ ] 上一篇/下一篇导航
- [ ] 文章分享按钮（Twitter、Facebook、复制链接）
- [ ] SEO 优化：动态 meta 标签

**性能优化**：
- 图片使用 next/image 组件
- Markdown 渲染时缓存
- 评论分页加载

---

### 4.3 文章编辑器页面（Editor Page）

**页面路由**：`/articles/edit` 或 `/articles/edit/[id]`

**页面布局**：
```
┌──────────────────────────────────────────────────────────────┐
│ Editor Header                                                │
│ [保存草稿] [预览] [发布] [设置] [关闭]                        │
├──────────────┬──────────────────┬──────────────────────────────┤
│              │ 编辑区            │ 预览区 / 配置区              │
│ AI 助手      │                  │                              │
│              │ 【标题】          │ 【实时预览】                 │
│              │ 输入框            │ Markdown                     │
│              │                  │ 渲染结果                      │
│              │ 【内容编辑】      │                              │
│              │ Monaco Editor    │ 或                           │
│              │ 支持：           │ 【文章配置】                 │
│              │ - Markdown      │ - 分类                       │
│              │ - 代码高亮      │ - 标签                       │
│              │ - 补全建议      │ - 封面图                     │
│              │ - AI 补全       │ - 摘要                       │
│              │ - 快捷键        │ - 是否发布                   │
│              │ - 图片插入      │ - 评论开关                   │
│              │ - 代码块        │                              │
│              │                  │                              │
└──────────────┴──────────────────┴──────────────────────────────┘
```

**功能需求**：
- [ ] **编辑器**：
  - 使用 Monaco Editor 或 Vditor
  - 支持 Markdown 语法
  - 实时预览
  - 快捷键支持（Ctrl+B 加粗、Ctrl+I 斜体等）
  - 撤销/重做
  - 自动保存草稿（每 30 秒）
  - 文字/代码块/表格/公式快速插入
  
- [ ] **预览**：
  - 实时渲染 Markdown
  - 代码高亮
  - 公式渲染
  - 表格美化显示

- [ ] **文章配置**：
  - 标题输入框
  - 分类下拉选择
  - 标签输入（支持多个）
  - 封面图上传/选择
  - 摘要编辑
  - SEO 关键词
  - 评论开关
  - 置顶选项

- [ ] **AI 助手**：
  - 内容补全建议
  - 语法检查
  - SEO 建议
  - 标题优化
  - 摘要生成
  - 聊天框（可咨询 AI）

- [ ] **操作**：
  - 保存草稿（自动 + 手动）
  - 发布文章
  - 预览发布效果
  - 编辑已发布文章
  - 切换编辑模式（Visual/Code）

- [ ] **键盘快捷键**：
  - `Ctrl+S` / `Cmd+S`：保存
  - `Ctrl+/` / `Cmd+/`：切换预览
  - `Ctrl+Shift+P`：发布

---

### 4.4 用户中心（Dashboard）

**页面路由**：`/dashboard`

**子页面**：
- `/dashboard` - 仪表板
- `/dashboard/profile` - 个人资料
- `/dashboard/articles` - 我的文章
- `/dashboard/drafts` - 草稿箱

**仪表板布局**：
```
┌──────────────────────────────────────────────────────────────┐
│ Dashboard Header                                             │
│ 【欢迎，用户名】                                              │
├──────────────┬──────────────────────────────────────────────┤
│              │                                              │
│ 侧边菜单     │ 快速统计卡片                                  │
│              │ ┌─────────┬─────────┬─────────┬─────────┐   │
│ - 仪表板     │ │ 文章数  │ 总浏览  │ 总点赞  │ 总评论  │   │
│ - 个人资料   │ │  42     │ 15.2K   │ 1.8K    │  320    │   │
│ - 我的文章   │ └─────────┴─────────┴─────────┴─────────┘   │
│ - 草稿箱     │                                              │
│ - 数据分析   │ 【最近发布】（表格）                          │
│ - 系统设置   │ 文章名 | 浏览 | 点赞 | 评论 | 操作            │
│              │ ───────────────────────────────────────────  │
│              │ 文章 1 |  120  |  45  |  12  | 编辑 删除     │
│              │ 文章 2 |  95   |  23  |  8   | 编辑 删除     │
│              │ ...                                          │
│              │                                              │
│              │ 【最近评论】                                  │
│              │ 评论 1 | 文章名 | 2 小时前 | 删除            │
│              │ ...                                          │
│              │                                              │
└──────────────┴──────────────────────────────────────────────┘
```

**功能需求**：

#### 仪表板（Dashboard）
- [ ] 显示关键统计数据（卡片形式）：
  - 文章总数
  - 总浏览数（PV）
  - 总点赞数
  - 总评论数
  - 访客数
  
- [ ] 近期发布文章列表（表格）
  - 文章标题、发布日期、浏览数、点赞数、评论数
  - 快速操作（编辑、查看、删除）


#### 个人资料（Profile）
- [ ] 头像上传/修改
- [ ] 基本信息编辑（昵称、邮箱）
- [ ] 个人签名/简介
- [ ] 社交链接（qq、微信、github）
- [ ] 地理位置
- [ ] 账户密码修改
- [ ] 隐私设置

#### 我的文章（My Articles）
- [ ] 文章列表（表格/卡片视图切换）
- [ ] 列表包含：标题、状态（发布/草稿）、分类、发布日期、浏览数、点赞数、评论数
- [ ] 搜索、排序、筛选功能
- [ ] 批量操作（删除、更改分类等）
- [ ] 快速操作按钮（编辑、查看、删除、设置）
- [ ] 分页

#### 草稿箱（Drafts）
- [ ] 显示未发布的草稿列表
- [ ] 继续编辑功能
- [ ] 删除草稿
- [ ] 发布草稿



### 4.5 分类/标签页面（Category & Tag Page）

**页面路由**：
- `/category/[slug]` - 分类页
- `/tag/[slug]` - 标签页

**布局**：
```
┌──────────────────────────────────────────────────────────────┐
│ Header                                                       │
├────────────────────────────────────────────────────────────┤
│ 【分类/标签名】 (共 42 篇文章)                               │
│ [排序：最新 ▼] [视图：网格 ▼]                                │
│                                                              │
│ 文章卡片列表（网格/列表视图）                                │
│ ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│ │ 文章 1       │  │ 文章 2       │  │ 文章 3       │       │
│ │ ...          │  │ ...          │  │ ...          │       │
│ └──────────────┘  └──────────────┘  └──────────────┘       │
│                                                              │
│ ◄ 上一页 | 1 2 3 4 5 | 下一页 ►                             │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

**功能需求**：
- [ ] 显示分类/标签名和文章数统计
- [ ] 文章列表（卡片或列表视图可切换）
- [ ] 排序选项（最新、热门、评论数）
- [ ] 视图切换（网格/列表）
- [ ] 分页
- [ ] 相关分类/标签推荐（可选）

---

### 4.6 其他页面

#### 留言板（Messages）
- **路由**：`/messages`
- 显示公开留言列表
- 支持发表新留言
- 管理员审核后显示

#### 友链（Links）
- **路由**：`/links`
- 友链列表展示
- 友链申请表单

#### 关于页面（About）
- **路由**：`/about`
- 个人/博客介绍
- 联系方式
- 技术栈信息

#### 登录/注册
- **路由**：`/login`, `/register`
- 支持邮箱/用户名登录
- 密码重置
- 第三方登录（可选）

---

## 🎯 五、功能模块详细规范

### 5.1 Markdown 编辑与渲染

**编辑器需求**：
```typescript
// 编辑器特性
- 支持 Markdown 全语法
- 代码块语法高亮（multiple languages）
- 实时预览
- 撤销/重做
- 自动保存草稿
- 图片拖拽上传
- 快捷键支持
- 主题适配（亮/暗）
```

**渲染需求**：
```typescript
// 渲染库
import MarkdownIt from 'markdown-it'
import Prism from 'prismjs'
import katex from 'katex'

// 插件
- markdown-it-footnote（脚注）
- markdown-it-abbr（缩写）
- markdown-it-table-of-contents（目录）
- markdown-it-mathjax3（公式）
- markdown-it-emoji（表情）
- markdown-it-task-lists（任务列表）
```

**安全性**：
```typescript
// XSS 防护
import DOMPurify from 'dompurify'

const sanitized = DOMPurify.sanitize(html, {
  ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'a', 'code', 'pre', 'img', 'blockquote', 'ul', 'ol', 'li', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
  ALLOWED_ATTR: ['href', 'title', 'src', 'alt', 'class']
})
```

---

### 5.2 主题系统

**需求**：
- [ ] 亮色主题（Light）
- [ ] 暗色主题（Dark）
- [ ] 主题切换按钮（Header 右上角）
- [ ] 主题偏好持久化（LocalStorage）
- [ ] 系统主题自适应（prefers-color-scheme）

**实现**：
```typescript
// next-themes 配置
import { ThemeProvider } from 'next-themes'

// 在 root layout 中使用
<ThemeProvider attribute="class" defaultTheme="system">
  {children}
</ThemeProvider>

// CSS 变量切换
:root {
  --bg-primary: #ffffff;
  --text-primary: #000000;
}

[data-theme="dark"] {
  --bg-primary: #1a1a1a;
  --text-primary: #ffffff;
}
```

---

### 5.3 国际化（i18n）

**支持语言**：
- 中文（zh-CN）
- 英文（en-US）

**翻译范围**：
- UI 文本（按钮、标签、占位符）
- 日期和时间格式
- 数字格式
- 错误消息

**实现**：
```typescript
// next-i18next 配置
import { useTranslation } from 'next-i18next'

export default function Component() {
  const { t } = useTranslation('common')
  return <h1>{t('welcome')}</h1>
}
```

---

### 5.4 AI 助手

**功能**：
1. **内容补全** - 根据输入内容建议完成
2. **语法检查** - 检查拼写和语法
3. **SEO 建议** - 标题、摘要、关键词优化
4. **写作建议** - 改进语句表达
5. **聊天界面** - 实时对话框

**集成方案**：
```typescript
// 调用 OpenAI API
const response = await fetch('/api/ai/chat', {
  method: 'POST',
  body: JSON.stringify({
    type: 'completion', // 'completion' | 'grammar' | 'seo' | 'chat'
    content: userInput,
    context: articleContext
  })
})

// 流式输出
const reader = response.body.getReader()
while (true) {
  const { done, value } = await reader.read()
  if (done) break
  // 处理流数据
}
```

---

### 5.5 评论系统

**需求**：
- [ ] 显示评论列表（分页）
- [ ] 嵌套评论（评论的回复）
- [ ] @ 提及功能
- [ ] 表情符号支持
- [ ] 评论排序（最新/最热）
- [ ] 点赞评论
- [ ] 删除评论（管理员/作者）
- [ ] 评论审核（可选）

**数据结构**：
```typescript
interface Comment {
  id: string
  articleId: string
  content: string
  author: User
  createdAt: Date
  likes: number
  replies?: Comment[]
  parentId?: string // 父评论 ID
}
```

---

### 5.6 数据分析

**统计数据**：
- 每日 PV（Page View）
- 每日 UV（Unique Visitor）
- 按文章统计浏览数
- 按地域统计访客
- 访客来源
- 点赞统计
- 评论统计

**埋点方案**：
```typescript
// 自定义分析 SDK
class Analytics {
  trackPageView(url: string) {
    // 记录 PV
  }
  
  trackEvent(eventName: string, data?: any) {
    // 记录事件
  }
  
  trackLike(articleId: string) {
    // 记录点赞
  }
}

// 使用
analytics.trackPageView('/articles/123')
```

**可视化**：
- 使用 ECharts 或 Recharts 绘制图表
- 支持多种图表类型（折线、柱状、饼图、地图等）

---

### 5.7 响应式设计

**断点**：
```css
/* Mobile First */
- Mobile: < 640px
- Tablet: 640px - 1023px
- Desktop: >= 1024px

/* TailwindCSS 断点 */
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

**适配方案**：
- **首页**：Mobile 单栏 → Tablet 两栏 → Desktop 三栏
- **文章详情**：Mobile 全宽 → Desktop 左文章右目录
- **编辑器**：Mobile 竖屏堆叠 → Desktop 分屏

---

## 🔧 六、技术实现细节

### 6.1 文件上传（头像、封面、文章附件）

```typescript
// 上传流程
1. 前端选择文件
2. 验证文件大小、类型
3. 上传到 /api/upload
4. 返回文件 URL
5. 保存到数据库

// 安全性
- 限制文件大小（图片 ≤ 5MB）
- 限制文件类型（jpg, png, gif, webp）
- 文件名重命��（防冲突）
- 病毒扫描（可选）
- CDN 加速
```

### 6.2 缓存策略

```typescript
// 缓存分层
1. 浏览器缓存（HTTP Cache Headers）
2. Service Worker 缓存（PWA）
3. 内存缓存（React Query/SWR）
4. LocalStorage（用户偏好、草稿）
5. 服务端缓存（Redis）

// 缓存策略
- 文章内容：7 天不变
- 用户信息：1 小时刷新
- 评论列表：实时更新
- 分析数据：1 小时刷新
```

### 6.3 SEO 优化

```typescript
// Meta 标签动态生成
import Head from 'next/head'

export default function Article({ article }) {
  return (
    <>
      <Head>
        <title>{article.title} | zhouzy blog </title>
        <meta name="description" content={article.summary} />
        <meta name="keywords" content={article.tags.join(',')} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.summary} />
        <meta property="og:image" content={article.cover} />
        <canonical href={`https://example.com/articles/${article.id}`} />
      </Head>
    </>
  )
}
```

### 6.4 性能优化

```typescript
// 代码分割
import dynamic from 'next/dynamic'

const MarkdownEditor = dynamic(() => import('@/components/MarkdownEditor'), {
  loading: () => <Skeleton />,
  ssr: false
})

// 图片优化
import Image from 'next/image'

<Image
  src={imageUrl}
  alt={alt}
  width={800}
  height={600}
  priority={false}
  loading="lazy"
/>

// 字体优化
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin', 'latin-ext'] })
```

### 6.5 认证与授权

```typescript
// JWT Token 管理
- 登录时获取 access_token 和 refresh_token
- access_token 存储在 memory 或 secure cookie
- refresh_token 存储在 secure http-only cookie
- 401 时自动刷新 token
- 退出登录清除 token

// 权限检查
- 路由守卫（Protected Routes）
- API 拦截器检查 token
- 不同权限显示不同 UI
```

---

## 📦 七、依赖包列表

```json
{
  "dependencies": {
    // React & Next.js
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "next": "^14.0.0",
    
    // 样式
    "tailwindcss": "^3.3.0",
    "postcss": "^8.4.31",
    "autoprefixer": "^10.4.16",
    
    // 状态管理
    "zustand": "^4.4.7",
    
    // API 通信
    "axios": "^1.6.0",
    "swr": "^2.2.4",
    
    // Markdown
    "markdown-it": "^13.0.1",
    "remark": "^14.0.3",
    "rehype-react": "^7.2.0",
    "prismjs": "^1.29.0",
    "dompurify": "^3.0.6",
    "katex": "^0.16.9",
    
    // 编辑器
    "vditor": "^3.8.19",
    // 或使用 Monaco Editor
    "@monaco-editor/react": "^4.5.0",
    
    // UI 和日期
    "react-hook-form": "^7.48.0",
    "zod": "^3.22.4",
    "dayjs": "^1.11.10",
    "react-hot-toast": "^2.4.1",
    
    // 主题和国际化
    "next-themes": "^0.2.1",
    "next-i18next": "^14.0.3",
    "i18next": "^23.7.6",
    
    // 图表
    "echarts": "^5.4.3",
    "recharts": "^2.10.3",
    
    // 工具
    "clsx": "^2.0.0",
    "classnames": "^2.3.2",
    "lodash-es": "^4.17.21",
    
    // HTTP
    "@tanstack/react-query": "^5.28.0",
    
    // 表单
    "react-markdown": "^9.0.0"
  },
  "devDependencies": {
    "@types/node": "^20.10.5",
    "@types/react": "^18.2.45",
    "@types/react-dom": "^18.2.18",
    "typescript": "^5.3.3",
    "eslint": "^8.56.0",
    "eslint-config-next": "^14.0.4",
    "prettier": "^3.1.1",
    "@tailwindcss/forms": "^0.5.7",
    "@tailwindcss/typography": "^0.5.10"
  }
}
```

---

## 🚀 八、开发流程与优先级

### Phase 1：基础架构（第 1-2 周）

- [ ] 项目初始化（Next.js + TypeScript + TailwindCSS）
- [ ] 目录结构搭建
- [ ] 路由配置
- [ ] API 服务层抽象
- [ ] 状态管理（Zustand）初始化
- [ ] 全局样式 + CSS 变量

### Phase 2：核心页面（第 2-3 周）

- [ ] Header 和 Sidebar 组件
- [ ] 首页布局和文章列表卡片
- [ ] 文章详情页面（Markdown 渲染）
- [ ] 分类/标签页面
- [ ] 底部 Footer

### Phase 3：编辑功能（第 3-4 周）

- [ ] 集成 Markdown 编辑器
- [ ] 文章编辑/发布功能
- [ ] 草稿自动保存
- [ ] 文件上传（图片、封面）

### Phase 4：交互功能（第 4-5 周）

- [ ] 评论系统（前端）
- [ ] 点赞功能
- [ ] 用户认证（登录/注册）
- [ ] 权限管理

### Phase 5：用户中心（第 5-6 周）

- [ ] 用户中心仪表板
- [ ] 个人资料管理
- [ ] 我的文章管理
- [ ] 草稿箱

### Phase 6：数据分析（第 6-7 周）

- [ ] 数据分析页面
- [ ] 图表集成
- [ ] 埋点实现
- [ ] 数据可视化

### Phase 7：辅助功能（第 7-8 周）

- [ ] 主题切换
- [ ] 国际化（i18n）
- [ ] AI 助手集成
- [ ] 留言板、友链

### Phase 8：优化与测试（第 8-9 周）

- [ ] 性能优化
- [ ] SEO 优化
- [ ] 响应式调整
- [ ] 单元测试
- [ ] E2E 测试
- [ ] Bug 修复

### Phase 9：部署（第 9 周）

- [ ] 环境配置
- [ ] Vercel 部署
- [ ] 域名配置
- [ ] HTTPS 和 CDN

---

## 🎓 九、开发规范

### 代码风格

```typescript
// ESLint + Prettier 配置
- 使用分号
- 单引号
- 2 空格缩进
- 最大行长 100
- 箭头函数参数添加类型
```

### 组件规范

```typescript
// 函数组件 + Hooks
import { FC, useState, useEffect } from 'react'

interface Props {
  title: string
  onClick: () => void
}

const MyComponent: FC<Props> = ({ title, onClick }) => {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    // 副作用
  }, [])
  
  return <div>{title}</div>
}

export default MyComponent
```

### 文件命名

```
- 组件：PascalCase (ArticleCard.tsx)
- 工具函数：camelCase (formatDate.ts)
- 常量：UPPER_SNAKE_CASE (API_BASE_URL)
- 样式：component.module.css
```

### Git 提交规范

```
feat: 新功能
fix: bug 修复
docs: 文档
style: 代码风格
refactor: 重构
perf: 性能优化
test: 测试
chore: 构建工具或依赖
```

---

## 📚 十、API 接口规范

### 基础 API

```
GET  /api/articles              - 获取文章列表
GET  /api/articles/:id          - 获取文章详情
POST /api/articles              - 创建文章
PUT  /api/articles/:id          - 更新文章
DELETE /api/articles/:id        - ���除文章

GET  /api/categories            - 获取分类列表
GET  /api/tags                  - 获取标签列表

POST /api/comments              - 添加评论
GET  /api/comments/:articleId   - 获取评论列表
DELETE /api/comments/:id        - 删除评论

POST /api/likes/:articleId      - 点赞文章
DELETE /api/likes/:articleId    - 取消点赞

GET  /api/user                  - 获取用户信息
PUT  /api/user                  - 更新用户信息
POST /api/user/avatar           - 上传头像

POST /api/auth/login            - 登录
POST /api/auth/register         - 注册
POST /api/auth/logout           - 登出
POST /api/auth/refresh          - 刷新 token

GET  /api/analytics             - 获取分析数据
POST /api/analytics/track       - 上报事件

GET  /api/search                - 搜索文章

POST /api/upload                - 文件上传

GET  /api/ai/suggest            - AI 建议
POST /api/ai/chat               - AI 聊天
```

---

## ✅ 十一、验收清单

项目完成时应满足以下条件：

- [ ] 所有页面完成开发
- [ ] 响应式设计验证（PC/平板/手机）
- [ ] 所有功能测试通过
- [ ] 性能指标达标（FCP < 2s, LCP < 2.5s）
- [ ] SEO 最佳实践实现
- [ ] 无控制台错误和警告
- [ ] 代码覆盖率 > 80%
- [ ] 文档完善
- [ ] 可在 Vercel 成功部署
- [ ] 跨浏览器兼容性验证

---

## 🎯 十二、AI 生成建议

**建议按以下顺序生成代码**：

1. **项目初始化脚本** - 目录结构、配置文件
2. **类型定义** - `src/types/*.ts`
3. **通用工具** - `src/utils/*.ts`
4. **共用组件** - `src/components/common/*`
5. **布局组件** - `src/components/{Header,Sidebar,Footer}`
6. **首页** - `src/app/page.tsx`
7. **文章详情** - `src/app/(main)/articles/[id]/page.tsx`
8. **编辑器** - `src/app/(main)/articles/edit/page.tsx`
9. **用户中心** - `src/app/(dashboard)/**`
10. **API 集成** - `src/services/*.ts`
11. **优化与测试** - 性能、SEO、测试用例

---

## 📞 十三、问题处理

遇到问题时，按以下优先级解决：

1. **代码语法错误** - TypeScript 编译错误
2. **类型错误** - 类型不匹配
3. **渲染错误** - UI 不显示
4. **功能缺陷** - 功能不正常工作
5. **性能问题** - 加载速度慢
6. **样式问题** - 布局不对齐

---

## 🎉 开始构建！

现在你拥有完整的需求规范。请按照以下步骤开始：

1. **创建项目**
   ```bash
   npx create-next-app@latest blog-frontend --typescript --tailwind
   ```

2. **生成目录结构**
   ```bash
   mkdir -p src/{app,components,layouts,services,store,hooks,utils,types,locales,styles,config}
   ```

3. **安装依赖**
   ```bash
   pnpm install axios swr zustand markdown-it prismjs dompurify next-themes next-i18next echarts react-hook-form zod dayjs
   ```

4. **根据本提示词逐步生成代码**

5. **本地开发**
   ```bash
   pnpm dev
   ```

6. **部署到 Vercel**
   ```bash
   vercel deploy
   ```

祝你开发顺利！🚀

---

**最后更新**：2026-03-23
**适用版本**：Next.js 14+, React 18+
**维护者**：AI 前端工程师