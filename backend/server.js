const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const equipmentRoutes = require('./routes/equipmentRoutes');
const reservationRoutes = require('./routes/reservationRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/equipment', equipmentRoutes);
app.use('/api/reservations', reservationRoutes);
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Serveris paleistas ant ${PORT} porto`);
});
