package com.aashiyana.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table
public class Room {
	@Id
	@Column(name="room_id")
	private int roomId;
	
	//ADD HOTEL ID
	@ManyToOne
    @JoinColumn(name = "hotel_id")
    private Hotel hotel;
	
	@Column(name="room_type")
	private Type typeOfRoom; //TODO : Increase the enum...
	
	@Column(name="room_price")
	private double price;
	
	@Lob
    @Column(name="room_image")
    private byte[] roomImage;
	
	@Column(name="room_booking_status")
	private Status status;
	
	public enum Type {
		SINGLE_ROOM, DELUXE_ROOM, FAMILY_ROOM, PENTHOUSE;
	}
	
	public enum Status {
		BOOKED, FREE;
	}
	
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

	public Type getTypeOfRoom() {
		return typeOfRoom;
	}

	public void setTypeOfRoom(Type typeOfRoom) {
		this.typeOfRoom = typeOfRoom;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public byte[] getRoomImage() {
		return roomImage;
	}

	public void setRoomImage(byte[] roomImage) {
		this.roomImage = roomImage;
	}

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}

	
	
	
		
	
}
