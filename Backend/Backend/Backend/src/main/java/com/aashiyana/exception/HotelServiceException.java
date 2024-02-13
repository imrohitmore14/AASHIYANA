package com.aashiyana.exception;

public class HotelServiceException extends RuntimeException{
	public HotelServiceException(String message, Throwable cause) {
		super(message, cause);
	}

	public HotelServiceException(String message) {
		super(message);
	}
}
