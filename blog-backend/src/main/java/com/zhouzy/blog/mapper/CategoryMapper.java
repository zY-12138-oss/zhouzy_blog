package com.zhouzy.blog.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.zhouzy.blog.entity.Category;
import com.zhouzy.blog.vo.CategoryVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * 分类 Mapper
 *
 * @author zhouzy
 */
@Mapper
public interface CategoryMapper extends BaseMapper<Category> {

    @Select("SELECT c.*, COUNT(a.id) AS articleCount FROM category c " +
            "LEFT JOIN article a ON a.category_id = c.id AND a.deleted = 0 AND a.status = 1 " +
            "WHERE c.deleted = 0 GROUP BY c.id ORDER BY c.sort ASC")
    List<CategoryVO> selectCategoryWithCount();

    @Select("SELECT * FROM category WHERE slug = #{slug} AND deleted = 0 LIMIT 1")
    Category selectBySlug(String slug);
}
