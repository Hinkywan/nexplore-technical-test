import { Duty } from "../interfaces/dutyIneterface";
import * as dutyService from '../services/dutyService';
import e, { NextFunction, Request, Response } from 'express';
import { CustomError } from '../interfaces/CustomError';

// Craete
export const createDuty = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const duty: Duty = req.body;
    try {
        const newDuty: Duty = await dutyService.createDuty(duty);
        res.json({
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
export const getAllDuties = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const duties: Duty[] = await dutyService.getAllDuties();
        res.json({
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
export const getDutyById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const id: number = parseInt(req.params.id);
    try {
        const duty: Duty = await dutyService.getDutyById(id);
        if (!duty) {
            const error: CustomError = new Error('Duty not found') as CustomError;
            error.status = 404;
            return next(error);
        }
        res.json({
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
export const updateDuty = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const id: number = parseInt(req.params.id);
    const duty: Duty = req.body;
    try {
        const updatedDuty: Duty = await dutyService.updateDuty(id, duty);
        if (!updatedDuty) {
            const error: CustomError = new Error('Duty not found') as CustomError;
            error.status = 404;
            return next(error);
        }
        res.json({
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
export const deleteDuty = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const id: number = parseInt(req.params.id);
    try {
        const duty: Duty = await dutyService.getDutyById(id);
        if (!duty) {
            const error: CustomError = new Error('Duty not found') as CustomError;
            error.status = 404;
            return next(error);
        }
        res.json({
            status: 'success',
            data: null
        });
    } catch (err) {
        const error: CustomError = err as CustomError;
        error.status = 500;
        next(error);
    }
}