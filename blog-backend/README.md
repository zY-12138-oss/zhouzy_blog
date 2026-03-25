# zhouzy 博客系统后端

基于 **Spring Boot 3.2 + MyBatis-Plus + MySQL 8 + Redis 7** 构建的高性能博客系统后端。

## 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| Spring Boot | 3.2.3 | 核心框架 |
| MyBatis-Plus | 3.5.5 | ORM框架 |
| MySQL | 8.0+ | 主数据库 |
| Redis | 7.x | 缓存/计数器 |
| Spring Security + JWT | - | 认证授权 |
| Knife4j | 4.4.0 | API文档增强 |
| Redisson | 3.25.2 | 分布式锁 |
| Java | 21 | 运行时 |

## 快速开始

### 1. 环境要求
- JDK 21+
- MySQL 8.0+
- Redis 7.x
- Maven 3.8+

### 2. 数据库初始化
```bash
mysql -u root -p < sql/blog_init.sql
mysql -u root -p zhouzy_blog < sql/blog_init_part2.sql
```

### 3. 修改配置
编辑 `src/main/resources/application-dev.yml`：
```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/zhouzy_blog?...
    username: root
    password: your_password
  data:
    redis:
      host: localhost
      port: 6379

blog:
  jwt:
    secret: your-secret-key-at-least-32-bytes-long!
  upload:
    path: D:/blog-uploads
    url-prefix: http://localhost:8080/uploads
  ai:
    api-key: sk-your-openai-api-key
    model: gpt-4o
  cors:
    allowed-origins:
      - http://localhost:3000
```

### 4. 启动
```bash
mvn spring-boot:run
```

### 5. 访问接口文档
- **Knife4j UI**: http://localhost:8080/doc.html
- **健康检查**: http://localhost:8080/actuator/health

## 默认账号

| 用户名 | 密码 | 角色 |
|--------|------|------|
| admin | admin123 | 超级管理员 |

## 核心接口一览

### 认证
| 方法 | 路径 | 说明 |
|------|------|------|
| POST | /api/auth/login | 登录 |
| POST | /api/auth/register | 注册 |
| POST | /api/auth/refresh | 刷新Token |
| POST | /api/auth/logout | 登出 |

### 文章
| 方法 | 路径 | 说明 |
|------|------|------|
| GET | /api/articles | 文章列表（分页） |
| GET | /api/articles/{id} | 文章详情 |
| POST | /api/articles | 创建文章 |
| PUT | /api/articles/{id} | 更新文章 |
| DELETE | /api/articles/{id} | 删除文章 |
| POST | /api/articles/{id}/publish | 发布文章 |
| POST | /api/articles/{id}/like | 点赞 |
| GET | /api/articles/my | 我的文章 |

### 分类与标签
| 方法 | 路径 | 说明 |
|------|------|------|
| GET | /api/categories | 分类列表 |
| GET | /api/category/{slug} | 分类详情 |
| GET | /api/tags | 标签云 |
| GET | /api/tag/{slug} | 标签详情 |

### 评论
| 方法 | 路径 | 说明 |
|------|------|------|
| GET | /api/comments/article/{id} | 文章评论 |
| POST | /api/comments | 添加评论 |
| DELETE | /api/comments/{id} | 删除评论 |

### 用户
| 方法 | 路径 | 说明 |
|------|------|------|
| GET | /api/user/info | 当前用户信息 |
| PUT | /api/user/profile | 更新资料 |
| POST | /api/user/avatar | 上传头像 |
| PUT | /api/user/password | 修改密码 |

### 数据分析
| 方法 | 路径 | 说明 |
|------|------|------|
| GET | /api/analytics/overview | 概览统计 |
| GET | /api/analytics/views/trend | PV趋势 |
| GET | /api/analytics/article/rank | 文章排行 |
| POST | /api/analytics/track | 埋点PV |

### AI助手
| 方法 | 路径 | 说明 |
|------|------|------|
| POST | /api/ai/suggest | 内容建议 |
| POST | /api/ai/chat | 流式对话（SSE） |

### 文件上传
| 方法 | 路径 | 说明 |
|------|------|------|
| POST | /api/upload | 上传文件 |

## 项目结构

```
blog-backend/
├── src/main/java/com/zhouzy/blog/
│   ├── BlogApplication.java
│   ├── common/
│   │   ├── annotation/     # @RateLimit, @RequireLogin
│   │   ├── config/         # Redis, Security, Swagger, CORS...
│   │   ├── constant/       # CacheConstants, SystemConstants
│   │   ├── exception/      # 全局异常处理
│   │   ├── model/          # Result, PageResult, ResultCode
│   │   └── util/           # JwtUtil, RedisUtil, IpUtil...
│   ├── controller/         # 接口层
│   ├── service/            # 业务层
│   ├── mapper/             # MyBatis-Plus Mapper
│   ├── entity/             # 数据库实体
│   ├── dto/                # 请求DTO
│   ├── vo/                 # 响应VO
│   ├── query/              # 查询条件
│   ├── security/           # JWT + Spring Security
│   ├── aspect/             # AOP（限流）
│   └── task/               # 定时任务
├── src/main/resources/
│   ├── mapper/             # XML Mapper
│   ├── application.yml
│   ├── application-dev.yml
│   ├── application-prod.yml
│   └── logback-spring.xml
├── sql/
│   ├── blog_init.sql
│   └── blog_init_part2.sql
└── pom.xml
```

## 缓存策略

| 缓存项 | Key | TTL |
|--------|-----|-----|
| 文章详情 | `blog:article:detail:{id}` | 10分钟 |
| 文章浏览量 | `blog:article:view:{id}` | 永久（计数器） |
| 用户点赞Set | `blog:user:like:{userId}` | 永久 |
| 分类列表 | `blog:category:list` | 30分钟 |
| 标签云 | `blog:tag:cloud` | 30分钟 |
| 热门文章 | `blog:article:hot` | 30分钟 |
| RefreshToken | `blog:token:refresh:{userId}` | 7天 |
| 每日PV | `blog:analytics:pv:{date}` | 永久 |
| 每日UV | `blog:analytics:uv:{date}` | 永久（HLL） |

## 安全说明

- 密码使用 BCrypt 加密
- 双Token机制：AccessToken（2h）+ RefreshToken（7d）
- 接口白名单：公开文章、分类、标签等无需登录
- 管理员接口需 `ROLE_ADMIN` 权限
- 支持 `@RateLimit` 注解接口限流
- CORS 配置支持前端域名
