// // components/UserProfile.js
// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import userService from '../../services/userService'; 
// import { toast } from 'react-toastify';
// import '../profile/UserProfile.css';

// const UserProfile = () => {
//   const { id } = useParams();
//   const [user, setUser] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [updatedUser, setUpdatedUser] = useState({});
//   const navigate = useNavigate(); 

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const data = await userService.getUserById(id, localStorage.getItem('token'));
//         setUser(data[0]);
//         setUpdatedUser(data[0]);
//       } catch (error) {
//         toast.error('Error al obtener los datos del usuario');
//       }
//     };
//     fetchUser();
//   }, [id]);

//   // Manejar cambios en los inputs
//   const handleChange = (e) => {
//     setUpdatedUser({ ...updatedUser, [e.target.id]: e.target.value });
//   };

//   // Guardar los cambios
//   const handleSave = async () => {
//     try {
//       await userService.updateUser(id, updatedUser, localStorage.getItem('token'));
//       toast.success('Perfil actualizado correctamente');
//       setIsEditing(false);
//     } catch (error) {
//       toast.error('Error al actualizar el perfil');
//     }
//   };

//   const handleEdit = () => {
//     setIsEditing(true);
//   };

//   const handleBack = () => {
//     navigate('/taskmanager');
//   };

//   if (!user) {
//     return <div>Cargando...</div>;
//   }

//   return (
//     <div className="user-profile">
//       <h2>Perfil del Usuario</h2>
//       <div className="form-group">
//         <label htmlFor="name">Nombre:</label>
//         <input type="text" id="name" value={updatedUser.name} onChange={handleChange} disabled={!isEditing} />
//       </div>
//       <div className="form-group">
//         <label htmlFor="last_name">Apellido:</label>
//         <input type="text" id="last_name" value={updatedUser.last_name} onChange={handleChange} disabled={!isEditing} />
//       </div>
//       <div className="form-group">
//         <label htmlFor="email">Correo electronico</label>
//         <input type="text" id="email" value={updatedUser.email} onChange={handleChange} disabled={!isEditing} />
//       </div>
//       <div className="form-group">
//         <label htmlFor="phone">Número:</label>
//         <input type="text" id="phone" value={updatedUser.phone} onChange={handleChange} disabled={!isEditing} />
//       </div>
//       <div className="form-group">
//         <label htmlFor="address">Dirección:</label>
//         <input type="text" id="address" value={updatedUser.address} onChange={handleChange} disabled={!isEditing} />
//       </div>

//       {isEditing ? (
//         <button className="save-button" onClick={handleSave}>Guardar</button>
//       ) : (
//         <button className="edit-button" onClick={handleEdit}>Editar</button>
//       )}
      
//       <button className="back-button" onClick={handleBack}>Volver al Taskmanager</button>
//     </div>
//   );
// };

// export default UserProfile;


// components/UserProfile.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import userService from '../../services/userService'; 
import { toast } from 'react-toastify';
import '../profile/UserProfile.css';

const UserProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({});
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await userService.getUserById(id, localStorage.getItem('token'));
        setUser(data[0]);
        setUpdatedUser(data[0]);
      } catch (error) {
        toast.error('Error al obtener los datos del usuario');
      }
    };
    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.id]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await userService.updateUser(id, updatedUser, localStorage.getItem('token'));
      toast.success('Perfil actualizado correctamente');
      setIsEditing(false);
    } catch (error) {
      toast.error('Error al actualizar el perfil');
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleBack = () => {
    navigate('/taskmanager');
  };

  if (!user) {
    return <div className="loading">Cargando...</div>;
  }

  return (
    <div className="user-profile">
      <h2 className="profile-title">Perfil del Usuario</h2>
      <div className="form-group">
        <label htmlFor="name">Nombre:</label>
        <input type="text" id="name" value={updatedUser.name} onChange={handleChange} disabled={!isEditing} />
      </div>
      <div className="form-group">
        <label htmlFor="last_name">Apellido:</label>
        <input type="text" id="last_name" value={updatedUser.last_name} onChange={handleChange} disabled={!isEditing} />
      </div>
      <div className="form-group">
        <label htmlFor="email">Correo electrónico:</label>
        <input type="email" id="email" value={updatedUser.email} onChange={handleChange} disabled={!isEditing} />
      </div>
      <div className="form-group">
        <label htmlFor="phone">Número:</label>
        <input type="text" id="phone" value={updatedUser.phone} onChange={handleChange} disabled={!isEditing} />
      </div>
      <div className="form-group">
        <label htmlFor="address">Dirección:</label>
        <input type="text" id="address" value={updatedUser.address} onChange={handleChange} disabled={!isEditing} />
      </div>

      {isEditing ? (
        <button className="save-button" onClick={handleSave}>Guardar</button>
      ) : (
        <button className="edit-button" onClick={handleEdit}>Editar</button>
      )}
      
      <button className="back-button" onClick={handleBack}>Volver al Taskmanager</button>
    </div>
  );
};

export default UserProfile;
