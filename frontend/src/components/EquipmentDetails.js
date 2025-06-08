import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getEquipmentById } from '../api';

function EquipmentDetails() {
  const { id } = useParams();
  const [equipment, setEquipment] = useState(null);

  useEffect(() => {
    getEquipmentById(id).then((res) => setEquipment(res.data));
  }, [id]);

  if (!equipment) return <p>Kraunama...</p>;

  return (
    <div className="container mt-4">
      <h2>{equipment.name}</h2>
      <p>{equipment.description}</p>
      <p>Statusas: {equipment.status}</p>

      {equipment.variants ? (
        <div className="row">
          {equipment.variants.map((variant) => (
            <div className="col-md-6 mb-4" key={variant.id}>
              <div className="card">
                <img
                  src={`/images/${variant.image}`}
                  className="card-img-top"
                  alt={variant.model}
                />
                <div className="card-body">
                  <h5 className="card-title">{variant.model}</h5>
                  <p className="card-text">{variant.description}</p>
                  <Link
                    to="/new-reservation"
                    className="btn btn-success"
                    state={{ equipmentId: equipment.id, model: variant.model }}
                  >
                    Rezervuoti šį modelį
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <img
            src={equipment.image}
            alt={equipment.name}
            style={{
              maxWidth: '300px',
              display: 'block',
              marginBottom: '1rem',
            }}
          />
          <Link to="/new-reservation" className="btn btn-success">
            Rezervuoti šią įrangą
          </Link>
        </div>
      )}
    </div>
  );
}

export default EquipmentDetails;
