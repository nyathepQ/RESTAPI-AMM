const express = require('express');
const router = express.Router();
const Equipo = require('../modelos/Equipo');
const auth = require('../middleware/auth'); // Middleware de autenticación

// Obtener todos los equipos
router.get('/buscar/todo', auth, async (req, res) => {
    // buscar todo
    const equipos = await Equipo.find();
    // respuesta = registros
    res.json(equipos);
});

// Obtener equipo por id
router.get('/buscar/:id', auth, async (req, res) => {
    try{
        // obtener registro del req
        const equipo = await Equipo.findById(req.params.id);
        // si equipo no existe
        if(!equipo) return res.status(404).json({ message: 'Equipo no encontrado' });
        // respuesta = registro
        res.json(equipo);
    } catch (err) {
        // error
        res.status(400).json({ message: 'ID invalido' });
    }
});

// Crear equipo
router.post('/crear', auth, async (req, res) => {
    try {
        // obtene registro del req
        const equipo = new Equipo(req.body);
        // crear
        await equipo.save();
        // respuesta = registro
        res.status(201).json(equipo);
    } catch (err) {
        // error
        res.status(400).json({ message: err.message });
    }
});

// Actualizar equipo
router.put('/actualizar/:id', auth, async (req, res) => {
    try {
        // buscar y actualizar por id
        const equipo = await Equipo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        // si registro no existe
        if (!equipo) return res.status(404).json({ message: 'Equipo no encontrado' });
        // respuesta = registro
        res.json(equipo);
    } catch (err) {
        // error
        res.status(400).json({ message: 'Error al actualizar equipo', error: err.message });
    }
});

// Eliminar equipo
router.delete('/eliminar/:id', auth, async (req, res) => {
    try {
        // buscar y eliminar por id
        const result = await Equipo.findByIdAndDelete(req.params.id);
        // si no hay resultados en la eliminación
        if (!result) return res.status(404).json({ message: 'Equipo no encontrado' });
        // respuesta = mensaje de eliminación
        res.json({ message: 'Cliente eliminado' });
    } catch (err) {
        // error
        res.status(400).json({ message: 'Error al eliminar equipo', error: err.message });
    }
});

// Exportar rutas
module.exports = router;