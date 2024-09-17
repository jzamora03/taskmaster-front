
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tasks';

// Obtener tareas del usuario
const getTasks = async (token) => {
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Crear nueva tarea
const createTask = async (taskData, token) => {
  const response = await axios.post(API_URL, taskData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Actualizar tarea
export const updateTask = async (taskId, taskData, token) => {
  const response = await axios.put(`${API_URL}/${taskId}`, taskData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Eliminar tarea
const deleteTask = async (taskId, token) => {
  await axios.delete(`${API_URL}/${taskId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export default { getTasks, createTask, updateTask, deleteTask };

