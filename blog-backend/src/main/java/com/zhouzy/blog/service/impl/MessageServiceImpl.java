package com.zhouzy.blog.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.zhouzy.blog.common.model.PageResult;
import com.zhouzy.blog.common.util.SecurityUtil;
import com.zhouzy.blog.dto.MessageDTO;
import com.zhouzy.blog.entity.Message;
import com.zhouzy.blog.mapper.MessageMapper;
import com.zhouzy.blog.query.PageQuery;
import com.zhouzy.blog.service.MessageService;
import com.zhouzy.blog.vo.MessageVO;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

/**
 * 留言 Service 实现
 *
 * @author zhouzy
 */
@Service
@RequiredArgsConstructor
public class MessageServiceImpl extends ServiceImpl<MessageMapper, Message> implements MessageService {

    @Override
    public PageResult<MessageVO> listApprovedMessages(PageQuery query) {
        Page<Message> page = new Page<>(query.getCurrent(), query.getSize());
        page(page, new LambdaQueryWrapper<Message>()
                .eq(Message::getStatus, 1)
                .orderByDesc(Message::getCreateTime));
        Page<MessageVO> voPage = new Page<>();
        BeanUtils.copyProperties(page, voPage, "records");
        voPage.setRecords(page.getRecords().stream().map(m -> {
            MessageVO vo = new MessageVO();
            vo.setId(m.getId());
            vo.setNickname(m.getNickname());
            vo.setContent(m.getContent());
            vo.setCreateTime(m.getCreateTime());
            return vo;
        }).toList());
        return PageResult.of(voPage);
    }

    @Override
    public void submitMessage(MessageDTO dto) {
        Message message = new Message();
        Long userId = SecurityUtil.getCurrentUserId();
        message.setUserId(userId);
        message.setNickname(dto.getNickname());
        message.setContent(dto.getContent());
        message.setStatus(0); // pending review
        save(message);
    }
}
