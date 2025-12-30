import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { 
  SensorIcon, 
  WiFiNodeIcon, 
  CloudDataIcon, 
  AIBrainIcon, 
  MobileAppIcon,
  AccuracyIcon,
  RealtimeIcon,
  SpatialIcon
} from "./CustomIcons";

export function AboutInnovation() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const steps = [
    {
      icon: SensorIcon,
      title: "Sensor 7-in-1",
      description: "Membaca N, P, K, pH, suhu, kelembapan, EC",
      color: "green"
    },
    {
      icon: WiFiNodeIcon,
      title: "ESP32 & GPS",
      description: "Mikrokontroler dengan GPS LilyGO T-Beam untuk mengukur ketinggian lahan",
      color: "blue"
    },
    {
      icon: CloudDataIcon,
      title: "Cloud MQTT",
      description: "Data dikirim ke cloud via MQTT",
      color: "purple"
    },
    {
      icon: AIBrainIcon,
      title: "AI Random Forest",
      description: "Analisis data dengan kecerdasan buatan",
      color: "orange"
    },
    {
      icon: MobileAppIcon,
      title: "Aplikasi Android",
      description: "Hasil rekomendasi di smartphone",
      color: "teal"
    }
  ];

  return (
    <section id="tentang" className="py-32 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-green-50/50 to-transparent" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-400/5 rounded-full blur-3xl" />
      
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
            <span className="text-green-700 text-sm">Tentang Inovasi</span>
          </div>
          <h2 className="text-gray-900 mb-6 text-4xl lg:text-5xl max-w-3xl mx-auto">
            Solusi <span className="text-green-600">IoT</span> untuk Pertanian Presisi
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Sistem Tanam Cerdas merupakan solusi berbasis Internet of Things yang memanfaatkan sensor 7-in-1 dan GPS LilyGO T-Beam untuk mengukur ketinggian lahan dan membaca unsur hara tanah.
          </p>
        </motion.div>

        {/* Architecture Flow */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-green-600 via-blue-600 via-purple-600 via-orange-600 to-teal-600 opacity-20" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const colorMap: Record<string, string> = {
                green: "from-green-500 to-emerald-500",
                blue: "from-blue-500 to-cyan-500",
                purple: "from-purple-500 to-indigo-500",
                orange: "from-orange-500 to-amber-500",
                teal: "from-teal-500 to-cyan-500"
              };
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative group"
                >
                  <div className="bg-white rounded-2xl p-6 shadow-lg shadow-gray-200/50 hover:shadow-xl hover:shadow-gray-300/50 transition-all duration-300 border border-gray-100 h-full">
                    <div className={`w-14 h-14 bg-gradient-to-br ${colorMap[step.color]} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-${step.color}-600/20 text-white`}>
                    <div className="w-7 h-7">
                      <Icon />
                    </div>
                    </div>
                    <h3 className="text-gray-900 mb-2 text-lg">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                  
                  {/* Arrow */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                      <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Key Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100">
            <div className="w-16 h-16 mx-auto mb-3 text-green-600">
              <AccuracyIcon />
            </div>
            <h3 className="text-gray-900 mb-2 text-lg">Akurasi Tinggi</h3>
            <p className="text-gray-600 text-sm">
              Rekomendasi berbasis data ilmiah dan algoritma Random Forest
            </p>
          </div>
          <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100">
            <div className="w-16 h-16 mx-auto mb-3 text-blue-600">
              <RealtimeIcon />
            </div>
            <h3 className="text-gray-900 mb-2 text-lg">Real-time</h3>
            <p className="text-gray-600 text-sm">
              Monitoring kondisi tanah secara langsung kapan saja
            </p>
          </div>
          <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-100">
            <div className="w-16 h-16 mx-auto mb-3 text-purple-600">
              <SpatialIcon />
            </div>
            <h3 className="text-gray-900 mb-2 text-lg">Analisis Spasial</h3>
            <p className="text-gray-600 text-sm">
              Memanfaatkan data GPS untuk rekomendasi berdasarkan lokasi
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
