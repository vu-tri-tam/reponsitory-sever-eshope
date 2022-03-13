const mongoose = require('mongoose')
const Schema = mongoose.Schema


const checkOut = new Schema({
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: 'products'

        }
    ],
    code: {
        type: Number,
    },
    address: {
        type: String,
        required: true

    },
    phone: {
        type: Number
    },
    Email: {
        type: String,
        required: true
    },
    ZIPcode: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    totalProduct: {
        type: Number,
        default: 0
    },
    orther: {
        type: String

    },
    note: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'

    }
})


module.exports = mongoose.model('checkOut', checkOut)
