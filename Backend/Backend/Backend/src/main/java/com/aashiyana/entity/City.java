package com.aashiyana.entity;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;


@Entity
@Table(name = "city")
public class City {
	
	@Id
    @Column(name = "pincode")
    private int pincode;
	
	@Column(name = "city_name")
    private String cityName;

	public int getPincode() {
		return pincode;
	}
	
	public void setPincode(int pincode) {
		this.pincode = pincode;
	}


	public String getCityName() {
		return cityName;
	}

	public void setCityName(String cityName) {
		this.cityName = cityName;
	}


    // Constructors, getters, and setters
}
