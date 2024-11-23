import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Timestamp, ManyToOne, JoinColumn } from 'typeorm'
import config from '~/config'
import { Order } from './order'
import { Product } from './product'

@Entity({ schema: config.DB.MAIN_SCHEMA, name: 'order_items' })
export class OrderItem extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: string

  @Column('integer')
  public quantity: number

  @Column('timestamp with time zone')
  public created_at: Date

  @Column('timestamp with time zone')
  public updated_at: Date

  @Column('timestamp with time zone', { nullable: true })
  public deleted_at: Date

  @ManyToOne(() => Order, (order) => order.orderItems, { createForeignKeyConstraints: true, nullable: false })
  @JoinColumn({ name: 'order_id', foreignKeyConstraintName: 'Order_ID_PK', referencedColumnName: 'id' })
  public order: Order

  @ManyToOne(() => Product, { createForeignKeyConstraints: true })
  @JoinColumn({ name: 'product_id', foreignKeyConstraintName: 'Product_ID_PK', referencedColumnName: 'id' })
  public product: Product
}
