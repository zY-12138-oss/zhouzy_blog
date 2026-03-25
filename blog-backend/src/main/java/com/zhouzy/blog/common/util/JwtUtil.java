package com.zhouzy.blog.common.util;

import com.zhouzy.blog.common.config.BlogProperties;
import com.zhouzy.blog.common.exception.AuthException;
import com.zhouzy.blog.common.model.ResultCode;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * JWT 工具类
 *
 * @author zhouzy
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class JwtUtil {

    private final BlogProperties blogProperties;

    private SecretKey getSigningKey() {
        byte[] keyBytes = blogProperties.getJwt().getSecret()
                .getBytes(StandardCharsets.UTF_8);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    /**
     * 生成 Access Token
     */
    public String generateAccessToken(Long userId, String username, String role) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", userId);
        claims.put("username", username);
        claims.put("role", role);
        return buildToken(claims, blogProperties.getJwt().getAccessTokenExpire() * 1000L);
    }

    /**
     * 生成 Refresh Token
     */
    public String generateRefreshToken(Long userId) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", userId);
        claims.put("type", "refresh");
        return buildToken(claims, blogProperties.getJwt().getRefreshTokenExpire() * 1000L);
    }

    private String buildToken(Map<String, Object> claims, long expireMillis) {
        return Jwts.builder()
                .claims(claims)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + expireMillis))
                .signWith(getSigningKey())
                .compact();
    }

    /**
     * 解析 Token
     */
    public Claims parseToken(String token) {
        try {
            return Jwts.parser()
                    .verifyWith(getSigningKey())
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();
        } catch (ExpiredJwtException e) {
            throw new AuthException(ResultCode.TOKEN_EXPIRED);
        } catch (JwtException e) {
            throw new AuthException(ResultCode.TOKEN_INVALID);
        }
    }

    /**
     * 从 Token 中获取用户ID
     */
    public Long getUserId(String token) {
        Claims claims = parseToken(token);
        return ((Number) claims.get("userId")).longValue();
    }

    /**
     * 从 Token 中获取用户名
     */
    public String getUsername(String token) {
        return parseToken(token).get("username", String.class);
    }

    /**
     * 从 Token 中获取角色
     */
    public String getRole(String token) {
        return parseToken(token).get("role", String.class);
    }

    /**
     * 判断 Token 是否过期
     */
    public boolean isTokenExpired(String token) {
        try {
            parseToken(token);
            return false;
        } catch (AuthException e) {
            return true;
        }
    }

    /**
     * 获取 Token 剩余有效期（秒）
     */
    public long getTokenRemainingSeconds(String token) {
        Claims claims = parseToken(token);
        long expireTime = claims.getExpiration().getTime();
        return (expireTime - System.currentTimeMillis()) / 1000;
    }
}
