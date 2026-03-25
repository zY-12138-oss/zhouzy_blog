# zhouzy 博客系统 —— 完整项目开发文档

**项目名称**：zhouzy 的博客系统  
**文档版本**：v1.0  
**创建日期**：2026-03-25  
**前端技术栈**：Next.js 14 + React 18 + TypeScript + TailwindCSS  
**后端技术栈**：Spring Boot 3 + MyBatis-Plus + MySQL 8 + Redis 7  

---

## 目录

1. [项目概述](#一项目概述)
2. [技术架构](#二技术架构)
3. [数据库设计](#三数据库设计)
4. [API 接口规范](#四api-接口规范)
5. [前端页面规范](#五前端页面规范)
6. [安全与权限设计](#六安全与权限设计)
7. [性能与缓存策略](#七性能与缓存策略)
8. [分阶段开发计划](#八分阶段开发计划)
9. [开发规范](#九开发规范)
10. [部署方案](#十部署方案)
11. [验收清单](#十一验收清单)

---

## 一、项目概述

### 1.1 项目目标

zhouzy 博客系统是一个现代化个人博客平台，前后端分离架构，面向技术博主、内容创作者与知识分享者。

**核心能力：**
- 优雅的 Markdown 写作体验（所见即所得编辑）
- 支持内容创作、发布、管理、数据统计
- 完整的社交互动功能（评论、点赞、浏览量）
- 集成 AI 助手辅助写作
- 支持国际化（中/英）与主题切换（亮色/暗色）
- 高并发读场景下保持性能稳定

### 1.2 系统角色

| 角色 | 说明 |
|------|------|
| 游客 | 浏览文章、标签、分类、评论，无需登录 |
| 注册用户 | 登录后可发表评论、点赞 |
| 博主（Admin） | 文章管理、分类标签管理、评论管理、数据分析等全部权限 |

### 1.3 项目特色

1. **高性能读写分离**：Redis 缓存 + MySQL 持久化双层架构
2. **完整 RBAC 权限控制**：Spring Security + JWT 双令牌
3. **实时互动**：点赞、评论、浏览量异步处理
4. **数据分析与埋点**：可视化 PV/UV/文章排行
5. **AI 写作助手**：内容补全、标题优化、SEO 建议、AI 对话
6. **响应式布局**：PC / 平板 / 手机完美适配
7. **分布式友好**：可平滑扩展至微服务架构

---

## 二、技术架构

### 2.1 整体架构

```
浏览器（Next.js 14）
        ↕ HTTPS / REST API
后端服务（Spring Boot 3）
   Controller -> Service -> Mapper -> MySQL 8
        ↕ Redis 7（缓存层）
        ↕ MinIO（文件存储）
```

### 2.2 后端技术栈

| 分类 | 技术选型 | 版本 |
|------|----------|------|
| 核心框架 | Spring Boot | 3.2+ |
| 语言 | Java | 21 |
| 构建工具 | Maven | 3.9+ |
| ORM | MyBatis-Plus | 3.5+ |
| 数据库 | MySQL | 8.0+ |
| 缓存 | Redis (Lettuce) | 7.x |
| 安全 | Spring Security + JWT | - |
| 对象转换 | MapStruct | 1.5+ |
| API 文档 | Knife4j (Springdoc OpenAPI) | 2.x |
| 工具库 | Hutool、Lombok | - |
| 文件存储 | MinIO / 阿里云 OSS | - |
| 限流 | Sentinel / Guava RateLimiter | - |
| 日志 | SLF4J + Logback | - |
| 监控 | Spring Boot Actuator + Prometheus | - |
| 可选 | Redisson（分布式锁）、Caffeine（二级缓存）| - |
| 可选 | RabbitMQ / RocketMQ（异步消息）| - |
| 可选 | Elasticsearch（全文搜索）| - |

### 2.3 前端技术栈

| 分类 | 技术选型 | 版本 |
|------|----------|------|
| 框架 | Next.js（App Router） | 14.x |
| UI 库 | React + Hooks | 18.x |
| 语言 | TypeScript（严格模式） | 5.x |
| 样式 | TailwindCSS + CSS Modules | 3.x |
| 包管理 | pnpm | - |
| 状态管理 | Zustand | 4.x |
| HTTP | Axios + SWR / React Query | - |
| Markdown 编辑器 | Vditor 或 Monaco Editor | - |
| Markdown 渲染 | markdown-it + Prism.js + KaTeX | - |
| 表单 | React Hook Form + Zod | - |
| 图表 | ECharts / Recharts | - |
| 主题 | next-themes | - |
| 国际化 | next-i18next | - |
| 日期 | Day.js | - |
| 部署 | Vercel / 自建服务器 | - |

### 2.4 后端目录结构

```
blog-backend/
├── src/main/java/com/zhouzy/blog/
│   ├── BlogApplication.java
│   ├── common/
│   │   ├── config/       # Redis、Security、Swagger 等配置
│   │   ├── constant/     # 全局常量
│   │   ├── exception/    # 自定义异常体系
│   │   ├── model/        # 统一返回 Result<T>
│   │   ├── util/         # 工具类
│   │   └── annotation/   # 自定义注解
│   ├── controller/       # 接口层
│   ├── service/          # 业务层（接口 + 实现）
│   ├── mapper/           # MyBatis-Plus Mapper
│   ├── entity/           # 数据库实体
│   ├── vo/               # 返回视图对象
│   ├── dto/              # 请求数据传输对象
│   ├── query/            # 查询条件对象
│   ├── security/         # JWT + RBAC 安全模块
│   ├── aspect/           # AOP（日志、限流、权限）
│   ├── task/             # 定时任务
│   └── listener/         # 事件监听
├── src/main/resources/
│   ├── mapper/           # XML Mapper
│   ├── application.yml
│   ├── application-dev.yml
│   ├── application-prod.yml
│   └── logback-spring.xml
├── sql/
│   ├── blog_init.sql
│   └── blog_update_*.sql
└── pom.xml
```

### 2.5 前端目录结构

```
blog-frontend/
├── public/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── (auth)/           # /login  /register
│   │   ├── (main)/
│   │   │   ├── articles/page.tsx
│   │   │   ├── articles/[id]/page.tsx
│   │   │   ├── articles/edit/page.tsx
│   │   │   ├── category/[slug]/page.tsx
│   │   │   ├── tag/[slug]/page.tsx
│   │   │   ├── messages/page.tsx
│   │   │   ├── links/page.tsx
│   │   │   └── about/page.tsx
│   │   └── (dashboard)/
│   │       ├── dashboard/page.tsx
│   │       ├── profile/page.tsx
│   │       ├── articles/page.tsx
│   │       ├── drafts/page.tsx
│   │       └── analytics/page.tsx
│   ├── components/           # 可复用组件
│   ├── layouts/              # 页面布局
│   ├── services/             # API 抽象层
│   ├── store/                # Zustand 全局状态
│   ├── hooks/                # 自定义 Hooks
│   ├── utils/                # 工具函数
│   ├── types/                # TypeScript 类型定义
│   ├── locales/              # 国际化文件
│   ├── styles/               # 全局样式
│   └── config/               # 配置文件
├── .env.local
├── tsconfig.json
├── next.config.ts
├── tailwind.config.ts
└── package.json
```

---
