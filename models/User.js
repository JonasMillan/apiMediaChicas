const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const UserSchema = new Schema({

  nombre: {
    type: String,
    required: true
  },
  apellido: {
    type: String,
    required: true,
  },
  telefono: {
    type: String,
    required: true,
  },
  dni: {
    type: String,
    required: true,
  },
  mail: {
    type: String,
    required: true,
  },
  recibo1: {
    type: Number,
  },
  recibo2: {
    type: Number,
  },
  recibo3: {
    type: Number,
  },
  codigoPostal: {
    type: Number,
  },
  direccion: {
    type: String
  },
  garante: {
    type: Number    
  },
  provincia: {
    type: Number
  }

});

const User = mongoose.model('User', UserSchema);
module.exports = User;
