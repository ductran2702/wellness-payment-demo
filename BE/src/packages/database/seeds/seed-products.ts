import { Connection } from 'typeorm'
import { Factory, Seeder } from 'typeorm-seeding'
import { Product } from '../models/product'

const products = [
  {
    name: 'Product A',
    price: 1000,
    description: 'Description of Product A',
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
  {
    name: 'Product B',
    price: 12_000,
    description: 'Description of Product B',
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
  {
    name: 'Product C',
    price: 13_000,
    description: 'Description of Product C',
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
  {
    name: 'Product D',
    price: 100_000,
    description: 'Description of Product D',
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
]

export default class InitialDatabaseSeed implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    await connection.getRepository(Product).save(products)
    console.log('finished')
  }
}
