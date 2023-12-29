package com.aashiyana.dao;
import java.time.LocalDate;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;

import com.aashiyana.entity.City;
import com.aashiyana.entity.Hotel;
import com.aashiyana.entity.Room;
import com.aashiyana.entity.User;

public class SampleDao {

	    public static void main(String[] args) {
	        try {
	            // Initialize Hibernate
	            Configuration configuration = new Configuration().configure();
	            SessionFactory sessionFactory = configuration.buildSessionFactory();
	            Session session = sessionFactory.openSession();

	            // Insert sample data for User, Hotel, Room, and City entities
	            insertSampleData(session);

	            // Retrieve and display data for User, Hotel, Room, and City entities
	            displayUserData(session);
	            displayHotelData(session);
	            displayRoomData(session);
	            displayCityData(session);

	            // Close resources
	            session.close();
	            sessionFactory.close();
	        } catch (Exception e) {
	            e.printStackTrace();
	        }
	    }

	    private static void insertSampleData(Session session) {
	        Transaction transaction = null;

	        try {
	            transaction = session.beginTransaction();

	            // Create a sample User entity
	            User user = new User();
	            user.setUserName("John Doe");
	            user.setDateOfBirth(LocalDate.of(1990, 5, 15));
	            user.setGender(User.Gender.MALE);
	            user.setPhoneNo(1234567890);
	            user.setEmail("john.doe@example.com");
	            user.setPassword("password123");
	            user.setAadharId(123456789012L);
	            user.setAddress("123 Main Street, Cityville");

	            // Save the User entity to the database
	            session.save(user);

	            // Create a sample Hotel entity
	            Hotel hotel = new Hotel();
	            hotel.setHotelName("Sample Hotel");
	            hotel.setAddress("456 Main Street, Townsville");
	            hotel.setCity(session.get(City.class, "12345")); // Assuming the pincode is "12345"
	            hotel.setCountry("Sample Country");
	            hotel.setCountryCode("SC");
	            hotel.setNumberOfRooms(50);
	            hotel.setContactNumber("9876543210");
	            hotel.setEmail("sample.hotel@example.com");
	            hotel.setPassword("hotelpassword");
	            hotel.setHotelDescription("A sample hotel for testing purposes");

	            // Save the Hotel entity to the database
	            session.save(hotel);

	            // Create a sample Room entity
	            Room room = new Room();
	            room.setRoomId(1); // Set the room ID
	            room.setHotel(hotel); // Set the Hotel for the room
	            room.setTypeOfRoom(Room.Type.SINGLE_ROOM);
	            room.setPrice(100.0);
	            // Set room image (replace the byte array with actual image data)
	            room.setRoomImage(new byte[]{/* actual image data */});
	            room.setStatus(Room.Status.FREE);

	            // Save the Room entity to the database
	            session.save(room);

	            // Create a sample City entity
	            City city = new City();
	            city.setPincode(12345);
	            city.setCityName("Cityville");

	            // Save the City entity to the database
	            session.save(city);

	            transaction.commit();
	            System.out.println("Sample data inserted successfully.");
	        } catch (Exception e) {
	            if (transaction != null) {
	                transaction.rollback();
	            }
	            e.printStackTrace();
	        }
	    }

	    private static void displayUserData(Session session) {
	        try {
	            // Retrieve and display the User entity from the database
	            User user = session.get(User.class, 1); // Assuming the inserted user has ID 1

	            // Display retrieved data
	            System.out.println("User: " + user);
	        } catch (Exception e) {
	            e.printStackTrace();
	        }
	    }

	    private static void displayHotelData(Session session) {
	        try {
	            // Retrieve and display the Hotel entity from the database
	            Hotel hotel = session.get(Hotel.class, 1); // Assuming the inserted hotel has ID 1

	            // Display retrieved data
	            System.out.println("Hotel: " + hotel);
	        } catch (Exception e) {
	            e.printStackTrace();
	        }
	    }

	    private static void displayRoomData(Session session) {
	        try {
	            // Retrieve and display the Room entity from the database
	            Room room = session.get(Room.class, 1); // Assuming the inserted room has ID 1

	            // Display retrieved data
	            System.out.println("Room: " + room);
	        } catch (Exception e) {
	            e.printStackTrace();
	        }
	    }

	    private static void displayCityData(Session session) {
	        try {
	            // Retrieve and display the City entity from the database
	            City city = session.get(City.class, "12345"); // Assuming the inserted city has pincode "12345"

	            // Display retrieved data
	            System.out.println("City: " + city);
	        } catch (Exception e) {
	            e.printStackTrace();
	        }
	    }
	}

