const express = require('express');
const app = express ();
const PORT = 3000;

app.get('/', (req, res) => { 
    res.send('Barber NS');
});

app.get('/turnos', (req, res) => { 
    res.send('Consultar turnos disponibles de lunes a viernes');
});

app.listen(PORT, () => { 
    console.log(`servidor escuchando en http://localhost:${PORT}`);
});

