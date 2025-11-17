import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { ArrowRight, Download, Mail, CheckCircle2 } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function CallToAction() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      icon: CheckCircle2,
      title: "Setup Mudah",
      description: "Instalasi perangkat IoT yang sederhana dan cepat"
    },
    {
      icon: CheckCircle2,
      title: "Dukungan Penuh",
      description: "Tim teknis siap membantu implementasi sistem"
    },
    {
      icon: CheckCircle2,
      title: "ROI Terbukti",
      description: "Peningkatan produktivitas hingga 35% dalam 6 bulan"
    }
  ];

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1610534141324-8870999bbacf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhZ3JpY3VsdHVyZSUyMGZpZWxkJTIwYWVyaWFsfGVufDF8fHx8MTc2MjQxNjU1OHww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Modern Agriculture"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/95 via-emerald-900/90 to-teal-900/95" />
        
        {/* Overlay Pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-8">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-green-200 text-sm">Bergabunglah dengan Revolusi Pertanian</span>
          </div>

          {/* Heading */}
          <h2 className="text-white mb-6 text-4xl lg:text-6xl max-w-4xl mx-auto">
            Mulai Pertanian Cerdas <span className="text-green-400">Hari Ini</span>
          </h2>

          <p className="text-green-100 text-xl max-w-3xl mx-auto mb-12 leading-relaxed">
            Gabung dengan revolusi pertanian berbasis data dan AI. Tingkatkan produktivitas lahan Anda dengan teknologi presisi.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-green-700 px-10 py-5 rounded-xl hover:bg-green-50 transition-all duration-300 flex items-center gap-3 shadow-2xl"
            >
              <Download className="w-5 h-5" />
              Pelajari Lebih Lanjut
              <ArrowRight className="w-5 h-5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-transparent border-2 border-white/50 text-white px-10 py-5 rounded-xl hover:bg-white/10 hover:border-white transition-all duration-300 flex items-center gap-3 backdrop-blur-sm"
            >
              <Mail className="w-5 h-5" />
              Dapatkan Demo Sistem
            </motion.button>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-20">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all"
                >
                  <Icon className="w-12 h-12 text-green-400 mx-auto mb-4" />
                  <h3 className="text-white mb-2 text-lg">{feature.title}</h3>
                  <p className="text-green-100 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Testimonial Quote */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-10 border border-white/20">
              <div className="text-6xl text-green-400/30 mb-6">"</div>
              <p className="text-white text-xl italic mb-8 leading-relaxed">
                Sistem Tanam Cerdas membantu kami membuat keputusan yang lebih baik dalam memilih tanaman. Hasil panen meningkat signifikan dan biaya operasional lebih efisien.
              </p>
              <div className="flex items-center justify-center gap-4">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <span className="text-3xl">👨‍🌾</span>
                </div>
                <div className="text-left">
                  <div className="text-white text-lg">Bapak Hadi Santoso</div>
                  <div className="text-green-200 text-sm">Petani di Lampung Tengah</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-16"
          >
            <p className="text-green-200 mb-3">Punya pertanyaan? Hubungi kami:</p>
            <a href="mailto:info@sistemtanamcerdas.id" className="text-white hover:text-green-300 transition-colors text-lg">
              info@sistemtanamcerdas.id
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
