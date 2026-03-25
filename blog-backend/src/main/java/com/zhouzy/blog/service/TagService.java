package com.zhouzy.blog.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.zhouzy.blog.entity.Tag;
import com.zhouzy.blog.vo.TagVO;

import java.util.List;

/**
 * 标签 Service
 *
 * @author zhouzy
 */
public interface TagService extends IService<Tag> {

    /**
     * 获取所有标签（含文章数）
     */
    List<TagVO> listTags();

    /**
     * 根据slug获取标签
     */
    TagVO getTagBySlug(String slug);
}
