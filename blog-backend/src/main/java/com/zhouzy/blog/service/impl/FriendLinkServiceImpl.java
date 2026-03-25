package com.zhouzy.blog.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.zhouzy.blog.common.constant.CacheConstants;
import com.zhouzy.blog.common.util.RedisUtil;
import com.zhouzy.blog.entity.FriendLink;
import com.zhouzy.blog.mapper.FriendLinkMapper;
import com.zhouzy.blog.service.FriendLinkService;
import com.zhouzy.blog.vo.FriendLinkVO;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.TimeUnit;

/**
 * 友链 Service 实现
 *
 * @author zhouzy
 */
@Service
@RequiredArgsConstructor
public class FriendLinkServiceImpl extends ServiceImpl<FriendLinkMapper, FriendLink> implements FriendLinkService {

    private final RedisUtil redisUtil;

    @Override
    public List<FriendLinkVO> listApprovedLinks() {
        List<FriendLinkVO> cached = redisUtil.get(CacheConstants.FRIEND_LINK_LIST);
        if (cached != null) return cached;
        List<FriendLink> links = list(new LambdaQueryWrapper<FriendLink>()
                .eq(FriendLink::getStatus, 1)
                .orderByAsc(FriendLink::getSort));
        List<FriendLinkVO> vos = links.stream().map(l -> {
            FriendLinkVO vo = new FriendLinkVO();
            BeanUtils.copyProperties(l, vo);
            return vo;
        }).toList();
        redisUtil.set(CacheConstants.FRIEND_LINK_LIST, vos, 30, TimeUnit.MINUTES);
        return vos;
    }
}
