package com.example.backend.controller;

import com.example.backend.model.Leave;
import com.example.backend.model.User;
import com.example.backend.service.ILeaveService;
import com.example.backend.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;

@RestController
@CrossOrigin(origins = "*")
public class LeaveController {
    @Autowired
    private ILeaveService leaveService;
    @Autowired
    private IUserService userService;
    @Autowired
    private HttpServletRequest req;
    @PutMapping("/leaves/{id}")
    private ResponseEntity<?> updateLeave(@PathVariable Long id, @RequestBody HashMap<String, Boolean> body) {
        HashMap<String, String> res = new HashMap<>();
        try {
            Leave leave = leaveService.getById(id);
            leave.setIsApproved(body.get("isApproved"));

            leaveService.save(leave);
            return new ResponseEntity<>(leave, HttpStatus.OK);
        } catch (Exception e) {
            res.put("message", "Leave not updated");
            return new ResponseEntity<>(res, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/availableLeaves/{id}/{userId}")
    private ResponseEntity<?> remainingLeaves(@PathVariable Long id,@PathVariable Long userId, HashMap<String, String> body) {
        HashMap<String, String> res = new HashMap<>();
        try {
            User user=userService.getById(userId);
            if (user.getAvailableLeaves() > 0) {
                Leave leave = leaveService.getById(id);
                if (leave.getIsApproved()) {
                    user.setAvailableLeaves(user.getAvailableLeaves() - 1);
                } else if (user.getAvailableLeaves() == 4 && leave.getIsCancelled()) {
                    user.setAvailableLeaves(user.getAvailableLeaves());
                } else if (leave.getIsCancelled()) {
                    user.setAvailableLeaves(user.getAvailableLeaves() + 1);
                }
                userService.saveUser(user);
                req.getSession().setAttribute("user", userService.getById(user.getUserId()));
            }
            res.put("message", "leaves");
            return new ResponseEntity<>(res, HttpStatus.OK);
        } catch (Exception e) {
            res.put("error", e.getMessage());
            return new ResponseEntity<>(res, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/leaves/")
    private ResponseEntity<?> getAllLeaves() {
        HashMap<String, String> res = new HashMap<>();
        try {
            return ResponseEntity.ok().body(leaveService.getAll());
        } catch (Exception e) {
            res.put("error", e.getMessage());
            return new ResponseEntity<>(res, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/leaves")
    private ResponseEntity<?> addLeaveEntity(@RequestBody HashMap<String, String> body) {
        HashMap<String, String> res = new HashMap<>();
        try {
            String fromDate = body.get("fromDate");
            String toDate = body.get("toDate");
            String name = body.get("name");
            Leave l = new Leave(fromDate, toDate, name);
            leaveService.save(l);
            res.put("message", "user");
            return new ResponseEntity<>(res, HttpStatus.OK);
        } catch (Exception e) {
            res.put("message", "Leave not added");
            return new ResponseEntity<>(res, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
