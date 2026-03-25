package com.zhouzy.blog.security.filter;

import com.zhouzy.blog.common.constant.SystemConstants;
import com.zhouzy.blog.common.exception.AuthException;
import com.zhouzy.blog.common.util.JwtUtil;
import com.zhouzy.blog.security.LoginUser;
import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

/**
 * JWT 认证过滤器
 *
 * @author zhouzy
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        String token = resolveToken(request);
        if (StringUtils.hasText(token)) {
            try {
                Claims claims = jwtUtil.parseToken(token);
                Long userId = ((Number) claims.get("userId")).longValue();
                String username = claims.get("username", String.class);
                String role = claims.get("role", String.class);

                LoginUser loginUser = new LoginUser();
                loginUser.setUserId(userId);
                loginUser.setUsername(username);
                loginUser.setStatus(1);
                loginUser.setAuthorities(List.of(new SimpleGrantedAuthority(role)));

                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(loginUser, null, loginUser.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(authentication);
            } catch (AuthException e) {
                log.debug("JWT parse failed: {}", e.getMessage());
                SecurityContextHolder.clearContext();
            }
        }
        filterChain.doFilter(request, response);
    }

    private String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader(SystemConstants.TOKEN_HEADER);
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith(SystemConstants.TOKEN_PREFIX)) {
            return bearerToken.substring(SystemConstants.TOKEN_PREFIX.length());
        }
        return null;
    }
}
