package com.example.backend.service;

import java.util.List;

import com.example.backend.model.Leave;

public interface ILeaveService {

    Leave save(Leave l);

    Leave getById(Long id);

    List<Leave> getAll();

    void deleteById(Long id);

}
