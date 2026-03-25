package com.zhouzy.blog.controller;

import com.zhouzy.blog.common.constant.SystemConstants;
import com.zhouzy.blog.common.model.Result;
import com.zhouzy.blog.dto.LoginDTO;
import com.zhouzy.blog.dto.RegisterDTO;
import com.zhouzy.blog.service.AuthService;
import com.zhouzy.blog.vo.LoginVO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

/**
 * 认证接口
 *
 * @author zhouzy
 */
@Tag(name = "认证接口", description = "登录、注册、Token刷新")
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @Operation(summary = "登录")
    @PostMapping("/login")
    public Result<LoginVO> login(@Valid @RequestBody LoginDTO loginDTO) {
        return Result.success(authService.login(loginDTO));
    }

    @Operation(summary = "注册")
    @PostMapping("/register")
    public Result<Void> register(@Valid @RequestBody RegisterDTO registerDTO) {
        authService.register(registerDTO);
        return Result.success();
    }

    @Operation(summary = "刷新Token")
    @PostMapping("/refresh")
    public Result<LoginVO> refresh(@RequestHeader("X-Refresh-Token") String refreshToken) {
        return Result.success(authService.refreshToken(refreshToken));
    }

    @Operation(summary = "登出")
    @PostMapping("/logout")
    public Result<Void> logout(HttpServletRequest request) {
        String header = request.getHeader(SystemConstants.TOKEN_HEADER);
        if (StringUtils.hasText(header) && header.startsWith(SystemConstants.TOKEN_PREFIX)) {
            authService.logout(header.substring(SystemConstants.TOKEN_PREFIX.length()));
        }
        return Result.success();
    }
}
