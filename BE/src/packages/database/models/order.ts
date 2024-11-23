import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Timestamp, OneToMany, Unique } from 'typeorm'
import config from '~/config'
import { OrderItem } from './order-item'

// Define the enum for the status column
export enum OrderStatus {
  Pending = 'pending',
  Confirmed = 'confirmed',
  Cancelled = 'cancelled',
}

@Entity({ schema: config.DB.MAIN_SCHEMA, name: 'orders' })
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: string

  @Column('decimal', { precision: 15, scale: 2 })
  public total: number

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.Pending,
  })
  public status: OrderStatus

  @Column('timestamp with time zone')
  public created_at: Date

  @Column('timestamp with time zone')
  public updated_at: Date

  @Column('timestamp with time zone', { nullable: true })
  public deleted_at: Date

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  public orderItems: OrderItem[]
}
