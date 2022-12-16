package com.example.backend.service;

import com.example.backend.model.Message;

import java.util.List;

public interface IMessageService {
    void saveMessage(Message message);
    List<Message> getAllMessages();
    Message getMessageById(Long id);
}
