const express = require('express');
const router = express.Router();
const Servicio = require('../modelos/Servicio');
const auth = require('../middleware/auth'); // Middleware de autenticación

// Obtener todos los servicios
router.get('/buscar/todo', auth, async (req, res) => {
    // buscar todo
    const servicios = await Servicio.find();
    // respuesta = registros
    res.json(servicios);
});

// Obtener servicio por id
router.get('/buscar/:id', auth, async (req, res) => {
    try{
        // buscar por id
        const servicio = await Servicio.findById(req.params.id);
        // si no existe
        if(!servicio) return res.status(404).json({ message: 'Servicio no encontrado' });
        // respuesta = registro
        res.json(servicio);
    } catch (err) {
        // error
        res.status(400).json({ message: 'ID invalido' });
    }
});

// Obtener servicio por fecha
router.get('/buscar/fecha', auth, async (req, res) => {
    // obtener fecha
    const { fecha } = req.query;
    // si fecha no existe
    if(!fecha) {
        return res.status(400).json({ message: 'Se necesita fecha (formato: YYYY-MM-DD)' });
    }
    try {
        // crear rango a buscar
        const fechaInicio = new Date(fecha);
        const fechaFin = new Date(fecha);
        fechaFin.setDate(fechaFin.getDate() + 1);
        // buscar por fecha en el rango creado
        const servicios = await Servicio.find({
            fecha: {
                $gte: fechaInicio,
                $lt: fechaFin
            }
        });
        // respuesta = registros
        res.json(servicios);
    } catch (err) {
        // error
        res.status(500).json({ message: 'Error al buscar el servicio por fecha' });
    }
});

// Obtener servicios por fecha y equipo
router.get('/buscar/fechayequipo', auth, async (req, res) => {
    // obtener fecha y equipo
    const { fecha, equipo } = req.query;
    // si fecha o equipo no existen
    if(!fecha || !equipo) return res.status(400).json({ message: 'Se necesita fecha(YYYY-MM-DD) y equipo' });

    try {
        // crear rango a buscar
        const fechaInicio = new Date(fecha);
        const fechaFin = new Date(fecha);
        fechaFin.setDate(fechaFin.getDate() + 1);
        // buscar por equipo y rango de fecha
        const servicios = await Servicio.find({
            equipo,
            fecha: {
                $gte: fechaInicio,
                $lt: fechaFin
            }
        });
        // respuesta = registros
        res.json(servicios);
    } catch (err) {
        // error
        res.status(500).json({ message: 'Error al buscar los servicios del equipo' })
    }
});

// Crear servicio
router.post('/crear', auth, async (req, res) => {
    try {
        // obtener registro de req
        const servicio = new Servicio(req.body);
        // crear
        await servicio.save();
        // respuesta = registro
        res.status(201).json(servicio);
    } catch (err) {
        // error
        res.status(400).json({ message: err.message });
    }
});

// Actualizar servicio
router.put('/actualizar/:id', auth, async (req, res) => {
    try {
        // buscar y actualizar por id
        const servicio = await Servicio.findByIdAndUpdate(req.params.id, req.body, { new: true });
        // si registro no existe
        if (!servicio) return res.status(404).json({ message: 'Servicio no encontrado' });
        // respuesta = registro
        res.json(servicio);
    } catch (err) {
        // error
        res.status(400).json({ message: 'Error al actualizar servicio', error: err.message });
    }
});

// Eliminar servicio
router.delete('/eliminar/:id', auth, async (req, res) => {
    try {
        // buscar y eliminar por id
        const result = await Servicio.findByIdAndDelete(req.params.id);
        // si no hay resultados de la eliminación
        if (!result) return res.status(404).json({ message: 'Servicio no encontrado' });
        // respuesta = mensaje de eliminación
        res.json({ message: 'Cliente eliminado' });
    } catch (err) {
        // error
        res.status(400).json({ message: 'Error al eliminar servicio', error: err.message });
    }
});

// Exportar rutas
module.exports = router;