#include <WiFi.h>
#include <PubSubClient.h>
#include <TinyGPS++.h>
#include <axp20x.h>
#include <Wire.h>

// WiFi
const char* ssid = "pm";
const char* password = "0987654321";

// MQTT
const char* mqtt_server = "103.151.63.79";
const int mqtt_port = 1882;
WiFiClient espClient;
PubSubClient client(espClient);

TinyGPSPlus gps;
HardwareSerial GPS(1);
AXP20X_Class axp;

#define GPS_RX_PIN 34
#define GPS_TX_PIN 12

unsigned long lastPublish = 0;

// MQTT reconnect
void reconnect() {
  while (!client.connected()) {
    if (client.connect("TBEAM_GPS_Publisher")) {
      // Connected
    } else {
      delay(2000);
    }
  }
}

void setup() {
  Serial.begin(115200);
  Wire.begin(21, 22);

  // Power management AXP192
  if (!axp.begin(Wire, AXP192_SLAVE_ADDRESS)) {
    axp.setPowerOutPut(AXP192_LDO2, AXP202_ON);
    axp.setPowerOutPut(AXP192_LDO3, AXP202_ON);
    axp.setPowerOutPut(AXP192_DCDC2, AXP202_ON);
    axp.setPowerOutPut(AXP192_EXTEN, AXP202_ON);
    axp.setPowerOutPut(AXP192_DCDC1, AXP202_ON);
  }

  // Start GPS
  GPS.begin(9600, SERIAL_8N1, GPS_RX_PIN, GPS_TX_PIN);

  // WiFi Connect
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) delay(500);

  // MQTT
  client.setServer(mqtt_server, mqtt_port);
}

void loop() {
  // Read GPS
  while (GPS.available()) {
    gps.encode(GPS.read());
  }

  // Reconnect MQTT if needed
  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  // Publish setiap 1 detik
  if (millis() - lastPublish > 1000) {
    lastPublish = millis();

    if (gps.location.isValid()) {
      char payload[200];
      snprintf(payload, sizeof(payload),
               "{\"lat\": %.6f, \"lon\": %.6f, \"sat\": %d, \"alt\": %.2f}",
               gps.location.lat(),
               gps.location.lng(),
               gps.satellites.value(),
               gps.altitude.meters()
      );

      client.publish("sensor/gps", payload);
      Serial.println(payload);
    }
  }
}
