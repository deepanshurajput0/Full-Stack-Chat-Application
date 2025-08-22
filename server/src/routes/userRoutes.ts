import { Router } from 'express'
import { registerController } from '../controllers/userController'
const router = Router()

router.post('/register',registerController)

export default router