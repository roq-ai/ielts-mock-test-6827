import axios from 'axios';
import queryString from 'query-string';
import { ResultInterface, ResultGetQueryInterface } from 'interfaces/result';
import { GetQueryInterface } from '../../interfaces';

export const getResults = async (query?: ResultGetQueryInterface) => {
  const response = await axios.get(`/api/results${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createResult = async (result: ResultInterface) => {
  const response = await axios.post('/api/results', result);
  return response.data;
};

export const updateResultById = async (id: string, result: ResultInterface) => {
  const response = await axios.put(`/api/results/${id}`, result);
  return response.data;
};

export const getResultById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/results/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteResultById = async (id: string) => {
  const response = await axios.delete(`/api/results/${id}`);
  return response.data;
};
