import express from 'express';
import {signup,login,logout} from "../controller/auth.controller.js";
import verifyToken from '../utils/verifyUser.js'

const router = express.Router()


router.post('/signup',signup)
router.post('/login',login)
router.get('/logout',verifyToken,logout)

export default router;