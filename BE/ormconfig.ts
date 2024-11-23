import { DataSourceOptions, DataSource } from 'typeorm'
import config from './src/config'

const connectionOptions: DataSourceOptions = {
  database: config.DB.NAME,
  password: config.DB.PASSWORD,
  username: config.DB.USER,
  host: config.DB.HOST,
  port: config.DB.PORT,
  entities: ['src/packages/database/models/*.ts'],
  logging: true,
  migrations: ['src/packages/database/migrations/*.ts', 'src/packages/database/migrations/*.js'],
  migrationsRun: false,
  synchronize: false,
  type: 'postgres',
}
const AppDataSource = new DataSource(connectionOptions)
export default AppDataSource
