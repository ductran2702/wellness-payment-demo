import * as Joi from '@hapi/joi'

// Define the schema for validating `orderItems` (an array of order items)
const orderItemSchema = Joi.object({
  quantity: Joi.number().integer().required(),
  product_id: Joi.number().integer().required(),
})

// Define the schema for validating `Order`
export const orderSchema = Joi.object({
  total: Joi.number().precision(2).required(),
  status: Joi.string().valid('pending', 'confirmed', 'cancelled').default('pending'), // Validate enum values
  orderItems: Joi.array().items(orderItemSchema).min(1).required(), // Ensure at least one order item
})

export default {
  // Validation for order creation
  createOrder: {
    body: orderSchema,
  },
}
