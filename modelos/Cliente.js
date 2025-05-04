const mongoose = require('mongoose');

// Schema de cliente
const ClientSchema = new mongoose.Schema({
    nombreCliente: { type: String, required: true },
    apellidoCliente: { type: String, required: true },
    direccionCliente: { type: String, required: true },
    telefonoCliente: { type: String, default: 'NA' },
    correoCliente: { type: String, default: 'NA' },
    observacionCliente: { type: String, default: '' }
});

// Exportar modelo de esquema
module.exports = mongoose.model('Cliente', ClientSchema);