import { NextFunction, Request, Response } from 'express'
import { getConnection } from '~/packages/database'
import { Order, OrderStatus } from '~/packages/database/models/order'
import { ContainerTypes, isValid } from '../../middlewares/validation'
import orderValidation from './validation'
import { OrderItem } from '~/packages/database/models/order-item'
import { performance } from 'perf_hooks'
import { Product } from '~/packages/database/models/product'
import { getPaymentData } from './helpers'
export const list = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const orders = await (await getConnection()).getRepository(Order).createQueryBuilder('order').getMany()
    return res.status(200).send(orders)
  } catch (error) {
    return res.status(500).send(error)
  }
}
export const create = [
  isValid(ContainerTypes.Body, orderValidation.createOrder.body),
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { total, orderItems } = req.body // Assuming orderItems is an array of items with productId and quantity

    // Start a transaction
    const connection = await getConnection()

    // Begin transaction
    const queryRunner = connection.createQueryRunner()
    await queryRunner.startTransaction()
    // Start the timer
    const start = performance.now()

    try {
      // Step 1: Create the Order
      const order = new Order()
      order.total = total
      order.status = OrderStatus.Pending // Default status as pending
      order.created_at = new Date()
      order.updated_at = new Date()

      // Save the order (this will automatically save the relationship with the order items)
      const orderEntity = await queryRunner.manager.save(order)

      // Step 2: Create the OrderItems

      const promises = orderItems.map(async (item) => {
        const product = await queryRunner.manager.findOne(Product, { where: { id: item.product_id } }) // Get the product to associate with the order item
        if (!product) {
          return res.status(400).send({ success: false, message: 'Product not found' })
        }
        const orderItem = new OrderItem()
        orderItem.product = product
        orderItem.quantity = item.quantity
        orderItem.created_at = new Date()
        orderItem.order = order
        orderItem.updated_at = new Date()

        await queryRunner.manager.save(orderItem) // Save the order item
      })
      // Wait for all order items to be created
      const results = await Promise.allSettled(promises)
      if (results.some((result) => result.status === 'rejected')) throw new Error()

      const data = await getPaymentData(orderEntity)
      await queryRunner.commitTransaction()
      // Send success response
      return res.status(201).send(JSON.stringify({ data }))
    } catch (error) {
      await queryRunner.rollbackTransaction()
      return res.status(500).send({ success: false, message: 'Internal server error' })
    } finally {
      await queryRunner.release()
    }
  },
]

export const momoCallback = async (req, res) => {
  /**
    resultCode = 0: giao dịch thành công.
    resultCode = 9000: giao dịch được cấp quyền (authorization) thành công .
    resultCode <> 0: giao dịch thất bại.
   */
  /**
   * Dựa vào kết quả này để update trạng thái đơn hàng
   * Kết quả log:
   * {
        partnerCode: 'MOMO',
        orderId: 'MOMO1712108682648',
        requestId: 'MOMO1712108682648',
        amount: 10000,
        orderInfo: 'pay with MoMo',
        orderType: 'momo_wallet',
        transId: 4014083433,
        resultCode: 0,
        message: 'Thành công.',
        payType: 'qr',
        responseTime: 1712108811069,
        extraData: '',
        signature: '10398fbe70cd3052f443da99f7c4befbf49ab0d0c6cd7dc14efffd6e09a526c0'
      }
   */
  const data = req.body
  if (data.resultCode === 0) {
    const connection = await getConnection()
    const { affected } = await connection
      .getRepository(Order)
      .update({ id: data.orderId }, { status: OrderStatus.Confirmed })
    if (affected === 0) {
      throw new Error('Some thing went wrong!')
    }
  }
  return res.status(204).send()
}

export const getOrderById = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { id } = req.params // Extract orderId from the route parameters
  const query = `
  SELECT
    o.id AS order_id,
    o.total AS total,
    o.status AS status,
    o.created_at AS created_at,
	JSON_AGG(
        JSON_BUILD_OBJECT(
            'product_name', p.name,
            'quantity', oi.quantity
        )
    ) AS items
  FROM main.orders o
  LEFT JOIN main.order_items oi ON o.id = oi.order_id
  LEFT JOIN main.products p ON oi.product_id = p.id
  WHERE o.id = $1
  Group by o.id;
`
  try {
    const connection = await getConnection()
    const result = await connection.query(query, [id])
    if (result.length === 0) {
      return res.status(404).send({ success: false, message: 'Order not found' })
    }
    // Since the result is already formatted, we can directly return it
    return res.status(200).send({ ...result[0] })
  } catch (error) {
    console.error('Error fetching order by ID:', error)
    return res.status(500).send({ success: false, message: 'Internal server error', error: error.message })
  }
}
