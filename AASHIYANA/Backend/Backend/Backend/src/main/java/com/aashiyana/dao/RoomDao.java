package com.aashiyana.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.aashiyana.entity.Room;

public interface RoomDao extends JpaRepository<Room, Integer> {
    
    @Query("SELECT count(r) FROM Room r WHERE r.roomId = ?1")
    public int findIfRoomExists(int roomId);
    
    public Optional<Room> findByRoomId(int roomId);

	public List<Room> findByHotelHotelId(long hotelId);

	@Query("SELECT DISTINCT r.typeOfRoom FROM Room r WHERE r.hotel.hotelId = ?1")
	public List<String> findAllRoomTypesWithPrices(long hotelId);
    
//    @Query("SELECT * FROM Hotel h WHERE h.email = ?1 and h.password= ?2")
//   public List<Room> getAllRoomsByHotelId(long hotelId);
}
