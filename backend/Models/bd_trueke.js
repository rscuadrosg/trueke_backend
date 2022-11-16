const mongoose=require('mongoose')

const SchemaTarjeta = mongoose.Schema(
    {
        nombre_art: String,
        descripcion_art: String,
        imagen_art: String,
        user_art: String,
        valor_art: String,
        cantidad_art: Number,
    }
)

const datos = mongoose.model('datos', SchemaTarjeta)

module.exports = datos