const connectionOptions = {
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  username: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  entities: ['src/packages/database/models/*.ts'],
  logging: true,
  migrations: ['src/packages/database/migrations/*.ts', 'src/packages/database/migrations/*.js'],
  migrationsRun: false,
  seeds: ['src/packages/database/seeds/**/*{.ts,.js}'],
  synchronize: false,
  type: 'postgres',
}
module.exports = connectionOptions
