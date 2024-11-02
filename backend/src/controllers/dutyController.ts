import { Duty } from "../interfaces/dutyIneterface";
import { NextFunction, Request, Response } from 'express';
import CustomError from "../utils/CustomError";
import { DutyService } from "../services/dutyService";
import { CreateDutyDto } from "../dto/duty/CreateDutyDto";
import { UpdateDutyDto } from "../dto/duty/UpdateDutyDto";
import { plainToClass } from "class-transformer";
import { ParamsDto } from "../dto/paramsDto";

export class DutyController {
    constructor(private dutyService: DutyService) {
    }

    // Create
    public createDuty = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const createDutyDto: CreateDutyDto = plainToClass(CreateDutyDto, req.body);
        try {
            const newDuty: Duty = await this.dutyService.createDuty(createDutyDto);
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
        const paramsDto: ParamsDto = plainToClass(ParamsDto, req.params);
        try {
            const duty: Duty = await this.dutyService.getDutyById(paramsDto.id);
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
        const paramsDto: ParamsDto = plainToClass(ParamsDto, req.params);
        const updateDutyDto: UpdateDutyDto = plainToClass(UpdateDutyDto, req.body);
        try {
            const updatedDuty: Duty = await this.dutyService.updateDuty(paramsDto.id, updateDutyDto);
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
        const paramsDto: ParamsDto = plainToClass(ParamsDto, req.params);
        try {
            const duty: number | null = await this.dutyService.deleteDuty(paramsDto.id);
            if (!duty) {
                throw new CustomError('Duty not found', 404);
            }
            res.status(204).end();
        } catch (err) {
            next(err);
        }
    }
}