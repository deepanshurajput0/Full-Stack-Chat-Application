import { Router } from 'express'
import { currentUser, loginController, registerController } from '../controllers/userController'
import { authMiddleware } from '../middlewares/authMiddleware'
const router = Router()

router.post('/register',registerController)

router.post('/login',loginController)

router.get('/me',authMiddleware,currentUser)

export default router