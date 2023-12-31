package com.aashiyana.controller;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.aashiyana.dto.BookingDetails;
import com.aashiyana.dto.BookingStatus;
import com.aashiyana.dto.Status;
import com.aashiyana.entity.Booking;
import com.aashiyana.exception.BookingServiceException;
import com.aashiyana.service.BookingService;

@RestController
@CrossOrigin
public class BookingController {
	@Autowired
	private BookingService bookingService;
	
	
	@PostMapping("/booking")
	public ResponseEntity<Status> register( BookingDetails bookingDetails) {
		try {
			Booking booking = new Booking();
			BeanUtils.copyProperties(bookingDetails, booking);
			
			Long id = bookingService.register(booking);
			BookingStatus status = new BookingStatus();
			status.setStatus(true);
			status.setMessageIfAny("Booking successful!");
			status.setTransactionId(id);
			
			return new ResponseEntity<Status>(status, HttpStatus.OK);
				
		}
		catch(BookingServiceException e) {
			Status status = new Status();
			status.setStatus(false);
			status.setMessageIfAny(e.getMessage());
			
			return new ResponseEntity<Status>(status, HttpStatus.BAD_REQUEST);
		}
	}

	
	@PostMapping("/bookingupdate")
	public ResponseEntity<Status> update(@RequestBody Booking booking) {
		try {
			bookingService.update(booking);
			
			Status status = new Status();
			status.setStatus(true);
			status.setMessageIfAny("Hotel updated!");
			
			return new ResponseEntity<Status>(status, HttpStatus.OK);
		}
		catch(BookingServiceException e) {
			Status status = new Status();
			status.setStatus(false);
			status.setMessageIfAny(e.getMessage());
			
			HttpHeaders responseHeaders = new HttpHeaders();
			responseHeaders.set("MyResponseHeader", "MyValue");
			
			return new ResponseEntity<Status>(status, responseHeaders, HttpStatus.BAD_REQUEST);		}
	}
	
//	@GetMapping("/hotel/fetch/{id}")
//	public Booking fetchByTransactionId(@PathVariable Long transactionid) {
//		return bookingService.fetchByTransationId(transactionid);
//		//how will we write try catch this time?
//	}
		
	/*@GetMapping("/customer/fetchv2/{id}")
	public Customer fetchByIdv2(@PathVariable int id) {
		Customer customer = customerService.fetchById(id);
		customer.setProfilePic("/customer/fetch/profilePic/"+id);
		return customer;
	}*/
	
//	@GetMapping(path = "/user/fetch/profilePic/{id}", produces = MediaType.IMAGE_JPEG_VALUE)
//	public byte[] getProfilePic(@PathVariable int id) throws IOException {
//		Customer customer = customerService.fetchById(id);
//	    return Files.readAllBytes(Paths.get("c:/uploads/" + customer.getProfilePic()));
//	}
}

