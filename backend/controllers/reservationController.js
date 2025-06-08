const fs = require('fs-extra');
const path = require('path');

const filePath = path.join(__dirname, '../data/reservations.json');

exports.getAll = async (req, res) => {
  const data = await fs.readJson(filePath);
  res.json(data);
};

exports.getById = async (req, res) => {
  const data = await fs.readJson(filePath);
  const item = data.find((i) => i.id === parseInt(req.params.id));
  if (item) res.json(item);
  else res.status(404).json({ message: 'Rezervacija nerasta' });
};

exports.create = async (req, res) => {
  const data = await fs.readJson(filePath);
  const { equipmentName, date } = req.body;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const selectedDate = new Date(date);
  selectedDate.setHours(0, 0, 0, 0);

  if (selectedDate < today) {
    return res.status(400).json({ message: 'Negalima rezervuoti į praeitį.' });
  }

  const alreadyReserved = data.some(
    (item) => item.equipmentName === equipmentName && item.date === date
  );
  if (alreadyReserved) {
    return res
      .status(400)
      .json({ message: 'Ši įranga jau rezervuota tą dieną.' });
  }

  const newItem = { id: Date.now(), status: 'laukianti', ...req.body };
  data.push(newItem);
  await fs.writeJson(filePath, data);
  res.status(201).json(newItem);
};

exports.update = async (req, res) => {
  const data = await fs.readJson(filePath);
  const index = data.findIndex((i) => i.id === parseInt(req.params.id));
  if (index !== -1) {
    data[index] = { ...data[index], ...req.body };
    await fs.writeJson(filePath, data);
    res.json(data[index]);
  } else {
    res.status(404).json({ message: 'Rezervacija nerasta' });
  }
};

exports.delete = async (req, res) => {
  const data = await fs.readJson(filePath);
  const newData = data.filter((i) => i.id !== parseInt(req.params.id));
  await fs.writeJson(filePath, newData);
  res.json({ message: 'Ištrinta' });
};
