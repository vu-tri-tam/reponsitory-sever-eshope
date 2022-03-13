const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    passWord: {
        type: String,
        required: true

    },
    decentralization: {
        type: Boolean
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('users', UserSchema)
