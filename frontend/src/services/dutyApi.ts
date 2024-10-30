import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const getDuties = async () => {
    try {
        return await axios.get(`${API_URL}/duties`);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Axios error:', error.message);
        } else {
            console.error('Unexpected error:', error);
        }
        throw error;
    }
};

export const createDuty = async (duty: any) => {
    return await axios.post(`${API_URL}/duties`, duty);
};

export const getDutyById = async (id: number) => {
    return await axios.get(`${API_URL}/duties/${id}`);
};

export const updateDuty = async (id: number, duty: any) => {
    return await axios.put(`${API_URL}/duties/${id}`, duty);
};

// Add other API calls as needed