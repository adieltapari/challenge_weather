import express from 'express';

const router = express.Router();

import { location, create, listCities } from '../controllers/location.controller';
router.get('/location', location); //GET LOCATION
router.post('/location/create', create); //POST LOCATION
router.get('/location/listCities', listCities); //GET LOCATION

export default router;
