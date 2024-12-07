import pg from 'pg'

export const pool = new pg.Pool({
 user: "postgres",
 host: "localhost",
 password: "eric758999",
 database: "proyectoalcaldia",
 port: "5432"
})
