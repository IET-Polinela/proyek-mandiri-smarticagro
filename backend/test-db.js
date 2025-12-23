const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5433,
  database: 'sensor_db',
  user: 'postgres',
  password: '123'
});

async function testConnection() {
  try {
    const client = await pool.connect();
    console.log('✅ Koneksi database berhasil!');
    
    const result = await client.query('SELECT version()');
    console.log('PostgreSQL version:', result.rows[0].version);
    
    client.release();
    await pool.end();
  } catch (err) {
    console.error('❌ Error koneksi database:', err.message);
    console.error('Details:', err);
  }
}

testConnection();
