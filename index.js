require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./routers/Auth')
const addProducts = require('./routers/products')
const catelogy = require('./routers/catelogyParen')
const images = require('./routers/images')
const comments = require('./routers/comment')
const coupon = require('./routers/countPoint')
const checkOut = require('./routers/checkOut')
const province = require('./routers/province')
const sizes = require('./routers/sizes')
const detailSizePro = require('./routers/detailSizePro')
const cors = require('cors')


//payment cart express
// const path = require('path')
// const bodyParser = require('body-parser')
// const postCharge = require('./stripe')
// require('dotenv').config()



const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mern-project.6fgos.mongodb.net/mern-project?retryWrites=true&w=majority`)
        console.log("mogoDB connected");
    } catch (error) {
        console.log(error.message);
        process.exit(1)
    }
}
connectDB()
const app = express()
app.use(express.json())
app.use(cors())
app.use('/api/auth', authRouter)
app.use('/api/products', addProducts)
app.use('/api/catelogy', catelogy)
app.use('/api/comment', comments)
app.use('/api/images', images)
app.use('/api/coupon', coupon)
app.use('/api/checkout', checkOut)
app.use('/api/province', province)
app.use('/api/sizes', sizes)
app.use('/api/detail-size-pro', detailSizePro)
app.use(express.static('public'));//sử dụng folder public để render img

// const router = express.Router()

// /// express accept payment cart 
// router.post('/stripe/charge', postCharge)
// router.all('*', (_, res) =>
//   res.json({ message: 'please make a POST request to /stripe/charge' })
// )
// app.use((_, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*')
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept'
//   )
//   next()
// })

app.get('/', (req, res) => res.send('hello world'))
server.listen(process.env.PORT || 3000, () => {
    console.log('Server is listening on port 5000');
});