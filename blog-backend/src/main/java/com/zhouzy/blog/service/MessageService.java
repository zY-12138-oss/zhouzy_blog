package com.zhouzy.blog.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.zhouzy.blog.common.model.PageResult;
import com.zhouzy.blog.dto.MessageDTO;
import com.zhouzy.blog.entity.Message;
import com.zhouzy.blog.query.PageQuery;
import com.zhouzy.blog.vo.MessageVO;

/**
 * 留言 Service
 *
 * @author zhouzy
 */
public interface MessageService extends IService<Message> {

    /**
     * 获取已通过的留言列表
     */
    PageResult<MessageVO> listApprovedMessages(PageQuery query);

    /**
     * 提交留言
     */
    void submitMessage(MessageDTO dto);
}
