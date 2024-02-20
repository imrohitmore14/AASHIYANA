package com.aashiyana.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.aashiyana.entity.Admin;

public interface AdminDao extends JpaRepository<Admin, Long> {
	@Query("SELECT count(a) FROM Admin a WHERE a.email = ?1")
	public long findIfAdminExists(String email);
	
	@Query("SELECT count(a) FROM Admin a WHERE a.email = ?1 and a.password= ?2")
	public long findIfAdminPresent(String email, String password);
	
	public Optional<Admin> findByEmail(String email);
	public Optional<Admin> findByEmailAndPassword(String email, String password);}
