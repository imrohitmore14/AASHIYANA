package com.aashiyana.dto;

public class BookingStatus extends Status{
	private Long transactionId;

	public Long getTransactionId() {
		return transactionId;
	}

	public void setTransactionId(Long transactionId) {
		this.transactionId = transactionId;
	}
}
