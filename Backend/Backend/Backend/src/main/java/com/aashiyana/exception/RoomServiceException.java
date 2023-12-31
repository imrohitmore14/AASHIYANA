package com.aashiyana.exception;

public class RoomServiceException extends RuntimeException{
	public RoomServiceException(String message, Throwable cause) {
		super(message, cause);
	}

	public RoomServiceException(String message) {
		super(message);
	}
}
