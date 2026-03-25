package com.zhouzy.blog.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.zhouzy.blog.common.constant.CacheConstants;
import com.zhouzy.blog.common.util.RedisUtil;
import com.zhouzy.blog.entity.Category;
import com.zhouzy.blog.mapper.CategoryMapper;
import com.zhouzy.blog.service.CategoryService;
import com.zhouzy.blog.vo.CategoryVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.TimeUnit;

/**
 * 分类 Service 实现
 *
 * @author zhouzy
 */
@Service
@RequiredArgsConstructor
public class CategoryServiceImpl extends ServiceImpl<CategoryMapper, Category> implements CategoryService {

    private final RedisUtil redisUtil;

    @Override
    public List<CategoryVO> listCategories() {
        List<CategoryVO> cached = redisUtil.get(CacheConstants.CATEGORY_LIST);
        if (cached != null) return cached;
        List<CategoryVO> list = baseMapper.selectCategoryWithCount();
        redisUtil.set(CacheConstants.CATEGORY_LIST, list, 30, TimeUnit.MINUTES);
        return list;
    }

    @Override
    public CategoryVO getCategoryBySlug(String slug) {
        Category category = baseMapper.selectBySlug(slug);
        if (category == null) return null;
        CategoryVO vo = new CategoryVO();
        vo.setId(category.getId());
        vo.setName(category.getName());
        vo.setSlug(category.getSlug());
        vo.setDescription(category.getDescription());
        vo.setSort(category.getSort());
        return vo;
    }
}
