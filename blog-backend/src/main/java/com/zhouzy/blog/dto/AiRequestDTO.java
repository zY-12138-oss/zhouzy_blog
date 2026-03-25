package com.zhouzy.blog.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

/**
 * AI 请求 DTO
 *
 * @author zhouzy
 */
@Data
@Schema(description = "AI请求")
public class AiRequestDTO {

    @NotBlank(message = "内容不能为空")
    @Schema(description = "用户输入内容")
    private String content;

    @Schema(description = "请求类型：completion/grammar/seo/chat", example = "chat")
    private String type = "chat";

    @Schema(description = "文章上下文（可选）")
    private String context;
}
