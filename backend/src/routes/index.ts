import { Router } from 'express';
import dutyRoutes from './dutyRoutes';

const router = Router();

router.use('/duties', dutyRoutes);

export default router;