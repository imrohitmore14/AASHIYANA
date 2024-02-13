package com.aashiyana.exception;

public class BookingServiceException extends RuntimeException{
	public BookingServiceException(String message, Throwable cause) {
		super(message, cause);
	}

	public BookingServiceException(String message) {
		super(message);
	}
}
