import api from '../api';

export const getComments = async () => {
  const response = await api.get('comments');
  return response.data;
};