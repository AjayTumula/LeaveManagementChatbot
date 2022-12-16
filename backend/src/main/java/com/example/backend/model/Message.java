package com.example.backend.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Message {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String fromUser;

    private String text;

    private Boolean isBot = true;

    public Message(String fromUser, String text, Boolean isBot) {
        this.fromUser = fromUser;
        this.text = text;
        this.isBot = isBot;
    }
}
