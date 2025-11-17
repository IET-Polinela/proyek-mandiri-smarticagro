import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ArrowRight, Play, Wifi, Database, Cpu } from "lucide-react";
import { motion } from "motion/react";

export function Hero() {
  return (
    <section id="beranda" className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background with Gradient Mesh */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50" />
        
        {/* Animated Gradient Orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-green-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-600/10 border border-green-600/20 rounded-full mb-6"
            >
              <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
              <span className="text-green-700 text-sm">Inovasi Pertanian Presisi</span>
            </motion.div>

            <h1 className="text-gray-900 mb-6 text-5xl lg:text-6xl">
              Sistem Tanam Cerdas Berbasis <span className="text-green-600">IoT & AI</span>
            </h1>

            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              Analisis kondisi tanah secara real-time dan dapatkan rekomendasi tanaman paling cocok berdasarkan data ilmiah, bukan intuisi.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button className="bg-green-600 text-white px-8 py-4 rounded-xl hover:bg-green-700 transition-all duration-300 flex items-center justify-center gap-2 group shadow-lg shadow-green-600/25">
                <Play className="w-5 h-5" />
                Lihat Demo Produk
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="bg-white text-gray-900 px-8 py-4 rounded-xl hover:bg-gray-50 transition-all duration-300 border border-gray-200 flex items-center justify-center gap-2">
                Hubungi Kami
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div>
                <div className="text-3xl text-green-600 mb-1">90%+</div>
                <div className="text-sm text-gray-600">Akurasi AI</div>
              </div>
              <div>
                <div className="text-3xl text-green-600 mb-1">7-in-1</div>
                <div className="text-sm text-gray-600">Sensor Tanah</div>
              </div>
              <div>
                <div className="text-3xl text-green-600 mb-1">Real-time</div>
                <div className="text-sm text-gray-600">Monitoring</div>
              </div>
            </div>
          </motion.div>

          {/* 3D Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative hidden lg:block"
          >
            {/* Main Card */}
            <div className="relative bg-white rounded-3xl p-8 shadow-2xl shadow-green-600/10 border border-gray-100">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Status Perangkat</div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-green-600">Terhubung</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
                  <Wifi className="w-6 h-6 text-green-600" />
                </div>
              </div>

              {/* Sensor Data */}
              <div className="space-y-3 mb-6">
                {[
                  { label: "Nitrogen (N)", value: "85", unit: "mg/kg", color: "green" },
                  { label: "Phosphor (P)", value: "45", unit: "mg/kg", color: "blue" },
                  { label: "Kalium (K)", value: "120", unit: "mg/kg", color: "purple" },
                  { label: "pH Tanah", value: "6.5", unit: "", color: "orange" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <span className="text-gray-700 text-sm">{item.label}</span>
                    <span className={`text-${item.color}-600`}>{item.value} {item.unit}</span>
                  </div>
                ))}
              </div>

              {/* AI Recommendation */}
              <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <Cpu className="w-4 h-4 text-green-600" />
                  <span className="text-xs text-gray-600">Rekomendasi AI</span>
                </div>
                <div className="text-green-700">Kondisi optimal untuk Padi</div>
              </div>
            </div>

            {/* Floating Icons */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-6 -right-6 w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-600/25"
            >
              <Database className="w-8 h-8 text-white" />
            </motion.div>

            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="absolute -bottom-6 -left-6 w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center shadow-xl shadow-green-600/25"
            >
              <Cpu className="w-8 h-8 text-white" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
