import express from 'express';

const router = express.Router();

import { current, forecast } from '../controllers/weather.controller';

router.get('/current', current);
router.get('/forecast', forecast);

export default router;
