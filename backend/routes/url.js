import express from 'express'
import {
    handleGenerateNewShortURL,
    handleGetShortURL,
    handleGetAllURL,
    handleGetAnalytics
} from '../controllers/url.js';

export const router = express.Router()

router.post('/', handleGenerateNewShortURL);

router.get('/:shortID', handleGetShortURL);

router.get('/analytics/:shortID', handleGetAnalytics);

router.get('/', handleGetAllURL)