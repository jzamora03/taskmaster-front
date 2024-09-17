// services/userService.js
import axios from 'axios';
const API_URL = 'http://localhost:5000/api';

// Obtener tareas del usuario
const getUserById = async (id, token) => {
  const response = await axios.get(`${API_URL}/users/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

//Editar datos del usuario
const updateUser = async (userId, userData, token) => {
  const response = await axios.put(`${API_URL}/users/${userId}`, userData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};


export default { getUserById, updateUser };
