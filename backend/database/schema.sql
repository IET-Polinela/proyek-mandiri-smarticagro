-- Create database (jalankan ini terlebih dahulu jika database belum ada)
-- CREATE DATABASE sensor_db;

-- Connect to sensor_db database, lalu jalankan SQL berikut:

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP
);

-- Create index for faster lookups
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);

-- Optional: Create sensor_data table untuk menyimpan history sensor
CREATE TABLE IF NOT EXISTS sensor_data (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    nitrogen DECIMAL(10, 2),
    phosphorus DECIMAL(10, 2),
    potassium DECIMAL(10, 2),
    temperature DECIMAL(10, 2),
    humidity DECIMAL(10, 2),
    ph DECIMAL(10, 2),
    ec DECIMAL(10, 2),
    latitude DECIMAL(10, 6),
    longitude DECIMAL(10, 6),
    altitude DECIMAL(10, 2),
    satellites INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_sensor_data_user_id ON sensor_data(user_id);
CREATE INDEX idx_sensor_data_created_at ON sensor_data(created_at);
