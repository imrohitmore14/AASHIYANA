package com.aashiyana.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.aashiyana.dao.AdminDao;
import com.aashiyana.entity.Admin;
import com.aashiyana.entity.User;
import com.aashiyana.exception.AdminServiceException;
import com.aashiyana.exception.UserServiceException;


@Service
@Transactional
public class AdminService {
	
	@Autowired
	private AdminDao adminDao;

	public Admin login(String email, String password) {
		Optional<Admin> admin = adminDao.findByEmailAndPassword(email, password);
		if(admin.isPresent())
			return admin.get();
		else
			throw new AdminServiceException("Invalid Email/Password");
	}
	
	public void update(Admin admin) {
		adminDao.save(admin);
	}
	
	public Admin fetchById(long id) {
		Optional<Admin> admin = adminDao.findById(id);
		if(admin.isPresent())
			return admin.get();
		else
			throw new AdminServiceException("Admin with id " + id + " does not exist!");
	}
	
	public void updateAdminById(long adminId, Admin updatedAdmin) throws AdminServiceException {
        // Assuming you have a method to fetch the Admin by ID
        Admin existingAdmin = adminDao.findById(adminId).orElse(null);

        if (existingAdmin == null) {
            throw new AdminServiceException("Admin not found with ID: " + adminId);
        }

        // Update the fields of the existing user with the new values
        existingAdmin.setAdminName(updatedAdmin.getAdminName());
        existingAdmin.setEmail(updatedAdmin.getEmail());
        existingAdmin.setPassword(updatedAdmin.getPassword());

        // Save the updated user
        adminDao.save(existingAdmin);
    }
	
	public void deleteAdmin(long id) {
	    Optional<Admin> admin = adminDao.findById(id);

	    if (admin.isPresent()) {
	        adminDao.delete(admin.get());
	    } else {
	        throw new AdminServiceException("Admin with id " + id + " does not exist!");
	    }
	}
}
