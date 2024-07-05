import express from 'express'
import { handleUserSignup, handleUserLogin } from '../controllers/user.js';

export const router = express.Router()

router.post('/', handleUserSignup)

router.post('/login', handleUserLogin);