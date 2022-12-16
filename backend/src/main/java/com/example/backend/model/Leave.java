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
public class Leave {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String fromDate;
    private String toDate;
    private String name;
    private Boolean isApproved = false;
    private Boolean isCancelled=false;

    public Leave(String fromDate, String toDate,String name) {
        this.fromDate = fromDate;
        this.toDate = toDate;
        this.name=name;
    }

}
