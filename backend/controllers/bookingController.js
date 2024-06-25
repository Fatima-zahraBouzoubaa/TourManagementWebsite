
import Booking from '../models/Booking.js'
//create new booking
export const createBooking = async (req,res)=>{
    const newBooking = new Booking(req.body)
    try {
        const savedBooking = await newBooking.save()
        res
        .status(200)
         .json({success:true,message:"Your tour is booked",data:savedBooking})
    } catch (err) {
        res.status(500).json({success:true,message:"internal server error"})
    }
}
//get single booking
export const getBooking = async(req,res)=>{
    const id = req.params.id
    try {
        const book = await Booking.findById(id)
        res
        .status(200)
         .json({success:true,message:"successful",data:book})
    }
    catch(err){
        res.status(404).json({success:true,message:"not found"})
    }
}
//get all bookings

export const getAllBooking = async(req,res)=>{
    
    try {
        const books = await Booking.
        res
        .status(200)
         .json({success:true,message:"successful",data:books})
    }
    catch(err){
        res.status(500).json({success:true,message:"internal server error"})
    }
}
// Get all bookings by user ID
export const getAllBookingById = async (req, res) => {
    const userId = req.params.userId;
    console.log("Fetching bookings for user:", userId); // Debugging statement
    try {
        const bookings = await Booking.find({ userId: userId });
        if (!bookings || bookings.length === 0) {
            return res.status(404).json({ success: false, message: 'No bookings found for this user' });
        }
        res.status(200).json({ success: true, data: bookings });
    } catch (err) {
        console.error(err); // Debugging statement
        res.status(500).json({ success: false, message: 'Internal server error', error: err.message });
    }
};