const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/users.json');

exports.getUserByUsername = (req, res) => {
  const users = JSON.parse(fs.readFileSync(usersFilePath));
  const user = users.find((u) => u.username === req.params.username);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'Vartotojas nerastas' });
  }
};

exports.updateUser = (req, res) => {
  const users = JSON.parse(fs.readFileSync(usersFilePath));
  const index = users.findIndex((u) => u.username === req.params.username);
  if (index !== -1) {
    users[index] = { ...users[index], ...req.body };
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
    res.json(users[index]);
  } else {
    res.status(404).json({ message: 'Vartotojas nerastas' });
  }
};
