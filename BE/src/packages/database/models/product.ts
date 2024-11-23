// tslint:disable:variable-name
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Timestamp } from 'typeorm'
import config from '~/config'

@Entity({ schema: config.DB.MAIN_SCHEMA, name: 'products' })
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: string

  @Column('varchar')
  public name: string

  @Column('numeric')
  public price: number

  @Column('text', { nullable: true })
  public description: string

  @Column('timestamp with time zone')
  public created_at: Timestamp

  @Column('timestamp with time zone')
  public updated_at: Timestamp

  @Column('timestamp with time zone', { nullable: true })
  public deleted_at: Timestamp
}
