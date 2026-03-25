package com.zhouzy.blog.common.annotation;

import java.lang.annotation.*;

/**
 * 需要登录注解
 *
 * @author zhouzy
 */
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface RequireLogin {
}
