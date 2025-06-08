import React, { useState, useEffect } from 'react';
import { getUserByUsername, updateUser } from '../api';

function UserProfile({ user }) {
  const [profile, setProfile] = useState({ email: '', phone: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    getUserByUsername(user.username).then((res) => {
      setProfile(res.data);
    });
  }, [user.username]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(user.username, profile);
      setMessage('Duomenys atnaujinti!');
    } catch (error) {
      setMessage('Nepavyko atnaujinti');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Mano paskyra</h2>
      <form onSubmit={handleSubmit} className="card p-4 shadow">
        <div className="mb-3">
          <label>El. paštas</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label>Tel. nr.</label>
          <input
            type="text"
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Išsaugoti
        </button>
        {message && <p className="mt-2">{message}</p>}
      </form>
    </div>
  );
}

export default UserProfile;
