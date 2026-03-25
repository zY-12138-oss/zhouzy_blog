package com.zhouzy.blog.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.zhouzy.blog.common.constant.CacheConstants;
import com.zhouzy.blog.common.util.RedisUtil;
import com.zhouzy.blog.entity.Tag;
import com.zhouzy.blog.mapper.TagMapper;
import com.zhouzy.blog.service.TagService;
import com.zhouzy.blog.vo.TagVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.TimeUnit;

/**
 * 标签 Service 实现
 *
 * @author zhouzy
 */
@Service
@RequiredArgsConstructor
public class TagServiceImpl extends ServiceImpl<TagMapper, Tag> implements TagService {

    private final RedisUtil redisUtil;

    @Override
    public List<TagVO> listTags() {
        List<TagVO> cached = redisUtil.get(CacheConstants.TAG_CLOUD);
        if (cached != null) return cached;
        List<TagVO> list = baseMapper.selectTagWithCount();
        redisUtil.set(CacheConstants.TAG_CLOUD, list, 30, TimeUnit.MINUTES);
        return list;
    }

    @Override
    public TagVO getTagBySlug(String slug) {
        Tag tag = baseMapper.selectBySlug(slug);
        if (tag == null) return null;
        TagVO vo = new TagVO();
        vo.setId(tag.getId());
        vo.setName(tag.getName());
        vo.setSlug(tag.getSlug());
        return vo;
    }
}
