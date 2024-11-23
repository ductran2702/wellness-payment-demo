import { NextFunction, Request, Response } from 'express'
import { getConnection } from '~/packages/database'
import { Product } from '~/packages/database/models/product'

export const list = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const products = await (await getConnection()).getRepository(Product).createQueryBuilder('product').getMany()
    return res.status(200).send(products)
  } catch (error) {
    return res.status(500).send(error)
  }
}
