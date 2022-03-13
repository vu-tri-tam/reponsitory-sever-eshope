const express = require('express')
const router = express.Router()
const comments = require('../models/comment')


router.get('/:idUser', async (req, res) => {
    const getUser = { userID: req.params.id }
    try {
        const comment = await comments.find(getUser)
        res.json({ success: true, comment })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "internal server errors" })
    }
})

router.post('/', async (req, res) => {

    const { content, dateComment } = req.body
    if (!content)
        return res.status(400).json({ success: false, message: 'không được bỏ trống nội dung bình luận' })
    try {
        const newComment = new comments({
            content,
            dateComment,
            user: req.userId
        })

        await newComment.save()

        res.json({ success: true, message: "Thêm thành công", comment: newComment })

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "internal server errors" })
    }
})

module.exports = router