import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api';

function Login({ setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(username, password);
      setUser({ username, role: response.data.role });
      navigate('/');
    } catch (error) {
      setError('Prisijungimas nepavyko');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <form onSubmit={handleSubmit} className="card p-4 shadow">
            <h2 className="text-center">Prisijungimas</h2>
            <div className="mb-3">
              <input
                className="form-control"
                placeholder="Vartotojo vardas"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                className="form-control"
                placeholder="Slaptažodis"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Prisijungti
            </button>
            {error && <p className="text-danger text-center mt-2">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
