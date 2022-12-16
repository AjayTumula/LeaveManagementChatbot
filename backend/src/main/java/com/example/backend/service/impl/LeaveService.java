package com.example.backend.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.model.Leave;
import com.example.backend.repository.ILeaveRepository;
import com.example.backend.service.ILeaveService;

@Service
public class LeaveService implements ILeaveService{

    @Autowired
    private ILeaveRepository repo;

    @Override
    public Leave save(Leave l) {
        return repo.save(l);
    }

    @Override
    public Leave getById(Long id) {
        return repo.findById(id).get();
    }

    @Override
    public List<Leave> getAll() {
        return repo.findAll();
    }

    @Override
    public void deleteById(Long id) {
        Leave l = repo.findById(id).get();
        repo.delete(l);
    }
    
}
