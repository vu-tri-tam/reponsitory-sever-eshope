const mongoose = require('mongoose')
const Schema = mongoose.Schema


const countPoint = new Schema({
    images:
    {
        type: String,
        required: true
    }
    ,
    tittle: {
        type: String,
        required: true,
    },
    priceCoupon: {
        type: Number,
        required: true
    },
    content: {
        type: String,
        required: true

    },
    expiry: {
        type: Date,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'

    },

})
module.exports = mongoose.model('countPoint', countPoint)
