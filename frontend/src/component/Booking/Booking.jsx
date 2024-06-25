import React, { useState, useContext, useEffect } from 'react';
import './booking.css';
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { BASE_URL } from '../../utils/config';

const Booking = ({ tour, avgRating }) => {
  const { price, reviews, title } = tour;
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [booking, setBooking] = useState({
    userId: user && user._id,
    userEmail: user && user.email,
    tourName: title,
    fullName: '',
    phone: '',
    guestSize: 0,
    bookAt: '',
  });

  useEffect(() => {
    if (user) {
      setBooking((prev) => ({
        ...prev,
        userId: user._id,
        userEmail: user.email,
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    setBooking((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const serviceFee = 10;
  const totalAmount = Number(price)+Number(price) * Number(booking.guestSize) + Number(serviceFee);

  const handleClick = async (e) => {
    e.preventDefault();
    
    try {
      if (!user || user === undefined || user===null) {
        return alert('Please sign in');
      }
      const res = await fetch(`${BASE_URL}/booking`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials:'include',
        body: JSON.stringify(booking),
      });

      const result = await res.json();

      if (!res.ok) {
        return alert(result.message);
      }
      navigate('/thank-you');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="booking">
      <div className="booking__top d-flex align-items-center justify-content-between">
        <h3>{price} <span>DH /per person</span></h3>
        <span className="tour__rating d-flex align-items-center">
          <i className="ri-star-fill"></i>
          {avgRating === 0 ? null : avgRating}({reviews?.length})
        </span>
      </div>
      {/*========booking form========== */}
      <div className="booking__form">
        <h5>Information</h5>
        <Form className="booking__info-form" onSubmit={handleClick}>
          <FormGroup>
            <input type="text" placeholder="Full Name" id="fullName" required onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <input type="number" placeholder="Phone" id="phone" required onChange={handleChange} />
          </FormGroup>
          <FormGroup className="d-flex align-items-center gap-3">
            <input
              type="date"
              id="bookAt"
              required
              onChange={handleChange}
            />
            <input
              type="number"
              placeholder="Guest"
              id="guestSize"
              required
              onChange={handleChange}
            />
          </FormGroup>
          <Button type="submit" className="btn primary__btn w-100 mt-4">Book Now</Button>
        </Form>
      </div>
      {/*========booking form end========== */}

      {/*========booking bottom========== */}
      <div className="booking__bottom">
        <ListGroup>
          <ListGroupItem className="border-0 px-0">
            <h5 className="d-flex align-items-center gap-1">{price} DH<i className="ri-close-line"></i> 1 person</h5>
            <span>{price} DH</span>
          </ListGroupItem>
          <ListGroupItem className="border-0 px-0">
            <h5>Service charge</h5>
            <span>{serviceFee} DH</span>
          </ListGroupItem>
          <ListGroupItem className="total border-0 px-0">
            <h5>Total</h5>
            <span>{totalAmount} DH</span>
          </ListGroupItem>
        </ListGroup>
      </div>
    </div>
  );
};

export default Booking;
