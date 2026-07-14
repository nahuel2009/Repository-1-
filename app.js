const express = require('express');
const app = express ();
const PORT = 3000;

app.use(express.json());

let turnos = [
    {id: 1, cliente:'Nahuel', Fecha:'2026-07-10', Hora:'17:00'}, 
    {id: 2, cliente:'Cristian', Fecha:'2026-07-10', Hora:'17:30'},
    {id: 3, cliente:'ezequiel', Fecha:'2026-07-10', Hora:'18:00'},
    {id: 4, cliente:'geronimo', Fecha:'2026-07-11', Hora:'18:30'},
    {id: 5, cliente:'miqueas', Fecha:'2026-07-12', Hora:'19:00'}
] 

app.get('/api/v1/turnos', (req, res) => {
    res.status(200).json({
        total: turnos.length,
        data: turnos
    });
});

app.post('/api/v1/turnos', (req, res) => {
    const { cliente, Fecha, Hora } = req.body; 

    if (!cliente || !Fecha || !Hora) {
        return res.status(400).json({ error: 'faltan datos requeridos' });
    }
 
    const nuevoturno = {
        id: turnos.length + 1,
        cliente,
        Fecha,
        Hora
    };

    turnos.push(nuevoturno)
    res.status(201).json({ message:'turno creado exitosamente', data: nuevoturno });
}); 

app.delete('/api/v1/turnos/:id', (req, res) => {
    const { id } = req.params;               
    const turnoExiste = turnos.some (t => t.id === parseInt(id));

    if (!turnoExiste) {
        return res.status(404).json({ error: 'turno no encontrado' });
    }

    turnos = turnos.filter(t => t.id !== parseInt(id));
    res.status(200).json({ message: 'turno eliminado exitosamente', data: turnos });
});    

app.get('/api/v1/turnos/:Fecha', (req, res) => {
    const {Fecha} = req.params;
    const turnosFiltrados = turnos.filter( t => t.Fecha.toLowerCase() === Fecha.toLowerCase());

    if (turnosFiltrados.length === 0) {
        return res.status(404).json({ message: 'no se encontraron turnos para esa Fecha'});}
                                     
    res.status(200).json({ total: turnosFiltrados.length, data: turnosFiltrados });
});

app.listen(PORT, () => { 
    console.log(`servidor escuchando en http://localhost:${PORT}`);
});

