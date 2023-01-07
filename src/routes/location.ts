import express from 'express';

const router = express.Router();

import { location } from '../controllers/location.controller';

router.get('/location', location);

export default router;
