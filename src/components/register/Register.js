import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import { toast } from 'react-toastify';

const Register = () => {
  const [name, setName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await authService.register(name, last_name, email, password, phone, address);
      toast.success('Registro exitoso!');
      navigate('/login');
    } catch (error) {
      toast.error('Error al registrar el usuario');
    }
  };

  return (
    <div>
      <h2>Registro de usuario</h2>
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="text" placeholder="Apellido" value={last_name} onChange={(e) => setLastName(e.target.value)} required />
        <input type="email" placeholder="Correo" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <input type="text" placeholder="Numero" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        <input type="text" placeholder="Direccion" value={address} onChange={(e) => setAddress(e.target.value)} required />
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default Register;
