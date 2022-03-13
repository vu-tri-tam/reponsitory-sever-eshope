const express = require('express')
const router = express.Router()
const countPoint = require('../models/countPoint')


router.get('/', async (req, res) => {
    // const getUser = { userID: req.params.id }
    try {
        const countPoints = await countPoint.find()
        res.json({ success: true, countPoints })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "internal server errors" })
    }
})

router.post('/', async (req, res) => {

    const { images, content, tittle, priceCoupon, expiry, status } = req.body
    if (!content)
        return res.status(400).json({ success: false, message: 'không được bỏ trống nội dung bình luận' })
    try {
        const addCountPoint = new countPoint({
            images,
            content,
            tittle,
            expiry,
            status,
            priceCoupon,
            user: req.userId
        })

        await addCountPoint.save()

        res.json({ success: true, message: "Thêm thành công", countPoint: addCountPoint })

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "internal server errors" })
    }
})

router.patch('/:id', async (req, res) => {

    const { images, content, tittle, priceCoupon, expiry, status } = req.body
    if (!content)
        return res.status(400).json({ success: false, message: 'không được bỏ trống nội dung bình luận' })
    try {
        const addCountPoint = {
            images,
            content,
            tittle,
            expiry,
            status,
            priceCoupon,
            user: req.userId
        }
        const couponUpdate = { _id: req.params.id, user: req.userId }
        updateCoupon = await countPoint.findOneAndUpdate(couponUpdate, addCountPoint, { new: true })
        if (!updateCoupon) {
            return res.status(401).json({ success: false, message: 'Không tìm thấy coupon và người dùng nào như vậy!' })
        }
        return res.json({ success: true, message: 'Cập nhật thành công!', updateCoupon })

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "internal server errors" })
    }
})



module.exports = router