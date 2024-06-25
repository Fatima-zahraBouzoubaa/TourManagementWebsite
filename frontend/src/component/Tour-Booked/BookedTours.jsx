// src/pages/BookedTours.js

import React, { useEffect, useState, useContext } from 'react';
import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import { AuthContext } from './../../context/AuthContext';
import {BASE_URL} from './../../utils/config';
import './booked-tours.css';

const BookedTours = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      if (user) {
        try {
          const response = await fetch(`${BASE_URL}/booking/user/${user._id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          });
          const result = await response.json();
          if (response.ok) {
            setBookings(result.data);
          } else {
            console.error(result.message);
          }
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchBookings();
  }, [user]);

  return (
    <Container className="booked-tours">
      <Row>
        <Col lg="12">
          <h2 className="mb-4">My Booked Tours</h2>
          {bookings.length === 0 ? (
            <p>You have not booked any tours yet.</p>
          ) : (
            <ListGroup>
              {bookings.map((booking) => (
                <ListGroupItem key={booking._id}>
                  <h5>{booking.tourName}</h5>
                  <p>Booked on: {new Date(booking.bookAt).toLocaleDateString()}</p>
                  <p>Guests: {booking.guestSize}</p>
                </ListGroupItem>
              ))}
            </ListGroup>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default BookedTours;
