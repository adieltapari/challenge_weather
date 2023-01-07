import express from 'express';

const router = express.Router();

import { current } from '../controllers/weather.controller';

router.get('/current', current);

export default router;
