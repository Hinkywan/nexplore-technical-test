import pool from "../config/data-source";
import { Duty } from "../interfaces/dutyIneterface";

// Create
export const createDuty = async (duty: Duty): Promise<Duty> => {
    const result = await pool.query<Duty>('INSERT INTO duties (name, title, description, status) VALUES ($1, $2, $3, $4) RETURNING *', [duty.name, duty.title, duty.description, duty.status]);
    return result.rows[0];
}

// Read
export const getAllDuties = async (): Promise<Duty[]> => {
    const result = await pool.query<Duty>('SELECT * FROM duties');
    return result.rows;
}

// Read
export const getDutyById = async (id: number): Promise<Duty> => {
    const result = await pool.query<Duty>('SELECT * FROM duties WHERE id = $1', [id]);
    return result.rows[0];
}

// Update
export const updateDuty = async (id: number, duty: Duty): Promise<Duty> => {
    const result = await pool.query<Duty>('UPDATE duties SET name = $1, title = $2, description = $3, status = $4 WHERE id = $5 RETURNING *', [duty.name, duty.title, duty.description, duty.status, id]);
    return result.rows[0];
}

// Delete
export const deleteDuty = async (id: number): Promise<void> => {
    await pool.query('DELETE FROM duties WHERE id = $1', [id]);
}