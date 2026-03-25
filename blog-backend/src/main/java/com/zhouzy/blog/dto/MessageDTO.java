package com.zhouzy.blog.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

/**
 * 留言 DTO
 *
 * @author zhouzy
 */
@Data
@Schema(description = "留言请求")
public class MessageDTO {

    @Schema(description = "昵称（未登录时填写）")
    private String nickname;

    @NotBlank(message = "留言内容不能为空")
    @Schema(description = "留言内容")
    private String content;
}
