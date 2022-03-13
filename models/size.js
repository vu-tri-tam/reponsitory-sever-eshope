const mongoose = require('mongoose')
const Schema = mongoose.Schema



const sizes = new Schema({
    sizeNumber: {
        type: Number,
        required: true,
    },
    detailSize: {
        type: String

    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'

    },
})


module.exports = mongoose.model('sizes', sizes)
