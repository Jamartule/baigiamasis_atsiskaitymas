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

      <Link to="/new-reservation" className="btn btn-success">
        Rezervuoti šią įrangą
      </Link>
    </div>
  );
}

export default EquipmentDetails;
