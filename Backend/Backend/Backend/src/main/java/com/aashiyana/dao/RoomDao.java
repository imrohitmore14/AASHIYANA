package com.aashiyana.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.aashiyana.entity.Room;

public interface RoomDao extends JpaRepository<Room, Integer> {
    // Add custom queries if needed
}
