import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import {Home} from './components/Home';
import Register from './components/register/Register';
import Login from './components/login/Login';
import TaskManager from './components/task/TaskManager';
import UserProfile from './components/profile/UserProfile';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/taskmanager" element={<TaskManager />} />
          <Route path="/profile/:id" element={<UserProfile />} />
        </Routes>
      </Router>
      <ToastContainer />
    </AuthProvider>
  );
};

export default App;
