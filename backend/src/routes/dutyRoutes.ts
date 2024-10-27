import { Router } from 'express';
import * as dutyController from '../controllers/dutyController';

const router = Router();

// Create
router.post('/duties', dutyController.createDuty);
// Read
router.get('/duties', dutyController.getAllDuties);
// Read
router.get('/duties/:id', dutyController.getDutyById);

export default router;