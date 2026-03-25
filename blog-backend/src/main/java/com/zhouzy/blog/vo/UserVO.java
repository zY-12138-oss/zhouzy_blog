package com.zhouzy.blog.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.time.LocalDateTime;

/**
 * 用户信息 VO
 *
 * @author zhouzy
 */
@Data
@Schema(description = "用户信息")
public class UserVO {

    @Schema(description = "用户ID")
    private Long id;

    @Schema(description = "用户名")
    private String username;

    @Schema(description = "昵称")
    private String nickname;

    @Schema(description = "邮箱")
    private String email;

    @Schema(description = "头像URL")
    private String avatar;

    @Schema(description = "个人签名")
    private String signature;

    @Schema(description = "所在地")
    private String location;

    @Schema(description = "GitHub")
    private String github;

    @Schema(description = "个人网站")
    private String website;

    @Schema(description = "状态")
    private Integer status;

    @Schema(description = "角色编码")
    private String roleCode;

    @Schema(description = "注册时间")
    private LocalDateTime createTime;
}
