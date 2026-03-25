package com.zhouzy.blog.controller;

import com.zhouzy.blog.common.config.BlogProperties;
import com.zhouzy.blog.common.model.Result;
import com.zhouzy.blog.dto.AiRequestDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;

import java.util.List;
import java.util.Map;

/**
 * AI 接口代理
 *
 * @author zhouzy
 */
@Slf4j
@Tag(name = "AI助手", description = "内容建议、流式对话")
@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
@SecurityRequirement(name = "Bearer Token")
public class AiController {

    private final BlogProperties blogProperties;
    private final WebClient.Builder webClientBuilder;

    @Operation(summary = "内容建议（标题优化/SEO/摘要）")
    @PostMapping("/suggest")
    @PreAuthorize("isAuthenticated()")
    public Result<String> suggest(@Valid @RequestBody AiRequestDTO dto) {
        String prompt = buildPrompt(dto);
        try {
            WebClient client = webClientBuilder.baseUrl(blogProperties.getAi().getApiUrl()).build();
            Map<?, ?> response = client.post()
                    .uri("/chat/completions")
                    .header("Authorization", "Bearer " + blogProperties.getAi().getApiKey())
                    .contentType(MediaType.APPLICATION_JSON)
                    .bodyValue(Map.of(
                            "model", blogProperties.getAi().getModel(),
                            "messages", List.of(Map.of("role", "user", "content", prompt)),
                            "max_tokens", blogProperties.getAi().getMaxTokens()
                    ))
                    .retrieve()
                    .bodyToMono(Map.class)
                    .block();
            if (response != null && response.containsKey("choices")) {
                List<?> choices = (List<?>) response.get("choices");
                if (!choices.isEmpty()) {
                    Map<?, ?> choice = (Map<?, ?>) choices.get(0);
                    Map<?, ?> message = (Map<?, ?>) choice.get("message");
                    return Result.success((String) message.get("content"));
                }
            }
            return Result.fail("AI服务暂时不可用");
        } catch (Exception e) {
            log.error("AI request failed", e);
            return Result.fail("AI服务调用失败：" + e.getMessage());
        }
    }

    @Operation(summary = "AI流式对话（SSE）")
    @PostMapping(value = "/chat", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    @PreAuthorize("isAuthenticated()")
    public Flux<String> chat(@Valid @RequestBody AiRequestDTO dto) {
        String prompt = dto.getContent();
        WebClient client = webClientBuilder.baseUrl(blogProperties.getAi().getApiUrl()).build();
        return client.post()
                .uri("/chat/completions")
                .header("Authorization", "Bearer " + blogProperties.getAi().getApiKey())
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(Map.of(
                        "model", blogProperties.getAi().getModel(),
                        "messages", List.of(Map.of("role", "user", "content", prompt)),
                        "max_tokens", blogProperties.getAi().getMaxTokens(),
                        "stream", true
                ))
                .retrieve()
                .bodyToFlux(String.class)
                .onErrorResume(e -> {
                    log.error("AI stream error", e);
                    return Flux.just("[ERROR] AI服务异常");
                });
    }

    private String buildPrompt(AiRequestDTO dto) {
        return switch (dto.getType()) {
            case "seo" -> "请为以下文章内容提供SEO优化建议（标题、描述、关键词）：\n" + dto.getContent();
            case "grammar" -> "请检查以下文章内容的语法和表达，并给出修改建议：\n" + dto.getContent();
            case "completion" -> "请根据以下内容续写文章：\n" + dto.getContent();
            default -> dto.getContent();
        };
    }
}
