import React from 'react';

function Home({ user }) {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center my-5">
      <div className="mb-4">
        <i
          className="bi bi-laptop"
          style={{ fontSize: '2.7rem', color: '#0d6efd', marginRight: '12px' }}
        ></i>
        <i
          className="bi bi-camera"
          style={{ fontSize: '2.7rem', color: '#198754', marginRight: '12px' }}
        ></i>
        <i
          className="bi bi-display"
          style={{ fontSize: '2.7rem', color: '#ffc107' }}
        ></i>
      </div>
      <h1 className="fw-bold text-center" style={{ fontSize: '2.3rem' }}>
        Įrangos rezervacijos sistema
      </h1>

      {user ? (
        <div className="mt-4 fs-5 text-center">
          Prisijungta kaip: <b>{user.username}</b>{' '}
          <span
            className={`badge bg-${
              user.role === 'admin' ? 'info' : 'secondary'
            } text-white ms-2`}
          >
            {user.role}
          </span>
        </div>
      ) : (
        <div
          className="alert alert-primary mt-4 text-center"
          style={{ maxWidth: 500 }}
        >
          <strong>Norėdami matyti ir rezervuoti įrangą, prisijunkite.</strong>
          <br />
          <span className="text-secondary" style={{ fontSize: '1rem' }}>
            Spausti <b>„Prisijungti“</b> viršuje dešinėje.
          </span>
        </div>
      )}
    </div>
  );
}

export default Home;
