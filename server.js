const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const login = require('./rutas/login');
const cliente = require('./rutas/clients');
const equipo = require('./rutas/equips');
const servicio = require('./rutas/services');
const empleado = require('./rutas/employee');
const tipos = require('./rutas/types');

// Cargar variables desde .env para proteger los datos
dotenv.config();

const app = express();

// === Middleware ===
// aceptar solicitudes desde otros dominios
app.use(cors());
// parsear JSON
app.use(express.json());

// Conexión a MongoDB usando URI del archivo .env
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
   useUnifiedTopology: true
})
.then(() => {
    console.log('Conectado a MongoDB por Cloud');
    app.listen(process.env.PORT, () => {
        console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
    });
})
.catch(err => console.error('Error al conectar la base de datos:', err));

// === Rutas ===
// Login
app.use('/api/auth', login);
// Cliente
app.use('/api/cliente', cliente);
// Equipo
app.use('/api/equipo', equipo);
// Servicio
app.use('/api/servicio', servicio);
// Tipos
app.use('/api/tipo', tipos);
// Empleado
app.use('/api/empleado', empleado);