const mongoose = require('mongoose')
const Schema = mongoose.Schema


const comment = new Schema({
    content: {
        type: String,
        required: true,
    },
    dateComment: {
        type: Date

    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'

    },

})
module.exports = mongoose.model('comment', comment)
