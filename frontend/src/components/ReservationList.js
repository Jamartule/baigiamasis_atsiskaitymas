import React, { useEffect, useState } from 'react';
import { getReservations, updateReservation, deleteReservation } from '../api';

function ReservationList({ user }) {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await getReservations();
    setReservations(res.data.filter((r) => r.username === user.username));
  };

  const handleChange = (id, field, value) => {
    setReservations(
      reservations.map((r) => (r.id === id ? { ...r, [field]: value } : r))
    );
  };

  const saveReservation = async (r) => {
    const updatedData = {
      id: r.id,
      username: r.username,
      equipmentName: r.equipmentName,
      status: r.status,
      date: r.date,
      comment: r.comment,
    };
    await updateReservation(r.id, updatedData);
    load();
  };

  return (
    <div className="container mt-4">
      <h2>Mano rezervacijos</h2>
      <ul>
        {reservations.map((r) => (
          <li key={r.id}>
            <p>
              <strong>{r.equipmentName}</strong> – {r.date} – {r.status}
            </p>
            <textarea
              value={r.comment || ''}
              onChange={(e) => handleChange(r.id, 'comment', e.target.value)}
              placeholder="Komentaras..."
              className="form-control mb-2"
            />
            <input
              type="date"
              value={r.date}
              onChange={(e) => handleChange(r.id, 'date', e.target.value)}
              className="form-control mb-2"
            />
            <button
              onClick={() => saveReservation(r)}
              className="btn btn-primary btn-sm"
            >
              Išsaugoti
            </button>
            <button
              onClick={() => {
                deleteReservation(r.id);
                load();
              }}
              className="btn btn-danger btn-sm ms-2"
            >
              Atšaukti
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReservationList;
