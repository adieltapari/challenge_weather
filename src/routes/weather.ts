import express from 'express';

const router = express.Router();

import { current, forecast } from '../controllers/weather.controller';

router.get('/current', current); //GET WEATHER
router.get('/forecast', forecast); //GET WEATHER

export default router;
