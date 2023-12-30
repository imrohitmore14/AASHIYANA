package com.aashiyana.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.aashiyana.dao.UserDao;
import com.aashiyana.entity.User;
import com.aashiyana.exception.UserServiceException;

@Service
@Transactional
public class UserService {
	@Autowired
	private UserDao userDao;
	
	public int register(User user) {
		Long count = userDao.findIfUserExists(user.getEmail());
		if(count == 1)
			throw new UserServiceException("User already registered!");
		else {
			userDao.save(user);
			return user.getUserId();
		}
	}
	
	public User login(String email, String password) {
		Optional<User> user = userDao.findByEmailAndPassword(email, password);
		if(user.isPresent())
			return user.get();
		else
			throw new UserServiceException("Invalid Email/Password");
	}

	public void update(User user) {
		userDao.save(user);
	}
	
	public User fetchById(int id) {
		Optional<User> user = userDao.findById(id);
		if(user.isPresent())
			return user.get();
		else
			throw new UserServiceException("Customer with id " + id + " does not exist!");
	}
}
