package com.zhouzy.blog.service.impl;

import com.zhouzy.blog.common.config.BlogProperties;
import com.zhouzy.blog.common.exception.BusinessException;
import com.zhouzy.blog.common.model.ResultCode;
import com.zhouzy.blog.common.util.SecurityUtil;
import com.zhouzy.blog.entity.FileInfo;
import com.zhouzy.blog.mapper.FileInfoMapper;
import com.zhouzy.blog.service.FileService;
import com.zhouzy.blog.vo.FileUploadVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.UUID;

/**
 * 文件上传 Service 实现
 *
 * @author zhouzy
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class FileServiceImpl implements FileService {

    private final BlogProperties blogProperties;
    private final FileInfoMapper fileInfoMapper;

    @Override
    public FileUploadVO upload(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new BusinessException(ResultCode.FILE_UPLOAD_FAIL);
        }
        // check size
        if (file.getSize() > blogProperties.getUpload().getMaxSize()) {
            throw new BusinessException(ResultCode.FILE_SIZE_EXCEEDED);
        }
        // check type
        String originalName = file.getOriginalFilename();
        String ext = getExtension(originalName);
        String allowedTypes = blogProperties.getUpload().getAllowedTypes();
        if (!Arrays.asList(allowedTypes.split(",")).contains(ext.toLowerCase())) {
            throw new BusinessException(ResultCode.FILE_TYPE_NOT_ALLOWED);
        }
        // build path: uploadPath/yyyy/MM/uuid.ext
        String datePath = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy/MM"));
        String newFileName = UUID.randomUUID() + "." + ext;
        String relativePath = datePath + "/" + newFileName;
        File dest = new File(blogProperties.getUpload().getPath() + File.separator + relativePath);
        dest.getParentFile().mkdirs();
        try {
            file.transferTo(dest);
        } catch (IOException e) {
            log.error("File upload failed", e);
            throw new BusinessException(ResultCode.FILE_UPLOAD_FAIL);
        }
        String fileUrl = blogProperties.getUpload().getUrlPrefix() + "/" + relativePath;

        // save record
        FileInfo fileInfo = new FileInfo();
        fileInfo.setUserId(SecurityUtil.getCurrentUserId());
        fileInfo.setFileName(originalName);
        fileInfo.setFileUrl(fileUrl);
        fileInfo.setFileSize(file.getSize());
        fileInfo.setFileType(ext);
        fileInfoMapper.insert(fileInfo);

        FileUploadVO vo = new FileUploadVO();
        vo.setId(fileInfo.getId());
        vo.setFileName(originalName);
        vo.setFileUrl(fileUrl);
        vo.setFileSize(file.getSize());
        vo.setFileType(ext);
        return vo;
    }

    private String getExtension(String fileName) {
        if (fileName == null || !fileName.contains(".")) return "";
        return fileName.substring(fileName.lastIndexOf('.') + 1);
    }
}
