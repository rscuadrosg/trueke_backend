const express = require('express')

const app1=express()
const port=5005

const bodyparser=require('body-parser')
app1.use(bodyparser.json())
app1.use(bodyparser.urlencoded({extended:false}))



// Conexion Mongo
const mongoose=require('mongoose')
mongoose
    .connect('mongodb://localhost:27017/g_36')
    .then(() => console.log('Conexion exitosa'))


// modelo
const datos=require('./Models/bd_trueke') 

// Rutas
app1.get('/api/:articulo', (req,res) => {
    let {articulo}= req.params
    datos
        .findOne({user_art:articulo})
        .then(allCoasters => res.json(allCoasters))
})


//nuevo
app1.get('/nuevo', (req,res) => {
    let daton = {
        nombre_art:"articulo 7",
        descripcion_art:"descripcion 7",
        imagen_art:"./multimedia/imagen7.jpg",
        user_art:"Luis Morales",
        valor_art:"70000",
        cantidad_art:"7",
    }
    let datonn=new datos(daton)
    datonn.save()
    res.json(datonn)
})

//nuevo2
app1.get('/nuevo2', (req,res) => {
    let nombre_art_n=req.body.nombre_art
    res.json(nombre_art_n)
})


//Borrar
app1.get('/borrar/:id', (req,res) => {
    let {id}=req.params
    datos
        .findByIdAndDelete(id)
        .then(res.send(`Id ${id} ha sido borrado`))

})

app1.get('/productos', (req,res)=> {res.send('<h1>Hola Mundo</h1>')})
app1.get('/prueba', (req,res)=> {res.send('<h1>Ruta de prueba</h1>')})
// app1.get('/nuevo', (req,res)=> {res.json(
//     {
//         mensaje:'hola',
//         nombre:'Luis',
//         Fecha: new Date(),
//         Edad: 29
//     }

// )})

// LLAMADAS A RUTAS
const rutas=require('../router/rutas')
app1.use('/articulos', rutas)



app1.listen(port, ()=> {console.log(`Conexion puerto ${port}`)})