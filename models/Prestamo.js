const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const PrestamoSchema = new Schema({
    monto: {
        type: Number,
        required: true
    },
    plazo: {
        type: Number,
        required: true
    },
    cuota: {
        type: Number,
        required: true
    },
    interes: {
        type: Number,
        required: true
    },
    calculo: {
        type: Number,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
    titulo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    status: {
        type: Number
    }
});

const Prestamo = mongoose.model('Prestamo', PrestamoSchema);
module.exports = Prestamo;
