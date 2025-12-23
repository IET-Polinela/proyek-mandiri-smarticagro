const pool = require('../src/config/database.config');
const fs = require('fs');
const path = require('path');

async function runMigration() {
    console.log('🚀 Memulai migrasi database...\n');

    try {
        // Test koneksi database
        console.log('📡 Testing koneksi database...');
        const client = await pool.connect();
        console.log('✅ Koneksi database berhasil!\n');

        // Baca file schema.sql
        const schemaPath = path.join(__dirname, 'schema.sql');
        const schema = fs.readFileSync(schemaPath, 'utf8');

        console.log('📝 Menjalankan migrasi...');
        
        // Jalankan seluruh schema sekaligus
        await client.query(schema);

        console.log('  ✓ Tabel users dibuat');
        console.log('  ✓ Index users dibuat');
        console.log('  ✓ Tabel sensor_data dibuat');
        console.log('  ✓ Index sensor_data dibuat');

        console.log('\n✅ Migrasi database berhasil!');
        console.log('\n📊 Tabel yang dibuat:');
        console.log('  - users (untuk autentikasi)');
        console.log('  - sensor_data (untuk history data sensor)');
        
        client.release();
        process.exit(0);
    } catch (error) {
        console.error('\n❌ Error saat migrasi:', error.message);
        
        if (error.code === 'ECONNREFUSED') {
            console.error('\n💡 PostgreSQL tidak running. Pastikan:');
            console.error('   1. PostgreSQL sudah terinstall');
            console.error('   2. Service PostgreSQL sudah running');
            console.error('   3. Konfigurasi di .env sudah benar');
        } else if (error.code === '3D000') {
            console.error('\n💡 Database tidak ditemukan. Buat database dulu:');
            console.error('   1. Buka pgAdmin atau psql');
            console.error('   2. Jalankan: CREATE DATABASE sensor_db;');
        } else if (error.code === '28P01') {
            console.error('\n💡 Password salah. Check DB_PASSWORD di .env');
        }
        
        process.exit(1);
    }
}

runMigration();
