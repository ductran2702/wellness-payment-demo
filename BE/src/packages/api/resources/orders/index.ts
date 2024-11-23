import Router from 'express-promise-router'
import { list, create, momoCallback, getOrderById } from './controller'

const router = Router()

router.route('/').get(list)
router.route('/create').post(create)
router.route('/callback').post(momoCallback)
router.route('/:id').get(getOrderById) // New route for order details
export default router
