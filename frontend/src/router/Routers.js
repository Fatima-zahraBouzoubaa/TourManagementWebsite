import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import Home from './../pages/Home';
import Tours from './../pages/Tours';
import ToursDetails from './../pages/TourDetails';
import Login from './../pages/Login';
import Register from './../pages/Register';
import SearchResultList from './../pages/SearchResultList';
import ThankYou from '../pages/ThankYou';
import BookedTours from '../component/Tour-Booked/BookedTours';
import AddTour from '../pages/AddTour'
const Routers = () => {
  return (
    <Routes>    <Route path='/' element={<Navigate to='/home'/>}/>
    <Route path='/home' element={<Home />}/>
      <Route path="tours" element={<Tours />} />
      <Route path="tours/:id" element={<ToursDetails />} />
      
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/tours/search" element={<SearchResultList/>}></Route>
      <Route path="/admin/add-tour" element={<AddTour />} /> {/* Route for AddTour */}
      <Route path="/thank-you" element={<ThankYou/>}></Route>
      <Route path="/booking/user/:userId" element={<BookedTours />} />
    </Routes>

  )
}

export default Routers