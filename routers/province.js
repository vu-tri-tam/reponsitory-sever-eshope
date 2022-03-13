const express = require('express')
const router = express.Router()
const province = require('../models/province')


router.get('/', async (req, res) => {
    // const getUser = { userID: req.params.id }
    try {
        const provinces = await province.find()
        res.json({ success: true, provinces })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "internal server errors" })
    }
})

router.post('/', async (req, res) => {

    const { name, code, division_type, phone_code, codename, districts } = req.body
    if (!name)
        return res.status(400).json({ success: false, message: 'không được bỏ trống tên tỉnh thành' })
    try {
        const addProvince = new province({
            name,
            code,
            division_type,
            phone_code,
            codename,
            districts

        })

        await addProvince.save()

        res.json({ success: true, message: "Thêm thành công", addProvince: addProvince })

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "internal server errors" })
    }
})

router.patch('/:id', async (req, res) => {

    const { name, code, division_type, phone_code, codename, districts } = req.body

    if (!name)
        return res.status(400).json({ success: false, message: 'không được bỏ trống tên tỉnh thành' })
    try {
        const editProvince = {
            name,
            code,
            division_type,
            phone_code,
            codename,
            districts
        }
        const provinceUpdate = { _id: req.params.id, user: req.userId }
        updateProvince = await checkOut.findOneAndUpdate(provinceUpdate, editProvince, { new: true })
        if (!updateProvince) {
            return res.status(401).json({ success: false, message: 'Không tìm thấy coupon và người dùng nào như vậy!' })
        }
        return res.json({ success: true, message: 'Cập nhật thành công!', updateProvince })

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "internal server errors" })
    }
})



module.exports = router