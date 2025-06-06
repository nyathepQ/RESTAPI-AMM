const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../modelos/Usuario');
const jwt = require('jsonwebtoken');

// Ruta para iniciar sesión
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Buscar el usuario por username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Error: Usuario incorrecto o inexistente'});
        }

        // Comparar la contraseña ingresada con la guardad en la bd
        const isTheSame = await bcrypt.compare(password, user.password);
        if (!isTheSame) {
            return res.status(401).json({ message: 'Error: Contraseña incorrecta'});
        }

        // Crear token
        const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_INV, {
            expiresIn: '1h'
        });

        res.status(200).json({ message: 'Autenticación exitosa', token});
    } catch (error) {
        res.status(500).json({ message: 'Error al iniciar sesión' });
    }
});

// Ruta para registrar un nuevo usuario (para test)
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try{
        // Verificar si el usuario ya existe
        const existUser = await User.findOne({ username });
        if (existUser) {
            return res.status(400).json({ message: 'El usuario ya existe'});
        }

        // Encriptar la contraseña por seguridad
        const salt = await bcrypt.genSalt(10);
        const encriptedPassword = await bcrypt.hash(password, salt);

        // Crear y guardar nuevo usuario
        const newUser = new User({ username, password: encriptedPassword });
        await newUser.save();

        res.status(201).json({ message: 'Usuario registrado existosamente', id: newUser._id });
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar usuario' });
    };
});

// exportar rutas
module.exports = router;