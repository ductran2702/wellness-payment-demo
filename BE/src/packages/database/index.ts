import 'reflect-metadata'
import { Connection } from 'typeorm'
import dataSource from '~/../../ormconfig'

let connection: Connection

export async function getConnection(): Promise<Connection> {
  if (connection) {
    return connection
  }

  connection = await dataSource.initialize()

  return connection
}

export async function closeConnection(): Promise<void> {
  if (connection) {
    return connection.close()
  }
}
