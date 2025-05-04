const mongoose = require('mongoose');

// Schema de usuario
const UsuarioSchema = new mongoose.Schema({
    username: { type: String, required: true},
    password: { type: String,  required: true}
});

// Esportar el modelo de esquema
module.exports = mongoose.model('Usuario', UsuarioSchema);