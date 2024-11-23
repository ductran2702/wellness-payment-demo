import Router from 'express-promise-router'
import { list } from './controller'

const router = Router()

router.route('/').get(list)

export default router
