import React, { useEffect, useState } from 'react';
import { getEquipment } from '../api';
import { Link } from 'react-router-dom';

function EquipmentList() {
  const [equipment, setEquipment] = useState([]);

  useEffect(() => {
    getEquipment().then((res) => setEquipment(res.data));
  }, []);

  return (
    <div className="container">
      <h2 className="mt-4 mb-4">Įrangos sąrašas</h2>
      <div className="row">
        {equipment.map((item) => (
          <div className="col-md-4 mb-4" key={item.id}>
            <div className="card h-100 shadow-sm">
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  className="card-img-top"
                  style={{ maxHeight: '200px', objectFit: 'cover' }}
                />
              )}
              <div className="card-body">
                <h5 className="card-title">
                  <Link to={`/equipment/${item.id}`}>{item.name}</Link>
                </h5>
                {item.description && (
                  <p className="card-text">{item.description}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EquipmentList;
