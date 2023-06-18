const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    nameP: {
        type: String,
        required: [true, 'please add a name']
    },
    img: {
        type: String,
        required: [true, 'please add a image'],
    },
    category: {
        type: String,
        required: [true, 'please add a category'],
    },
    price: {
        type: Number,
        required: [true, 'please add a price']
    },
    cant: {
        type: Number,
        required: [true, 'please add a cant']
    },
    description: {
        type: String,
        required: [true, 'please add a description']
    },
    emprendimiento:{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'UserE',
    },
}, 
{
    timestamps: true
})

module.exports = mongoose.model('Product', productSchema)