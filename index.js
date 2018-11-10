const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const User = require('./models/User.js')
const Prestamo = require('./models/Prestamo.js')
const config = require('./config.js')
const mongoose = require('mongoose')
const request = require('request-promise')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
mongoose.connect(config.urlPrestamo)
const dbm = mongoose.connection
dbm.on('error', console.error.bind(console, 'connection error:'))
dbm.once('open', () => {
  console.log(`conectado a mongoose`)
})

app.get('/prestamos', async (req, res) => {
    const prestamos = await Prestamo.find().populate('user')
    return res.json(prestamos)
})

app.get('/prestamos/:id', async (req, res) => {
    const id = req.params.id
    const prestamos = await Prestamo.findById(id).populate('user')
    return res.json(prestamos)
})
app.post('/prestamos', async (req, res) => {
    const body = req.body

      const  postData = {
        monto: body.mont,
        recibo1: body.recibo1,
        recibo2: body.recibo2,
        recibo3: body.recibo3,
        garante: body.garante,
        plazo: body.plazo,
        interes: body.interes,
        codigoPostal: body.codigoPostal,
        provicnia: body.provicnia
    }
      
    const options = {
    method: 'post',
    body: postData,
    json: true,
    url: 'http://10.88.87.246:5000/score'
    }
    console.log(options)
    const status = await request(options)
    console.log(status)
    const calculate =  data => {
        let montoConInteres = ((data.interes*data.monto)/100)+data.monto
         return Math.round(montoConInteres/data.cuota)
    }
    let usuario = {
        nombre : body.nombre,
        apellido : body.apellido,
        telefono : body.telefono,
        dni : body.dni,
        mail : body.mail,
        recibo1 : Number(body.recibo1),
        recibo2 : Number(body.recibo2),
        recibo3 : Number(body.recibo3),
        codigoPostal : Number(body.codigoPostal), 
        direccion : body.direccion,
        garante : Number(body.garante),
        provincia : Number(body.provincia), 
       }
    
       const user = await User.create(usuario)

       let prestamo = {
        monto: Number(body.monto),
        plazo: Number(body.plazo),
        cuota: Number(body.cuota),
        interes: Number(body.interes),
        titulo: body.titulo,
        descripcion: body.descripcion,
        user: user._id
    }
    let calculo = calculate(prestamo)
    prestamo.calculo = calculo

    const prestamos = await Prestamo.create(prestamo)
    return res.json(prestamos)
})
module.exports = app.listen(config.port)