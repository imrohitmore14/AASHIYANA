package com.aashiyana.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="booking")
public class Booking {

		@Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    @Column(name = "transaction_id")
	    private Long transactionId;

	    @ManyToOne
	    @JoinColumn(name = "hotel_id") //FK
	    private Hotel hotel;

	    @ManyToOne
	    @JoinColumn(name = "room_id") //FK
	    private Room room;

	    @ManyToOne
	    @JoinColumn(name = "user_id") //FK
	    private User user;

	    @Column(name = "transaction_date")
	    private LocalDateTime transactionDate; 

	    @Column(name = "check_in")
	    private LocalDate checkIn;

	    @Column(name = "check_out")
	    private LocalDate checkOut;

	    @Column(name = "room_price")
	    private double roomPrice;

	    @Column(name = "total_billing_amount")
	    private double totalBillingAmount;

	    // Constructors, getters, and setters
	    
	    public Long getTransactionId() {
			return transactionId;
		}

		public void setTransactionId(Long transactionId) {
			this.transactionId = transactionId;
		}

		public Hotel getHotel() {
			return hotel;
		}

		public void setHotel(Hotel hotel) {
			this.hotel = hotel;
		}

		public Room getRoom() {
			return room;
		}

		public void setRoom(Room room) {
			this.room = room;
		}

		public User getUser() {
			return user;
		}

		public void setUser(User user) {
			this.user = user;
		}

		public LocalDateTime getTransactionDate() {
			return transactionDate;
		}

		public void setTransactionDate(LocalDateTime transactionDate) {
			this.transactionDate = transactionDate;
		}

		public LocalDate getCheckIn() {
			return checkIn;
		}

		public void setCheckIn(LocalDate checkIn) {
			this.checkIn = checkIn;
		}

		public LocalDate getCheckOut() {
			return checkOut;
		}

		public void setCheckOut(LocalDate checkOut) {
			this.checkOut = checkOut;
		}

		public double getRoomPrice() {
			return roomPrice;
		}

		public void setRoomPrice(double roomPrice) {
			this.roomPrice = roomPrice;
		}

		public double getTotalBillingAmount() {
			return totalBillingAmount;
		}

		public void setTotalBillingAmount(double totalBillingAmount) {
			this.totalBillingAmount = totalBillingAmount;
		}
	}

