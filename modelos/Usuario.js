const mongoose = require('mongoose');

// Schema del usuario
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true},
    password: { type: String, required: true}
});

// Esportar el modelo de esquema
module.exports = mongoose.model('Usuario', UserSchema);