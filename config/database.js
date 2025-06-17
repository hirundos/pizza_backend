// db.js
const sql= require('pg');

const pool = new sql.Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: String(process.env.DB_DATABASE),
  password: String(process.env.DB_PASSWORD),
  port: Number(process.env.DB_PORT),
  ssl: {
    rejectUnauthorized: false, // RDS에선 보통 이걸 꺼야 작동
  },
});


const connectToDb = async () => {
  let client;
  try {
    client = await pool.connect();
    console.log('Database connected successfully');
  } catch (err) {
    console.error('Database connection error:', err);
    throw err;
  } finally {
    client.release();
  }
};

module.exports = { pool, connectToDb };

