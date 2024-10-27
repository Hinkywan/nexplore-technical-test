import { Router } from 'express';
import * as dutyController from '../controllers/dutyController';

const router = Router();

// Create
router.post('/duties', dutyController.createDuty);

export default router;