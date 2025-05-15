import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { Investor } from '../domain/Investor';
import type { Commitment } from '../domain/Commitment';

const apiClient = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const apiRequest = async <T>(url: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', data?: any): Promise<T> => {
    const response: AxiosResponse<T> = await apiClient({
        method,
        url,
        data,
    });

    return response.data;
};

export const fetchInvestors = async (): Promise<Investor[]> => {
    return await apiRequest<Investor[]>('/investors', 'GET');
};

export const fetchCommitmentsByInvestorId = async (investorId: number): Promise<Commitment[]> => {
    return await apiRequest<Commitment[]>(`/investors/${investorId}/commitments`, 'GET');
};