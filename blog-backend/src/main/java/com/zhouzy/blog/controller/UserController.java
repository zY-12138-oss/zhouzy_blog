package com.zhouzy.blog.controller;

import com.zhouzy.blog.common.model.Result;
import com.zhouzy.blog.dto.ChangePasswordDTO;
import com.zhouzy.blog.dto.UserProfileDTO;
import com.zhouzy.blog.service.FileService;
import com.zhouzy.blog.service.UserService;
import com.zhouzy.blog.vo.FileUploadVO;
import com.zhouzy.blog.vo.UserVO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

/**
 * 用户中心接口
 *
 * @author zhouzy
 */
@Tag(name = "用户中心", description = "用户信息、头像、密码")
@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
@SecurityRequirement(name = "Bearer Token")
public class UserController {

    private final UserService userService;
    private final FileService fileService;

    @Operation(summary = "获取当前用户信息")
    @GetMapping("/info")
    @PreAuthorize("isAuthenticated()")
    public Result<UserVO> getUserInfo() {
        return Result.success(userService.getCurrentUserInfo());
    }

    @Operation(summary = "更新用户资料")
    @PutMapping("/profile")
    @PreAuthorize("isAuthenticated()")
    public Result<Void> updateProfile(@Valid @RequestBody UserProfileDTO dto) {
        userService.updateProfile(dto);
        return Result.success();
    }

    @Operation(summary = "上传头像")
    @PostMapping("/avatar")
    @PreAuthorize("isAuthenticated()")
    public Result<String> uploadAvatar(@RequestParam("file") MultipartFile file) {
        FileUploadVO vo = fileService.upload(file);
        userService.updateAvatar(vo.getFileUrl());
        return Result.success(vo.getFileUrl());
    }

    @Operation(summary = "修改密码")
    @PutMapping("/password")
    @PreAuthorize("isAuthenticated()")
    public Result<Void> changePassword(@Valid @RequestBody ChangePasswordDTO dto) {
        userService.changePassword(dto);
        return Result.success();
    }
}
