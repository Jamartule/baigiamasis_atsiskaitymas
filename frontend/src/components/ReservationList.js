import React, { useEffect, useState } from 'react';
import { getReservations, updateReservation, deleteReservation } from '../api';

function ReservationList({ user }) {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const load = async () => {
      const res = await getReservations();
      if (user.role === 'admin') {
        setReservations(res.data);
      } else {
        setReservations(res.data.filter((r) => r.username === user.username));
      }
    };
    load();
  }, [user.role, user.username]);

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

    // Reload
    const res = await getReservations();
    if (user.role === 'admin') {
      setReservations(res.data);
    } else {
      setReservations(res.data.filter((x) => x.username === user.username));
    }
  };

  return (
    <div className="container mt-4">
      <h2>
        {user.role === 'admin' ? 'Visos rezervacijos' : 'Mano rezervacijos'}
      </h2>
      <div className="row">
        {reservations.map((r) => (
          <div className="col-md-6 mb-4" key={r.id}>
            <div className="card h-100 shadow">
              {r.image && (
                <img
                  src={`/images/${r.image}`}
                  alt={r.equipmentName}
                  className="card-img-top"
                  style={{ maxHeight: '200px', objectFit: 'cover' }}
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{r.equipmentName}</h5>
                <p>
                  <strong>Data:</strong> {r.date} <br />
                  <strong>Statusas:</strong> {r.status}
                </p>

                {/* Vartotojo komentaras */}
                <label>Komentaras</label>
                <textarea
                  value={r.comment || ''}
                  onChange={(e) =>
                    user.role === 'admin'
                      ? null
                      : handleChange(r.id, 'comment', e.target.value)
                  }
                  readOnly={user.role === 'admin'}
                  placeholder="Komentaras..."
                  className="form-control mb-2"
                />

                {/* Administratoriaus komentaras */}
                {user.role === 'admin' ? (
                  <>
                    <label>Administratoriaus pastaba</label>
                    <textarea
                      value={r.adminComment || ''}
                      onChange={(e) =>
                        handleChange(r.id, 'adminComment', e.target.value)
                      }
                      placeholder="Administratoriaus komentaras..."
                      className="form-control mb-2"
                    />
                  </>
                ) : (
                  r.adminComment && (
                    <>
                      <label>Administratoriaus pastaba</label>
                      <textarea
                        value={r.adminComment}
                        readOnly
                        className="form-control mb-2"
                      />
                    </>
                  )
                )}

                {/* Redaguojama data */}
                <input
                  type="date"
                  value={r.date}
                  onChange={(e) => handleChange(r.id, 'date', e.target.value)}
                  className="form-control mb-2"
                />

                <div className="d-flex justify-content-between">
                  <button
                    onClick={() => saveReservation(r)}
                    className="btn btn-primary btn-sm"
                  >
                    Išsaugoti
                  </button>
                  <button
                    onClick={() => {
                      deleteReservation(r.id);
                      const reload = async () => {
                        const res = await getReservations();
                        if (user.role === 'admin') {
                          setReservations(res.data);
                        } else {
                          setReservations(
                            res.data.filter((x) => x.username === user.username)
                          );
                        }
                      };
                      reload();
                    }}
                    className="btn btn-danger btn-sm"
                  >
                    Atšaukti
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReservationList;
