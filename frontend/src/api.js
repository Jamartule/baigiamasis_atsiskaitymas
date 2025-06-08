import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const login = (username, password) =>
  axios.post(`${API_URL}/auth/login`, { username, password });

export const getEquipment = () => axios.get(`${API_URL}/equipment`);
export const getEquipmentById = (id) => axios.get(`${API_URL}/equipment/${id}`);
export const createEquipment = (data) =>
  axios.post(`${API_URL}/equipment`, data);
export const updateEquipment = (id, data) =>
  axios.put(`${API_URL}/equipment/${id}`, data);
export const deleteEquipment = (id) =>
  axios.delete(`${API_URL}/equipment/${id}`);

export const getReservations = () => axios.get(`${API_URL}/reservations`);
export const createReservation = (data) =>
  axios.post(`${API_URL}/reservations`, data);
export const updateReservation = (id, data) =>
  axios.put(`${API_URL}/reservations/${id}`, data);
export const deleteReservation = (id) =>
  axios.delete(`${API_URL}/reservations/${id}`);

export const getUserByUsername = (username) =>
  axios.get(`${API_URL}/users/${username}`);
export const updateUser = (username, data) =>
  axios.put(`${API_URL}/users/${username}`, data);
