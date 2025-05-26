const fs = require('fs-extra');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/users.json');

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const users = await fs.readJson(usersFilePath);

  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (user) {
    res.json({
      message: 'Prisijungimas sėkmingas',
      role: user.role,
      username: user.username,
    });
  } else {
    res
      .status(401)
      .json({ message: 'Neteisingas vartotojo vardas arba slaptažodis' });
  }
};
