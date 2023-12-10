

import Booking from '../models/Booking.js';
//const express = require("express");
//const router = express.Router();
//const authMiddleware = require("../middleware/auth.js"); 

// Votre route qui utilise le middleware
/*router.post("/",async (req, res) => {
  try {
    // L'ID de l'utilisateur est maintenant disponible dans req.userId grâce au middleware
    const userId = req.userId;

    // Faites ce que vous devez faire avec l'ID de l'utilisateur, par exemple, créer une réservation
    const newBooking = new Booking({
        userId: userId,
        userEmail: "", 
        tourName: tourName,
        fullName: fullName,
        guestSize: guestSize,
        phone: phone,
        bookAt: bookAt,
      });

      const savedBooking = await newBooking.save();

      res.status(200).json({
        success: true,
        message: 'Your tour is booked',
        data: savedBooking,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: err.message,
      });
    }
  });


*/

//create new booking 
export const createBooking = async(req,res)=>{
    const { userId, userEmail, ...bookingData } = req.body;
    const newBooking = new Booking(req.body)
    try {
        
        const savedBooking = await newBooking.save();

        res.status(200).json({success:true,message:'Your tour is booked',  
        data:savedBooking}
      )
    } catch (err) {
        res.status(500).json({success:true,message:'internal server error'
      }
      );
        
    }
};
// get single booking 
export const getBooking = async(req,res)=>{
    const id = req.params.id

    try {
        const book = await Booking.findById(id);
        res
        .status(200)
        .json({
            success:true,
            message:'Successful',  
            data:book,}
      );
    } catch (error) {
        res.status(404).json({success:true,message:'Not found'
    }
    );
      
        
    }
};

// get all booking 
export const getAllBooking = async(req,res)=>{

    try {
        const book = await Booking.find();
        res
        .status(200)
        .json({
            success:true,
            message:'Successful',  
            data:book,}
      );
    } catch (error) {
        res.status(500).json({success:true,message:'Internal server error'
    }
    );
      
        
    }
};




