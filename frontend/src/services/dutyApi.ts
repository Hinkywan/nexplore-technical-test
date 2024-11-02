import axios from 'axios';
import { Duty } from '../types/Duty';
import { ApiResponse } from '../types/ApiResponse';

const API_URL = process.env.REACT_APP_API_URL;

export const getDuties = async () => {
    return await axios.get<ApiResponse<Duty[]>>(`${API_URL}/duties`);
};

export const createDuty = async (duty: Duty) => {
    return await axios.post<ApiResponse<Duty>>(`${API_URL}/duties`, duty);
};

export const getDutyById = async (id: number) => {
    return await axios.get<ApiResponse<Duty>>(`${API_URL}/duties/${id}`);
};

export const updateDuty = async (id: number, duty: Duty) => {
    return await axios.put<ApiResponse<Duty>>(`${API_URL}/duties/${id}`, duty);
};

export const deleteDuty = async (id: number) => {
    return await axios.delete<void>(`${API_URL}/duties/${id}`);
};

// Add other API calls as needed