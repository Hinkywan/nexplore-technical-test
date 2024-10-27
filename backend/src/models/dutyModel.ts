import pool from "../config/data-source";
import { Duty } from "../interfaces/dutyIneterface";

// Create
export const createDuty = async (duty: Duty): Promise<Duty> => {
    const result = await pool.query<Duty>('INSERT INTO duties (name, title, description, status) VALUES ($1, $2, $3, $4) RETURNING *', [duty.name, duty.title, duty.description, duty.status]);
    return result.rows[0];
}
