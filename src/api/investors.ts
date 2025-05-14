import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:8080' });

export const fetchInvestors = async () => {
  const res = await api.get('/investors');
  return res.data;
};

export const fetchCommitments = async (investorId: string) => {
  const res = await api.get(`investors/${investorId}/commitments`);
  return res.data;
};
