import React, { useEffect, useState } from 'react';
import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import { BASE_URL } from './../../utils/config';
import './booked-tours.css';

const BookedTours = () => {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        console.log('Parsed User:', parsedUser); // Debug statement
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing user from localStorage', error);
      }
    }
  }, []);

  useEffect(() => {
    const fetchBookings = async () => {
      if (user && user._id) {
        console.log('User ID:', user._id); // Debug statement
        const token = localStorage.getItem('token'); // Retrieve the token from localStorage
        try {
          const response = await fetch(`${BASE_URL}/booking/user/${user._id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`, // Include the token in the headers
            },
            credentials: 'include',
          });

          if (response.ok) {
            const result = await response.json();
            setBookings(result.data);
          } else {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch bookings');
          }
        } catch (error) {
          console.error('Error fetching bookings:', error);
          setError(error.message);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

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
