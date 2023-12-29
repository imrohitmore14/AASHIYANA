package com.aashiyana;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.aashiyana.dao.UserDao;
import com.aashiyana.entity.User;

@SpringBootApplication
public class BackendApplication {
	
	@Autowired
	private static UserDao dao;
	public static void main(String[] args) {
		
		SpringApplication.run(BackendApplication.class, args);
		User sampleUser = new User();
        sampleUser.setUserName("John Doe");
        sampleUser.setDateOfBirth(LocalDate.of(1990, 1, 1));
        sampleUser.setGender(User.Gender.MALE);
        sampleUser.setPhoneNo(1234567890L);
        sampleUser.setEmail("john.doe@example.com");
        sampleUser.setPassword("password");
        sampleUser.setAadharId(123456789012L);
        sampleUser.setAddress("123 Main St, City");	
        
        
        try {
			dao.save(sampleUser);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        
		
	}
	
}
