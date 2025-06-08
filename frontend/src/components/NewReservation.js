import React, { useState, useEffect } from 'react';
import { createReservation, getEquipment } from '../api';

function NewReservation({ user }) {
  const [equipment, setEquipment] = useState([]);
  const [selectedEquipment, setSelectedEquipment] = useState('');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    getEquipment().then((res) => setEquipment(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createReservation({
        username: user.username,
        equipmentName: selectedEquipment,
        date: date,
      });
      setMessage('Rezervacija pateikta sėkmingai!');
    } catch (error) {
      setMessage('Rezervacija nepavyko');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Nauja rezervacija</h2>
      <form onSubmit={handleSubmit} className="card p-4 shadow">
        <div className="mb-3">
          <label>Pasirinkite įrangą</label>
          <select
            className="form-select"
            value={selectedEquipment}
            onChange={(e) => setSelectedEquipment(e.target.value)}
            required
          >
            <option value="">Pasirinkite</option>
            {equipment.map((eq) => (
              <option key={eq.id} value={eq.name}>
                {eq.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label>Data</label>
          <input
            type="date"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Rezervuoti
        </button>
        {message && <p className="mt-2">{message}</p>}
      </form>
    </div>
  );
}

export default NewReservation;
