import { Duty } from "../interfaces/dutyIneterface";
import * as dutyService from '../services/dutyService';
import e, { Request, Response } from 'express';

// Craete
export const createDuty = async (req: Request, res: Response): Promise<void> => {
    console.log(req.body);
    const duty: Duty = req.body;
    try {
        const newDuty: Duty = await dutyService.createDuty(duty);
        res.json({
            status: 'success',
            data: newDuty
        });
    } catch (err) {
        console.error((err as Error).message);
        res.status(500).json({
            status: 'error',
            error: {
                code: 'INTERNAL_SERVER_ERROR',
                message: (err as Error).message
            }
        });
    }
}
