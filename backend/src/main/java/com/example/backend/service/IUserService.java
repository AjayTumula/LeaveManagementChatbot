package com.example.backend.service;

import com.example.backend.model.User;

import java.util.List;

public interface IUserService {
    void saveUser(User user);
    List<User> getAllUsers();
     User getUserByEmail(String email);
     User getById(Long id);
     void deleteUser(User user);
}
