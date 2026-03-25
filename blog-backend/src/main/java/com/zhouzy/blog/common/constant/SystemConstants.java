package com.zhouzy.blog.common.constant;

/**
 * 系统常量
 *
 * @author zhouzy
 */
public interface SystemConstants {

    /** 默认分页大小 */
    int DEFAULT_PAGE_SIZE = 10;

    /** 最大分页大小 */
    int MAX_PAGE_SIZE = 100;

    /** 管理员角色编码 */
    String ROLE_ADMIN = "ROLE_ADMIN";

    /** 普通用户角色编码 */
    String ROLE_USER = "ROLE_USER";

    /** 文章状态：草稿 */
    int ARTICLE_STATUS_DRAFT = 0;

    /** 文章状态：已发布 */
    int ARTICLE_STATUS_PUBLISHED = 1;

    /** 文章状态：已下架 */
    int ARTICLE_STATUS_OFFLINE = 2;

    /** 评论状态：待审核 */
    int COMMENT_STATUS_PENDING = 0;

    /** 评论状态：已通过 */
    int COMMENT_STATUS_APPROVED = 1;

    /** 点赞类型：文章 */
    int LIKE_TYPE_ARTICLE = 1;

    /** 点赞类型：评论 */
    int LIKE_TYPE_COMMENT = 2;

    /** 用户状态：正常 */
    int USER_STATUS_NORMAL = 1;

    /** 用户状态：禁用 */
    int USER_STATUS_DISABLED = 0;

    /** 请求头 Token 字段 */
    String TOKEN_HEADER = "Authorization";

    /** Token 前缀 */
    String TOKEN_PREFIX = "Bearer ";

    /** 超级管理员默认用户名 */
    String ADMIN_USERNAME = "admin";
}
