/*
 * ==============================================================================
 * NAMA PROYEK    : PENDEKATAN BERBASIS DATA LAHAN DALAM MENGATASI KETIDAKTEPATAN PEMILIHAN KOMODITAS PERTANIAN
 * TANGGAL        : 15 Juli 2026
 * INSTANSI       : Politeknik Negeri Lampung
 * AUTHOR         : Hafish Arrusal Isfalana Dan Syahreza Riatma
 * DESKRIPSI      : Kode pembacaan sensor NPK 7 IN 1
 * BOARD          : ESP32 
 * VERSI          : 1.2
 * ==============================================================================
 */ 

#include <WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>
#include <ModbusMaster.h>

// ================= WIFI & MQTT =================
const char* ssid       = "kmipn26";
const char* password   = "kmipn12345678";
const char* mqttServer = "103.151.63.77";
const int   mqttPort   = 1882;

const char* topicGPS   = "sensor/gps";
const char* topicFinal = "sensor/final";
const char* topicRecommendation = "smartfarming/recommendation";

WiFiClient espClient;s
PubSubClient client(espClient);

// ================= RS485 7-IN-1 =================
ModbusMaster node;
#define RX_MODBUS 16
#define TX_MODBUS 17
#define DE_RE_PIN 4
uint8_t sensorAddr = 0x01;

// ================= LCD DWIN =================
#define RX_DWIN 32
#define TX_DWIN 33
HardwareSerial dwinSerial(1);

// ================= GLOBAL VARIABLES =================
float gpsLat = 0, gpsLon = 0, gpsAlt = 0;
int   gpsSat = 0;
float lastValidTemp = 25.0;

// tanaman & probabilitas
String crop1 = "Please wait", crop2 = "Please wait", crop3 = "Please wait";
int prob1 = 0, prob2 = 0, prob3 = 0;

// ================= SEND INT TO DWIN =================
void sendToDWIN(uint16_t vpAddr, int16_t value) {
  byte dataSend[8] = {
    0x5A, 0xA5, 0x05, 0x82,
    highByte(vpAddr), lowByte(vpAddr),
    highByte(value), lowByte(value)
  };
  dwinSerial.write(dataSend, 8);
}

// ================= SEND TEXT TO DWIN =================
void sendTextToDWIN(uint16_t vpAddr, String text, int maxLen) {
    if (maxLen % 2 != 0) maxLen++; 
    uint8_t frameLen = 3 + maxLen; 

    dwinSerial.write(0x5A);
    dwinSerial.write(0xA5);
    dwinSerial.write(frameLen); 
    dwinSerial.write(0x82);
    dwinSerial.write(highByte(vpAddr));
    dwinSerial.write(lowByte(vpAddr));

    for (int i = 0; i < maxLen; i++) {
        if (i < text.length()) {
            dwinSerial.write(text[i]); 
        } else {
            dwinSerial.write(0x00); // ISI DENGAN NULL, BUKAN SPASI
        }
    }
}

// ================= MODBUS =================
void preTransmission() { digitalWrite(DE_RE_PIN, HIGH); }
void postTransmission() { digitalWrite(DE_RE_PIN, LOW); }

float autoCalibrateTemp(uint16_t raw) {
  float temp = (raw < 1000) ? raw / 10.0 : raw / 100.0;
  if (temp < -5 || temp > 60) return NAN;
  lastValidTemp = temp;
  return temp;
}

// ================= MQTT CALLBACK (REVISI STABIL) =================
void callback(char* topic, byte* payload, unsigned int length) {
  // Gunakan DynamicJsonDocument jika memori ESP32 cukup, 
  // atau tetap StaticJsonDocument tapi pastikan ukurannya pas.
  StaticJsonDocument<1024> doc;
  
  // Parsing langsung dari payload MQTT
  DeserializationError error = deserializeJson(doc, payload, length);

  if (error) {
    Serial.print("Parsing gagal: ");
    Serial.println(error.c_str());
    return;
  }

  // ===== GPS =====
  if (strcmp(topic, topicGPS) == 0) {
    gpsLat = doc["lat"] | 0.0;
    gpsLon = doc["lon"] | 0.0;
    gpsAlt = doc["alt"] | 0.0;
    gpsSat = doc["sat"] | 0;
    sendToDWIN(0x0800, (int)(gpsAlt * 10));
  }

  // ===== SMART FARMING RECOMMENDATION =====
  if (strcmp(topic, topicRecommendation) == 0) {
    JsonArray recs = doc["recommendations"];

    // Ambil data tanaman (Parsing Nama)
    String c1 = recs[0]["crop"].as<String>();
    String c2 = recs[1]["crop"].as<String>();
    String c3 = recs[2]["crop"].as<String>();

    // Ambil data probabilitas (Parsing Angka)
    float p1 = recs[0]["probability"] | 0.0;
    float p2 = recs[1]["probability"] | 0.0;
    float p3 = recs[2]["probability"] | 0.0;

    // --- KIRIM KE DWIN ---
    // Nama Tanaman (VP 0x0900, 0x1000, 0x1100)
    sendTextToDWIN(0x0900, c1, 20); 
    sendTextToDWIN(0x1000, c2 , 20);
    sendTextToDWIN(0x1100, c3 , 20);

    // Angka Probabilitas (VP 0x0920, 0x1020, 0x1120)
    // Ingat: Di DGUS Tool, Post-point Digit harus disetel 1
    sendToDWIN(0x0920, (int)(p1 * 10)); 
    sendToDWIN(0x1020, (int)(p2 * 10));
    sendToDWIN(0x1120, (int)(p3 * 10));

    Serial.println("Rekomendasi Berhasil Ditampilkan di Layar");
  } 
}

