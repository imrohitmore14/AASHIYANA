package com.aashiyana.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.aashiyana.entity.User;

public interface UserDao extends JpaRepository<User, Integer> {
    // Add custom queries if needed
}
