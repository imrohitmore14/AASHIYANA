package com.aashiyana.controller;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.aashiyana.dto.HotelDetails;
import com.aashiyana.dto.HotelLoginDetails;
import com.aashiyana.dto.HotelLoginStatus;
import com.aashiyana.dto.HotelRegistrationStatus;
import com.aashiyana.dto.RoomDetails;
import com.aashiyana.dto.RoomRegistrationStatus;
import com.aashiyana.dto.Status;
import com.aashiyana.entity.Hotel;
import com.aashiyana.entity.Room;
import com.aashiyana.exception.HotelServiceException;
import com.aashiyana.service.HotelService;
import com.aashiyana.service.RoomService;

@RestController
@CrossOrigin
public class RoomController {
    @Autowired
    private RoomService roomService;

    @PostMapping("/roomregister")
    public ResponseEntity<Status> register(RoomDetails roomDetails) {
        try {
            Room room = new Room();
            BeanUtils.copyProperties(roomDetails, room);
            room.setHotel(roomDetails.getHotelId());

            // storing the uploaded file
            try {
                String fileName = roomDetails.getRoomImage().getOriginalFilename();
                // TODO: here should be the code to generate a unique name for the file before proceeding further
                String generatedFileName = fileName; // replace this later

                room.setRoomImage(generatedFileName);

                InputStream is = roomDetails.getRoomImage().getInputStream();

                FileOutputStream os = new FileOutputStream("C:/Users/sanke/Desktop/CDAC juhu/Major project spring-boot/AASHIYANA-Rohit/AASHIYANA-Rohit/Backend/Backend/Backend/src/main/resources/room_img/" + generatedFileName);
                FileCopyUtils.copy(is, os);
            } catch (IOException e) {
                // hoping no error here hence keeping it blank
            }

            int id = roomService.register(room);
            RoomRegistrationStatus status = new RoomRegistrationStatus();
            status.setStatus(true);
            status.setMessageIfAny("Room Registration successful!");
            status.setRoomId(id);

            return new ResponseEntity<>(status, HttpStatus.OK);

        } catch (HotelServiceException e) {
            Status status = new Status();
            status.setStatus(false);
            status.setMessageIfAny(e.getMessage());

            return new ResponseEntity<>(status, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/room/fetch/{id}")
    public ResponseEntity<Room> fetchById(@PathVariable int id) {
        try {
            Room room = roomService.fetchByRoomId(id);
            return new ResponseEntity<>(room, HttpStatus.OK);
        } catch (HotelServiceException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/rooms/fetchAllRooms/{hotelId}")
    public ResponseEntity<List<Room>> getAllRoomsByHotelId(@PathVariable long hotelId) {
        try {
            List<Room> rooms = roomService.getAllRoomsByHotelId(hotelId);
            return new ResponseEntity<>(rooms, HttpStatus.OK);
        } catch (HotelServiceException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/roomdelete/{id}")
    public ResponseEntity<Status> deleteRoom(@PathVariable int id) {
        try {
            roomService.deleteRoom(id);

            Status status = new Status();
            status.setStatus(true);
            status.setMessageIfAny("room deleted successfully!");

            return new ResponseEntity<>(status, HttpStatus.OK);
        } catch (HotelServiceException e) {
            Status status = new Status();
            status.setStatus(false);
            status.setMessageIfAny(e.getMessage());

            return new ResponseEntity<>(status, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/rooms/fetchRoomTypes/{hotelId}")
    public ResponseEntity<List<String>> fetchRoomTypes(@PathVariable long hotelId) {   
        try {
            List<String> roomTypes = roomService.getAllRoomTypes(hotelId);
            return new ResponseEntity<>(roomTypes, HttpStatus.OK);
        } catch (HotelServiceException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/rooms/fetchRoomRate/{hotelId}/{type}")
    public ResponseEntity<Double> fetchRoomRate(@PathVariable long hotelId, @PathVariable String type) {
        try {
            double roomRate = roomService.getRoomRateByType(hotelId, type);
            return new ResponseEntity<>(roomRate, HttpStatus.OK);
        } catch (HotelServiceException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);  
        }
    }
}


	
//
//	@GetMapping("/room/fetch/{id}")
//	public Room fetchById(@PathVariable int id) {
//		return roomService.fetchByRoomId(id);
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


