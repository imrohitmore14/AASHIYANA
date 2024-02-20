package com.aashiyana.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.aashiyana.dao.RoomDao;
import com.aashiyana.entity.Room;
import com.aashiyana.exception.HotelServiceException;

@Service
@Transactional
public class RoomService {

    @Autowired
    private RoomDao roomDao;

    public int register(Room room) {
        int count = roomDao.findIfRoomExists(room.getRoomId());
        if (count == 1)
            throw new HotelServiceException("Room already registered!");
        else {
            roomDao.save(room);
            return room.getRoomId();
        }
    }

    public Room fetchByRoomId(int id) {
        Optional<Room> room = roomDao.findById(id);
        if (room.isPresent())
            return room.get();
        else
            throw new HotelServiceException("Room with id " + id + " does not exist!");
    }

    public List<Room> getAllRoomsByHotelId(long hotelId) {
        return roomDao.findByHotelHotelId(hotelId);
    }

    public void deleteRoom(int id) {
        Optional<Room> room = roomDao.findByRoomId(id);
        if (room.isPresent()) {
            roomDao.delete(room.get());
        } else {
            throw new HotelServiceException("Room with id " + id + " does not exist!");
        }
    }

    public List<String> getAllRoomTypes(long hotelId) {
        return roomDao.findAllRoomTypesWithPrices(hotelId);
    }

    public double getRoomRateByType(long hotelId, String type) {
        List<Room> rooms = roomDao.findByHotelHotelId(hotelId);
        for (Room room : rooms) {
            if (room.getTypeOfRoom().equalsIgnoreCase(type)) {
                return room.getRoomPrice();
            }
        }
        throw new HotelServiceException("Room type " + type + " not found for hotel with id " + hotelId);
    }
}