// ================= MQTT RECONNECT =================
void reconnect() {
  while (!client.connected()) {
    if (client.connect("ESP32_Final_Device")) {
      client.subscribe(topicGPS);
      client.subscribe(topicRecommendation);
    } else {
      delay(2000);
    }
  }
}

// ================= SETUP =================
void setup() {
  Serial.begin(115200);

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) delay(500);

  client.setServer(mqttServer, mqttPort);
  client.setCallback(callback);

  Serial2.begin(4800, SERIAL_8N1, RX_MODBUS, TX_MODBUS);
  pinMode(DE_RE_PIN, OUTPUT);
  digitalWrite(DE_RE_PIN, LOW);

  node.begin(sensorAddr, Serial2);
  node.preTransmission(preTransmission);
  node.postTransmission(postTransmission);

  dwinSerial.begin(115200, SERIAL_8N1, RX_DWIN, TX_DWIN);

  // Paksa hapus semua teks lama dengan mengirim spasi kosong
  sendTextToDWIN(0x0900, "                    ", 20);
  sendTextToDWIN(0x1000, "                    ", 20);
  sendTextToDWIN(0x1100, "                    ", 20);
  
  // Tes satu kata manual
  sendTextToDWIN(0x0900, "READY", 20);
  sendTextToDWIN(0x1000, "READY", 20);
  sendTextToDWIN(0x1100, "READY", 20);

  byte testText[] = {0x5A, 0xA5, 0x07, 0x82, 0x09, 0x00, 0x54, 0x45, 0x53, 0x54};
  dwinSerial.write(testText, sizeof(testText));

}

// ================= LOOP =================
void loop() {
  if (!client.connected()) reconnect();
  client.loop();

  uint8_t result = node.readInputRegisters(0x0000, 14);

  float temperature = lastValidTemp;
  float humidity = 0, ph = 0;
  int ec = 0, n = 0, p = 0, k = 0;

  if (result == node.ku8MBSuccess) {
    float t = autoCalibrateTemp(node.getResponseBuffer(0));
    if (!isnan(t)) temperature = t;

    humidity = node.getResponseBuffer(1) / 10.0;
    ec = node.getResponseBuffer(2);
    ph = node.getResponseBuffer(3) / 10.0;
    n  = node.getResponseBuffer(4);
    p  = node.getResponseBuffer(5);
    k  = node.getResponseBuffer(6);
  }

  // Pengiriman data sensor ke DWIN
  sendToDWIN(0x0000, (int)(temperature * 10));
  sendToDWIN(0x0100, (int)(humidity * 10));
  sendToDWIN(0x0300, ec);
  sendToDWIN(0x0200, (int)(ph * 10));
  sendToDWIN(0x0400, n);
  sendToDWIN(0x0500, p);
  sendToDWIN(0x0600, k);

  // Publish ke MQTT
  StaticJsonDocument<500> finalDoc;
  finalDoc["gps"]["lat"] = gpsLat;
  finalDoc["gps"]["lon"] = gpsLon;
  finalDoc["gps"]["alt"] = gpsAlt;
  finalDoc["gps"]["sat"] = gpsSat;
  finalDoc["soil"]["temperature"] = temperature;
  finalDoc["soil"]["humidity"] = humidity;
  finalDoc["soil"]["ec"] = ec;
  finalDoc["soil"]["ph"] = ph;
  finalDoc["soil"]["n"] = n;
  finalDoc["soil"]["p"] = p;
  finalDoc["soil"]["k"] = k;

  char buffer[500];
  serializeJson(finalDoc, buffer);
  client.publish(topicFinal, buffer);

  delay(4000);
}