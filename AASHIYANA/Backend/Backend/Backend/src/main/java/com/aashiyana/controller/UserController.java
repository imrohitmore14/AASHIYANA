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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.aashiyana.dto.Status;
import com.aashiyana.dto.UserLoginDetails;
import com.aashiyana.dto.UserLoginStatus;
import com.aashiyana.dto.UserRegistrationStatus;
import com.aashiyana.entity.User;
import com.aashiyana.exception.UserServiceException;
import com.aashiyana.service.UserService;

@RestController
@CrossOrigin
public class UserController {

	@Autowired
	private UserService userService;
	
	
	@PostMapping("/userregister")
	public ResponseEntity<Status> register(@RequestBody User user) {
		try {
			int id = userService.register(user);
			UserRegistrationStatus status = new UserRegistrationStatus();
			status.setStatus(true);
			status.setMessageIfAny("Registration successful!");
			status.setUserId(id);
			
			return new ResponseEntity<Status>(status, HttpStatus.OK);
				
		}
		catch(UserServiceException e) {
			Status status = new Status();
			status.setStatus(false);
			status.setMessageIfAny(e.getMessage());
			
			HttpHeaders responseHeaders = new HttpHeaders();
			responseHeaders.set("MyResponseHeader", "MyValue");
			
			return new ResponseEntity<Status>(status, responseHeaders, HttpStatus.BAD_REQUEST);
		}
	}

	@PostMapping("/userlogin")
	public ResponseEntity<Status> login(@RequestBody UserLoginDetails userLoginDetails) {
		try {
			User user = userService.login(userLoginDetails.getEmail(), userLoginDetails.getPassword());
			UserLoginStatus status = new UserLoginStatus();
			status.setStatus(true);
			status.setMessageIfAny("Login successful!");
			status.setUserId(user.getUserId());
			status.setName(user.getUserName());
			//status.setCustomer(customer);
			
			return new ResponseEntity<Status>(status, HttpStatus.OK);
		}
		catch (UserServiceException e) {
			Status status = new Status();
			status.setStatus(false);
			status.setMessageIfAny(e.getMessage());
			
			HttpHeaders responseHeaders = new HttpHeaders();
			responseHeaders.set("MyResponseHeader", "MyValue");
			
			return new ResponseEntity<Status>(status, responseHeaders, HttpStatus.BAD_REQUEST);		}
	}
	
	  @PutMapping("/userupdate/{id}")
	    public ResponseEntity<Status> update(@PathVariable int id, @RequestBody User user) {
	        try {
	            // Assuming you have a method in userService to update the user by ID
	            userService.updateUserById(id, user);

	            Status status = new Status();
	            status.setStatus(true);
	            status.setMessageIfAny("User updated!");

	            return ResponseEntity.ok(status);
	        } catch (UserServiceException e) {
	            Status status = new Status();
	            status.setStatus(false);
	            status.setMessageIfAny(e.getMessage());

	            // No need to set custom headers in this case

	            return ResponseEntity.status(400).body(status);
	        }
	    }
	
	@GetMapping("/user/fetch/{id}")
	public ResponseEntity<User> fetchById(@PathVariable int id) {
	    try {
	        User user = userService.fetchById(id);

	        // Optionally, you can add additional logic or checks here

	        return new ResponseEntity<>(user, HttpStatus.OK);
	    } catch (UserServiceException e) {
	        Status status = new Status();
	        status.setStatus(false);
	        status.setMessageIfAny(e.getMessage());

	        HttpHeaders responseHeaders = new HttpHeaders();
	        responseHeaders.set("MyResponseHeader", "MyValue");

	        return new ResponseEntity<>( responseHeaders, HttpStatus.BAD_REQUEST);
	    }
	}

	@DeleteMapping("/userdelete/{id}")
    public ResponseEntity<Status> deleteUser(@PathVariable int id) {
        try {
            // Implement logic to delete the user by ID using userService
            userService.deleteUser(id);

            Status status = new Status();
            status.setStatus(true);
            status.setMessageIfAny("User deleted successfully!");

            return new ResponseEntity<>(status, HttpStatus.OK);
        } catch (UserServiceException e) {
            Status status = new Status();
            status.setStatus(false);
            status.setMessageIfAny(e.getMessage());

            return new ResponseEntity<>(status, HttpStatus.BAD_REQUEST);
        }
        
    }
	
//	@GetMapping("/admin/users")
//	public ResponseEntity<List<User>> getAllUsers() {
//	        List<User> users = userService.getAllUsers();
//	        return ResponseEntity.ok(users);
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
