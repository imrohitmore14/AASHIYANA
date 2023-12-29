package com.aashiyana.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.aashiyana.entity.Booking;

public interface BookingDao extends JpaRepository<Booking, Long> {
    // Add custom queries if needed
}

