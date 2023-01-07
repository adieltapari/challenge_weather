import routerx from 'express-promise-router';
import locationRouter from './location';
import currentRouter from './current';

const router = routerx();

router.use('/api/v1', locationRouter);
router.use('/api/v1', currentRouter);

export default router;
