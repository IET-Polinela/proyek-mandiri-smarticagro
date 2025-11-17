import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { Brain, Cpu, Database, Zap, Wifi, Activity } from "lucide-react";

export function AIIntegration() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const integrationSteps = [
    {
      icon: Cpu,
      title: "Sensor IoT",
      description: "Membaca data lingkungan secara real-time dari lapangan",
      gradient: "from-green-500 to-emerald-600"
    },
    {
      icon: Database,
      title: "Cloud Processing",
      description: "Data dikumpulkan dan diproses di cloud melalui MQTT",
      gradient: "from-blue-500 to-cyan-600"
    },
    {
      icon: Brain,
      title: "AI Analysis",
      description: "Random Forest menghasilkan rekomendasi tanaman optimal",
      gradient: "from-purple-500 to-indigo-600"
    }
  ];

  const parameters = [
    { name: "Nitrogen (N)", percentage: 85, color: "green" },
    { name: "Phosphor (P)", percentage: 65, color: "blue" },
    { name: "Kalium (K)", percentage: 90, color: "purple" },
    { name: "pH Tanah", percentage: 70, color: "orange" },
    { name: "Suhu & Kelembapan", percentage: 75, color: "red" },
    { name: "Lokasi GPS", percentage: 95, color: "teal" }
  ];

  return (
    <section className="py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-400/10 border border-green-400/20 rounded-full mb-6">
            <div className="w-2 h-2 bg-green-400 rounded-full" />
            <span className="text-green-400 text-sm">Integrasi AI & IoT</span>
          </div>
          <h2 className="text-white mb-6 text-4xl lg:text-5xl max-w-3xl mx-auto">
            <span className="text-green-400">Kecerdasan Buatan</span> dan Sensor IoT Bekerja Bersama
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Menggabungkan data lingkungan dan lokasi geografis untuk menghasilkan rekomendasi berbasis data presisi
          </p>
        </motion.div>

        {/* Integration Diagram */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {integrationSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="group"
              >
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/10 transition-all border border-white/10 hover:border-white/20">
                  <div className={`w-16 h-16 bg-gradient-to-br ${step.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-xl`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-white mb-3 text-lg">{step.title}</h3>
                  <p className="text-gray-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Technical Details */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-10 border border-white/10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white text-2xl">Algoritma Random Forest</h3>
            </div>
            <p className="text-gray-300 mb-8 leading-relaxed">
              Model machine learning Random Forest digunakan untuk menganalisis hubungan kompleks antara berbagai parameter tanah, kondisi lingkungan, dan lokasi geografis untuk memberikan prediksi tanaman yang paling cocok.
            </p>
            <ul className="space-y-4">
              {[
                "Akurasi prediksi di atas 90%",
                "Menganalisis 7+ parameter sekaligus",
                "Hasil rekomendasi dalam hitungan detik",
                "Model terus diperbarui dengan data baru"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                  </div>
                  <span className="text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-10 border border-white/10">
            <h3 className="text-white mb-8 text-xl">Parameter yang Dianalisis</h3>
            <div className="space-y-5">
              {parameters.map((param, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-300 text-sm">{param.name}</span>
                    <span className="text-gray-400 text-sm">{param.percentage}%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${param.percentage}%` } : { width: 0 }}
                      transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                      className={`bg-gradient-to-r from-${param.color}-500 to-${param.color}-400 h-2 rounded-full`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { icon: Wifi, label: "MQTT Protocol" },
            { icon: Database, label: "Cloud Storage" },
            { icon: Brain, label: "ML Model" },
            { icon: Activity, label: "Real-time Data" }
          ].map((tech, i) => {
            const Icon = tech.icon;
            return (
              <div key={i} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 text-center border border-white/10 hover:bg-white/10 transition-all">
                <Icon className="w-8 h-8 text-green-400 mx-auto mb-3" />
                <div className="text-gray-300 text-sm">{tech.label}</div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
