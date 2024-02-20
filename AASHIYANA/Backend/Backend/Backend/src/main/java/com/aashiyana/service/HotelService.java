package com.aashiyana.service;

import java.util.List;
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
	
	public long register(Hotel hotel) {
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

	public void updateHotelById(int hotelId, Hotel updatedHotel) throws HotelServiceException {
        // Assuming you have a method to fetch the user by ID
        Hotel existingHotel = hotelDao.findByHotelId(hotelId).orElse(null);

        if (existingHotel == null) {
            throw new HotelServiceException("Hotel not found with ID: " + hotelId);
        }

        // Update the fields of the existing hotel with the new values
        existingHotel.setHotelName(updatedHotel.getHotelName());
        existingHotel.setAddress(updatedHotel.getAddress());
        existingHotel.setCountry(updatedHotel.getCountry());
        existingHotel.setCountryCode(updatedHotel.getCountryCode());
        existingHotel.setContactNumber(updatedHotel.getContactNumber());
        existingHotel.setEmail(updatedHotel.getEmail());
        existingHotel.setPassword(updatedHotel.getPassword());
        existingHotel.setHotelDescription(updatedHotel.getHotelDescription());

        // Save the updated hotel
        hotelDao.save(existingHotel);
    }
	
	public Hotel fetchById(int id) {
		Optional<Hotel> hotel = hotelDao.findByHotelId(id);
		if(hotel.isPresent())
			return hotel.get();
		else
			throw new HotelServiceException("Customer with id " + id + " does not exist!");
	}

	public void deleteHotel(int id) {
	    Optional<Hotel> hotel = hotelDao.findByHotelId(id);

	    if (hotel.isPresent()) {
	    	hotelDao.delete(hotel.get());
	    } else {
	        throw new HotelServiceException("Hotel with id " + id + " does not exist!");
	    }
	}

	public List<Hotel> getAllHotels() {
        return hotelDao.findAll();
	}



}
