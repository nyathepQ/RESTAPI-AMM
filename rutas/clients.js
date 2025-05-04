const express = require('express');
const router = express.Router();
const Cliente = require('../modelos/Cliente');
const auth = require('../middleware/auth'); // Middleware de autenticación

// Obtener todos los clientes
router.get('/buscar/todo', auth, async (req, res) => {
    // buscar todo
    const clientes = await Cliente.find();
    // respuesta = registros
    res.json(clientes);
});

// Obtener cliente por id
router.get('/buscar/:id', auth, async (req, res) => {
    try{
        // obtener por id
        const cliente = await Cliente.findById(req.params.id);
        // si registro no existe
        if(!cliente) return res.status(404).json({ message: 'Cliente no encontrado' });
        // respuesta = registro
        res.json(cliente);
    } catch (err) {
        // error
        res.status(400).json({ message: 'ID invalido' });
    }
});

// Crear cliente
router.post('/crear', auth, async (req, res) => {
    try {
        // obtener registro del req
        const cliente = new Cliente(req.body);
        // crear
        await cliente.save();
        // respuetsa = registro
        res.status(201).json(cliente);
    } catch (err) {
        // error
        res.status(400).json({ message: err.message });
    }
});

// Actualizar cliente
router.put('/actualizar/:id', auth, async (req, res) => {
    try {
        // buscar y actualizar por id
        const cliente = await Cliente.findByIdAndUpdate(req.params.id, req.body, { new: true });
        // si registro no existe
        if (!cliente) return res.status(404).json({ message: 'Cliente no encontrado' });
        // respuesta = registro
        res.json(cliente);
    } catch (err) {
        // error
        res.status(400).json({ message: 'Error al actualizar cliente', error: err.message });
    }
});

// Eliminar cliente
router.delete('/eliminar/:id', auth, async (req, res) => {
    try {
        // buscar y eliminar por id
        const result = await Cliente.findByIdAndDelete(req.params.id);
        // si no hay resultados en la eliminación
        if (!result) return res.status(404).json({ message: 'Cliente no encontrado' });
        // respuesta = mensaje de eliminación
        res.json({ message: 'Cliente eliminado' });
    } catch (err) {
        // error
        res.status(400).json({ message: 'Error al eliminar cliente', error: err.message });
    }
});

// Exportar rutas
module.exports = router;