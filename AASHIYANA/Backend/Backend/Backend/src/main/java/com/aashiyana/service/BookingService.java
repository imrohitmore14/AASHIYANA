package com.aashiyana.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.aashiyana.dao.BookingDao;
import com.aashiyana.entity.Booking;
import com.aashiyana.exception.BookingServiceException;

@Service
@Transactional
public class BookingService {
	@Autowired
	private BookingDao bookingDao;
	
	//TODO : Here Multiple Conditions to be checked - RoomId and CheckIn/Checkout Dates
	public Long register(Booking booking) {
//		Long count = bookingDao.findIfBookingExists(booking.getTransactionId());
		Optional<Booking> booking2=bookingDao.findByTransactionId(booking.getTransactionId());
		
		if(booking2.isPresent())
			throw new BookingServiceException("Booking already Done !");
		else {
			bookingDao.save(booking);
			return booking.getTransactionId();
		}
	}
	
	public void update(Booking booking) {
		bookingDao.save(booking);
	}
	
//	public Booking fetchByTransationId(Long transactionId) {
//		Optional<Booking> booking = bookingDao.findByTransactionId(transactionId);
//		if(booking.isPresent())
//			return booking.get();
//		else
//			throw new BookingServiceException("Booking with Transaction id " + transactionId + " does not exist!");
//	}
	//Temperory METHOD
//	public Long fetchByTransationId(Booking booking) {
//		Long count = bookingDao.findIfBookingExists(booking.getTransactionId());
//		if(count == 1)
//			throw new BookingServiceException("Booking already Done !");
//		else {
//			bookingDao.save(booking);
//			return booking.getTransactionId();
//		}
//	}
}
