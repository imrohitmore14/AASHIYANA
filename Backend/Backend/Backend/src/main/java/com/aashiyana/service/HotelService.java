package com.aashiyana.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.aashiyana.dao.HotelDao;
import com.aashiyana.entity.Hotel;
import com.aashiyana.exception.HotelServiceException;

@Service
@Transactional
public class HotelService {
	@Autowired
	private HotelDao hotelDao;
	
	public Long register(Hotel hotel) {
		Long count = hotelDao.findIfHotelExists(hotel.getEmail());
		if(count == 1)
			throw new HotelServiceException("Hotel already registered!");
		else {
			hotelDao.save(hotel);
			return hotel.getHotelId();
		}
	}
	
	public Hotel login(String email, String password) {
		Optional<Hotel> hotel = hotelDao.findByEmailAndPassword(email, password);
		if(hotel.isPresent())
			return hotel.get();
		else
			throw new HotelServiceException("Invalid Email/Password");
	}

	public void update(Hotel hotel) {
		hotelDao.save(hotel);
	}
	
	public Hotel fetchById(int id) {
		Optional<Hotel> hotel = hotelDao.findByHotelId(id);
		if(hotel.isPresent())
			return hotel.get();
		else
			throw new HotelServiceException("Customer with id " + id + " does not exist!");
	}
}
