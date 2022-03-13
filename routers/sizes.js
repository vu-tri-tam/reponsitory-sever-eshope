const express = require('express')
const router = express.Router()
const sizes = require('../models/size')

router.get("/", async (req, res) => {
    try {
        const size = await sizes.find()
        res.json({ success: true, size })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "internal server errors" })
    }

})


router.post("/", async (req, res) => {
    const { sizeNumber, detailSize } = req.body
    try {
        const size = new sizes({
            sizeNumber,
            detailSize
        })
        await size.save()
        res.json({ success: true, message: "Thêm thành công size sản phẩm", size: size })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "internal server errors" })
    }

})
module.exports = router