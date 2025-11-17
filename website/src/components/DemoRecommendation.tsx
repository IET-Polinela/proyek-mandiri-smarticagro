import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { Wifi, CheckCircle2, MapPin, Thermometer } from "lucide-react";

export function DemoRecommendation() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const sensorData = [
    { label: "Nitrogen (N)", value: "85 mg/kg", icon: "N", color: "green" },
    { label: "Phosphor (P)", value: "45 mg/kg", icon: "P", color: "blue" },
    { label: "Kalium (K)", value: "120 mg/kg", icon: "K", color: "purple" },
    { label: "pH Tanah", value: "6.5", icon: "pH", color: "orange" },
    { label: "Suhu", value: "28°C", icon: "°C", color: "red" },
    { label: "Kelembapan", value: "65%", icon: "%", color: "teal" }
  ];

  const recommendations = [
    { crop: "Padi", percentage: 95, color: "bg-green-500" },
    { crop: "Jagung", percentage: 87, color: "bg-yellow-500" },
    { crop: "Kedelai", percentage: 82, color: "bg-orange-500" }
  ];

  const benefits = [
    {
      icon: CheckCircle2,
      title: "Data Lengkap & Akurat",
      description: "Aplikasi menampilkan semua parameter penting seperti N, P, K, pH, suhu, dan kelembapan dalam satu layar yang mudah dibaca.",
      gradient: "from-green-500 to-emerald-600"
    },
    {
      icon: Brain,
      title: "Rekomendasi Berbasis AI",
      description: "Model Random Forest menganalisis semua parameter dan memberikan rekomendasi tanaman dengan persentase kecocokan yang jelas.",
      gradient: "from-blue-500 to-cyan-600"
    },
    {
      icon: MapPin,
      title: "Informasi Lokasi Presisi",
      description: "GPS terintegrasi menampilkan koordinat lahan dan ketinggian untuk analisis spasial yang lebih akurat.",
      gradient: "from-purple-500 to-indigo-600"
    }
  ];

  return (
    <section className="py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl" />
      
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
            <span className="text-green-700 text-sm">Demo Aplikasi</span>
          </div>
          <h2 className="text-gray-900 mb-6 text-4xl lg:text-5xl max-w-3xl mx-auto">
            Tampilan Rekomendasi di <span className="text-green-600">Smartphone</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Antarmuka aplikasi Android yang intuitif menampilkan data sensor dan rekomendasi tanaman secara real-time
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Smartphone Mockup */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative mx-auto max-w-sm">
              {/* Phone Frame */}
              <div className="relative bg-gray-900 rounded-[3rem] p-4 shadow-2xl">
                <div className="bg-white rounded-[2.5rem] overflow-hidden">
                  {/* Status Bar */}
                  <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4 text-white flex items-center justify-between">
                    <span className="text-sm">9:41</span>
                    <div className="flex items-center gap-2">
                      <Wifi className="w-4 h-4" />
                      <div className="text-sm">100%</div>
                    </div>
                  </div>

                  {/* App Content */}
                  <div className="p-6 space-y-4 bg-gradient-to-b from-white to-gray-50 min-h-[640px]">
                    {/* Header */}
                    <div className="mb-6">
                      <h3 className="text-gray-900 text-xl mb-1">Sistem Tanam Cerdas</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span>Data Real-time</span>
                      </div>
                    </div>

                    {/* Sensor Data Grid */}
                    <div className="grid grid-cols-2 gap-3">
                      {sensorData.map((data, index) => (
                        <div key={index} className="bg-white rounded-xl p-3 border border-gray-200 shadow-sm">
                          <div className="flex items-center justify-between mb-2">
                            <div className="text-xs text-gray-500">{data.label}</div>
                            <div className={`w-6 h-6 bg-${data.color}-100 rounded-lg flex items-center justify-center text-xs text-${data.color}-600`}>
                              {data.icon}
                            </div>
                          </div>
                          <div className={`text-${data.color}-600 text-sm`}>{data.value}</div>
                        </div>
                      ))}
                    </div>

                    {/* Location Info */}
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-200">
                      <div className="flex items-center gap-2 text-blue-700">
                        <MapPin className="w-4 h-4" />
                        <div>
                          <div className="text-xs">Lokasi Lahan</div>
                          <div className="text-sm">-5.3619, 105.2416</div>
                        </div>
                      </div>
                    </div>

                    {/* Recommendations */}
                    <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-200">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                          <Brain className="w-4 h-4 text-green-600" />
                        </div>
                        <h4 className="text-gray-900">Rekomendasi Tanaman</h4>
                      </div>
                      <div className="space-y-3">
                        {recommendations.map((rec, index) => (
                          <div key={index}>
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="text-gray-700 text-sm">{rec.crop}</span>
                              <span className="text-gray-900 text-sm">{rec.percentage}%</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-2">
                              <div
                                className={`${rec.color} h-2 rounded-full transition-all duration-1000`}
                                style={{ width: `${rec.percentage}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Icons */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-xl"
              >
                <CheckCircle2 className="w-8 h-8 text-white" />
              </motion.div>

              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-xl"
              >
                <Thermometer className="w-8 h-8 text-white" />
              </motion.div>
            </div>
          </motion.div>

          {/* Features List */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-all">
                  <div className={`w-12 h-12 bg-gradient-to-br ${benefit.gradient} rounded-xl flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-gray-900 mb-3 text-lg">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

import { Brain } from "lucide-react";
