package com.zhouzy.blog;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;

/**
 * zhouzy 博客系统后端启动类
 *
 * @author zhouzy
 * @since 2026-03-24
 */
@SpringBootApplication
@MapperScan("com.zhouzy.blog.mapper")
@EnableCaching
@EnableAsync
@EnableScheduling
public class BlogApplication {

    public static void main(String[] args) {
        SpringApplication.run(BlogApplication.class, args);
        System.out.println("\n========================================\n" +
                "  zhouzy 博客系统后端 启动成功!\n" +
                "  接口文档: http://localhost:8080/doc.html\n" +
                "========================================\n");
    }
}
