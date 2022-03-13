const mongoose = require('mongoose')
const Schema = mongoose.Schema



const detailSizeProduct = new Schema({
    product: [
        {
            type: Schema.Types.ObjectId,
            ref: "products"
        }
    ],
    size: [
        {
            type: Schema.Types.ObjectId,
            ref: "sizes"
        }
    ]

})


module.exports = mongoose.model('detailSizeProduct', detailSizeProduct)
