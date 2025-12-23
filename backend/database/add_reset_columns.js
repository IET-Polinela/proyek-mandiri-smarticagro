require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 5432,
    database: process.env.DB_NAME || 'sensor_db',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
});

async function addResetPasswordColumns() {
    try {
        console.log('Adding reset password columns to users table...');
        
        await pool.query(`
            ALTER TABLE users 
            ADD COLUMN IF NOT EXISTS reset_code VARCHAR(6),
            ADD COLUMN IF NOT EXISTS reset_code_expires TIMESTAMP;
        `);
        
        console.log('✅ Columns added successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

addResetPasswordColumns();
