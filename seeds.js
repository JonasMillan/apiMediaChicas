const mongoose = require('mongoose')
const User = require('./models/User.js')
const Prestamo = require('./models/Prestamo.js')
const config = require('./config.js')

mongoose.connect(config.urlPrestamo)
var dbm = mongoose.connection
dbm.on('error', console.error.bind(console, 'connection error:'))
dbm.once('open', () => {
  console.log(`conectado a mongoose`)
})

const data = {
    userData: {
        nombre: 'admin',
        apellido: 'montesquieu',
        telefono: '1123136090',
        dni:'95552811',
        mail:'millan@gmail.com',
        recibo1:'10000',
        recibo2:'10000',
        recibo3:'10000',
        condigoPostal: 123,
        provincia:'pepe',
        direccion: 'direccion',
        garante: 111111111
    },
    prestamo:{
        monto: 5000,
        plazo: 60,
        cuota: 6,
        interes: 10,
        titulo: 'quiero hacer una ensalada',
        descripcion: 'una rica ensalada de lechugas muy sabrosas'
    }
}
const run  = async (data) =>{
    let user = await User.create(data.userData)
    data.prestamo.user = user._id
    data.prestamo.calculo = await calculate(data.prestamo)
    let prestamo = await Prestamo.create(data.prestamo)
    console.log(prestamo)
}

const calculate = async data => {
    let montoConInteres = ((data.interes*data.monto)/100)+data.monto
     return Math.round(montoConInteres/data.cuota)
}
// const run = async (data) => {
//     async.each(data, async (each, cb) => {
//       let provincia = await Provincia.create(each.data)
//       each.userData.provincia = provincia._id
//       let user = await User.create(each.userData)
//       cb()
//     }, (err) => {
//       if (err) {
//         console.log(err)
//       } else {
//         console.log(`User seeds complete`)
//         mongoose.connection.close()
//       }
//     })
//   }
  
  
  run(data)