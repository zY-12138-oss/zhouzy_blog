USE `zhouzy_blog`;

-- 10. 每日统计表
CREATE TABLE IF NOT EXISTS `analytics_daily` (
    `id`             BIGINT   PRIMARY KEY,
    `stat_date`      DATE     NOT NULL UNIQUE,
    `pv`             INT      NOT NULL DEFAULT 0,
    `uv`             INT      NOT NULL DEFAULT 0,
    `like_count`     INT      NOT NULL DEFAULT 0,
    `comment_count`  INT      NOT NULL DEFAULT 0,
    `new_user_count` INT      NOT NULL DEFAULT 0,
    `create_time`    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='每日统计表';

-- 11. RBAC 角色表
CREATE TABLE IF NOT EXISTS `sys_role` (
    `id`          BIGINT       PRIMARY KEY,
    `role_name`   VARCHAR(50)  NOT NULL UNIQUE,
    `role_code`   VARCHAR(50)  NOT NULL UNIQUE,
    `description` VARCHAR(255) NULL,
    `create_time` DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `update_time` DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `deleted`     TINYINT      NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='角色表';

CREATE TABLE IF NOT EXISTS `sys_permission` (
    `id`          BIGINT       PRIMARY KEY,
    `perm_name`   VARCHAR(100) NOT NULL,
    `perm_code`   VARCHAR(100) NOT NULL UNIQUE,
    `url`         VARCHAR(255) NULL,
    `method`      VARCHAR(10)  NULL,
    `create_time` DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `update_time` DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `deleted`     TINYINT      NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='权限表';

CREATE TABLE IF NOT EXISTS `sys_user_role` (
    `user_id` BIGINT NOT NULL,
    `role_id` BIGINT NOT NULL,
    PRIMARY KEY (`user_id`, `role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户角色关联表';

-- 12. 友链表
CREATE TABLE IF NOT EXISTS `friend_link` (
    `id`          BIGINT       PRIMARY KEY,
    `name`        VARCHAR(100) NOT NULL,
    `url`         VARCHAR(255) NOT NULL,
    `avatar`      VARCHAR(255) NULL,
    `description` VARCHAR(255) NULL,
    `sort`        INT          NOT NULL DEFAULT 0,
    `status`      TINYINT      NOT NULL DEFAULT 1 COMMENT '0-未通过 1-已通过',
    `create_time` DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `update_time` DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `deleted`     TINYINT      NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='友链表';

-- 13. 留言板表
CREATE TABLE IF NOT EXISTS `message` (
    `id`          BIGINT      PRIMARY KEY,
    `user_id`     BIGINT      NULL,
    `nickname`    VARCHAR(50) NULL,
    `content`     TEXT        NOT NULL,
    `status`      TINYINT     NOT NULL DEFAULT 0 COMMENT '0-待审核 1-已通过',
    `create_time` DATETIME    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `update_time` DATETIME    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `deleted`     TINYINT     NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='留言板表';

-- 14. 文件上传记录表
CREATE TABLE IF NOT EXISTS `file_info` (
    `id`          BIGINT       PRIMARY KEY,
    `user_id`     BIGINT       NOT NULL,
    `file_name`   VARCHAR(255) NOT NULL,
    `file_url`    VARCHAR(500) NOT NULL,
    `file_size`   BIGINT       NOT NULL,
    `file_type`   VARCHAR(50)  NULL,
    `create_time` DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `deleted`     TINYINT      NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='文件上传记录表';

-- =============================================
-- 初始化基础数据
-- =============================================

-- 默认分类
INSERT IGNORE INTO `category` (`id`, `name`, `slug`, `description`, `sort`) VALUES
(1, '技术笔记', 'tech', '编程、技术相关文章', 1),
(2, '生活随笔', 'life', '生活、随想、杂谈', 2),
(3, '读书笔记', 'book', '读书心得与笔记', 3);

-- 默认标签
INSERT IGNORE INTO `tag` (`id`, `name`, `slug`) VALUES
(1, 'Java', 'java'),
(2, 'Spring Boot', 'spring-boot'),
(3, 'Next.js', 'nextjs'),
(4, 'MySQL', 'mysql'),
(5, 'Redis', 'redis');

-- 管理员角色
INSERT IGNORE INTO `sys_role` (`id`, `role_name`, `role_code`, `description`) VALUES
(1, '超级管理员', 'ROLE_ADMIN', '系统最高权限'),
(2, '普通用户',   'ROLE_USER',  '普通注册用户');

-- 基础权限
INSERT IGNORE INTO `sys_permission` (`id`, `perm_name`, `perm_code`, `url`, `method`) VALUES
(1, '文章管理', 'article:manage', '/api/articles/**', NULL),
(2, '评论管理', 'comment:manage', '/api/comments/**', NULL),
(3, '用户管理', 'user:manage',    '/api/admin/**',    NULL);

-- 管理员账号（密码: admin123，BCrypt加密）
INSERT IGNORE INTO `user` (
    `id`, `username`, `nickname`, `password`, `email`, `avatar`, `signature`, `status`
) VALUES (
    202603240000000001,
    'admin',
    '超级管理员',
    '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBpwTTyU7TZe5i',
    'admin@zhouzy.com',
    'https://avatars.githubusercontent.com/u/1?v=4',
    '系统管理员，负责博客后台管理',
    1
);

-- 给管理员分配角色
INSERT IGNORE INTO `sys_user_role` (`user_id`, `role_id`) VALUES (202603240000000001, 1);

-- 友链示例
INSERT IGNORE INTO `friend_link` (`id`, `name`, `url`, `description`, `sort`, `status`) VALUES
(1, 'GitHub', 'https://github.com', '全球最大代码托管平台', 1, 1);

SET FOREIGN_KEY_CHECKS = 1;

SELECT 'zhouzy_blog database initialized successfully!' AS result;
