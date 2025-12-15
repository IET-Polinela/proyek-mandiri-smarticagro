#include <WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>
#include <ModbusMaster.h>

// ================= WIFI & MQTT =================
const char* ssid       = "pm";
const char* password   = "0987654321";
const char* mqttServer = "103.151.63.79";
const int   mqttPort   = 1882;

const char* topicGPS   = "sensor/gps";
const char* topicFinal = "sensor/final";

WiFiClient espClient;
PubSubClient client(espClient);

// ================= RS485 7-IN-1 =================
ModbusMaster node;

#define RX_PIN     16
#define TX_PIN     17
#define DE_RE_PIN  4
uint8_t sensorAddr = 0x01;

// ================= GPS DATA =====================
float gpsLat = 0;
float gpsLon = 0;
float gpsAlt = 0;
int   gpsSat = 0;

// ================= TEMP FILTER ==================
float lastValidTemp = 25.0;

// ================= RS485 CALLBACK ==============
void preTransmission() {
  digitalWrite(DE_RE_PIN, HIGH);
}
void postTransmission() {
  digitalWrite(DE_RE_PIN, LOW);
}

// ================= AUTO CALIB TEMP ==============
float autoCalibrateTemp(uint16_t raw) {
  float temp;

  if (raw < 1000) temp = raw / 10.0;
  else            temp = raw / 100.0;

  if (temp < -5 || temp > 45) return NAN;

  lastValidTemp = temp;
  return temp;
}

// ================= MQTT CALLBACK ================
void callback(char* topic, byte* payload, unsigned int length) {
  String msg;
  for (unsigned int i = 0; i < length; i++) msg += (char)payload[i];

  StaticJsonDocument<200> doc;
  if (deserializeJson(doc, msg)) return;

  gpsLat = doc["lat"] | 0.0;
  gpsLon = doc["lon"] | 0.0;
  gpsAlt = doc["alt"] | 0.0;
  gpsSat = doc["sat"] | 0;
}

// ================= MQTT RECONNECT ===============
void reconnect() {
  while (!client.connected()) {
    if (client.connect("ESP32D_FINAL")) {
      client.subscribe(topicGPS);
    } else {
      delay(1000);
    }
  }
}

// ================= SETUP ========================
void setup() {
  Serial.begin(115200);

  // WiFi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(300);
    Serial.print(".");
  }
  Serial.println("\nWiFi Connected");

  // MQTT
  client.setServer(mqttServer, mqttPort);
  client.setCallback(callback);

  // RS485
  Serial2.begin(4800, SERIAL_8N1, RX_PIN, TX_PIN);
  pinMode(DE_RE_PIN, OUTPUT);
  digitalWrite(DE_RE_PIN, LOW);

  node.begin(sensorAddr, Serial2);
  node.preTransmission(preTransmission);
  node.postTransmission(postTransmission);

  Serial.println("ESP32D FINAL READY");
}

// ================= LOOP =========================
void loop() {
  if (!client.connected()) reconnect();
  client.loop();

  uint8_t result = node.readInputRegisters(0x0000, 14);

  float temperature = lastValidTemp;
  float humidity = 0;
  float ec = 0;
  float ph = 0;
  int n = 0, p = 0, k = 0;

  if (result == node.ku8MBSuccess) {
    uint16_t rawTemp = node.getResponseBuffer(0);
    float t = autoCalibrateTemp(rawTemp);
    if (!isnan(t)) temperature = t;

    humidity = node.getResponseBuffer(1) / 10.0;
    ec       = node.getResponseBuffer(2);
    ph       = node.getResponseBuffer(3) / 10.0;
    n        = node.getResponseBuffer(4);
    p        = node.getResponseBuffer(5);
    k        = node.getResponseBuffer(6);
  }

  // ================= BUILD JSON =================
  StaticJsonDocument<300> doc;

  doc["gps"]["lat"] = gpsLat;
  doc["gps"]["lon"] = gpsLon;
  doc["gps"]["alt"] = gpsAlt;
  doc["gps"]["sat"] = gpsSat;

  doc["soil"]["temperature"] = temperature;
  doc["soil"]["humidity"]    = humidity;
  doc["soil"]["ec"]          = ec;
  doc["soil"]["ph"]          = ph;
  doc["soil"]["n"]           = n;
  doc["soil"]["p"]           = p;
  doc["soil"]["k"]           = k;

  char payload[400];
  serializeJson(doc, payload);

  client.publish(topicFinal, payload);

  // ================= SERIAL LOG =================
  Serial.println("===== DATA FINAL =====");
  Serial.println(payload);
  Serial.println("======================\n");

  delay(2000);
}