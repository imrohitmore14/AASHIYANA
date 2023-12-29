package com.aashiyana.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.aashiyana.entity.Admin;

public interface AdminDao extends JpaRepository<Admin, Long> {
    // Add custom queries if needed
}
