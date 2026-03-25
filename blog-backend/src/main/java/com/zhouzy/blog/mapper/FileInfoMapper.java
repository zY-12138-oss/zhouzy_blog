package com.zhouzy.blog.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.zhouzy.blog.entity.FileInfo;
import org.apache.ibatis.annotations.Mapper;

/**
 * 文件上传记录 Mapper
 *
 * @author zhouzy
 */
@Mapper
public interface FileInfoMapper extends BaseMapper<FileInfo> {
}
