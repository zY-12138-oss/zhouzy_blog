package com.zhouzy.blog.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Size;
import lombok.Data;

/**
 * 用户资料更新 DTO
 *
 * @author zhouzy
 */
@Data
@Schema(description = "用户资料更新请求")
public class UserProfileDTO {

    @Size(max = 50, message = "昵称不能超过50个字符")
    @Schema(description = "昵称")
    private String nickname;

    @Size(max = 255, message = "个人签名不能超过255个字符")
    @Schema(description = "个人签名")
    private String signature;

    @Size(max = 100, message = "所在地不能超过100个字符")
    @Schema(description = "所在地")
    private String location;

    @Schema(description = "GitHub地址")
    private String github;

    @Schema(description = "个人网站")
    private String website;
}
