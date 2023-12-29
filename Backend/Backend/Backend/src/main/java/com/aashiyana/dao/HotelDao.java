package com.aashiyana.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.aashiyana.entity.Hotel;

public interface HotelDao extends JpaRepository<Hotel, Long> {
    // Add custom queries if needed
}

