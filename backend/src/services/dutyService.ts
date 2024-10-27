import { Duty } from "../interfaces/dutyIneterface";
import * as dutyModel from '../models/dutyModel';

// Create
export const createDuty = async (duty: Duty): Promise<Duty> => {
    return await dutyModel.createDuty(duty);
}
