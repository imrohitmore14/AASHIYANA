package com.aashiyana.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.aashiyana.entity.Room;
import com.aashiyana.entity.User;

public interface RoomDao extends JpaRepository<Room, Integer> {
	@Query("SELECT count(r) FROM Room r WHERE r.typeOfRoom = ?1")
	public int findIfRoomExists(String typeOfRoom);
	
	public Optional<Room> findByTypeOfRoom(String typeOfRoom);
}