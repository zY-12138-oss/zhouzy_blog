package com.zhouzy.blog.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.zhouzy.blog.entity.Category;
import com.zhouzy.blog.vo.CategoryVO;

import java.util.List;

/**
 * 分类 Service
 *
 * @author zhouzy
 */
public interface CategoryService extends IService<Category> {

    /**
     * 获取所有分类（含文章数）
     */
    List<CategoryVO> listCategories();

    /**
     * 根据slug获取分类
     */
    CategoryVO getCategoryBySlug(String slug);
}
