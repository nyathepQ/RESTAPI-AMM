const express = require('express');
const router = express.Router();
const Empleado = require('../modelos/Empleado');
const auth = require('../middleware/auth'); // Middleware de autenticación

// Obtener todos los empleado
router.get('/buscar/todo', auth, async (req, res) => {
    // buscar todo
    const empleados = await Empleado.find();
    // respuesta = registros
    res.json(empleados);
});

// Obtener empleado por id
router.get('/buscar/:id', auth, async (req, res) => {
    try{
        // buscar por id
        const empleado = await Empleado.findById(req.params.id);
        // si no existe
        if(!empleado) return res.status(404).json({ message: 'Empleado no encontrado' });
        // respuesta = registro
        res.json(empleado);
    } catch (err) {
        // error
        res.status(400).json({ message: 'ID invalido' });
    }
});

// Crear empleado
router.post('/crear', auth, async (req, res) => {
    // obtener registro de req
    const empleado = new Empleado(req.body);
    try {
        // crear
        await empleado.save();
        // respuesta = registro
        res.status(201).json(empleado);
    } catch (err) {
        // error
        res.status(400).json({ message: err.message });
    }
});

// Actualizar empleado
router.put('/actualizar/:id', auth, async (req, res) => {
    try {
        // obtener registro de req
        const empData = req.body;
        // buscar y actualizar por id
        const empleado = await Empleado.findByIdAndUpdate(req.params.id, empData, { new: true });
        // si registro no existe
        if (!empleado) return res.status(404).json({ message: 'Empleado no encontrado' });
        // respuesta = registro
        res.json(empleado);
    } catch (err) {
        // error
        res.status(400).json({ message: 'Error al actualizar empleado', error: err.message });
    }
});

// Eliminar empleado
router.delete('/eliminar/:id', auth, async (req, res) => {
    try {
        // buscar y eliminar por id
        const result = await Empleado.findByIdAndDelete(req.params.id);
        // si no hay resultados de la eliminación
        if (!result) return res.status(404).json({ message: 'Empleado no encontrado' });
        // respuesta = mensaje de eliminación
        res.json({ message: 'Empleado eliminado' });
    } catch (err) {
        // error
        res.status(400).json({ message: 'Error al eliminar empleado', error: err.message });
    }
});

// Exportar rutas
module.exports = router;