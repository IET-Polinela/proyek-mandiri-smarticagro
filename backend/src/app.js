const express = require('express');
const cors = require('cors');
const sensorRoutes = require('./routes/sensor.routes');
const authRoutes = require('./routes/auth.routes');
const predictionRoutes = require('./routes/prediction.routes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', sensorRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', predictionRoutes);

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'Sensor Backend API',
        version: '1.0.0',
        endpoints: {
            sensor: '/api/sensor/latest',
            health: '/api/health',
            auth: {
                register: '/api/auth/register',
                login: '/api/auth/login',
                profile: '/api/auth/profile'
            },
            prediction: {
                predict: '/api/predict (POST, requires token)',
                predictLatest: '/api/predict/latest (GET, requires token)'
            }
        }
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        status: 'error',
        message: 'Endpoint not found'
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        status: 'error',
        message: 'Internal server error'
    });
});

module.exports = app;
