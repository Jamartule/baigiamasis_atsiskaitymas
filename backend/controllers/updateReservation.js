exports.updateReservation = (req, res) => {
  const reservations = JSON.parse(fs.readFileSync(reservationsFilePath));
  const index = reservations.findIndex((r) => r.id == req.params.id);
  if (index !== -1) {
    reservations[index] = { ...reservations[index], ...req.body };
    fs.writeFileSync(
      reservationsFilePath,
      JSON.stringify(reservations, null, 2)
    );
    res.json(reservations[index]);
  } else {
    res.status(404).json({ message: 'Rezervacija nerasta' });
  }
};
