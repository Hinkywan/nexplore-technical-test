import { Router } from 'express';
import { DutyService } from '../services/dutyService';
import { DutyController } from '../controllers/dutyController';
import { DutyModel } from '../models/dutyModel';

const router = Router();
const dutyModel = new DutyModel();
const dutyService = new DutyService(dutyModel);
const dutyController = new DutyController(dutyService);

// Create
router.post('/', dutyController.createDuty);
// Read
router.get('/', dutyController.getAllDuties);
// Read
router.get('/:id', dutyController.getDutyById);
// Update
router.put('/:id', dutyController.updateDuty);
// Delete
router.delete('/:id', dutyController.deleteDuty);

export default router;