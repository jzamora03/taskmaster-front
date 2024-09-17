import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import taskService from '../../services/taskService';
import AuthContext from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { FaTrashAlt, FaEdit, FaPlus } from 'react-icons/fa';
import './TaskManager.css';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pendiente');
  const [filter, setFilter] = useState('all');
  const [selectedTask, setSelectedTask] = useState(null);
  const { user } = useContext(AuthContext);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); 

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await taskService.getTasks(localStorage.getItem('token'));
        setTasks(data);
      } catch (error) {
        toast.error('Error al obtener las tareas');
      }
    };
    fetchTasks();
  }, []);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      const taskData = { title, description, status };
      const newTask = await taskService.createTask(taskData, localStorage.getItem('token'));
      setTasks([...tasks, newTask]);
      toast.success('Tarea creada');
      setTitle('');
      setDescription('');
      setStatus('pendiente');
      setIsCreateModalOpen(false); // Cerrar modal después de crear la tarea
    } catch (error) {
      toast.error('Error al crear la tarea');
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
      try {
        await taskService.deleteTask(taskId, localStorage.getItem('token'));
        setTasks(tasks.filter(task => task.id !== taskId));
        toast.success('Tarea eliminada');
      } catch (error) {
        toast.error('Error al eliminar la tarea');
      }
    }
  };

  const handleEditTask = async () => {
    try {
      const taskData = { title: selectedTask.title, description: selectedTask.description, status: selectedTask.status };
      const updatedTask = await taskService.updateTask(selectedTask.id, taskData, localStorage.getItem('token'));
      setTasks(tasks.map(task => (task.id === selectedTask.id ? updatedTask : task)));
      setSelectedTask(null);
      toast.success('Tarea actualizada');
    } catch (error) {
      toast.error('Error al actualizar la tarea');
    }
  };

  const handleFilterChange = (status) => {
    setFilter(status);
  };

  const filteredTasks = filter === 'all' ? tasks : tasks.filter(task => task.status === filter);

  return (
    <div className="container">
      <h2>Gestiona tus tareas</h2>
      <div className="container-profileBtn">
        <Link to={`/profile/${user.id}`} className="profile-link">
          <button className="profile-button">Ir al Perfil</button>
        </Link>
      </div>
      
      {/* Botón para abrir el modal de crear tarea */}
      <button onClick={() => setIsCreateModalOpen(true)} className="create-task-button">
        <FaPlus /> Crear Tarea
      </button>

      {/* Filtros de tareas */}
      <div className="task-filters">
        <button onClick={() => handleFilterChange('all')}>Todas</button>
        <button onClick={() => handleFilterChange('pendiente')}>Pendientes</button>
        <button onClick={() => handleFilterChange('en progreso')}>En Progreso</button>
        <button onClick={() => handleFilterChange('completada')}>Completadas</button>
      </div>

      {/* Tablero Kanban */}
      <div className="kanban-board">
        {['pendiente', 'en progreso', 'completada'].map((status) => (
          <div key={status} className={`kanban-column ${status.replace(' ', '-')}`}>
            <h3>{status.charAt(0).toUpperCase() + status.slice(1)}</h3>
            {filteredTasks
              .filter((task) => task.status === status)
              .map((task) => (
                <div key={task.id} className="kanban-task" onClick={() => setSelectedTask(task)}>
                  <h4>{task.title}</h4>
                  <p>{task.description}</p>
                  <div className="task-actions">
                    <button onClick={(e) => { e.stopPropagation(); handleDeleteTask(task.id); }}>
                      <FaTrashAlt /> Eliminar
                    </button>
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>

      {/* Modal para crear tarea */}
      {isCreateModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Crear Tarea</h3>
            <form onSubmit={handleCreateTask}>
              <input
                type="text"
                placeholder="Título de la tarea"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Descripción"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
              <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="pendiente">Pendiente</option>
                <option value="en progreso">En Progreso</option>
                <option value="completada">Completada</option>
              </select>
              <button type="submit"><FaPlus /> Crear</button>
              <button type="button" className="cancel-btn" onClick={() => setIsCreateModalOpen(false)}>Cancelar</button>
            </form>
          </div>
        </div>
      )}

      {/* Modal para editar tarea */}
      {selectedTask && (
        <div className="modal">
          <div className="modal-content">
            <h3>Editar Tarea</h3>
            <input
              type="text"
              value={selectedTask.title}
              onChange={(e) => setSelectedTask({ ...selectedTask, title: e.target.value })}
            />
            <input
              type="text"
              value={selectedTask.description}
              onChange={(e) => setSelectedTask({ ...selectedTask, description: e.target.value })}
            />
            <select
              value={selectedTask.status}
              onChange={(e) => setSelectedTask({ ...selectedTask, status: e.target.value })}
            >
              <option value="pendiente">Pendiente</option>
              <option value="en progreso">En Progreso</option>
              <option value="completada">Completada</option>
            </select>
            <button onClick={handleEditTask}><FaEdit /> Actualizar</button>
            <button className="cancel-btn" onClick={() => setSelectedTask(null)}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskManager;


