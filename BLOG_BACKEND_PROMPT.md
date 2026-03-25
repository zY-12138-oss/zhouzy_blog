# 🚀 博客系统后端完整开发提示词

**项目名称**：zhouzy的博客系统后端  
**创建日期**：2026-03-24  
**技术栈**：Spring Boot 3 + MyBatis-Plus + MySQL 8 + Redis 7

---

## 📋 一、项目概述

你是一名高级Java后端工程师，负责从零开始构建一个**高性能、功能完整、安全可靠**的博客系统后端服务。

### 项目目标
- 为前端（Next.js）提供稳定、高效的RESTful API接口
- 支持完整的博客内容管理、用户体系、互动功能、数据分析
- 集成AI写作助手接口调用
- 满足高并发阅读场景下的性能要求
- 保证数据安全与系统稳定性

### 目标用户
- 技术博主、内容创作者、知识分享者

### 项目特色
1. **高性能文章读写分离**（读多写少）
2. **Redis缓存 + MySQL持久化** 双层缓存架构
3. **完整的权限与角色控制**（RBAC）
4. **实时互动**（点赞、评论、浏览量）
5. **数据分析与埋点统计**
6. **支持AI助手接口**
7. **分布式友好设计**（未来可扩展微服务）

---

## 🛠️ 二、技术栈规范

### 核心框架
- **框架**：Spring Boot 3.2+
- **构建工具**：Maven（推荐）或 Gradle
- **语言**：Java 17 或 Java 21（推荐）
- **ORM**：MyBatis-Plus 3.5+
- **数据库**：MySQL 8.0+
- **缓存**：Redis 7（Lettuce客户端）
- **API文档**：Springdoc OpenAPI 2.x（Knife4j增强）

### 核心依赖
- Spring Web
- Spring Data Redis
- Spring Security + JWT
- MyBatis-Plus + MyBatis-Plus Generator
- Lombok
- MapStruct
- Hutool
- EasyExcel（导出）
- Caffeine（二级本地缓存，可选）
- Redisson（分布式锁，可选）
- Spring Boot Actuator + Prometheus（监控）

### 其他技术
- **消息队列**：可选 RabbitMQ / RocketMQ（异步处理浏览量、点赞等）
- **搜索引擎**：可选 Elasticsearch（全文搜索）
- **文件存储**：本地 + 阿里云OSS / MinIO（推荐MinIO）
- **限流**：Sentinel 或 Guava RateLimiter
- **日志**：SLF4J + Logback + Loki（可选）

---

## 📁 三、项目目录结构
blog-backend/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/zhouzy/blog/
│   │   │       ├── BlogApplication.java
│   │   │       ├── common/                  # 通用模块
│   │   │       │   ├── config/
│   │   │       │   ├── constant/
│   │   │       │   ├── exception/
│   │   │       │   ├── model/               # 统一返回Result
│   │   │       │   ├── util/
│   │   │       │   └── annotation/
│   │   │       ├── controller/              # 接口层
│   │   │       ├── service/                 # 业务层
│   │   │       ├── mapper/                  # MyBatis-Plus Mapper
│   │   │       ├── entity/                  # 实体类
│   │   │       ├── vo/                      # 返回视图对象
│   │   │       ├── dto/                     # 请求数据传输对象
│   │   │       ├── query/                   # 查询条件对象
│   │   │       ├── security/                # 安全模块（JWT + RBAC）
│   │   │       ├── aspect/                  # AOP（日志、限流、权限）
│   │   │       ├── task/                    # 定时任务
│   │   │       ├── listener/                # 事件监听器
│   │   │       └── utils/
│   │   │
│   │   ├── resources/
│   │       ├── mapper/                      # XML Mapper（可选）
│   │       ├── application.yml
│   │       ├── application-dev.yml
│   │       ├── application-prod.yml
│   │       ├── logback-spring.xml
│   │       └── banner.txt
│   │
├── pom.xml
├── README.md
├── DEVELOPMENT.md
└── sql/
├── blog_init.sql                        # 初始化脚本
├── blog_update_*.sql                    # 升级脚本
text---

## 🗄️ 四、数据库设计（核心表结构）

### 主要表（推荐使用雪花ID + 软删除）

