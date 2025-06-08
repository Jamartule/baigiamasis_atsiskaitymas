import React, { useState, useEffect } from 'react';
import { createReservation, getEquipment } from '../api';

function NewReservation({ user }) {
  const [equipment, setEquipment] = useState([]);
  const [selectedEquipmentId, setSelectedEquipmentId] = useState('');
  const [selectedVariant, setSelectedVariant] = useState('');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    getEquipment().then((res) => setEquipment(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedEquipment = equipment.find(
      (e) => e.id === parseInt(selectedEquipmentId)
    );
    const variant = selectedEquipment?.variants?.find(
      (v) => v.id === selectedVariant
    );

    if (selectedEquipment?.variants && !selectedVariant) {
      setMessage('Prašome pasirinkti įrangos modelį.');
      return;
    }

    const reservationData = {
      username: user.username,
      equipmentName:
        selectedEquipment.name + (variant ? ` - ${variant.model}` : ''),
      date,
    };

    try {
      await createReservation(reservationData);
      setMessage('Rezervacija pateikta sėkmingai!');
    } catch (error) {
      setMessage('Rezervacija nepavyko');
    }
  };

  const selectedEquipment = equipment.find(
    (e) => e.id === parseInt(selectedEquipmentId)
  );

  return (
    <div className="container mt-4">
      <h2>Nauja rezervacija</h2>
      <form onSubmit={handleSubmit} className="card p-4 shadow">
        <div className="mb-3">
          <label>Pasirinkite įrangą</label>
          <select
            className="form-select"
            value={selectedEquipmentId}
            onChange={(e) => {
              setSelectedEquipmentId(e.target.value);
              setSelectedVariant('');
            }}
            required
          >
            <option value="">Pasirinkite</option>
            {equipment.map((eq) => (
              <option key={eq.id} value={eq.id}>
                {eq.name}
              </option>
            ))}
          </select>
        </div>

        {selectedEquipment?.variants && (
          <div className="mb-3">
            <label>Pasirinkite modelį</label>
            <select
              className="form-select"
              value={selectedVariant}
              onChange={(e) => setSelectedVariant(e.target.value)}
              required
            >
              <option value="">Pasirinkite modelį</option>
              {selectedEquipment.variants.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.model}
                </option>
              ))}
            </select>
          </div>
        )}

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
