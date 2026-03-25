package com.zhouzy.blog.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

/**
 * 文件上传结果 VO
 *
 * @author zhouzy
 */
@Data
@Schema(description = "文件上传结果")
public class FileUploadVO {

    @Schema(description = "文件ID")
    private Long id;

    @Schema(description = "文件名")
    private String fileName;

    @Schema(description = "访问URL")
    private String fileUrl;

    @Schema(description = "文件大小（字节）")
    private Long fileSize;

    @Schema(description = "文件类型")
    private String fileType;
}
