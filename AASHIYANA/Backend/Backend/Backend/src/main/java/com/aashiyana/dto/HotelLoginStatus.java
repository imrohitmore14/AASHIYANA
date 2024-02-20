package com.aashiyana.dto;

public class HotelLoginStatus extends Status{
	private long hotelId;
	public long getHotelId() {
		return hotelId;
	}
	public void setHotelId(long id) {
		this.hotelId = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	private String name;
}
