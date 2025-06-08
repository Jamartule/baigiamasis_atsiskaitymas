import React, { useEffect, useState } from 'react';
import { getEquipment } from '../api';
import { Link } from 'react-router-dom';

function EquipmentList() {
  const [equipment, setEquipment] = useState([]);

  useEffect(() => {
    getEquipment().then((res) => setEquipment(res.data));
  }, []);

  return (
    <div>
      <h2>Įrangos sąrašas</h2>
      <ul>
        {equipment.map((item) => (
          <li key={item.id}>
            <Link to={`/equipment/${item.id}`}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EquipmentList;
