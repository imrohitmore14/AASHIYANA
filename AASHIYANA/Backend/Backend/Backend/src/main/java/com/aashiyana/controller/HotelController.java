package com.aashiyana.controller;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;

import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.aashiyana.dto.HotelDetails;
import com.aashiyana.dto.HotelLoginDetails;
import com.aashiyana.dto.HotelLoginStatus;
import com.aashiyana.dto.HotelRegistrationStatus;
import com.aashiyana.dto.Status;
import com.aashiyana.entity.Hotel;
import com.aashiyana.entity.User;
import com.aashiyana.exception.HotelServiceException;
import com.aashiyana.service.HotelService;

@RestController
@CrossOrigin
public class HotelController {
	@Autowired
	private HotelService hotelService;
	
	
	@PostMapping("/hotelregister")
	public ResponseEntity<Status> register(HotelDetails hotelDetails) {
		try {
			Hotel hotel = new Hotel();
			BeanUtils.copyProperties(hotelDetails, hotel);
			
			//storing the uploaded file
			try {
				String fileName = hotelDetails.getHotelImages().getOriginalFilename();
				//TODO:here should be the code to generate a unique name for the file before proceeding further
				String generatedFileName = fileName; //replace this later
				
				hotel.setHotelImages(generatedFileName);
				
				InputStream is = hotelDetails.getHotelImages().getInputStream();
				FileOutputStream os = new FileOutputStream("C:/Users/sanke/Desktop/CDAC juhu/Major project spring-boot/AASHIYANA-Rohit/AASHIYANA-Rohit/Backend/Backend/Backend/src/main/resources/hotel_img/" + generatedFileName); //Please give the correct path for Hotel Images folder ....
				FileCopyUtils.copy(is, os);
			}
			catch (IOException e) {
				//hoping no error here hence keeping it blank
			}
			
			long id = hotelService.register(hotel);
			HotelRegistrationStatus status = new HotelRegistrationStatus();
			status.setStatus(true);
			status.setMessageIfAny("Registration successful!");
			status.setHotelId(id);
			
			return new ResponseEntity<Status>(status, HttpStatus.OK);
				
		}
		catch(HotelServiceException e) {
			Status status = new Status();
			status.setStatus(false);
			status.setMessageIfAny(e.getMessage());
			
			return new ResponseEntity<Status>(status, HttpStatus.BAD_REQUEST);
		}
	}


	@PostMapping("/hotellogin")
	public ResponseEntity<Status> login(@RequestBody HotelLoginDetails hotelLoginDetails) {
		try {
			Hotel hotel = hotelService.login(hotelLoginDetails.getEmail(), hotelLoginDetails.getPassword());
			HotelLoginStatus status = new HotelLoginStatus();
			status.setStatus(true);
			status.setMessageIfAny("Login successful!");
			status.setHotelId(hotel.getHotelId());
			status.setName(hotel.getHotelName());
			return new ResponseEntity<Status>(status, HttpStatus.OK);
		}
		catch (HotelServiceException e) {
			Status status = new Status();
			status.setStatus(false);
			status.setMessageIfAny(e.getMessage());
			
			HttpHeaders responseHeaders = new HttpHeaders();
			responseHeaders.set("MyResponseHeader", "MyValue");
			
			return new ResponseEntity<Status>(status, responseHeaders, HttpStatus.BAD_REQUEST);
		}
	}
	
	@PutMapping("/hotel/update/{id}")
    public ResponseEntity<Status> update(@PathVariable int id, @RequestBody Hotel hotel) {
        try {
            // Assuming you have a method in hotelService to update the user by ID
            hotelService.updateHotelById(id, hotel);

            Status status = new Status();
            status.setStatus(true);
            status.setMessageIfAny("Hotel updated!");

            return ResponseEntity.ok(status);
        } catch (HotelServiceException e) {
            Status status = new Status();
            status.setStatus(false);
            status.setMessageIfAny(e.getMessage());

            // No need to set custom headers in this case

            return ResponseEntity.status(400).body(status);
        }
    }

	@GetMapping("/hotel/fetch/{id}")
	public ResponseEntity<Hotel> fetchById(@PathVariable int id) {
	    try {
	        Hotel hotel = hotelService.fetchById(id);

	        // Optionally, you can add additional logic or checks here

	        return new ResponseEntity<>(hotel, HttpStatus.OK);
	    } catch (HotelServiceException e) {
	        Status status = new Status();
	        status.setStatus(false);
	        status.setMessageIfAny(e.getMessage());

	        HttpHeaders responseHeaders = new HttpHeaders();
	        responseHeaders.set("MyResponseHeader", "MyValue");

	        return new ResponseEntity<>( responseHeaders, HttpStatus.BAD_REQUEST);
	    }
	}
	
	@DeleteMapping("/hoteldelete/{id}")
	public ResponseEntity<Status> deleteHotel(@PathVariable int id) {
	    try {
	        // Implement logic to delete the user by ID using hotelService
	        hotelService.deleteHotel(id);
	
	        Status status = new Status();
	        status.setStatus(true);
	        status.setMessageIfAny("User deleted successfully!");
	
	        return new ResponseEntity<>(status, HttpStatus.OK);
	    } catch (HotelServiceException e) {
	        Status status = new Status();
	        status.setStatus(false);
	        status.setMessageIfAny(e.getMessage());
	
	        return new ResponseEntity<>(status, HttpStatus.BAD_REQUEST);
	    }
	}
	
	@GetMapping("/hotels")
    public ResponseEntity<List<Hotel>> getAllHotels() {
        List<Hotel> hotels = hotelService.getAllHotels();
        return ResponseEntity.ok(hotels);
    }
	
	 
	
	//for image fetching
	@GetMapping("/hotel/image/{fileName}")
    public ResponseEntity<Resource> serveImage(@PathVariable String fileName) {
        try {
            Path filePath = Paths.get("C:/Users/sanke/Desktop/CDAC juhu/Major project spring-boot/AASHIYANA-Rohit/AASHIYANA-Rohit/Backend/Backend/Backend/src/main/resources/hotel_img/")
                    .resolve(fileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());

            if (resource.exists() || resource.isReadable()) {
                return ResponseEntity.ok().body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (MalformedURLException | HotelServiceException e) {
            // Handle exceptions accordingly
            return ResponseEntity.status(500).build();
        }
    }
	
	
	
//	 @GetMapping("/admin/hotels")
//     public ResponseEntity<List<Hotel>> getAllHotels() {
//	         List<Hotel> hotels = hotelService.getAllHotels();
//	         return ResponseEntity.ok(hotels);
//	 }
	 
		
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
