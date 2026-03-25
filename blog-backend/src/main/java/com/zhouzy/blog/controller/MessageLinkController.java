package com.zhouzy.blog.controller;

import com.zhouzy.blog.common.model.PageResult;
import com.zhouzy.blog.common.model.Result;
import com.zhouzy.blog.dto.MessageDTO;
import com.zhouzy.blog.query.PageQuery;
import com.zhouzy.blog.service.FriendLinkService;
import com.zhouzy.blog.service.MessageService;
import com.zhouzy.blog.vo.FriendLinkVO;
import com.zhouzy.blog.vo.MessageVO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 留言板 & 友链接口
 *
 * @author zhouzy
 */
@Tag(name = "留言板与友链", description = "留言列表、提交留言、友链列表")
@RestController
@RequiredArgsConstructor
public class MessageLinkController {

    private final MessageService messageService;
    private final FriendLinkService friendLinkService;

    @Operation(summary = "获取留言列表")
    @GetMapping("/api/messages")
    public Result<PageResult<MessageVO>> listMessages(PageQuery query) {
        return Result.success(messageService.listApprovedMessages(query));
    }

    @Operation(summary = "提交留言")
    @PostMapping("/api/messages")
    public Result<Void> submitMessage(@Valid @RequestBody MessageDTO dto) {
        messageService.submitMessage(dto);
        return Result.success();
    }

    @Operation(summary = "友链列表")
    @GetMapping("/api/friend-links")
    public Result<List<FriendLinkVO>> listLinks() {
        return Result.success(friendLinkService.listApprovedLinks());
    }
}