1. **user**（用户表）
2. **article**（文章表）
3. **category**（分类表）
4. **tag**（标签表）
5. **article_tag**（文章标签中间表）
6. **comment**（评论表，支持嵌套）
7. **like_record**（点赞记录表，防重复点赞）
8. **view_record**（浏览记录表，可选）
9. **draft**（草稿表）
10. **analytics_daily**（每日统计表）
11. **sys_role** / **sys_permission** / **sys_user_role**（RBAC权限）
12. **friend_link**（友情链接）
13. **message**（留言板）
14. **file_info**（文件上传记录）

**关键字段建议**：
- 所有表统一使用 `id`（bigint，雪花ID）、`create_time`、`update_time`、`deleted`（逻辑删除）
- 文章表增加 `view_count`、`like_count`、`comment_count` 冗余字段
- 评论表使用 `parent_id` + `root_id` 实现嵌套评论

---

## 🎯 五、核心接口规范（RESTful）

### 5.1 文章相关
- `GET    /api/articles`                  —— 文章列表（分页 + 条件查询）
- `GET    /api/articles/{id}`             —— 文章详情
- `POST   /api/articles`                  —— 创建文章
- `PUT    /api/articles/{id}`             —— 更新文章
- `DELETE /api/articles/{id}`             —— 删除文章
- `POST   /api/articles/{id}/publish`     —— 发布文章
- `GET    /api/articles/my`               —— 我的文章（分页）
- `GET    /api/articles/drafts`           —— 草稿列表

### 5.2 分类 & 标签
- `GET    /api/categories`
- `GET    /api/tags`
- `GET    /api/category/{slug}`
- `GET    /api/tag/{slug}`

### 5.3 互动功能
- `POST   /api/articles/{id}/like`
- `DELETE /api/articles/{id}/like`
- `POST   /api/comments`
- `GET    /api/comments/article/{articleId}`
- `DELETE /api/comments/{id}`

### 5.4 用户中心
- `POST   /api/auth/login`
- `POST   /api/auth/register`
- `POST   /api/auth/refresh`
- `GET    /api/user/info`
- `PUT    /api/user/profile`
- `POST   /api/user/avatar`

### 5.5 数据分析
- `GET    /api/analytics/overview`
- `GET    /api/analytics/views/trend`
- `GET    /api/analytics/article/rank`
- `GET    /api/analytics/geo`

### 5.6 AI助手（后端代理）
- `POST   /api/ai/suggest`          —— 内容补全、标题优化、SEO建议
- `POST   /api/ai/chat`             —— AI对话（流式返回）

### 5.7 文件上传
- `POST   /api/upload`              —— 单文件/多文件上传（支持图片、封面）

---

## 🔐 六、安全与权限设计

- 使用 **JWT + Refresh Token** 双令牌机制
- Spring Security + 自定义 `JwtAuthenticationFilter`
- 注解式权限控制：`@PreAuthorize`、`@RequireLogin`、`@RequireAdmin`
- 接口防刷：Redis + IP + 用户维度限流
- 敏感接口参数校验 + XSS过滤
- 密码使用 BCrypt 加密

---

## ⚡ 七、性能与缓存策略

### 缓存设计原则
- **首页文章列表**：Redis缓存（TTL 5分钟），设置缓存穿透、击穿、雪崩防护
- **文章详情**：Redis缓存（TTL 10分钟），阅读量使用Redis + 定时同步MySQL
- **热门文章 / 标签云**：Redis缓存
- **用户个人信息**：Redis缓存（TTL 30分钟）
- **浏览量、点赞量**：Redis计数器 + 异步落库（使用消息队列或定时任务）

### 异步处理
- 浏览量增加 → 消息队列 → 定时任务批量更新MySQL
- 点赞、评论 → 异步更新文章统计字段

---

## 📊 八、数据统计与分析

- 每日定时任务统计PV、UV、点赞、评论
- 使用Redis HyperLogLog统计UV（可选）
- 地域统计可通过IP解析（ip2region或第三方API）
- 提供可视化接口给前端ECharts使用

---

## 🛡️ 九、异常处理与统一返回

