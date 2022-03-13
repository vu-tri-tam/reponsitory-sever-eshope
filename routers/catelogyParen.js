const express = require('express')
const router = express.Router()


const verifyToẹn = require('../middleWare/authMiddle')
const catelogyParent = require('../models/catelogy')

//@router GET api/products
//@desc GET Products 
router.get('/', async (req, res) => {
    try {
        const catelogyParents = await catelogyParent.find()
        res.json({ success: true, catelogyParents })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "internal server errors" })
    }
})


//@router POST api/products
//@desc create Products 
router.post('/', verifyToẹn, async (req, res) => {
    const { tittle } = req.body
    if (!tittle)
        return res.status(400).json({ success: false, message: 'Vui lòng nhập tên danh mục' })
    try {
        const cateNew = new catelogyParent({
            tittle,
            user: req.userId
        })
        await cateNew.save()
        res.json({ success: true, message: "Thêm thành công danh mục", catelogy: cateNew })

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "internal server errors" })
    }

})



//@router PUT api/products
//@desc update Products 
router.put('/:id', verifyToẹn, async (req, res) => {
    const { tittle, catelogyChildren } = req.body
    if (!tittle)
        return res.status(400).json({ success: false, message: 'Vui lòng nhập tên danh mục' })
    try {
        let updateCate = {
            tittle,
            user: req.userId
        }

        const productUpdation = { _id: req.params.id, user: req.userId }

        updateProduct = await catelogyParent.findOneAndUpdate(productUpdation, updateCate, { new: true })
        if (!updateProduct) {
            return res.status(401).json({ success: false, message: 'Không tìm thấy sản phẩm và người dùng nào như vậy!' })
        }
        return res.json({ success: true, message: 'Cập nhật thành công!', updateProduct })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "internal server errors" })
    }

})

//@router DELETE api/products
//@desc DELETE Products 
router.delete('/:id', verifyToẹn, async (req, res) => {
    try {


        const productDelete = { _id: req.params.id, user: req.userId }

        const deleteProduct = await updateCate.findOneAndDelete(productDelete)

        //user not auth
        if (!deleteProduct) {
            return res.status(401).json({ success: false, message: 'Không thể xóa vì người dùng không có quyền!' })
        }
        return res.json({ success: true, message: 'Xóa thành công!', catelogy: deleteProduct })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "internal server errors" })
    }

})
module.exports = router