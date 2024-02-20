package com.aashiyana.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.aashiyana.entity.City;

public interface CityDao extends JpaRepository<City, String> {
    // Add custom queries if needed
}

