import { Duty } from "../interfaces/dutyIneterface";
import * as dutyModel from '../models/dutyModel';

// Create
export const createDuty = async (duty: Duty): Promise<Duty> => {
    return await dutyModel.createDuty(duty);
}

// Read
export const getAllDuties = async (): Promise<Duty[]> => {
    return await dutyModel.getAllDuties();
}

// Read
export const getDutyById = async (id: number): Promise<Duty> => {
    return await dutyModel.getDutyById(id);
}

// Update
export const updateDuty = async (id: number, duty: Duty): Promise<Duty> => {
    return await dutyModel.updateDuty(id, duty);
}