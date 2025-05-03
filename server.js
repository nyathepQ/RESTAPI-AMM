const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./rutas/auth');

// Cargar variables desde .env para proteger los datos
dotenv.config();

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);

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