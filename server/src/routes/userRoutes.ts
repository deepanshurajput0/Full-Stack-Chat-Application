import { Router } from 'express'
import { currentUser, getAllUsers, loginController, registerController } from '../controllers/userController'
import upload from '../config/multer.js'
import { authMiddleware } from '../middlewares/authMiddleware'
const router = Router()

router.post('/register',upload.single('profilePic'),registerController)

router.post('/login',loginController)

router.get('/me',authMiddleware,currentUser)

router.get('/users',authMiddleware,getAllUsers)

export default router