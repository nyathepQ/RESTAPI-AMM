const mongoose = require('mongoose');

// Schema de tipo de documento
const TipoDocumentoSchema = ({
    nombreTipo: { type: String, required: true }
});

// Exportar modelo
module.exports = mongoose.model('TipoDocumento', TipoDocumentoSchema);