统一返回格式：
```json
{
  "code": 200,
  "message": "success",
  "data": {},
  "timestamp": 1742800000000
}
自定义异常体系：

BusinessException
AuthenticationException
AuthorizationException
全局异常处理器 @RestControllerAdvice
🚀 十一、开发流程与优先级（建议与前端对齐）
Phase 1：基础架构（1周）

项目初始化 + 配置文件
数据库表设计与初始化脚本
统一返回、异常处理、工具类
MyBatis-Plus代码生成器配置

Phase 2：用户与权限（1周）

用户表 + 登录注册 + JWT
RBAC权限体系

Phase 3：文章核心（2周）

分类、标签、文章CRUD
Markdown内容存储（存HTML或纯Markdown均可，推荐存Markdown+渲染HTML双字段）

Phase 4：互动功能（1周）

评论、点赞、浏览量

Phase 5：用户中心与文件上传（1周）
Phase 6：数据分析与缓存（1周）
Phase 7：AI接口代理 + 优化（1周）
Phase 8：测试、接口文档、部署（1周）

🎓 十二、开发规范

严格遵循阿里巴巴Java开发手册
Service层只处理业务逻辑，Mapper只做数据库操作
使用DTO接收请求，VO返回数据，禁止Entity直接暴露给前端
所有对外接口必须有详细的Swagger注解
重要业务添加事务 @Transactional
使用MapStruct做对象转换


✅ 十三、验收清单

 所有接口符合RESTful规范并返回统一格式
 接口文档（Knife4j）完整可访问
 核心接口性能测试（JMeter）：文章列表 < 100ms，详情 < 50ms（有缓存）
 Redis缓存命中率 > 85%
 实现防重复点赞、防刷评论
 JWT登录状态有效，Refresh Token机制正常
 文章浏览量异步更新正确
 支持前后端联调（CORS配置正确）
 数据库表结构合理，字段有注释
 生产环境配置文件分离，敏感信息不硬编码


🎯 十四、与前端对接建议

前端项目名称：zhouzy的博客系统前端
后端基础路径：/api
使用SWR / React Query 调用后端接口
所有图片资源返回完整可访问URL（支持CDN）
AI接口支持流式响应（SSE或WebFlux可选）
将以上内容打包成md文件，文件名称为BLOG_BACKEND_PROMPT.md


sql表：
-- =============================================
-- zhouzy 博客系统 - 初始化数据库脚本
-- 创建日期：2026-03-24
-- 数据库：MySQL 8.0+
-- 特点：雪花ID（bigint）、逻辑删除、统一时间字段
-- =============================================

CREATE DATABASE IF NOT EXISTS `zhouzy_blog` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `zhouzy_blog`;

-- =============================================
-- 1. 用户表
-- =============================================
CREATE TABLE `user` (
    `id`            BIGINT PRIMARY KEY COMMENT '用户ID（雪花ID）',
    `username`      VARCHAR(50)  NOT NULL UNIQUE COMMENT '用户名',
    `nickname`      VARCHAR(50)  NOT NULL COMMENT '昵称',
    `password`      VARCHAR(255) NOT NULL COMMENT '密码（BCrypt加密）',
    `email`         VARCHAR(100) NOT NULL UNIQUE COMMENT '邮箱',
    `avatar`        VARCHAR(255) NULL COMMENT '头像URL',
    `signature`     VARCHAR(255) NULL COMMENT '个人签名',
    `location`      VARCHAR(100) NULL COMMENT '所在地',
    `github`        VARCHAR(100) NULL COMMENT 'GitHub',
    `website`       VARCHAR(255) NULL COMMENT '个人网站',
    `status`        TINYINT      NOT NULL DEFAULT 1 COMMENT '状态：0-禁用 1-正常',
    `create_time`   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `update_time`   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `deleted`       TINYINT      NOT NULL DEFAULT 0 COMMENT '逻辑删除：0-未删除 1-已删除',
    INDEX idx_username(`username`),
    INDEX idx_email(`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户表';

