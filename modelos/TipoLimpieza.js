const mongoose = require('mongoose');

// Schema de tipo de documento
const TipoLimpiezaSchema = ({
    nombreTipo: { type: String, required: true }
});

// Exportar modelo
module.exports = mongoose.model('TipoLimpieza', TipoLimpiezaSchema);