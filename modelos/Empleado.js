const mongoose = require('mongoose');

// Schema del empleado
const EmpleadoSchema = new mongoose.Schema({
    tipoDocumento: { type: mongoose.Schema.Types.ObjectId, ref:'TipoDocumento', require: true},
    documentoEmpleado: { type: String,  required: true},
    nombreEmpleado: { type: String,  required: true},
    apellidoEmpleado: { type: String,  required: true},
    telefonoEmpleado: { type: String,  default: 'NA'},
    correoEmpleado: { type: String,  default: 'NA@NA.com'}
});

// Esportar el modelo de esquema
module.exports = mongoose.model('Empleado', EmpleadoSchema);