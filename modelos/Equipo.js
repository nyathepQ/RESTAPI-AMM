const mongoose = require('mongoose');

// Schema de equipo
const EquipoSchema = new mongoose.Schema({
    nombreEquipo: { type: String, required: true },
    lider: { type: mongoose.Schema.Types.ObjectId, ref: 'Empleado', required: true },
    miembro1: { type: mongoose.Schema.Types.ObjectId, ref: 'Empleado', required: true },
    miembro2: { type: mongoose.Schema.Types.ObjectId, ref: 'Empleado', required: true }
});

// Exportar modelo de esquema
module.exports = mongoose.model('Equipo', EquipoSchema);