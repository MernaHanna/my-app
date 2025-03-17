import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { fetchWithAuth } from '../helpers/request.helper';

const Profile: React.FC = () => {
  const [name, setName] = useState('');
  const { user, token } = useAuth();

  if (!token) return <Navigate to="/login" replace />;

  fetchWithAuth('user/')
    .then((response) => setName(response.data.name))
    .catch((error) => console.error(error));

  return (
    <div className="p-4">
      <h1 className="text-2xl">Welcome to the application, {name}!</h1>
    </div>
  );
};

export default Profile;
