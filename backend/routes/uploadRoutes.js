import path from 'path'
import express from 'express'
const router = express.Router()
import { upload } from '../middleware/uploadMiddleware.js'

router.post('/', upload.single('image'), (req, res) => {
	res.send(`/${req.file.path}`)
})

export default router
