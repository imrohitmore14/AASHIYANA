package com.aashiyana.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.aashiyana.entity.Booking;
import com.aashiyana.entity.Hotel;

public interface BookingDao extends JpaRepository<Booking, Long> {
	@Query("SELECT count(b) FROM Booking b WHERE b.transactionId = ?1")
	public Long findIfBookingExists(Long transactionId);
	
	public Optional<Booking> findByTransactionId(Long transactionId);
}
