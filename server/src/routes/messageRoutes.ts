import { Router } from 'express'
import { getMessages } from '../controllers/messageController'

const router = Router()

router.get('/messages/:id',getMessages)

export default router