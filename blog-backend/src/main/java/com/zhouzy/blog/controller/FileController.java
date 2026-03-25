package com.zhouzy.blog.controller;

import com.zhouzy.blog.common.model.Result;
import com.zhouzy.blog.service.FileService;
import com.zhouzy.blog.vo.FileUploadVO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

/**
 * 文件上传接口
 *
 * @author zhouzy
 */
@Tag(name = "文件上传", description = "图片、封面上传")
@RestController
@RequestMapping("/api/upload")
@RequiredArgsConstructor
@SecurityRequirement(name = "Bearer Token")
public class FileController {

    private final FileService fileService;

    @Operation(summary = "上传文件")
    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public Result<FileUploadVO> upload(@RequestParam("file") MultipartFile file) {
        return Result.success(fileService.upload(file));
    }
}
