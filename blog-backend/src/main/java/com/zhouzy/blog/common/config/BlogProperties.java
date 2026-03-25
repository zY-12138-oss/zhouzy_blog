package com.zhouzy.blog.common.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * 博客系统自定义配置属性
 *
 * @author zhouzy
 */
@Data
@Component
@ConfigurationProperties(prefix = "blog")
public class BlogProperties {

    private Jwt jwt = new Jwt();
    private Upload upload = new Upload();
    private Ai ai = new Ai();
    private Cors cors = new Cors();

    @Data
    public static class Jwt {
        private String secret = "zhouzy-blog-secret-key-2026-must-be-at-least-32-bytes-long!";
        private long accessTokenExpire = 7200;
        private long refreshTokenExpire = 604800;
    }

    @Data
    public static class Upload {
        private String path = "D:/blog-uploads";
        private String urlPrefix = "http://localhost:8080/uploads";
        private String allowedTypes = "jpg,jpeg,png,gif,webp,svg";
        private long maxSize = 5242880;
    }

    @Data
    public static class Ai {
        private String apiUrl = "https://api.openai.com/v1";
        private String apiKey = "";
        private String model = "gpt-4o";
        private int maxTokens = 2048;
    }

    @Data
    public static class Cors {
        private List<String> allowedOrigins = List.of("http://localhost:3000");
    }
}
