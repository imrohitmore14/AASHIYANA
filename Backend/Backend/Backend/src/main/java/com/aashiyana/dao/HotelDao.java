package com.aashiyana.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.aashiyana.entity.Hotel;
import com.aashiyana.entity.User;

public interface HotelDao extends JpaRepository<Hotel, Long> {
	@Query("SELECT count(h) FROM Hotel h WHERE h.email = ?1")
	public long findIfHotelExists(String email);
	
	@Query("SELECT count(h) FROM Hotel h WHERE h.email = ?1 and h.password= ?2")
	public long findIfHotelPresent(String email, String password);
	
	public Optional<Hotel> findByEmail(String email);
	public Optional<Hotel> findByEmailAndPassword(String email, String password);

	public Optional<Hotel> findByHotelId(int hotelId);}

