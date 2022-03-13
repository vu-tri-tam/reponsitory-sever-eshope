const express = require('express')
const router = express.Router()
const images = require('../models/images')

router.get("/", async (req, res) => {
    try {
        const image = await images.find()
        res.json({ success: true, image })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "internal server errors" })
    }

})


router.post("/", async (req, res) => {
    const { URL } = req.body
    try {
        const image = new images({
            URL
        })
        await image.save()
        res.json({ success: true, message: "Thêm thành công hình ảnh", images: image })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "internal server errors" })
    }

})
module.exports = router