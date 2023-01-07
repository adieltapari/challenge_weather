import express from 'express';

const router = express.Router();

import { location, create, listCities } from '../controllers/location.controller';

router.get('/location', location);
router.post('/location/create', create);
router.get('/location/listCities', listCities);

export default router;
