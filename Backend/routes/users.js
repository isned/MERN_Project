import express from 'express';
import { deleteUser, getAllUser, getSingleUser, updateUser } from '../controllers/userController.js';
const router=express.Router();

//import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';



//update user
//router.put('/:id',verifyUser,updateUser);
router.put('/:id',updateUser);

//delete user
//router.delete('/:id',verifyUser,deleteUser);
router.delete('/:id',deleteUser);

//get single user
//router.post('/:id',verifyUser,getSingleUser);
router.post('/:id',getSingleUser);

//get all user
//router.post('/',verifyAdmin,getAllUser);
router.post('/',getAllUser);

export default router;