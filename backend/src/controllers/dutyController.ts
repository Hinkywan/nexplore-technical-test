import { Duty } from "../interfaces/dutyIneterface";
import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../interfaces/CustomError';
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
            const error: CustomError = err as CustomError;
            error.status = 500;
            next(error);
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
            const error: CustomError = err as CustomError;
            error.status = 500;
            next(error);
        }
    }

    // Read
    public getDutyById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const id: number = parseInt(req.params.id);
        try {
            const duty: Duty = await this.dutyService.getDutyById(id);
            if (!duty) {
                const error: CustomError = new Error('Duty not found') as CustomError;
                error.status = 404;
                return next(error);
            }
            res.status(200).json({
                status: 'success',
                data: duty
            });
        } catch (err) {
            const error: CustomError = err as CustomError;
            error.status = 500;
            next(error);
        }
    }

    // Update
    public updateDuty = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const id: number = parseInt(req.params.id);
        const duty: Duty = req.body;
        try {
            const updatedDuty: Duty = await this.dutyService.updateDuty(id, duty);
            if (!updatedDuty) {
                const error: CustomError = new Error('Duty not found') as CustomError;
                error.status = 404;
                return next(error);
            }
            res.status(200).json({
                status: 'success',
                data: updatedDuty
            });
        } catch (err) {
            const error: CustomError = err as CustomError;
            error.status = 500;
            next(error);
        }
    }

    // Delete
    public deleteDuty = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const id: number = parseInt(req.params.id);
        try {
            const duty: number | null = await this.dutyService.deleteDuty(id);
            if (!duty) {
                const error: CustomError = new Error('Duty not found') as CustomError;
                error.status = 404;
                return next(error);
            }
            res.status(200).json({
                status: 'success',
                data: null
            });
        } catch (err) {
            const error: CustomError = err as CustomError;
            error.status = 500;
            next(error);
        }
    }
}