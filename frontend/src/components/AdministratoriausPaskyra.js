import React, { useEffect, useState } from 'react';
import { getReservations, updateReservation } from '../api';

function AdministratoriausPaskyra() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await getReservations();
    setReservations(res.data);
  };

  const handleChange = (id, field, value) => {
    setReservations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [field]: value } : r))
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
      adminComment: r.adminComment || '',
      image: r.image || '',
    };
    await updateReservation(r.id, updatedData);
    load();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'patvirtinta':
        return 'success';
      case 'vykdoma':
        return 'primary';
      case 'atmesta':
        return 'danger';
      case 'laukianti':
        return 'warning';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="container mt-4">
      <h2>Administratoriaus panelė – rezervacijos</h2>
      <div className="row">
        {reservations.map((r) => (
          <div className="col-md-6 mb-3" key={r.id}>
            <div className={`card border-${getStatusColor(r.status)} shadow`}>
              {r.image && (
                <img
                  src={`/images/${r.image}`}
                  alt={r.equipmentName}
                  className="card-img-top"
                  style={{ maxHeight: '200px', objectFit: 'cover' }}
                />
              )}
              <div
                className={`card-header bg-${getStatusColor(
                  r.status
                )} text-white`}
              >
                {r.equipmentName}
              </div>
              <div className="card-body">
                <p>
                  <strong>Naudotojas:</strong> {r.username}
                </p>

                <label>Data</label>
                <input
                  type="date"
                  value={r.date}
                  onChange={(e) => handleChange(r.id, 'date', e.target.value)}
                  className="form-control mb-2"
                />

                <label>Statusas</label>
                <select
                  className="form-select mb-2"
                  value={r.status}
                  onChange={(e) => handleChange(r.id, 'status', e.target.value)}
                >
                  <option value="laukianti">Laukianti</option>
                  <option value="patvirtinta">Patvirtinta</option>
                  <option value="atmesta">Atmesta</option>
                  <option value="vykdoma">Vykdoma</option>
                </select>

                <label>Vartotojo komentaras</label>
                <textarea
                  value={r.comment || ''}
                  readOnly
                  className="form-control mb-2"
                />

                <label>Administratoriaus pastaba</label>
                <textarea
                  value={r.adminComment || ''}
                  onChange={(e) =>
                    handleChange(r.id, 'adminComment', e.target.value)
                  }
                  placeholder="Administratoriaus pastaba..."
                  className="form-control mb-2"
                />

                <button
                  onClick={() => saveReservation(r)}
                  className="btn btn-primary btn-sm"
                >
                  Išsaugoti
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdministratoriausPaskyra;
