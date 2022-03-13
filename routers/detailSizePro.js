const express = require('express')
const router = express.Router()
const detailSizePros = require('../models/detailSizeProduct')


router.get("/", async (req, res) => {
    try {
        const detailSizePro = await detailSizePros.find()
        res.json({ success: true, detailSizePro })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "internal server errors" })
    }

})


router.post("/", async (req, res) => {
    const { product, size } = req.body
    try {
        const detailSizePro = new detailSizePros({
            product,
            size
        })
        await detailSizePro.save()
        res.json({ success: true, message: "Thêm thành công", detailSizePro: detailSizePro })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "internal server errors" })
    }

})

module.exports = router