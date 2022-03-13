// const { request } = require('express')
const express = require('express')
const router = express.Router()
const User = require('../models/user')
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const verifyToken = require('../middleWare/authMiddle')


//@route GET api/auth
//@desc check isset user
router.get('/', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-passWord')
        if (!user)
            return res.status(400).json({ success: false, message: "không tìm thấy user" })
        res.json({ success: true, user })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "internal server errors" })
    }
})

// router.get('/', (request, respose) => respose.send('USER ROUTE'))

//@route post api/auth/register
//@desc register user
router.post('/register', async (req, res) => {
    const { userName, passWord, decentralization } = req.body
    if (!userName || !passWord) {
        return res.status(400).json({ success: false, message: "chưa nhập username và password" })
    }
    try {
        const user = await User.findOne({ userName })
        if (user) {
            return res.status(400).json({ success: false, message: 'tên người dùng đã tồn tại' })

        }
        let i = 0;
        const hashPassword = await argon2.hash(passWord)
        // const radomMaND= await Math.random()
        const newUser = new User({
            userName,
            decentralization: false,
            passWord: hashPassword
        })
        await newUser.save()
        // console.log(newUser)

        //return token
        const accessToken = jwt.sign({ userId: newUser._id }, process.env.ACCESS_TOKEN_SECRET)
        res.json({ success: true, message: "Tạo thành công", accessToken })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "internal server errors" })
    }
})

//login
router.post('/login', async (req, res) => {
    const { userName, passWord } = req.body
    if (!userName || !passWord) {
        return res.status(400).json({ success: false, message: "chưa nhập username và password" })
    }
    try {
        const user = await User.findOne({ userName })
        if (!user) {
            return res.status(400).json({ success: false, message: 'tên đăng nhập không đúng' })

        }
        const passWordValid = await argon2.verify(user.passWord, passWord)
        if (!passWordValid)
            return res.status(400).json({ success: false, message: "mật khẩu không đúng" })

        //all good
        const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET)
        res.json({ success: true, message: "Đăng nhập thành công", accessToken })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "internal server errors" })
    }
})
module.exports = router