import React, { useState } from 'react';
import '../styles/addtour.css';
import {BASE_URL} from './../utils/config';
const AddTour = () => {
  const [formData, setFormData] = useState({
    title: '',
    city: '',
    address: '',
    distance: 0,
    photo: '',
    desc: '',
    price: 0,
    maxGroupSize: 0,
    featured: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Retrieve the authentication token from localStorage
    const token = localStorage.getItem('token');
  
    try {
      const response = await fetch(`${BASE_URL}/tours/admin/add-tour`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create tour');
      }
      const data = await response.json();
      console.log('Tour created:', data);
      // Optionally, redirect or show a success message upon successful creation
    } catch (error) {
      console.error('Failed to create tour:', error.message);
      alert(`Failed to create tour: ${error.message}`); // Display error message to user
    }
  };
  
  
  

  return (
    <div className="container mt-5">
      <h2>Add New Tour</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="city" className="form-label">City</label>
          <input
            type="text"
            className="form-control"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">Address</label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="distance" className="form-label">Distance</label>
          <input
            type="number"
            className="form-control"
            id="distance"
            name="distance"
            value={formData.distance}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="photo" className="form-label">Photo URL</label>
          <input
            type="text"
            className="form-control"
            id="photo"
            name="photo"
            value={formData.photo}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="desc" className="form-label">Description</label>
          <textarea
            className="form-control"
            id="desc"
            name="desc"
            value={formData.desc}
            onChange={handleChange}
            rows="3"
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">Price</label>
          <input
            type="number"
            className="form-control"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="maxGroupSize" className="form-label">Max Group Size</label>
          <input
            type="number"
            className="form-control"
            id="maxGroupSize"
            name="maxGroupSize"
            value={formData.maxGroupSize}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="featured"
            name="featured"
            checked={formData.featured}
            onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
          />
          <label className="form-check-label" htmlFor="featured">Featured Tour</label>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default AddTour;
