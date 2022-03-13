const mongoose = require('mongoose')
const Schema = mongoose.Schema



const products = new Schema({
    tittle: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    sizes: [
        {

            type: Schema.Types.ObjectId,
            ref: "sizes"
        }
    ],
    images: [
        {
            type: Schema.Types.ObjectId,
            ref: "images"
        }
    ],
    color: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    catelogyParent: {
        type: Schema.Types.ObjectId,
        ref: 'catelogyParent'
    },
    countPoint: [{
        type: Schema.Types.ObjectId,
        ref: "countPoint"
    }],
    description: {
        type: String,
        required: true
    },
    comment: {
        type: Schema.Types.ObjectId,
        ref: "comment"
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'

    },
})


module.exports = mongoose.model('products', products)
