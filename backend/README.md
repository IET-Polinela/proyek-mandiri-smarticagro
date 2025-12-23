# Sensor Backend API

Backend Node.js untuk menerima data sensor melalui MQTT dan menyediakan REST API.

## Struktur Folder

```
backend/
├── src/
│   ├── config/          # Konfigurasi aplikasi
│   │   ├── mqtt.config.js
│   │   └── server.config.js
│   ├── controllers/     # Controller untuk handle request
│   │   └── sensor.controller.js
│   ├── routes/          # Routing API
│   │   └── sensor.routes.js
│   ├── services/        # Business logic (MQTT service)
│   │   └── mqtt.service.js
│   ├── app.js           # Express app setup
│   └── server.js        # Entry point server
├── tests/               # Unit tests
│   └── sensor.test.js
├── .env                 # Environment variables
├── .gitignore          
├── package.json         # Dependencies
├── jest.config.js       # Jest configuration
└── README.md
```

## Instalasi

Dependencies sudah terinstall. Jika belum:

```bash
npm install
```

## Konfigurasi

File `.env` sudah ada dengan konfigurasi:

```env
MQTT_BROKER=103.151.63.79
MQTT_PORT=1882
MQTT_TOPIC=sensor/final
SERVER_HOST=0.0.0.0
SERVER_PORT=5010
NODE_ENV=development
```

## Menjalankan

Development mode (auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Endpoints

- `GET /` - Info API
- `GET /api/sensor/latest` - Mendapatkan data sensor terbaru
- `GET /api/health` - Status health check

## Response Format

### GET /api/sensor/latest

```json
{
  "status": "success",
  "data": {
    "N": 0.0,
    "P": 0.0,
    "K": 0.0,
    "temperature": 0.0,
    "humidity": 0.0,
    "pH": 0.0,
    "ec": 0.0,
    "lat": 0.0,
    "lon": 0.0,
    "alt": 0.0,
    "sat": 0,
    "timestamp": 1234567890.123,
    "status_mqtt": "CONNECTED"
  }
}
```

## Testing

```bash
npm test
```

## Teknologi

- Express.js - Web framework
- MQTT.js - MQTT client
- dotenv - Environment variables
- CORS - Cross-origin support
