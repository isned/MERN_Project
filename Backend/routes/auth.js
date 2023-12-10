import express from "express";
import {register,login} from './../controllers/authController.js';
//import { verifyToken } from "../utils/verifyToken.js";

const router=express.Router()

router.post('/register',register)
router.post('/login',login)
//router.get('/test',verifyToken ,test)

export default router