const express= require('express')
const rutas = express.Router()

const datos = require('../backend/Models/bd_trueke')

rutas.post('/nuevo', (req,res) => {
    let body=req.body
    let newdato=new datos({
        nombre_art:body.nombre_art,
        descripcion_art:body.descripcion_art,
        imagen_art:body.imagen_art,
        user_art:body.user_art,
        valor_art:body.valor_art,
        cantidad_art:body.cantidad_art
    })

    newdato.save((err, nuevodb) => {
        if (err){
            res.send(`<p>${err}</p>`)
        }
        else{
            res.json({nuevodb})
        }
    })
    //res.json(body)
})


//LISTAR TODO
rutas.get('/todo', (req,res) =>{
    datos
        .find({})
        .then(todo=>res.json(todo))
})


//ACTUALIZAR
rutas.post('/actualizar', (req,res)=> {
    let body=req.body
    datos.updateOne({nombre_art:body.nombre_art}, {
        $set:{
            descripcion_art: body.descripcion_art,
            imagen_art: body.imagen_art,
            user_art: body.user_art,
            valor_art: body.valor_art,
            cantidad_art: body.cantidad_art
        }
    }, function(error,info){
        if(error){
            res.send('error')
        }
        else{
            res.json({info})
        }
    })
})


//ELMIMINAR
rutas.get('/eliminar/:id', (req,res)=>{
    let {id}=req.params
    datos
        .findByIdAndDelete(id)
        .then(res.send(`Registro Borrado`))
    })

module.exports=rutas