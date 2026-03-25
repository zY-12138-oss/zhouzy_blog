package com.zhouzy.blog.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.zhouzy.blog.entity.Tag;
import com.zhouzy.blog.vo.TagVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * 标签 Mapper
 *
 * @author zhouzy
 */
@Mapper
public interface TagMapper extends BaseMapper<Tag> {

    @Select("SELECT t.*, COUNT(at.article_id) AS articleCount FROM tag t " +
            "LEFT JOIN article_tag at ON at.tag_id = t.id " +
            "LEFT JOIN article a ON a.id = at.article_id AND a.deleted = 0 AND a.status = 1 " +
            "WHERE t.deleted = 0 GROUP BY t.id ORDER BY articleCount DESC")
    List<TagVO> selectTagWithCount();

    @Select("SELECT * FROM tag WHERE slug = #{slug} AND deleted = 0 LIMIT 1")
    Tag selectBySlug(String slug);

    @Select("SELECT t.* FROM tag t INNER JOIN article_tag at ON at.tag_id = t.id " +
            "WHERE at.article_id = #{articleId} AND t.deleted = 0")
    List<Tag> selectByArticleId(Long articleId);
}
