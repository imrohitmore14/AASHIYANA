package com.aashiyana.service;

import java.util.List;
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

	public void updateUserById(int userId, User updatedUser) throws UserServiceException {
        // Assuming you have a method to fetch the user by ID
        User existingUser = userDao.findById(userId).orElse(null);

        if (existingUser == null) {
            throw new UserServiceException("User not found with ID: " + userId);
        }

        // Update the fields of the existing user with the new values
        existingUser.setUserName(updatedUser.getUserName());
        existingUser.setDateOfBirth(updatedUser.getDateOfBirth());
        existingUser.setGender(updatedUser.getGender());
        existingUser.setPhoneNo(updatedUser.getPhoneNo());
        existingUser.setEmail(updatedUser.getEmail());
        existingUser.setPassword(updatedUser.getPassword());
        existingUser.setAddress(updatedUser.getAddress());
        existingUser.setAadharId(updatedUser.getAadharId());

        // Save the updated user
        userDao.save(existingUser);
    }

	public void deleteUser(int id) {
	    Optional<User> user = userDao.findById(id);

	    if (user.isPresent()) {
	        userDao.delete(user.get());
	    } else {
	        throw new UserServiceException("User with id " + id + " does not exist!");
	    }
	}

	public List<User> getAllUsers() {
		return userDao.findAll();
	}

}
