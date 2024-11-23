import * as express from 'express'
import userRouter from '~/packages/api/resources/users/index'
import productRouter from '~/packages/api/resources/products/index'
import orderRouter from '~/packages/api/resources/orders/index'

const router = express.Router()

router.use('/users', userRouter)
router.use('/products', productRouter)
router.use('/orders', orderRouter)

export default router
