import 'dart:async';
import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:geolocator/geolocator.dart';
import 'package:http/http.dart' as http;
import 'package:permission_handler/permission_handler.dart' as ph;
import 'package:shared_preferences/shared_preferences.dart';
import '../constants/app_constants.dart'; // AppColors dan URL
import '../models/prediction_models.dart';
import '../services/sensor_service.dart';
import '../services/location_service.dart';
import '../services/storage_service.dart';
import '../services/auth_service.dart';
import '../services/websocket_service.dart';
import 'login_page.dart';

class DashboardPage extends StatefulWidget {
  const DashboardPage({super.key});

  @override
  State<DashboardPage> createState() => _DashboardPageState();
}

class _DashboardPageState extends State<DashboardPage>
    with TickerProviderStateMixin {
  // Services
  final _sensorService = SensorService();
  final _predictionService = PredictionService();
  final _locationService = LocationService();
  final _storageService = StorageService();
  final _authService = AuthService();
  final _websocketService = WebSocketService();

  // Controller untuk sensor & lokasi
  late final List<TextEditingController> _controllers;

  // State
  SensorData? _sensorData;
  PredictionResult? _predictionResult;
  bool _isLoadingSensor = false;
  bool _isPredicting = false;
  bool _showResult = false;
  bool _isLoadingLocation = false;
  DateTime _lastUpdate = DateTime.now();
  String _mqttStatus = 'CONNECTED (Cached)';

  // Animation pulse untuk sensor card
  late final AnimationController _pulseCtrl;
  late final Animation<double> _pulseAnim;

  // Sensor yang ditampilkan (6 item seperti gambar)
  final List<Map<String, dynamic>> _sensors = [
    {
      'key': 'n',
      'label': 'Nitrogen',
      'icon': Icons.grass,
      'color': AppColors.primary,
      'unit': ' mg/kg'
    },
    {
      'key': 'p',
      'label': 'Phosphor',
      'icon': Icons.eco,
      'color': AppColors.accent,
      'unit': ' mg/kg'
    },
    {
      'key': 'k',
      'label': 'Kalium',
      'icon': Icons.spa,
      'color': AppColors.secondary,
      'unit': ' mg/kg'
    },
    {
      'key': 'temperature',
      'label': 'Suhu',
      'icon': Icons.thermostat,
      'color': AppColors.warning,
      'unit': '°C'
    },
    {
      'key': 'humidity',
      'label': 'Kelembaban',
      'icon': Icons.water_drop,
      'color': AppColors.accent,
      'unit': '%'
    },
    {
      'key': 'pH',
      'label': 'pH Tanah',
      'icon': Icons.science,
      'color': AppColors.primary,
      'unit': ''
    },
  ];

  @override
  void initState() {
    super.initState();
    _controllers =
        List.generate(_sensors.length + 3, (_) => TextEditingController());
    _controllers[_sensors.length + 2].text = 'Menunggu data lokasi...';

    _initAnimations();
    _init();
  }

  void _initAnimations() {
    _pulseCtrl = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1500),
    )..repeat(reverse: true);
    _pulseAnim = Tween<double>(begin: 0.98, end: 1.02).animate(
      CurvedAnimation(parent: _pulseCtrl, curve: Curves.easeInOut),
    );
  }

  Future<void> _init() async {
    _setupWebSocket();
    _fetchSensorData();
    _checkLocationPermission();
  }

  @override
  void dispose() {
    _pulseCtrl.dispose();
    _websocketService.disconnect();
    for (var c in _controllers) c.dispose();
    super.dispose();
  }

  // ── WebSocket & Fetch ───────────────────────────────────────────────────
  void _setupWebSocket() {
    _websocketService.connect(AppConstants.websocketUrl);
    _websocketService.addSensorDataListener(_onSensorDataReceived);
  }

  void _onSensorDataReceived(Map<String, dynamic> data) {
    if (!mounted) return;

    final sensorData = SensorData(
      n: (data['N'] ?? 0).toDouble(),
      p: (data['P'] ?? 0).toDouble(),
      k: (data['K'] ?? 0).toDouble(),
      temperature: (data['temperature'] ?? 0).toDouble(),
      humidity: (data['humidity'] ?? 0).toDouble(),
      pH: (data['pH'] ?? 0).toDouble(),
      ec: (data['ec'] ?? 0).toDouble(),
      latitude: (data['lat'] ?? 0).toDouble(),
      longitude: (data['lon'] ?? 0).toDouble(),
      altitude: (data['alt'] ?? 0).toDouble(),
      satellites: (data['sat'] ?? 0).toInt(),
      timestamp:
          (data['timestamp'] ?? DateTime.now().millisecondsSinceEpoch / 1000)
              .toDouble(),
      mqttStatus: data['status_mqtt'] ?? 'UNKNOWN',
    );

    setState(() {
      _sensorData = sensorData;
      _lastUpdate = DateTime.now();
      _isLoadingSensor = false;
      _mqttStatus = sensorData.mqttStatus;
      _updateControllers(sensorData);
    });
  }

  void _updateControllers(SensorData data) {
    for (int i = 0; i < _sensors.length; i++) {
      final key = _sensors[i]['key'] as String;
      double value = 0.0;
      switch (key) {
        case 'n':
          value = data.n;
          break;
        case 'p':
          value = data.p;
          break;
        case 'k':
          value = data.k;
          break;
        case 'temperature':
          value = data.temperature;
          break;
        case 'humidity':
          value = data.humidity;
          break;
        case 'pH':
          value = data.pH;
          break;
      }
      _controllers[i].text =
          key == 'pH' ? value.toStringAsFixed(2) : value.toStringAsFixed(1);
    }
    if (data.latitude != 0 && data.longitude != 0) {
      _controllers[_sensors.length].text = data.latitude.toStringAsFixed(6);
      _controllers[_sensors.length + 1].text =
          data.longitude.toStringAsFixed(6);
      _controllers[_sensors.length + 2].text = 'Lokasi dari sensor';
    }
  }

  Future<void> _fetchSensorData() async {
    setState(() => _isLoadingSensor = true);
    final data = await _sensorService.fetchLatestSensorData();
    if (mounted) {
      setState(() {
        _sensorData = data;
        _lastUpdate = DateTime.now();
        _isLoadingSensor = false;
        if (data != null) _updateControllers(data);
      });
    }
  }

  Future<void> _checkLocationPermission() async {
    final hasService = await Geolocator.isLocationServiceEnabled();
    if (!hasService) {
      _showSnackBar('Aktifkan layanan lokasi', AppColors.warning);
      return;
    }

    final status = await ph.Permission.location.request();
    if (status.isDenied || status.isPermanentlyDenied) {
      _showSnackBar('Izin lokasi diperlukan', AppColors.warning);
    }
  }

  // ── Ambil Lokasi ────────────────────────────────────────────────────────
  Future<void> _requestPermissionsAndLocation() async {
    setState(() => _isLoadingLocation = true);
    try {
      final service = await Geolocator.isLocationServiceEnabled();
      if (!service) {
        _showSnackBar('Aktifkan GPS terlebih dahulu', AppColors.warning);
        return;
      }
      final status = await ph.Permission.location.request();
      if (!status.isGranted) {
        _showSnackBar('Izin lokasi diperlukan', AppColors.warning);
        return;
      }
      final pos = await Geolocator.getCurrentPosition(
          desiredAccuracy: LocationAccuracy.high);
      setState(() {
        _controllers[_sensors.length].text = pos.latitude.toStringAsFixed(6);
        _controllers[_sensors.length + 1].text =
            pos.longitude.toStringAsFixed(6);
        _controllers[_sensors.length + 2].text = 'Lokasi saat ini';
      });
      _showSnackBar('Lokasi berhasil diambil!', AppColors.success);
    } catch (e) {
      _showSnackBar('Gagal ambil lokasi: $e', AppColors.error);
    } finally {
      setState(() => _isLoadingLocation = false);
    }
  }

  // ── Prediksi (sudah termasuk parameter "ec") ────────────────────────────
  Future<void> _predictCrop() async {
    if (_sensorData == null) {
      _showSnackBar('Menunggu data sensor...', AppColors.warning);
      return;
    }

    setState(() {
      _isPredicting = true;
      _showResult = false;
    });

    final inputData = {
      'N': _sensorData!.n,
      'P': _sensorData!.p,
      'K': _sensorData!.k,
      'temperature': _sensorData!.temperature,
      'humidity': _sensorData!.humidity,
      'pH': _sensorData!.pH,
      'altitude': _sensorData!.altitude,
      'rainfall': 200.0,
      'ec':
          _sensorData!.ec ?? 0.0, // ← Parameter "ec" sudah ditambahkan di sini
    };

    final result = await _predictionService.predict(inputData);

    if (mounted) {
      setState(() {
        _isPredicting = false;
        _predictionResult = result;
        _showResult = result != null;
      });

      if (result != null) {
        _showSnackBar('Prediksi berhasil: ${result.crop}', AppColors.success);
      } else {
        _showSnackBar('Gagal melakukan prediksi', AppColors.error);
      }
    }
  }

  void _showSnackBar(String message, Color color) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text(message), backgroundColor: color),
    );
  }

  // ── UI Widgets ──────────────────────────────────────────────────────────
  Widget _buildSensorCard(Map<String, dynamic> sensor, int index) {
    final value = _controllers[index].text;
    final hasData = double.tryParse(value) != null && value != '0.0';

    return AnimatedBuilder(
      animation: _pulseAnim,
      builder: (_, __) => Transform.scale(
        scale: _pulseAnim.value,
        child: Card(
          elevation: 3,
          shape:
              RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Container(
                  width: 48,
                  height: 48,
                  decoration: BoxDecoration(
                    color: (sensor['color'] as Color).withOpacity(0.1),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Icon(sensor['icon'], color: sensor['color'], size: 24),
                ),
                const SizedBox(height: 12),
                Text(
                  sensor['label'],
                  style:
                      const TextStyle(fontSize: 12, color: AppColors.textLight),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 8),
                Text(
                  hasData ? '$value${sensor['unit']}' : '—',
                  style: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                    color: sensor['color'],
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildLocationCard() {
    final lat = _controllers[_sensors.length].text;
    final lon = _controllers[_sensors.length + 1].text;
    final addr = _controllers[_sensors.length + 2].text;
    final hasLocation = lat.isNotEmpty && lon.isNotEmpty;

    return Card(
      elevation: 4,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      color: const Color(0xFF0A5C5F),
      child: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Container(
                  width: 44,
                  height: 44,
                  decoration: BoxDecoration(
                    color: Colors.white.withOpacity(0.2),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Icon(
                    hasLocation ? Icons.location_on : Icons.location_off,
                    color: Colors.white,
                    size: 22,
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text(
                        'Lokasi Lahan',
                        style: TextStyle(
                            color: Colors.white,
                            fontSize: 14,
                            fontWeight: FontWeight.w600),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        hasLocation
                            ? addr
                            : 'Data lokasi diperlukan untuk prediksi akurat.',
                        style: const TextStyle(
                            color: Colors.white70, fontSize: 12),
                      ),
                    ],
                  ),
                ),
              ],
            ),
            const SizedBox(height: 20),
            if (_isLoadingLocation)
              const Center(
                  child: CircularProgressIndicator(color: Colors.white))
            else if (!hasLocation)
              SizedBox(
                width: double.infinity,
                child: ElevatedButton.icon(
                  onPressed: _requestPermissionsAndLocation,
                  icon: const Icon(Icons.my_location, size: 16),
                  label: const Text('Ambil Lokasi Saat Ini'),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.white,
                    foregroundColor: const Color(0xFF0A5C5F),
                    elevation: 0,
                    shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(12)),
                    padding: const EdgeInsets.symmetric(vertical: 14),
                  ),
                ),
              )
            else
              Container(
                width: double.infinity,
                padding:
                    const EdgeInsets.symmetric(vertical: 12, horizontal: 16),
                decoration: BoxDecoration(
                  color: Colors.white.withOpacity(0.15),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Text(
                  'Lat: $lat • Lon: $lon',
                  style: const TextStyle(color: Colors.white, fontSize: 13),
                  textAlign: TextAlign.center,
                ),
              ),
            const SizedBox(height: 16),
            Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                Container(
                  width: 10,
                  height: 10,
                  decoration: const BoxDecoration(
                      color: AppColors.success, shape: BoxShape.circle),
                ),
                const SizedBox(width: 8),
                Text(
                  _mqttStatus,
                  style: const TextStyle(
                      color: Colors.white70,
                      fontSize: 12,
                      fontWeight: FontWeight.w500),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildPredictButton() {
    return SizedBox(
      width: double.infinity,
      height: 56,
      child: ElevatedButton.icon(
        onPressed: _isPredicting ? null : _predictCrop,
        icon: _isPredicting
            ? const SizedBox(
                width: 20,
                height: 20,
                child: CircularProgressIndicator(
                    color: Colors.white, strokeWidth: 2))
            : const Icon(Icons.auto_awesome),
        label: Text(
          _isPredicting ? 'Memproses...' : 'Prediksi Sekarang',
          style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
        ),
        style: ElevatedButton.styleFrom(
          backgroundColor: AppColors.primary,
          foregroundColor: Colors.white,
          shape:
              RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
          elevation: 6,
        ),
      ),
    );
  }

  Widget _buildRecommendationSection() {
    if (!_showResult || _predictionResult == null)
      return const SizedBox.shrink();

    return Card(
      elevation: 4,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      child: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Container(
                  width: 40,
                  height: 40,
                  decoration: BoxDecoration(
                    color: AppColors.primary.withOpacity(0.1),
                    borderRadius: BorderRadius.circular(10),
                  ),
                  child: const Icon(Icons.psychology,
                      color: AppColors.primary, size: 20),
                ),
                const SizedBox(width: 12),
                const Text(
                  'Rekomendasi Tanaman',
                  style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700),
                ),
              ],
            ),
            const SizedBox(height: 16),
            Row(
              children: [
                Container(
                  width: 32,
                  height: 32,
                  decoration: BoxDecoration(
                    color: AppColors.primary,
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: const Center(
                    child: Text('1',
                        style: TextStyle(
                            color: Colors.white, fontWeight: FontWeight.bold)),
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Text(
                    _predictionResult!.crop,
                    style: const TextStyle(
                        fontSize: 16, fontWeight: FontWeight.w600),
                  ),
                ),
                Container(
                  padding:
                      const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                  decoration: BoxDecoration(
                    color: AppColors.success.withOpacity(0.1),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Text(
                    '${_predictionResult!.confidence.toStringAsFixed(1)}%',
                    style: const TextStyle(
                        color: AppColors.success, fontWeight: FontWeight.bold),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.bgLight,
      appBar: AppBar(
        title: const Text('Smart Crop Prediction'),
        backgroundColor: AppColors.bgWhite,
        foregroundColor: AppColors.textDark,
        elevation: 0,
        actions: [
          IconButton(
            icon: const Icon(Icons.logout),
            onPressed: () async {
              await _authService.logout();
              if (mounted) {
                Navigator.pushReplacement(context,
                    MaterialPageRoute(builder: (_) => const LoginPage()));
              }
            },
          ),
        ],
      ),
      body: Stack(
        children: [
          SingleChildScrollView(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Grid Sensor
                GridView.builder(
                  shrinkWrap: true,
                  physics: const NeverScrollableScrollPhysics(),
                  gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                    crossAxisCount: 2,
                    crossAxisSpacing: 12,
                    mainAxisSpacing: 12,
                    childAspectRatio: 1.0,
                  ),
                  itemCount: _sensors.length,
                  itemBuilder: (context, index) =>
                      _buildSensorCard(_sensors[index], index),
                ),
                const SizedBox(height: 24),

                // Lokasi
                _buildLocationCard(),
                const SizedBox(height: 32),

                // Tombol Prediksi
                _buildPredictButton(),
                const SizedBox(height: 32),

                // Hasil Prediksi (Rekomendasi Tanaman)
                _buildRecommendationSection(),
                const SizedBox(height: 40),
              ],
            ),
          ),

          // Overlay loading
          if (_isLoadingSensor || _isPredicting)
            Container(
              color: Colors.black38,
              child: const Center(child: CircularProgressIndicator()),
            ),
        ],
      ),
    );
  }
}
