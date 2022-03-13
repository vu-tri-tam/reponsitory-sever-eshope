const express = require('express')
const router = express.Router()


const verifyToẹn = require('../middleWare/authMiddle')
const products = require('../models/products')
const catelogy = require('../models/catelogy')

//@router GET api/products
//@desc GET Products 
router.get('/', async (req, res) => {
    try {
        const product = await products.find().populate('catelogyParent').populate('sizes').populate('images').populate('countPoint').exec();
        console.log(product, 464646);
        res.json({ success: true, product })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "internal server errors" })
    }
})

router.get('/catelogy/:id', async (req, res) => {
    const { tittle, price, size, quantity, images, catelogyParent, description, color, status } = req.body

    try {

        const catelog = { catelogyParent: req.params.id }


        const product = await products.find().populate('catelogyParent').populate('sizes').populate({
            path: 'images',
            populate: { path: 'images' }
        });

        res.json({ success: true, product })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "internal server errors" })
    }
})

//@router POST api/products
//@desc create Products 
router.post('/', verifyToẹn, async (req, res) => {
    const { tittle, price, size, quantity, images, countPoint, catelogyParent, description, color, status } = req.body
    if (!tittle)
        return res.status(400).json({ success: false, message: 'Vui lòng nhập tên sản phẩm' })
    try {
        const productNew = new products({
            tittle,
            price,
            size,
            quantity,
            description,
            countPoint,
            images,
            color,
            status,
            catelogyParent,
            user: req.userId
        })
        // const jsonProduct = productNew.toString();

        await productNew.save()
        // if (productNew.hasOwnProperty()) {
        //     res.json({ success: true, message: "Sản phầm đã tồn tại" })
        // }
        res.json({ success: true, message: "Thêm thành công sản phẩm", products: productNew })

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "internal server errors" })
    }

})



//@router PUT api/products
//@desc update Products 
router.put('/:id', verifyToẹn, async (req, res) => {
    const { tittle, price, size, images, catelogyParent, countPoint, description, quantity, color, status } = req.body
    if (!tittle)
        return res.status(400).json({ success: false, message: 'Vui lòng nhập tên sản phẩm' })
    try {
        let updateProduct = {
            tittle,
            price,
            size,
            images,
            quantity,
            countPoint,
            description,
            color,
            catelogyParent,
            status: status || "Đang cập nhật",
            user: req.userId
        }

        const productUpdation = { _id: req.params.id, user: req.userId }

        updateProduct = await products.findOneAndUpdate(productUpdation, updateProduct, { new: true })
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

        const deleteProduct = await products.findOneAndDelete(productDelete)

        //user not auth
        if (!deleteProduct) {
            return res.status(401).json({ success: false, message: 'Không thể xóa vì người dùng không có quyền!' })
        }
        return res.json({ success: true, message: 'Xóa thành công!', products: deleteProduct })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "internal server errors" })
    }

})
module.exports = router