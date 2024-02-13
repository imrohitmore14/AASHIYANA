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
		
        
		
	}
	
}
