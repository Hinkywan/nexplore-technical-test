import { Duty } from "../interfaces/dutyIneterface";
import { DutyModel } from "../models/dutyModel";

export class DutyService {
    constructor(private dutyModel: DutyModel) {
    }

    // Create
    public createDuty = async (duty: Duty): Promise<Duty> => {
        return await this.dutyModel.createDuty(duty);
    }

    // Read
    public getAllDuties = async (): Promise<Duty[]> => {
        return await this.dutyModel.getAllDuties();
    }

    // Read
    public getDutyById = async (id: number): Promise<Duty> => {
        return await this.dutyModel.getDutyById(id);
    }

    // Update
    public updateDuty = async (id: number, duty: Duty): Promise<Duty> => {
        return await this.dutyModel.updateDuty(id, duty);
    }

    // Delete
    public deleteDuty = async (id: number): Promise<number | null> => {
        return await this.dutyModel.deleteDuty(id);
    }
}