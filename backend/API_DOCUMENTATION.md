# SmartIcAgro Backend API Documentation

Base URL: `http://localhost:5010`

## Table of Contents
- [Authentication](#authentication)
- [Sensor Data](#sensor-data)
- [Prediction](#prediction)

---

## Authentication

### 1. Register User
**Endpoint:** `POST /api/auth/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (Success):**
```json
{
  "status": "success",
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
}
```

---

### 2. Login
**Endpoint:** `POST /api/auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (Success):**
```json
{
  "status": "success",
  "message": "Login berhasil",
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

### 3. Get Profile
**Endpoint:** `GET /api/auth/profile`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (Success):**
```json
{
  "status": "success",
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "created_at": "2026-01-03T10:00:00.000Z"
    }
  }
}
```

---

## Sensor Data

### 1. Get Latest Sensor Data
**Endpoint:** `GET /api/sensor/latest`

**Response (Success):**
```json
{
  "status": "success",
  "data": {
    "N": 90.5,
    "P": 42.3,
    "K": 43.1,
    "temperature": 28.5,
    "humidity": 82.0,
    "pH": 6.5,
    "ec": 1.2,
    "timestamp": "2026-01-03T10:30:00.000Z",
    "status_mqtt": "CONNECTED"
  }
}
```

**Response (MQTT Disconnected):**
```json
{
  "status": "success",
  "data": {
    "N": 0,
    "P": 0,
    "K": 0,
    "temperature": 0,
    "humidity": 0,
    "pH": 0,
    "ec": 0,
    "timestamp": null,
    "status_mqtt": "DISCONNECTED"
  }
}
```

---

### 2. Health Check
**Endpoint:** `GET /api/health`

**Response:**
```json
{
  "status": "success",
  "message": "API is running",
  "mqtt_status": "CONNECTED",
  "timestamp": "2026-01-03T10:30:00.000Z"
}
```

---

## Prediction

### 1. Predict Crop (Custom Data)
**Endpoint:** `POST /api/predict`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "N": 90,
  "P": 42,
  "K": 43,
  "temperature": 28,
  "humidity": 82,
  "pH": 6.5,
  "altitude": 100
}
```

**Parameters:**
- `N` (number, required): Nitrogen level
- `P` (number, required): Phosphorus level
- `K` (number, required): Potassium level
- `temperature` (number, required): Temperature in Celsius
- `humidity` (number, required): Humidity percentage
- `pH` (number, required): Soil pH level
- `altitude` (number, optional): Altitude in meters (default: 0)

**Response (Success):**
```json
{
  "status": "success",
  "data": {
    "altitude": 100,
    "prediction": "rice",
    "confidence": 91.0,
    "top_crops": [
      {
        "crop": "rice",
        "probability": 91.0
      },
      {
        "crop": "jute",
        "probability": 9.0
      },
      {
        "crop": "banana",
        "probability": 5.5
      }
    ]
  }
}
```

**Example with cURL:**
```bash
curl -X POST http://localhost:5010/api/predict \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "N": 90,
    "P": 42,
    "K": 43,
    "temperature": 28,
    "humidity": 82,
    "pH": 6.5,
    "altitude": 100
  }'
```

**Example with PowerShell:**
```powershell
$token = "your_token_here"
$headers = @{Authorization="Bearer $token"}
$body = @{
  N=90
  P=42
  K=43
  temperature=28
  humidity=82
  pH=6.5
  altitude=100
} | ConvertTo-Json

Invoke-RestMethod -Uri 'http://localhost:5010/api/predict' `
  -Method POST `
  -Body $body `
  -ContentType 'application/json' `
  -Headers $headers
```

---

### 2. Predict from Latest Sensor Data
**Endpoint:** `GET /api/predict/latest`

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `altitude` (number, optional): Altitude in meters (default: 0)

**Example:**
```
GET /api/predict/latest?altitude=500
```

**Response (Success):**
```json
{
  "status": "success",
  "data": {
    "altitude": 500,
    "prediction": "coffee",
    "confidence": 78.5,
    "top_crops": [
      {
        "crop": "coffee",
        "probability": 78.5
      },
      {
        "crop": "orange",
        "probability": 15.2
      },
      {
        "crop": "pomegranate",
        "probability": 6.3
      }
    ]
  },
  "sensor_data": {
    "N": 90.5,
    "P": 42.3,
    "K": 43.1,
    "temperature": 22.5,
    "humidity": 75.0,
    "pH": 6.2,
    "ec": 1.2,
    "timestamp": "2026-01-03T10:30:00.000Z"
  }
}
```

**Response (No Sensor Data):**
```json
{
  "status": "error",
  "message": "No valid sensor data available. All values are zero."
}
```

**Response (MQTT Disconnected):**
```json
{
  "status": "error",
  "message": "MQTT not connected. Cannot get sensor data."
}
```

**Example with cURL:**
```bash
curl -X GET "http://localhost:5010/api/predict/latest?altitude=500" \
  -H "Authorization: Bearer <token>"
```

**Example with PowerShell:**
```powershell
$token = "your_token_here"
$headers = @{Authorization="Bearer $token"}

Invoke-RestMethod -Uri 'http://localhost:5010/api/predict/latest?altitude=500' `
  -Method GET `
  -Headers $headers
```

---

## Error Responses

### 400 Bad Request
```json
{
  "status": "error",
  "message": "Missing required fields: N, P, K"
}
```

### 401 Unauthorized
```json
{
  "status": "error",
  "message": "No token provided"
}
```

### 404 Not Found
```json
{
  "status": "error",
  "message": "Endpoint not found"
}
```

### 500 Internal Server Error
```json
{
  "status": "error",
  "message": "Prediction failed. Please check if Python and required packages are installed."
}
```

---

## Supported Crops

The prediction system can identify the following crops based on soil conditions and altitude:

1. apple
2. banana
3. blackgram
4. chickpea
5. coconut
6. coffee
7. cotton
8. grapes
9. jute
10. kidneybeans
11. lentil
12. maize
13. mango
14. mothbeans
15. mungbean
16. muskmelon
17. orange
18. papaya
19. pigeonpeas
20. pomegranate
21. rice
22. watermelon

---

## Altitude Rules

The system filters crop recommendations based on altitude suitability:

| Crop | Min Altitude (m) | Max Altitude (m) |
|------|------------------|------------------|
| apple | 1000 | 2500 |
| banana | 0 | 1000 |
| coconut | 0 | 600 |
| coffee | 600 | 1800 |
| rice | 0 | 2000 |
| watermelon | 0 | 600 |
| ... | ... | ... |

---

## Notes

- All authenticated endpoints require a valid JWT token in the `Authorization` header
- Token format: `Bearer <token>`
- Token expires after 24 hours
- The prediction system uses a hybrid approach: ML model + rule-based altitude filtering
- Altitude filtering ensures only suitable crops for the given elevation are recommended
