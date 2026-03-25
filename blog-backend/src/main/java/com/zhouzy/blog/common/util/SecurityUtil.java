package com.zhouzy.blog.common.util;

import com.zhouzy.blog.security.LoginUser;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

/**
 * 安全上下文工具类
 *
 * @author zhouzy
 */
public class SecurityUtil {

    private SecurityUtil() {}

    /**
     * 获取当前登录用户
     */
    public static LoginUser getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof LoginUser loginUser) {
            return loginUser;
        }
        return null;
    }

    /**
     * 获取当前登录用户ID
     */
    public static Long getCurrentUserId() {
        LoginUser user = getCurrentUser();
        return user != null ? user.getUserId() : null;
    }

    /**
     * 获取当前登录用户名
     */
    public static String getCurrentUsername() {
        LoginUser user = getCurrentUser();
        return user != null ? user.getUsername() : null;
    }

    /**
     * 判断当前用户是否已登录
     */
    public static boolean isLogin() {
        return getCurrentUser() != null;
    }

    /**
     * 判断当前用户是否是管理员
     */
    public static boolean isAdmin() {
        LoginUser user = getCurrentUser();
        if (user == null) return false;
        return user.getAuthorities().stream()
                .anyMatch(a -> "ROLE_ADMIN".equals(a.getAuthority()));
    }
}
