const app = require('./app');
const mqttService = require('./services/mqtt.service');
const serverConfig = require('./config/server.config');

// Inisialisasi MQTT
mqttService.connect();

// Start server
const server = app.listen(serverConfig.port, serverConfig.host, () => {
    console.log(`${new Date().toISOString().replace('T', ' ').substring(0, 19)} [STARTUP] Menjalankan Express API di http://${serverConfig.host}:${serverConfig.port}`);
    console.log(`${new Date().toISOString().replace('T', ' ').substring(0, 19)} [STARTUP] Environment: ${serverConfig.env}`);
});

// Graceful shutdown
const shutdown = () => {
    console.log(`\n${new Date().toISOString().replace('T', ' ').substring(0, 19)} [SHUTDOWN] Menutup koneksi...`);
    mqttService.disconnect();
    server.close(() => {
        console.log('Server ditutup');
        process.exit(0);
    });
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
