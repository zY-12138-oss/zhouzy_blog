-- =============================================
-- zhouzy 博客系统 - 初始化数据库脚本
-- 创建日期：2026-03-24
-- 数据库：MySQL 8.0+
-- =============================================

CREATE DATABASE IF NOT EXISTS `zhouzy_blog`
    DEFAULT CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;
USE `zhouzy_blog`;

SET FOREIGN_KEY_CHECKS = 0;

-- 1. 用户表
CREATE TABLE IF NOT EXISTS `user` (
    `id`          BIGINT       PRIMARY KEY COMMENT '用户ID（雪花ID）',
    `username`    VARCHAR(50)  NOT NULL UNIQUE COMMENT '用户名',
    `nickname`    VARCHAR(50)  NOT NULL COMMENT '昵称',
    `password`    VARCHAR(255) NOT NULL COMMENT '密码（BCrypt）',
    `email`       VARCHAR(100) NOT NULL UNIQUE COMMENT '邮箱',
    `avatar`      VARCHAR(255) NULL COMMENT '头像URL',
    `signature`   VARCHAR(255) NULL COMMENT '个人签名',
    `location`    VARCHAR(100) NULL COMMENT '所在地',
    `github`      VARCHAR(100) NULL COMMENT 'GitHub',
    `website`     VARCHAR(255) NULL COMMENT '个人网站',
    `status`      TINYINT      NOT NULL DEFAULT 1 COMMENT '0-禁用 1-正常',
    `create_time` DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `update_time` DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `deleted`     TINYINT      NOT NULL DEFAULT 0,
    INDEX idx_username(`username`),
    INDEX idx_email(`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户表';

-- 2. 文章表
CREATE TABLE IF NOT EXISTS `article` (
    `id`            BIGINT       PRIMARY KEY COMMENT '文章ID（雪花ID）',
    `user_id`       BIGINT       NOT NULL COMMENT '作者ID',
    `title`         VARCHAR(255) NOT NULL COMMENT '标题',
    `summary`       VARCHAR(500) NULL COMMENT '摘要',
    `content_md`    LONGTEXT     NULL COMMENT 'Markdown原文',
    `content_html`  LONGTEXT     NULL COMMENT '渲染HTML',
    `cover`         VARCHAR(255) NULL COMMENT '封面图URL',
    `category_id`   BIGINT       NULL COMMENT '分类ID',
    `status`        TINYINT      NOT NULL DEFAULT 0 COMMENT '0-草稿 1-发布 2-下架',
    `is_top`        TINYINT      NOT NULL DEFAULT 0 COMMENT '是否置顶',
    `allow_comment` TINYINT      NOT NULL DEFAULT 1 COMMENT '是否允许评论',
    `view_count`    INT          NOT NULL DEFAULT 0 COMMENT '浏览量',
    `like_count`    INT          NOT NULL DEFAULT 0 COMMENT '点赞量',
    `comment_count` INT          NOT NULL DEFAULT 0 COMMENT '评论量',
    `publish_time`  DATETIME     NULL COMMENT '发布时间',
    `create_time`   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `update_time`   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `deleted`       TINYINT      NOT NULL DEFAULT 0,
    INDEX idx_user_id(`user_id`),
    INDEX idx_category_id(`category_id`),
    INDEX idx_status(`status`),
    INDEX idx_is_top(`is_top`),
    INDEX idx_publish_time(`publish_time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='文章表';

-- 3. 分类表
CREATE TABLE IF NOT EXISTS `category` (
    `id`          BIGINT       PRIMARY KEY,
    `name`        VARCHAR(50)  NOT NULL UNIQUE COMMENT '分类名称',
    `slug`        VARCHAR(50)  NOT NULL UNIQUE COMMENT 'URL别名',
    `description` VARCHAR(255) NULL,
    `sort`        INT          NOT NULL DEFAULT 0,
    `create_time` DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `update_time` DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `deleted`     TINYINT      NOT NULL DEFAULT 0,
    INDEX idx_slug(`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='分类表';

-- 4. 标签表
CREATE TABLE IF NOT EXISTS `tag` (
    `id`          BIGINT      PRIMARY KEY,
    `name`        VARCHAR(50) NOT NULL UNIQUE COMMENT '标签名称',
    `slug`        VARCHAR(50) NOT NULL UNIQUE COMMENT 'URL别名',
    `create_time` DATETIME    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `update_time` DATETIME    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `deleted`     TINYINT     NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='标签表';

-- 5. 文章标签关联表
CREATE TABLE IF NOT EXISTS `article_tag` (
    `article_id` BIGINT NOT NULL,
    `tag_id`     BIGINT NOT NULL,
    PRIMARY KEY (`article_id`, `tag_id`),
    INDEX idx_tag_id(`tag_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='文章标签关联表';

-- 6. 评论表
CREATE TABLE IF NOT EXISTS `comment` (
    `id`          BIGINT   PRIMARY KEY,
    `article_id`  BIGINT   NOT NULL,
    `user_id`     BIGINT   NOT NULL,
    `parent_id`   BIGINT   NULL COMMENT '父评论ID',
    `root_id`     BIGINT   NULL COMMENT '根评论ID',
    `content`     TEXT     NOT NULL,
    `like_count`  INT      NOT NULL DEFAULT 0,
    `status`      TINYINT  NOT NULL DEFAULT 1 COMMENT '0-待审核 1-通过 2-拒绝',
    `create_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `update_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `deleted`     TINYINT  NOT NULL DEFAULT 0,
    INDEX idx_article_id(`article_id`),
    INDEX idx_parent_id(`parent_id`),
    INDEX idx_root_id(`root_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='评论表';

-- 7. 点赞记录表
CREATE TABLE IF NOT EXISTS `like_record` (
    `id`          BIGINT   PRIMARY KEY,
    `user_id`     BIGINT   NOT NULL,
    `target_id`   BIGINT   NOT NULL,
    `type`        TINYINT  NOT NULL COMMENT '1-文章 2-评论',
    `create_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uk_user_target (`user_id`, `target_id`, `type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='点赞记录表';

-- 8. 浏览记录表
CREATE TABLE IF NOT EXISTS `view_record` (
    `id`          BIGINT       PRIMARY KEY,
    `article_id`  BIGINT       NOT NULL,
    `user_id`     BIGINT       NULL,
    `ip`          VARCHAR(50)  NULL,
    `user_agent`  VARCHAR(255) NULL,
    `create_time` DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_article_id(`article_id`),
    INDEX idx_create_time(`create_time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='浏览记录表';

-- 9. 草稿表
CREATE TABLE IF NOT EXISTS `draft` (
    `id`          BIGINT       PRIMARY KEY,
    `user_id`     BIGINT       NOT NULL,
    `title`       VARCHAR(255) NULL,
    `content_md`  LONGTEXT     NULL,
    `summary`     VARCHAR(500) NULL,
    `category_id` BIGINT       NULL,
    `cover`       VARCHAR(255) NULL,
    `create_time` DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `update_time` DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `deleted`     TINYINT      NOT NULL DEFAULT 0,
    INDEX idx_user_id(`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='草稿表';
