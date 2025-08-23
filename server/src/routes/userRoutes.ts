import { Router } from 'express'
import { currentUser, getAllUsers, loginController, registerController } from '../controllers/userController'
import { authMiddleware } from '../middlewares/authMiddleware'
const router = Router()

router.post('/register',registerController)

router.post('/login',loginController)

router.get('/me',authMiddleware,currentUser)

router.get('/users',authMiddleware,getAllUsers)

export default router