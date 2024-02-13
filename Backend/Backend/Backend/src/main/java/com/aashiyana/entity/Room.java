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
@Table
public class Room {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="room_id" )
	private int roomId;
	
	//ADD HOTEL ID
	@ManyToOne
    @JoinColumn(name = "hotel_id")
    private Hotel hotel;
	
	@Column(name="room_type")
	private String typeOfRoom; //TODO : Increase the enum...
	
	@Column(name="room_price")
	private double roomPrice;
	
    public double getRoomPrice() {
		return roomPrice;
	}

	public void setRoomPrice(double roomPrice) {
		this.roomPrice = roomPrice;
	}

	@Column(name="room_image")
    private String roomImage;
	
	@Column(name="room_booking_status")
	private String status = "No";

	
	public int getRoomId() {
		return roomId;
	}

	public void setRoomId(int roomId) {
		this.roomId = roomId;
	}

	public Hotel getHotel() {
		return hotel;
	}

	public void setHotel(Hotel hotel) {
		this.hotel = hotel;
	}

	public String getTypeOfRoom() {
		return typeOfRoom;
	}

	public void setTypeOfRoom(String typeOfRoom) {
		this.typeOfRoom = typeOfRoom;
	}

	

	public String getRoomImage() {
		return roomImage;
	}

	public void setRoomImage(String roomImage) {
		this.roomImage = roomImage;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	
	
	
		
	
}
