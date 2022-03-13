const express = require('express')
const router = express.Router()
const checkOut = require('../models/checkOut')


router.get('/', async (req, res) => {
    // const getUser = { userID: req.params.id }
    try {
        const checkOuts = await checkOut.find()
        res.json({ success: true, checkOuts })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "internal server errors" })
    }
})

router.post('/', async (req, res) => {

    const { products, code, address, orther, ZIPcode, note, totalProduct, Email, phone, date } = req.body
    if (!address)
        return res.status(400).json({ success: false, message: 'không được bỏ trống địa chỉ' })
    try {
        const addCheckOut = new checkOut({
            products,
            code,
            address,
            ZIPcode,
            Email,
            note,
            phone,
            totalProduct,
            date,
            orther,
            user: req.userId
        })

        await addCheckOut.save()

        res.json({ success: true, message: "Thêm thành công", checkOutDetail: addCheckOut })

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "internal server errors" })
    }
})

router.patch('/:id', async (req, res) => {

    const { products, code, address, date, orther, note, phone, Email, ZIPcode } = req.body

    if (!address)
        return res.status(400).json({ success: false, message: 'không được bỏ trống địa chỉ' })
    try {
        const editCheckOut = {
            products,
            code,
            ZIPcode,
            address,
            Email,
            totalProduct,
            phone,
            date,
            note,
            orther,
            user: req.userId
        }
        const checkOutUpdate = { _id: req.params.id, user: req.userId }
        updateCheckOut = await checkOut.findOneAndUpdate(checkOutUpdate, editCheckOut, { new: true })
        if (!updateCheckOut) {
            return res.status(401).json({ success: false, message: 'Không tìm thấy coupon và người dùng nào như vậy!' })
        }
        return res.json({ success: true, message: 'Cập nhật thành công!', updateCheckOut })

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "internal server errors" })
    }
})



module.exports = router