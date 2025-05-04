const express = require('express');
const router = express.Router();
const TipoDocumento = require('../modelos/TipoDocumento');
const TipoLimpieza = require('../modelos/TipoLimpieza');
const auth = require('../middleware/auth'); // Middleware de autenticación

// Obtener todos los tipos de documento
router.get('/documento/buscar/todo', auth, async (req, res) => {
    // buscar todo
    const tiposDocumento = await TipoDocumento.find();
    // respuesta = registros
    res.json(tiposDocumento);
});

// Obtener todos los tipos de limpieza
router.get('/limpieza/buscar/todo', auth, async (req, res) => {
    // buscar todo
    const tiposLimpieza = await TipoLimpieza.find();
    // respuesta = registros
    res.json(tiposLimpieza);
});

// Obtener tipo de documento por id
router.get('/documento/buscar/:id', auth, async (req, res) => {
    try{
        // buscar por id
        const tDocumento = await TipoDocumento.findById(req.params.id);
        // si no existe
        if(!tDocumento) return res.status(404).json({ message: 'Tipo de documento no encontrado' });
        // respuesta = registro
        res.json(tDocumento);
    } catch (err) {
        // error
        res.status(400).json({ message: 'ID invalido' });
    }
});

// Obtener tipo de limpieza por id
router.get('/limpieza/buscar/:id', auth, async (req, res) => {
    try{
        // buscar por id
        const tLimpieza = await TipoLimpieza.findById(req.params.id);
        // si no existe
        if(!tLimpieza) return res.status(404).json({ message: 'Tipo de limpieza no encontrado' });
        // respuesta = registro
        res.json(tLimpieza);
    } catch (err) {
        // error
        res.status(400).json({ message: 'ID invalido' });
    }
});

// Crear tipo de documento
router.post('/documento/crear', auth, async (req, res) => {
    try {
        // obtener registro de req
        const tDocumento = new TipoDocumento(req.body);
        // crear
        await tDocumento.save();
        // respuesta = registro
        res.status(201).json(tDocumento);
    } catch (err) {
        // error
        res.status(400).json({ message: err.message });
    }
});

// Crear tipo de limpieza
router.post('/limpieza/crear', auth, async (req, res) => {
    try {
        // obtener registro de req
        const tLimpieza = new TipoLimpieza(req.body);
        // crear
        await tLimpieza.save();
        // respuesta = registro
        res.status(201).json(tLimpieza);
    } catch (err) {
        // error
        res.status(400).json({ message: err.message });
    }
});

// Actualizar tipo de documento
router.put('/documento/actualizar/:id', auth, async (req, res) => {
    try {
        // buscar y actualizar por id
        const tDocumento = await TipoDocumento.findByIdAndUpdate(req.params.id, req.body, { new: true });
        // si registro no existe
        if (!tDocumento) return res.status(404).json({ message: 'Tipo de documento no encontrado' });
        // respuesta = registro
        res.json(tDocumento);
    } catch (err) {
        // error
        res.status(400).json({ message: 'Error al actualizar tipo de documento', error: err.message });
    }
});

// Actualizar tipo de limpieza
router.put('/limpieza/actualizar/:id', auth, async (req, res) => {
    try {
        // buscar y actualizar por id
        const tLimpieza = await TipoLimpieza.findByIdAndUpdate(req.params.id, req.body, { new: true });
        // si registro no existe
        if (!tLimpieza) return res.status(404).json({ message: 'Tipo de limpieza no encontrado' });
        // respuesta = registro
        res.json(tLimpieza);
    } catch (err) {
        // error
        res.status(400).json({ message: 'Error al actualizar tipo de limpieza', ererror: err.messager });
    }
});

// Eliminar tipo de documento
router.delete('/documento/eliminar/:id', auth, async (req, res) => {
    try {
        // buscar y eliminar por id
        const result = await TipoDocumento.findByIdAndDelete(req.params.id);
        // si no hay resultados de la eliminación
        if (!result) return res.status(404).json({ message: 'Tipo de documento no encontrado' });
        // respuesta = mensaje de eliminación
        res.json({ message: 'Tipo de documento eliminado' });
    } catch (err) {
        // error
        res.status(400).json({ message: 'Error al eliminar tipo de documento', error: err.message });
    }
});

// Eliminar tipo de limpieza
router.delete('/limpieza/eliminar/:id', auth, async (req, res) => {
    try {
        // buscar y eliminar por id
        const result = await TipoLimpieza.findByIdAndDelete(req.params.id);
        // si no hay resultados de la eliminación
        if (!result) return res.status(404).json({ message: 'Tipo de limpieza no encontrado' });
        // respuesta = mensaje de eliminación
        res.json({ message: 'Tipo de limpieza eliminada' });
    } catch (err) {
        // error
        res.status(400).json({ message: 'Error al eliminar tipo de limpieza', error: err.message });
    }
});

// Exportar rutas
module.exports = router;