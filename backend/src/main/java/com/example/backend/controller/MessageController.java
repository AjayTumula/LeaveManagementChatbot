package com.example.backend.controller;

import com.example.backend.dto.MessageResponse;
import com.example.backend.model.Leave;
import com.example.backend.model.Message;
import com.example.backend.service.ILeaveService;
import com.example.backend.service.impl.MessageService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@CrossOrigin(origins = "*")
public class MessageController {
    @Autowired
    private MessageService messageService;

    @Autowired
    private ILeaveService leaveService;

    // whenever the ....setMsg==m.getText() ....then only reply will
    // execute,otherwise reply will not execute

    @PostMapping("/chat")
    private ResponseEntity<?> postChat(@RequestBody Message m, Leave l) {
        HashMap<String, String> res = new HashMap<>();
        try {

            MessageResponse response = new MessageResponse();
            if (m.getText().equals("Hi")) {
                response.setMsg("Hi");
                response.setReply("welcome to leave management");
            } else if (m.getText().equals("Hello")) {
                response.setMsg("Hello");
                response.setReply("what are you looking for");
            } else if (m.getText().equals("i want leave for few days")) {
                response.setMsg("i want leave for few days");
                response.setReply("no leave is not granted");
            } else if (m.getText().equals("could you please give me leave for few days")) {
                response.setMsg("could you please give me leave for few days");
                response.setReply("ok take");
            } else if (m.getText().equals("my health condition is not good")) {
                response.setMsg("my health condition is not good");
                response.setReply("why you need a leave?");
            } else if (m.getText().equals("Cancel Leave")) {
                response.setMsg("Cancel Leave");
                response.setReply("ok then,leave cancelled");
            } else if (m.getText().equals("Apply leave")) {
                response.setMsg("Apply leave");
                response.setReply("Date");
            } else if (m.getText().equals("My leaves")) {
                response.setMsg("My leaves");
                response.setReply("available Leaves");
            } else if (m.getText().equals("Thank you")) {
                response.setMsg("Thank you");
                response.setReply("u'r Welcome");
            } else if (m.getText() != "Hi" ||
                    m.getText() != "Apply leave" ||
                    m.getText() != "My leaves" ||
                    m.getText() != "Cancel Leave" ||
                    m.getText() != "Thank you") {
                response.setReply("invalid message entered");
            }  else {
                res.put("error", "enter a valid message");
                return new ResponseEntity<>(res, HttpStatus.OK);
            }
            return new ResponseEntity<>(response, HttpStatus.OK);

        } catch (Exception e) {
            res.put("error", e.getMessage());
            return new ResponseEntity<>(res, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/chats")
    private ResponseEntity<?> getAllChats() {
        try {
            return new ResponseEntity<>(messageService.getAllMessages(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/chat/{id}")
    private ResponseEntity<?> getMessageById(@PathVariable Long id) {
        try {
            return new ResponseEntity<>(messageService.getMessageById(id), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
