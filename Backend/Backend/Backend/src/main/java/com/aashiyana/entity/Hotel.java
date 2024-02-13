package com.aashiyana.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "Hotel")
public class Hotel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "hotel_id")
    private Long hotelId;

    @Column(name = "hotel_name")
    private String hotelName;

    @Column(name = "address")
    private String address;

    //TODO : CHECK ONCE THE PINCODE ...
    @ManyToOne
    @JoinColumn(name = "pincode") //TCHECK FOR CASCADE
    private City city;

	@Column(name = "country")
    private String country;

    @Column(name = "country_code")
    private String countryCode;

    @Column(name = "no_of_rooms")
    private int numberOfRooms;

    @Column(name = "contact_no")
    private String contactNumber;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "hotel_description")
    private String hotelDescription;

//    @Lob
//    @Column(name = "hotel_images") //Rather I used Sirs method to store the Image in separate folder and store Image name in DB
//    private byte[] hotelImages;
    
    @Column(name = "hotel_images")
    private String hotelImages;
    
    
    
   
    // Getters and setters

//    public byte[] getHotelImages() {
//		return hotelImages;
//	}

	public String getHotelImages() {
		return hotelImages;
	}

	public void setHotelImages(String hotelImages) {
		this.hotelImages = hotelImages;
	}

	public Long getHotelId() {
        return hotelId;
    }

    public void setHotelId(Long hotelId) {
        this.hotelId = hotelId;
    }

    public String getHotelName() {
        return hotelName;
    }

    public void setHotelName(String hotelName) {
        this.hotelName = hotelName;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getCountryCode() {
        return countryCode;
    }

    public void setCountryCode(String countryCode) {
        this.countryCode = countryCode;
    }

    public int getNumberOfRooms() {
        return numberOfRooms;
    }

    public void setNumberOfRooms(int numberOfRooms) {
        this.numberOfRooms = numberOfRooms;
    }

    public String getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getHotelDescription() {
        return hotelDescription;
    }

    public void setHotelDescription(String hotelDescription) {
        this.hotelDescription = hotelDescription;
    }
    
    public City getCity() {
		return city;
	}

	public void setCity(City city) {
		this.city = city;
	}

//	public void setHotelImages(byte[] hotelImages) {
//		this.hotelImages = hotelImages;
//	}
}
