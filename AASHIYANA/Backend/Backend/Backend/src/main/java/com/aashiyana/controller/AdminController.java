package com.aashiyana.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aashiyana.dto.AdminLoginDetails;
import com.aashiyana.dto.AdminLoginStatus;
import com.aashiyana.dto.Status;
import com.aashiyana.entity.Admin;
import com.aashiyana.entity.Hotel;
import com.aashiyana.entity.User;
import com.aashiyana.exception.AdminServiceException;
import com.aashiyana.service.AdminService;
import com.aashiyana.service.HotelService;
import com.aashiyana.service.UserService;

@RestController
@CrossOrigin
@RequestMapping	("/admin")
public class AdminController {


	@Autowired
	private AdminService adminService; 
	
	@Autowired
    private HotelService hotelService1;
    
    @Autowired
    private UserService userService1;
	
	@PostMapping("/login")
	public ResponseEntity<Status> login(@RequestBody AdminLoginDetails adminLoginDetails) {
		try {
			Admin admin = adminService.login(adminLoginDetails.getEmail(), adminLoginDetails.getPassword());
			AdminLoginStatus status = new AdminLoginStatus();
			status.setStatus(true);
			status.setMessageIfAny("Login successful!");
			status.setAdminId(admin.getAdminId());
			status.setAdminName(admin.getAdminName());
			
			return new ResponseEntity<Status>(status, HttpStatus.OK);
		}
		catch (AdminServiceException e) {
			Status status = new Status();
			status.setStatus(false);
			status.setMessageIfAny(e.getMessage());
			
			HttpHeaders responseHeaders = new HttpHeaders();
			responseHeaders.set("MyResponseHeader", "MyValue");
			
			return new ResponseEntity<Status>(status, responseHeaders, HttpStatus.BAD_REQUEST);		}
	}
	
	@GetMapping("/fetch/{id}")
	public ResponseEntity<Admin> fetchById(@PathVariable long id) {
	    try {
	        Admin admin = adminService.fetchById(id);

	        // Optionally, you can add additional logic or checks here

	        return new ResponseEntity<>(admin, HttpStatus.OK);
	    } catch (AdminServiceException e) {
	        Status status = new Status();
	        status.setStatus(false);
	        status.setMessageIfAny(e.getMessage());

	        HttpHeaders responseHeaders = new HttpHeaders();
	        responseHeaders.set("MyResponseHeader", "MyValue");

	        return new ResponseEntity<>( responseHeaders, HttpStatus.BAD_REQUEST);
	    }
	}
	
	@DeleteMapping("/delete/{id}")
    public ResponseEntity<Status> deleteUser(@PathVariable long id) {
        try {
            // Implement logic to delete the user by ID using userService
            adminService.deleteAdmin(id);

            Status status = new Status();
            status.setStatus(true);
            status.setMessageIfAny("Admin deleted successfully!");

            return new ResponseEntity<>(status, HttpStatus.OK);
        } catch (AdminServiceException e) {
            Status status = new Status();
            status.setStatus(false);
            status.setMessageIfAny(e.getMessage());

            return new ResponseEntity<>(status, HttpStatus.BAD_REQUEST);
        }
    }
	
	@GetMapping("/users")
	public ResponseEntity<List<User>> getAllUsers() {
	        List<User> users = userService1.getAllUsers();
	        return ResponseEntity.ok(users);
	}
	
	@GetMapping("/hotels")
    public ResponseEntity<List<Hotel>> getAllHotels() {
	         List<Hotel> hotels = hotelService1.getAllHotels();
	         return ResponseEntity.ok(hotels);
	}
	
}
