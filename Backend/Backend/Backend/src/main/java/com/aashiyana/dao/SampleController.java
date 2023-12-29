package com.aashiyana.dao;
import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aashiyana.entity.User;

@RestController
@RequestMapping("/sample/users")
public class SampleController {

	    @Autowired
	    private UserDao userDao;

	    @PostMapping("/create-sample")
	    public User createSampleUser() {
	        User sampleUser = new User();
	        sampleUser.setUserName("John Doe");
	        sampleUser.setDateOfBirth(LocalDate.of(1990, 1, 1));
	        sampleUser.setGender(User.Gender.MALE);
	        sampleUser.setPhoneNo(1234567890L);
	        sampleUser.setEmail("john.doe@example.com");
	        sampleUser.setPassword("password");
	        sampleUser.setAadharId(123456789012L);
	        sampleUser.setAddress("123 Main St, City");

	        return userDao.save(sampleUser);
	    }

	    @GetMapping("/get-all")
	    public Iterable<User> getAllUsers() {
	        return userDao.findAll();
	    }

	    @GetMapping("/get-by-id/{userId}")
	    public User getUserById(@PathVariable int userId) {
	        return userDao.findById(userId).orElse(null);
	    }

	    @DeleteMapping("/delete-all")
	    public void deleteAllUsers() {
	        userDao.deleteAll();
	    }
	    
	   
	}

