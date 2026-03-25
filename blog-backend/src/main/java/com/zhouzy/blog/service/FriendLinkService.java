package com.zhouzy.blog.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.zhouzy.blog.entity.FriendLink;
import com.zhouzy.blog.vo.FriendLinkVO;

import java.util.List;

/**
 * 友链 Service
 *
 * @author zhouzy
 */
public interface FriendLinkService extends IService<FriendLink> {

    /**
     * 获取已通过的友链列表
     */
    List<FriendLinkVO> listApprovedLinks();
}
