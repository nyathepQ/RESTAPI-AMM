const mongoose = require('mongoose');

// Schema de servicio
const ServicioSchema = new mongoose.Schema({
    cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true },
    equipo: { type: mongoose.Schema.Types.ObjectId, ref: 'Equipo', required: true},
    tipoLimpieza: { type: mongoose.Schema.Types.ObjectId, ref: 'TipoLimpieza', required: true},
    fecha: { type: Date, required: true },
    hora: { type: Date, required: true },
    tiempoEstimado: { type: Number, required: true},
    horaFin: { type: Date },
    precio: { type: Number, required: true },
    observacionCliente: { type: String, default: '' }
});

// Middleware para calcular horaFin
ServicioSchema.pre('save', function (next) {
    if (this.hora && this.tiempoEstimado){
        this.horaFin = new Date(this.hora.getTime() + this.tiempoEstimado * 60000); //60000 ms = 1 minuto
    };
    next();
});

// Exportar modelo de esquema
module.exports = mongoose.model('Servicio', ServicioSchema);