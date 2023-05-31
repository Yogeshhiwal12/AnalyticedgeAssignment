import axios from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const getUsers = async (page: number, pageSize: number) => {
  const response = await axios.get(`${BASE_URL}/users?_page=${page}&_limit=${pageSize}`);
  return response.data;
}

export const getPosts = async (page: number, pageSize: number) => {
  const response = await axios.get(`${BASE_URL}/posts?_page=${page}&_limit=${pageSize}`);
  return response.data;
}

export const getComments = async (page: number, pageSize: number) => {
  const response = await axios.get(`${BASE_URL}/comments?_page=${page}&_limit=${pageSize}`);
  return response.data;
}
