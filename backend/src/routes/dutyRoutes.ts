import { Router } from 'express';
import { DutyService } from '../services/dutyService';
import { DutyController } from '../controllers/dutyController';
import { DutyModel } from '../models/dutyModel';

const router = Router();
const dutyModel = new DutyModel();
const dutyService = new DutyService(dutyModel);
const dutyController = new DutyController(dutyService);

// Create
router.post('/duties', dutyController.createDuty);
// Read
router.get('/duties', dutyController.getAllDuties);
// Read
router.get('/duties/:id', dutyController.getDutyById);
// Update
router.put('/duties/:id', dutyController.updateDuty);
// Delete
router.delete('/duties/:id', dutyController.deleteDuty);

export default router;