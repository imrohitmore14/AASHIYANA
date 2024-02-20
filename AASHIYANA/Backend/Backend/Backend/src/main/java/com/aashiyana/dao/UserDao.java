package com.aashiyana.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.aashiyana.entity.User;

public interface UserDao extends JpaRepository<User, Integer> {
	@Query("SELECT count(u) FROM User u WHERE u.email = ?1")
	public long findIfUserExists(String email);
	
	@Query("SELECT count(u) FROM User u WHERE u.email = ?1 and u.password= ?2")
	public long findIfuserPresent(String email, String password);
	
	public Optional<User> findByEmail(String email);
	public Optional<User> findByEmailAndPassword(String email, String password);

}
