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
public class UserController {
    @Autowired
    private IUserService userService;

    @Autowired
    private ILeaveService leaveService;
    @Autowired
    private HttpServletRequest req;

    private User loggedInUser;

    // Registering the User by using "userReg" method with route=="/userReg",if user
    // registration done then,
    // a message "user registered successfully completed" will be returned .
    // otherwise "user registration is not completed" will be executed

    @PostMapping("/userReg")
    private ResponseEntity<?> userReg(@RequestBody HashMap<String, String> body) {
        HashMap<String, String> res = new HashMap<>();
        try {
            User u = new User(
                    body.get("name"),
                    body.get("email"),
                    body.get("password"));
            userService.saveUser(u);
            res.put("message", "user Registration Successfully completed");
            return new ResponseEntity<>(res, HttpStatus.OK);
        } catch (Exception e) {
            res.put("message", "user Registration is not completed");
            return new ResponseEntity<>(res, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // user can login with the registered email and password

    @PostMapping("/login")
    private ResponseEntity<?> userLogin(@RequestBody HashMap<String, String> body) {
        HashMap<String, String> res = new HashMap<>();

        try {
            String email = body.get("email");
            String password = body.get("password");
            if (email.equals("") || password.equals("")) {
                res.put("message", "please fill out  all the fields");
                return new ResponseEntity<>(res, HttpStatus.INTERNAL_SERVER_ERROR);
            } else if (email.equals("manager@gmail.com") && password.equals("manager")) {
                res.put("message", "Manager");
                return new ResponseEntity<>(res, HttpStatus.OK);
            } else {
                User user = userService.getUserByEmail(email);
                if (user != null) {
                    if (user.getPassword().equals(password)) {
                        req.getSession().setAttribute("user", user);
                        res.put("message", "User");
                        res.put("name", user.getName());
                        loggedInUser  = user;
                        return new ResponseEntity<>(res, HttpStatus.OK);
                    }
                } else {
                    res.put("message", "Invalid details");
                    return new ResponseEntity<>(res, HttpStatus.INTERNAL_SERVER_ERROR);
                }
            }
        } catch (Exception e) {
            res.put("error", e.getMessage());
            return new ResponseEntity<>(res, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(res, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // "getALLUsers" is a method to return list of users with the route "/users"

    @GetMapping("/users")
    private ResponseEntity<?> getAllUsers() {
        try {
            return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // To get the user by id with the route "/user/{id}"
    @GetMapping("/user/{id}")
    private ResponseEntity<?> getUserById(@PathVariable Long id) {
        HashMap<String, String> res = new HashMap<>();
        try {
            return new ResponseEntity<>(userService.getById(id), HttpStatus.OK);
        } catch (Exception e) {
            res.put("message", "User not found");
            return new ResponseEntity<>(res, HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }


}
