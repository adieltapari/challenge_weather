import routerx from 'express-promise-router';
import locationRouter from './location';
import weatherRouter from './weather';

const router = routerx();

router.use('/api/v1', locationRouter);
router.use('/api/v1', weatherRouter);

export default router;
