package com.zhouzy.blog.common.model;

import lombok.Getter;

/**
 * 响应状态码枚举
 *
 * @author zhouzy
 */
@Getter
public enum ResultCode {

    SUCCESS(200, "操作成功"),
    FAIL(400, "操作失败"),
    UNAUTHORIZED(401, "未登录或token已过期"),
    FORBIDDEN(403, "无权限访问"),
    NOT_FOUND(404, "资源不存在"),
    METHOD_NOT_ALLOWED(405, "请求方法不允许"),
    TOO_MANY_REQUESTS(429, "请求过于频繁，请稍后再试"),
    INTERNAL_ERROR(500, "服务器内部错误"),

    // 用户相关
    USER_NOT_FOUND(1001, "用户不存在"),
    USER_DISABLED(1002, "用户已被禁用"),
    USER_ALREADY_EXISTS(1003, "用户名或邮箱已存在"),
    PASSWORD_ERROR(1004, "密码错误"),
    OLD_PASSWORD_ERROR(1005, "原密码错误"),

    // 文章相关
    ARTICLE_NOT_FOUND(2001, "文章不存在"),
    ARTICLE_NOT_PUBLISHED(2002, "文章未发布"),
    ARTICLE_NO_PERMISSION(2003, "无权操作此文章"),

    // 评论相关
    COMMENT_NOT_FOUND(3001, "评论不存在"),
    COMMENT_NOT_ALLOWED(3002, "该文章不允许评论"),

    // 文件相关
    FILE_UPLOAD_FAIL(4001, "文件上传失败"),
    FILE_TYPE_NOT_ALLOWED(4002, "文件类型不允许"),
    FILE_SIZE_EXCEEDED(4003, "文件大小超出限制"),

    // Token相关
    TOKEN_INVALID(5001, "token无效"),
    TOKEN_EXPIRED(5002, "token已过期"),
    REFRESH_TOKEN_INVALID(5003, "refresh token无效或已过期");

    private final Integer code;
    private final String message;

    ResultCode(Integer code, String message) {
        this.code = code;
        this.message = message;
    }
}
