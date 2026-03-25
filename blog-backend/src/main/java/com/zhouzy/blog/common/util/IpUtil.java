package com.zhouzy.blog.common.util;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;

/**
 * IP 工具类
 *
 * @author zhouzy
 */
@Slf4j
public class IpUtil {

    private IpUtil() {}

    /**
     * 获取客户端真实IP
     */
    public static String getClientIp(HttpServletRequest request) {
        String ip = request.getHeader("X-Forwarded-For");
        if (isValidIp(ip)) {
            return ip.contains(",") ? ip.split(",")[0].trim() : ip;
        }
        ip = request.getHeader("X-Real-IP");
        if (isValidIp(ip)) return ip;

        ip = request.getHeader("Proxy-Client-IP");
        if (isValidIp(ip)) return ip;

        ip = request.getHeader("WL-Proxy-Client-IP");
        if (isValidIp(ip)) return ip;

        ip = request.getHeader("HTTP_CLIENT_IP");
        if (isValidIp(ip)) return ip;

        ip = request.getHeader("HTTP_X_FORWARDED_FOR");
        if (isValidIp(ip)) return ip;

        return request.getRemoteAddr();
    }

    private static boolean isValidIp(String ip) {
        return ip != null && !ip.isEmpty() && !"unknown".equalsIgnoreCase(ip);
    }
}
