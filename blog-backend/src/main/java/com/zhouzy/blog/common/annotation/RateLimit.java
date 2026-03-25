package com.zhouzy.blog.common.annotation;

import java.lang.annotation.*;
import java.util.concurrent.TimeUnit;

/**
 * 接口限流注解
 *
 * @author zhouzy
 */
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface RateLimit {

    /** 最大请求次数 */
    int count() default 60;

    /** 时间窗口 */
    long time() default 60;

    /** 时间单位 */
    TimeUnit timeUnit() default TimeUnit.SECONDS;

    /** 限流提示信息 */
    String message() default "请求过于频繁，请稍后再试";
}
