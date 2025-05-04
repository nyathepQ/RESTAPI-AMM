const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Usuario = require('../modelos/Usuario');
const auth = require('../middleware/auth'); // Middleware de autenticación

// Obtener todos los empleado
router.get('/buscar/todo', auth, async (req, res) => {
    // buscar todo
    const usuarios = await Usuario.find();
    // respuesta = registros
    res.json(usuarios);
});

// Obtener usuario por id
router.get('/buscar/:id', auth, async (req, res) => {
    try{
        // buscar por id
        const usuario = await Usuario.findById(req.params.id);
        // si no existe
        if(!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });
        // respuesta = registro
        res.json(usuario);
    } catch (err) {
        // error
        res.status(400).json({ message: 'ID invalido' });
    }
});

// Actualizar contraseña
router.put('/actualizar/:id', auth, async (req, res) => {
    try {
        // obtener registro de req
        const { password } = req.body;
        // verificar si el usuario ya existe
        const user = await Usuario.findById(req.params.id);
        if (!user) {
            return res.status(401).json({ message: 'El usuario no existe'});
        }
        // Comparar la contraseña ingresada con la guardad en la bd
        const isTheSame = await bcrypt.compare(password, user.password);
        if (isTheSame) {
            return res.status(401).json({ message: 'La contraseña no puede ser la misma a la anterior'});
        }
        // Encriptar la contraseña por seguridad
        const salt = await bcrypt.genSalt(10);
        const encriptedPassword = await bcrypt.hash(password, salt);

        // actualizar contraseña
        user.password = encriptedPassword;
        await user.save();

        // respuesta = mensaje de actualización
        res.json({ message: 'Contraseña actualizada correctamente', usuario: user });
    } catch (err) {
        // error
        res.status(400).json({ message: 'Error al actualizar usuario', error: err.message});
    }
});

// Eliminar usuario
router.delete('/eliminar/:id', auth, async (req, res) => {
    try {
        // verificar si el usuario intenta eliminarse a sí mismo
        if(req.user.id === req.params.id){
            return res.status(403).json({ message: 'No se puede eliminar el usuario activo actualmente.'});
        }
        // buscar y eliminar por id
        const result = await Usuario.findByIdAndDelete(req.params.id);
        // si no hay resultados de la eliminación
        if (!result) return res.status(404).json({ message: 'Usuario no encontrado' });
        // respuesta = mensaje de eliminación
        res.json({ message: 'Usuario eliminado' });
    } catch (err) {
        // error
        res.status(400).json({ message: 'Error al eliminar usuario', error: err.message });
    }
});

// Exportar rutas
module.exports = router;