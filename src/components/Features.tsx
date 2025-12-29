import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { Layers, MapPin, Brain, Activity, Smartphone, Map, Wifi } from "lucide-react";

export function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      icon: Layers,
      title: "Sensor Multi-Parameter",
      description: "Mengukur N, P, K, pH, suhu, kelembapan, dan konduktivitas listrik dalam satu perangkat",
      gradient: "from-green-500 to-emerald-600"
    },
    {
      icon: MapPin,
      title: "GPS Presisi Tinggi",
      description: "LilyGO T-Beam untuk mengukur altitude (ketinggian lahan) dengan presisi tinggi",
      gradient: "from-blue-500 to-cyan-600"
    },
    {
      icon: Brain,
      title: "AI Rekomendasi",
      description: "Model Random Forest untuk menganalisis dan merekomendasikan tanaman terbaik",
      gradient: "from-purple-500 to-indigo-600"
    },
    {
      icon: Activity,
      title: "Monitoring Real-time",
      description: "Pantau kondisi tanah secara langsung melalui cloud dengan protokol MQTT",
      gradient: "from-orange-500 to-amber-600"
    },
    {
      icon: Smartphone,
      title: "Antarmuka Android",
      description: "Aplikasi mobile yang mudah digunakan dengan visualisasi data interaktif",
      gradient: "from-teal-500 to-cyan-600"
    },
    {
      icon: Map,
      title: "Analisis Spasial",
      description: "Rekomendasi tanaman berdasarkan ketinggian dan koordinat geografis lahan",
      gradient: "from-indigo-500 to-purple-600"
    }
  ];

  return (
    <section id="fitur" className="py-32 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-600/10 border border-green-600/20 rounded-full mb-6">
            <div className="w-2 h-2 bg-green-600 rounded-full" />
            <span className="text-green-700 text-sm">Fitur Unggulan</span>
          </div>
          <h2 className="text-gray-900 mb-6 text-4xl lg:text-5xl max-w-3xl mx-auto">
            Teknologi <span className="text-green-600">Terdepan</span> untuk Pertanian
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Sistem lengkap dengan fitur-fitur canggih untuk mendukung keputusan pertanian berbasis data
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-white rounded-2xl p-8 hover:shadow-xl transition-all duration-300 h-full border border-gray-100 hover:border-green-200">
                  <div className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-gray-900 mb-3 text-lg">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Technical Specifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20 bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-12 text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />
          <div className="relative">
            <h3 className="text-white text-center mb-12 text-3xl">Spesifikasi Teknis</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Wifi className="w-8 h-8 text-green-400" />
                </div>
                <div className="text-sm text-gray-400 mb-2">Protokol</div>
                <div className="text-white text-lg">MQTT over WiFi</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Activity className="w-8 h-8 text-blue-400" />
                </div>
                <div className="text-sm text-gray-400 mb-2">Daya Tahan</div>
                <div className="text-white text-lg">8-12 jam operasi</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-purple-400" />
                </div>
                <div className="text-sm text-gray-400 mb-2">Akurasi GPS</div>
                <div className="text-white text-lg">±2.5 meter</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Layers className="w-8 h-8 text-orange-400" />
                </div>
                <div className="text-sm text-gray-400 mb-2">Mikrokontroler</div>
                <div className="text-white text-lg">ESP32 Dual Core</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
