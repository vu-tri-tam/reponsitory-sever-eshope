const mongoose = require('mongoose')
const Schema = mongoose.Schema



const province = new Schema({
    name: {
        type: String,
        required: true
    },
    code: {
        type: Number,
        required: true
    },
    division_type: {
        type: String,
        required: true
    },
    phone_code: {
        type: Number,
        required: true
    },
    codename: {
        type: String,
        required: true
    },
    districts: [
        {

            name: {
                type: String,
                required: true
            },
            code: {
                type: Number
            },
            codename: {
                type: String
            },
            division_type: {
                type: String
            },
            province_code: {
                type: String
            }


        }
    ]


})


module.exports = mongoose.model('province', province)
