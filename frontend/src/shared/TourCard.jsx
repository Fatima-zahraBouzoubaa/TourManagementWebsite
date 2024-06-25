import React from 'react';
import { Card, CardBody } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import calculateAvgRating from '../utils/avgRating';
import './tour-card.css';
import { BASE_URL } from '../utils/config';

const TourCard = ({ tour }) => {
  const { _id, title, city, photo, price, featured, reviews } = tour;
  const { totalRating, avgRating } = calculateAvgRating(reviews);
  const navigate = useNavigate();

  const handleDelete = async () => {
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`${BASE_URL}/tours/admin/delete-tour/${_id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        alert('Tour deleted successfully');
        navigate('/tours'); // Redirect to the tours page after deletion
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete tour');
      }
    } catch (error) {
      console.error('Failed to delete tour:', error.message);
      alert(`Failed to delete tour: ${error.message}`);
    }
  };

  return (
    <div className='tour__card'>
      <Card>
        <div className='tour__img'>
          <img src={photo} alt="tour-img" />
          {featured && <span>Featured</span>}
        </div>

        <CardBody>
          <div className="card__top d-flex align-items-center justify-content-between">
            <span className="tour__location d-flex align-items-center gap-1">
              <i className="ri-map-pin-line"></i>{city}
            </span>
            <span className="tour__rating d-flex align-items-center gap-1">
              <i className="ri-star-fill"></i>
              {avgRating === 0 ? null : avgRating}
              {totalRating === 0 ? (
                "Not Rated"
              ) : (
                <span>({reviews.length})</span>
              )}
            </span>
          </div>

          <h5 className='tour__title'>
            <Link to={`/tours/${_id}`}>{title}</Link>
          </h5>

          <div className="card__bottom d-flex align-items-center justify-content-between mt-3">
            <h5>{price} <span> DH /per person</span></h5>
            <button className='btn booking__btn'>
              <Link to={`/tours/${_id}`}>Book Now</Link>
            </button>
          </div>

          {/* Admin buttons */}
          <div className="admin__buttons mt-3 d-flex justify-content-between">
            <button className='btn btn-warning'>
              <Link to={{
                pathname: `/admin/update-tour/${_id}`,
                state: { tourData: tour }  // Pass tour data as state
              }}>Update</Link>
            </button>
            <button className='btn btn-danger' onClick={handleDelete}>Delete</button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default TourCard;
