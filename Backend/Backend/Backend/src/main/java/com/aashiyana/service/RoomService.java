package com.aashiyana.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.aashiyana.dao.HotelDao;
import com.aashiyana.dao.RoomDao;
import com.aashiyana.entity.Hotel;
import com.aashiyana.entity.Room;
import com.aashiyana.exception.HotelServiceException;

@Service
@Transactional
public class RoomService {
	@Autowired
	private RoomDao roomDao;
	
	public int register(Room room) {
		int count = roomDao.findIfRoomExists(room.getTypeOfRoom());
		if(count == 1)
			throw new HotelServiceException("Room already registered!");
		else {
			roomDao.save(room);
			return room.getRoomId();
		}
	}

	
	public Room fetchByRoomId(int id) {
		Optional<Room> room = roomDao.findById(id);
		if(room.isPresent())
			return room.get();
		else
			throw new HotelServiceException("Customer with id " + id + " does not exist!");
	}
}
