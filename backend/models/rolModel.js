const mongoose = require('mongoose')

const RolSchema = mongoose.Schema({
    name: String,
}, 
{
    timestamps: true
})

module.exports = mongoose.model('Rol', RolSchema)