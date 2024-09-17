import axios from 'axios';

 const API_URL = 'http://localhost:5000/api/auth';


// Registro
const register = async (name, last_name, email, password, phone, address) => {
  const response = await axios.post(`${API_URL}/register`, { name, last_name, email, password, phone, address });
  return response.data;
};

// Login
const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data;
};

export default { register, login };
