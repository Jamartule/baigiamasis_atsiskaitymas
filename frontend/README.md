# Baigiamasis projektas – Įrangos rezervacijos ir administravimo sistema

Šis projektas yra mano baigiamojo darbo dalis, sukurtas React, Node.js (Express) ir JSON (arba MongoDB galima būtų naudoti, aš naudojau tik json.). Sistema leidžia naudotojams rezervuoti įrangą, o administratoriams – valdyti įrangą ir rezervacijas.

---

# Funkcionalumas

Vartotojai (prisijungę):

- Peržiūri įrangos sąrašą
- Peržiūri konkrečios įrangos informaciją
- Sukuria naują rezervaciją
- Redaguoja savo rezervacijos datą ar komentarą
- Atšaukia savo rezervaciją
- Gali redaguoti savo paskyros duomenis (el. paštas, tel. numeris)

# Administratoriai:

- Prideda naują įrangą
- Atnaujina esamą įrangą
- Keičia įrangos būseną
- Peržiūri visas rezervacijas
- Keičia rezervacijos būseną (laukianti / patvirtinta / atmesta / vykdoma)
- Matomi vartotojų komentarai prie rezervacijų

---

# Technologijos

- **Frontend:** React, Bootstrap
- **Backend:** Node.js + Express
- **Duomenų saugojimas:** JSON failai (`fs-extra`)  
  _(Gali būti pakeista į MongoDB naudojant `mongoose`)_
- **Autentifikacija:** Vartotojų prisijungimas su rolėmis (`admin` / `user`)
- **Failų struktūra:** Aiškiai išskaidyta į komponentus, API, maršrutus

---

# Papildomai

- Kiekvienas įrangos elementas turi nuotrauką

- Dizainas pritaikytas prie ekrano dydžio (responsive layout)

---
