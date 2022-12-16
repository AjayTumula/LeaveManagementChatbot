package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.backend.model.Leave;

@Repository
public interface ILeaveRepository extends JpaRepository<Leave,Long> {
    
}
