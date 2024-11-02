import { Duty } from "../interfaces/dutyIneterface";
import { NextFunction, Request, Response } from 'express';
import CustomError from "../utils/CustomError";
import { DutyService } from "../services/dutyService";

export class DutyController {
    constructor(private dutyService: DutyService) {
    }

    // Craete
    public createDuty = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const duty: Duty = req.body;
        try {
            const newDuty: Duty = await this.dutyService.createDuty(duty);
            res.status(201).json({
                status: 'success',
                data: newDuty
            });
        } catch (err) {
            next(err);
        }
    }

    // Read
    public getAllDuties = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const duties: Duty[] = await this.dutyService.getAllDuties();
            res.status(200).json({
                status: 'success',
                data: duties
            });
        } catch (err) {
            next(err);
        }
    }

    // Read
    public getDutyById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const id: number = parseInt(req.params.id);
        try {
            const duty: Duty = await this.dutyService.getDutyById(id);
            if (!duty) {
                throw new CustomError('Duty not found', 404);
            }
            res.status(200).json({
                status: 'success',
                data: duty
            });
        } catch (err) {
            next(err);
        }
    }

    // Update
    public updateDuty = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const id: number = parseInt(req.params.id);
        const duty: Duty = req.body;
        try {
            const updatedDuty: Duty = await this.dutyService.updateDuty(id, duty);
            if (!updatedDuty) {
                throw new CustomError('Duty not found', 404);
            }
            res.status(200).json({
                status: 'success',
                data: updatedDuty
            });
        } catch (err) {
            next(err);
        }
    }

    // Delete
    public deleteDuty = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const id: number = parseInt(req.params.id);
        try {
            const duty: number | null = await this.dutyService.deleteDuty(id);
            if (!duty) {
                throw new CustomError('Duty not found', 404);
            }
            res.status(204).end();
        } catch (err) {
            next(err);
        }
    }
}