package com.aashiyana.dto;

import org.springframework.web.multipart.MultipartFile;

public class RoomDetails {
	private int roomId;
	private double roomPrice;
	private String typeOfRoom;
	private String bookingStatus;
	private MultipartFile roomImage;
	
	public int getRoomId() {
		return roomId;
	}
	public void setRoomId(int roomId) {
		this.roomId = roomId;
	}
	public double getRoomPrice() {
		return roomPrice;
	}
	public void setRoomPrice(double roomPrice) {
		this.roomPrice = roomPrice;
	}
	public String getTypeOfRoom() {
		return typeOfRoom;
	}
	public void setTypeOfRoom(String typeOfRoom) {
		this.typeOfRoom = typeOfRoom;
	}
	public String getBookingStatus() {
		return bookingStatus;
	}
	public void setBookingStatus(String bookingStatus) {
		this.bookingStatus = bookingStatus;
	}
	public MultipartFile getRoomImage() {
		return roomImage;
	}
	public void setRoomImage(MultipartFile roomImage) {
		this.roomImage = roomImage;
	}
	

}
