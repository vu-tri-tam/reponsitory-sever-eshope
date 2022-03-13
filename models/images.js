const mongoose = require('mongoose')
const Schema = mongoose.Schema



const images = new Schema({
    URL: {
        type: String,
        required: true
    }
})


module.exports = mongoose.model('images', images)
