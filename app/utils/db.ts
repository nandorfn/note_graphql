// import { Pool } from 'pg';

// export const pool = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASSWORD,
//   port: process.env.DB_PORT as number | undefined,
// });

// app/actions.ts
import { Pool } from "@neondatabase/serverless";

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

