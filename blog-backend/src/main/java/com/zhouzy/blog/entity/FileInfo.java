package com.zhouzy.blog.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * 文件上传记录实体
 *
 * @author zhouzy
 */
@Data
@TableName("file_info")
public class FileInfo implements Serializable {

    @TableId(type = IdType.ASSIGN_ID)
    private Long id;

    private Long userId;

    private String fileName;

    private String fileUrl;

    private Long fileSize;

    private String fileType;

    private LocalDateTime createTime;

    private Integer deleted;
}
