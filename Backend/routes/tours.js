import express from "express";
import { createTour, 
    deleteTour,
    getAllTour,
    getSingleTour,
    updateTour,
    getTourBySearch,
    getFeaturedTour,
    getTourCount,
     } from "./../controllers/tourController.js";

//import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();



//create new tour 
//router.post('/',verifyAdmin,createTour);
router.post('/',createTour);


//update tour 
//router.put('/:id',verifyAdmin,updateTour);
router.put('/:id',updateTour);

//delete tour 
//router.delete('/:id',verifyAdmin,deleteTour);
router.delete('/:id',deleteTour);


//get single tour 
router.post('/:id',getSingleTour);

//get all tour 
router.get('/',getAllTour);

//get tour by search
router.get('/search/getTourBySearch', getTourBySearch);

//get Featured tour 
router.get("/search/getFeaturedTour" , getFeaturedTour);

//get tour count
router.get("/search/getTourCount" , getTourCount);

export default router;