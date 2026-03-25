package com.zhouzy.blog.service;

import com.zhouzy.blog.vo.FileUploadVO;
import org.springframework.web.multipart.MultipartFile;

/**
 * 文件上传 Service
 *
 * @author zhouzy
 */
public interface FileService {

    /**
     * 上传文件
     */
    FileUploadVO upload(MultipartFile file);
}
