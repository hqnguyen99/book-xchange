import pg from 'pg'
const {Pool} = pg

const db_config = {
    user: 'mehtab',
    password: 'pass',
    host: 'localhost',
    port: '5432',
    database: 'cmpt474'
}

const pool_config = process.env.DATABASE_URL ? {connectionString: process.env.DATABASE_URL, ssl:{rejectUnauthorized:false}} : db_config

const pool = new Pool(pool_config)

export default pool