package com.zhouzy.blog.common.constant;

/**
 * 缓存Key常量
 *
 * @author zhouzy
 */
public interface CacheConstants {

    /** 文章列表缓存前缀，TTL 5分钟 */
    String ARTICLE_LIST = "blog:article:list:";

    /** 文章详情缓存前缀，TTL 10分钟 */
    String ARTICLE_DETAIL = "blog:article:detail:";

    /** 文章浏览量 Redis计数器 */
    String ARTICLE_VIEW_COUNT = "blog:article:view:";

    /** 文章点赞量 Redis计数器 */
    String ARTICLE_LIKE_COUNT = "blog:article:like:";

    /** 用户点赞记录 Set，防重复 */
    String USER_LIKE_SET = "blog:user:like:";

    /** 热门文章缓存，TTL 30分钟 */
    String HOT_ARTICLES = "blog:article:hot";

    /** 标签云缓存，TTL 30分钟 */
    String TAG_CLOUD = "blog:tag:cloud";

    /** 分类列表缓存，TTL 30分钟 */
    String CATEGORY_LIST = "blog:category:list";

    /** 用户信息缓存，TTL 30分钟 */
    String USER_INFO = "blog:user:info:";

    /** Refresh Token前缀 */
    String REFRESH_TOKEN = "blog:token:refresh:";

    /** 接口限流前缀 */
    String RATE_LIMIT = "blog:rate:limit:";

    /** UV统计 HyperLogLog */
    String UV_HYPERLOGLOG = "blog:analytics:uv:";

    /** 每日PV计数 */
    String PV_COUNT = "blog:analytics:pv:";

    /** 友链缓存 */
    String FRIEND_LINK_LIST = "blog:friend:link:list";
}