-- =============================================
-- 2. 文章表
-- =============================================
CREATE TABLE `article` (
    `id`              BIGINT PRIMARY KEY COMMENT '文章ID（雪花ID）',
    `user_id`         BIGINT       NOT NULL COMMENT '作者ID',
    `title`           VARCHAR(255) NOT NULL COMMENT '标题',
    `summary`         VARCHAR(500) NULL COMMENT '摘要',
    `content_md`      LONGTEXT     NULL COMMENT 'Markdown原文',
    `content_html`    LONGTEXT     NULL COMMENT '渲染后的HTML',
    `cover`           VARCHAR(255) NULL COMMENT '封面图URL',
    `category_id`     BIGINT       NULL COMMENT '分类ID',
    `status`          TINYINT      NOT NULL DEFAULT 0 COMMENT '状态：0-草稿 1-已发布 2-已下架',
    `is_top`          TINYINT      NOT NULL DEFAULT 0 COMMENT '是否置顶',
    `allow_comment`   TINYINT      NOT NULL DEFAULT 1 COMMENT '是否允许评论',
    `view_count`      INT          NOT NULL DEFAULT 0 COMMENT '浏览量（冗余）',
    `like_count`      INT          NOT NULL DEFAULT 0 COMMENT '点赞量（冗余）',
    `comment_count`   INT          NOT NULL DEFAULT 0 COMMENT '评论量（冗余）',
    `publish_time`    DATETIME     NULL COMMENT '发布时间',
    `create_time`     DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `update_time`     DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `deleted`         TINYINT      NOT NULL DEFAULT 0 COMMENT '逻辑删除',
    INDEX idx_user_id(`user_id`),
    INDEX idx_category_id(`category_id`),
    INDEX idx_status(`status`),
    INDEX idx_is_top(`is_top`),
    INDEX idx_publish_time(`publish_time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='文章表';

-- =============================================
-- 3. 分类表
-- =============================================
CREATE TABLE `category` (
    `id`          BIGINT PRIMARY KEY COMMENT '分类ID（雪花ID）',
    `name`        VARCHAR(50)  NOT NULL UNIQUE COMMENT '分类名称',
    `slug`        VARCHAR(50)  NOT NULL UNIQUE COMMENT 'URL别名',
    `description` VARCHAR(255) NULL COMMENT '描述',
    `sort`        INT          NOT NULL DEFAULT 0 COMMENT '排序',
    `create_time` DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `update_time` DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `deleted`     TINYINT      NOT NULL DEFAULT 0,
    INDEX idx_slug(`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='分类表';

-- =============================================
-- 4. 标签表
-- =============================================
CREATE TABLE `tag` (
    `id`          BIGINT PRIMARY KEY COMMENT '标签ID（雪花ID）',
    `name`        VARCHAR(50)  NOT NULL UNIQUE COMMENT '标签名称',
    `slug`        VARCHAR(50)  NOT NULL UNIQUE COMMENT 'URL别名',
    `create_time` DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `update_time` DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `deleted`     TINYINT      NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='标签表';

-- =============================================
-- 5. 文章-标签中间表
-- =============================================
CREATE TABLE `article_tag` (
    `article_id` BIGINT NOT NULL COMMENT '文章ID',
    `tag_id`     BIGINT NOT NULL COMMENT '标签ID',
    PRIMARY KEY (`article_id`, `tag_id`),
    INDEX idx_tag_id(`tag_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='文章标签关联表';

-- =============================================
-- 6. 评论表（支持嵌套）
-- =============================================
CREATE TABLE `comment` (
    `id`          BIGINT PRIMARY KEY COMMENT '评论ID（雪花ID）',
    `article_id`  BIGINT       NOT NULL COMMENT '文章ID',
    `user_id`     BIGINT       NOT NULL COMMENT '评论用户ID',
    `parent_id`   BIGINT       NULL COMMENT '父评论ID（回复某条评论）',
    `root_id`     BIGINT       NULL COMMENT '根评论ID（最顶层评论）',
    `content`     TEXT         NOT NULL COMMENT '评论内容',
    `like_count`  INT          NOT NULL DEFAULT 0 COMMENT '点赞数',
    `status`      TINYINT      NOT NULL DEFAULT 1 COMMENT '状态：0-待审核 1-已通过 2-已拒绝',
    `create_time` DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `update_time` DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `deleted`     TINYINT      NOT NULL DEFAULT 0,
    INDEX idx_article_id(`article_id`),
    INDEX idx_parent_id(`parent_id`),
    INDEX idx_root_id(`root_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='评论表';

-- =============================================
-- 7. 点赞记录表（防重复点赞）
-- =============================================
CREATE TABLE `like_record` (
    `id`          BIGINT PRIMARY KEY COMMENT '主键',
    `user_id`     BIGINT   NOT NULL COMMENT '用户ID',
    `target_id`   BIGINT   NOT NULL COMMENT '目标ID（文章ID或评论ID）',
    `type`        TINYINT  NOT NULL COMMENT '类型：1-文章 2-评论',
    `create_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uk_user_target (`user_id`, `target_id`, `type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='点赞记录表';

-- =============================================
-- 8. 浏览记录表（可选，可用于精确统计）
-- =============================================
CREATE TABLE `view_record` (
    `id`          BIGINT PRIMARY KEY COMMENT '主键',
    `article_id`  BIGINT       NOT NULL COMMENT '文章ID',
    `user_id`     BIGINT       NULL COMMENT '用户ID（未登录为NULL）',
    `ip`          VARCHAR(50)  NULL COMMENT 'IP地址',
    `user_agent`  VARCHAR(255) NULL COMMENT 'User-Agent',
    `create_time` DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_article_id(`article_id`),
    INDEX idx_create_time(`create_time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='浏览记录表';

-- =============================================
-- 9. 草稿表
-- =============================================
CREATE TABLE `draft` (
    `id`           BIGINT PRIMARY KEY COMMENT '草稿ID（雪花ID）',
    `user_id`      BIGINT       NOT NULL COMMENT '用户ID',
    `title`        VARCHAR(255) NULL COMMENT '标题',
    `content_md`   LONGTEXT     NULL COMMENT 'Markdown内容',
    `summary`      VARCHAR(500) NULL COMMENT '摘要',
    `category_id`  BIGINT       NULL COMMENT '分类ID',
    `cover`        VARCHAR(255) NULL COMMENT '封面',
    `create_time`  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `update_time`  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `deleted`      TINYINT      NOT NULL DEFAULT 0,
    INDEX idx_user_id(`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='草稿表';

-- =============================================
-- 10. 每日数据统计表
-- =============================================
CREATE TABLE `analytics_daily` (
    `id`             BIGINT PRIMARY KEY COMMENT '主键',
    `stat_date`      DATE     NOT NULL COMMENT '统计日期',
    `pv`             INT      NOT NULL DEFAULT 0 COMMENT '页面浏览量',
    `uv`             INT      NOT NULL DEFAULT 0 COMMENT '独立访客',
    `like_count`     INT      NOT NULL DEFAULT 0 COMMENT '点赞总数',
    `comment_count`  INT      NOT NULL DEFAULT 0 COMMENT '评论总数',
    `new_user_count` INT      NOT NULL DEFAULT 0 COMMENT '新增用户数',
    `create_time`    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uk_stat_date(`stat_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='每日统计表';

-- =============================================
-- 11. RBAC 权限相关表
-- =============================================
CREATE TABLE `sys_role` (
    `id`          BIGINT PRIMARY KEY COMMENT '角色ID',
    `role_name`   VARCHAR(50)  NOT NULL UNIQUE COMMENT '角色名称',
    `role_code`   VARCHAR(50)  NOT NULL UNIQUE COMMENT '角色编码',
    `description` VARCHAR(255) NULL COMMENT '描述',
    `create_time` DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `update_time` DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `deleted`     TINYINT      NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='角色表';

CREATE TABLE `sys_permission` (
    `id`          BIGINT PRIMARY KEY COMMENT '权限ID',
    `perm_name`   VARCHAR(100) NOT NULL COMMENT '权限名称',
    `perm_code`   VARCHAR(100) NOT NULL UNIQUE COMMENT '权限编码',
    `url`         VARCHAR(255) NULL COMMENT '接口URL',
    `method`      VARCHAR(10)  NULL COMMENT '请求方法',
    `create_time` DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `update_time` DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `deleted`     TINYINT      NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='权限表';

CREATE TABLE `sys_user_role` (
    `user_id` BIGINT NOT NULL,
    `role_id` BIGINT NOT NULL,
    PRIMARY KEY (`user_id`, `role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户角色关联表';

-- =============================================
-- 12. 友情链接表
-- =============================================
CREATE TABLE `friend_link` (
    `id`          BIGINT PRIMARY KEY COMMENT 'ID',
    `name`        VARCHAR(100) NOT NULL COMMENT '网站名称',
    `url`         VARCHAR(255) NOT NULL COMMENT '网站地址',
    `avatar`      VARCHAR(255) NULL COMMENT '头像',
    `description` VARCHAR(255) NULL COMMENT '描述',
    `sort`        INT          NOT NULL DEFAULT 0 COMMENT '排序',
    `status`      TINYINT      NOT NULL DEFAULT 1 COMMENT '状态：0-未通过 1-已通过',
    `create_time` DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `update_time` DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `deleted`     TINYINT      NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='友情链接表';

-- =============================================
-- 13. 留言板表
-- =============================================
CREATE TABLE `message` (
    `id`          BIGINT PRIMARY KEY COMMENT '留言ID',
    `user_id`     BIGINT       NULL COMMENT '留言用户ID（未登录可为空）',
    `nickname`    VARCHAR(50)  NULL COMMENT '昵称（未登录时填写）',
    `content`     TEXT         NOT NULL COMMENT '留言内容',
    `status`      TINYINT      NOT NULL DEFAULT 0 COMMENT '状态：0-待审核 1-已通过',
    `create_time` DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `update_time` DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `deleted`     TINYINT      NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='留言板表';

-- =============================================
-- 14. 文件上传记录表
-- =============================================
CREATE TABLE `file_info` (
    `id`          BIGINT PRIMARY KEY COMMENT '文件ID',
    `user_id`     BIGINT       NOT NULL COMMENT '上传用户ID',
    `file_name`   VARCHAR(255) NOT NULL COMMENT '原始文件名',
    `file_url`    VARCHAR(500) NOT NULL COMMENT '访问URL',
    `file_size`   BIGINT       NOT NULL COMMENT '文件大小（字节）',
    `file_type`   VARCHAR(50)  NULL COMMENT '文件类型',
    `create_time` DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `deleted`     TINYINT      NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='文件上传记录表';

-- =============================================
-- 初始化基础数据
-- =============================================

-- 插入默认分类
INSERT INTO `category` (`id`, `name`, `slug`, `description`, `sort`) VALUES
(1, '技术笔记', 'tech', '编程、技术相关文章', 1),
(2, '生活随笔', 'life', '生活、随想、杂谈', 2),
(3, '读书笔记', 'book', '读书心得与笔记', 3);

-- 插入默认标签
INSERT INTO `tag` (`id`, `name`, `slug`) VALUES
(1, 'Java', 'java'),
(2, 'Spring Boot', 'spring-boot'),
(3, 'Next.js', 'nextjs'),
(4, 'MySQL', 'mysql');

-- 插入管理员角色
INSERT INTO `sys_role` (`id`, `role_name`, `role_code`, `description`) VALUES
(1, '超级管理员', 'ROLE_ADMIN', '系统最高权限');

-- 插入基础权限（示例，可后续扩展）
INSERT INTO `sys_permission` (`id`, `perm_name`, `perm_code`, `url`, `method`) VALUES
(1, '文章管理', 'article:manage', '/api/articles/**', NULL);

-- =============================================
-- 添加一个管理员账号（推荐）
-- 用户名：admin
-- 密码：admin123 （已使用BCrypt加密，实际生产请修改）
-- =============================================
INSERT INTO `user` (
    `id`, `username`, `nickname`, `password`, `email`, `avatar`, `signature`, `status`
) VALUES (
    202603240000000001, 
    'admin', 
    '超级管理员', 
    '$2a$10$8Kz5z5z5z5z5z5z5z5z5zO5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z',  -- BCrypt("admin123")
    'admin@zhouzy.com', 
    'https://example.com/avatar/admin.jpg',
    '系统管理员，负责博客后台管理', 
    1
);

-- 给管理员分配角色
INSERT INTO `sys_user_role` (`user_id`, `role_id`) VALUES (202603240000000001, 1);

-- =============================================
-- 完成
-- =============================================
SET FOREIGN_KEY_CHECKS = 1;

-- 查看所有表
SHOW TABLES;