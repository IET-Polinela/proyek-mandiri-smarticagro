import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { Sprout, Cloud, Cpu, Smartphone, Activity } from "lucide-react";

export function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const steps = [
    {
      icon: Sprout,
      number: "01",
      title: "Tanam Alat di Tanah",
      description: "Pasang sensor IoT ke dalam tanah di lahan pertanian yang akan dianalisis. Sensor akan mulai membaca data lingkungan secara otomatis.",
      gradient: "from-green-500 to-emerald-600"
    },
    {
      icon: Cloud,
      number: "02",
      title: "Data Dikirim ke Cloud",
      description: "Data dari sensor dan GPS dikirim melalui ESP32 ke server cloud menggunakan protokol MQTT untuk pemrosesan lanjutan.",
      gradient: "from-blue-500 to-cyan-600"
    },
    {
      icon: Cpu,
      number: "03",
      title: "AI Menghitung Rekomendasi",
      description: "Model Random Forest menganalisis semua parameter (N, P, K, pH, suhu, kelembapan, lokasi) dan menghitung tanaman yang paling cocok.",
      gradient: "from-purple-500 to-indigo-600"
    },
    {
      icon: Smartphone,
      number: "04",
      title: "Hasil Tampil di Aplikasi",
      description: "Rekomendasi tanaman beserta persentase kecocokan ditampilkan di aplikasi Android dengan visualisasi yang mudah dipahami.",
      gradient: "from-orange-500 to-amber-600"
    }
  ];

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50/30 via-transparent to-blue-50/30" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-400/5 rounded-full blur-3xl" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl" />
      
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
            <span className="text-green-700 text-sm">Cara Kerja Sistem</span>
          </div>
          <h2 className="text-gray-900 mb-6 text-4xl lg:text-5xl max-w-3xl mx-auto">
            Proses <span className="text-green-600">Sederhana</span>, Hasil Maksimal
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Dari penanaman sensor hingga rekomendasi tanaman di smartphone, semua berjalan otomatis
          </p>
        </motion.div>

        {/* Desktop View - Horizontal Timeline */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-8 relative">
          {/* Connection Line */}
          <div className="absolute top-16 left-24 right-24 h-1 bg-gradient-to-r from-green-500 via-blue-500 via-purple-500 to-orange-500 opacity-20" />

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative"
              >
                {/* Number Badge */}
                <div className="flex items-center justify-center mb-8">
                  <div className={`w-16 h-16 bg-gradient-to-br ${step.gradient} rounded-2xl flex items-center justify-center shadow-xl relative z-10`}>
                    <span className="text-white text-xl">{step.number}</span>
                  </div>
                </div>

                {/* Card */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
                  <div className={`w-12 h-12 bg-gradient-to-br ${step.gradient} rounded-xl flex items-center justify-center mb-4 mx-auto`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-gray-900 text-center mb-3 text-lg">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-center text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile View - Vertical Timeline */}
        <div className="lg:hidden space-y-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative flex gap-6"
              >
                {/* Number and Line */}
                <div className="flex flex-col items-center">
                  <div className={`w-14 h-14 bg-gradient-to-br ${step.gradient} rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0`}>
                    <span className="text-white text-lg">{step.number}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-0.5 flex-1 bg-gradient-to-b from-green-500 to-orange-500 opacity-20 mt-4" />
                  )}
                </div>

                {/* Card */}
                <div className="bg-white rounded-2xl p-6 shadow-lg flex-1 border border-gray-100">
                  <div className={`w-12 h-12 bg-gradient-to-br ${step.gradient} rounded-xl flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-gray-900 mb-3 text-lg">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20 bg-gradient-to-br from-green-600 to-emerald-600 rounded-3xl p-12 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="relative">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Activity className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-white mb-4 text-2xl">
              Proses Cepat & Efisien
            </h3>
            <p className="text-green-50 max-w-2xl mx-auto text-lg">
              Seluruh proses dari penanaman sensor hingga mendapatkan rekomendasi hanya memerlukan waktu kurang dari 5 menit. Sistem bekerja secara real-time untuk memberikan hasil instan.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
