import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { TrendingUp, Target, DollarSign, Leaf, CheckCircle2 } from "lucide-react";

export function Impact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const impacts = [
    {
      icon: TrendingUp,
      title: "Efisiensi Sumber Daya",
      description: "Penggunaan air dan pupuk meningkat hingga 40% lebih efisien",
      stat: "+40%",
      gradient: "from-green-500 to-emerald-600"
    },
    {
      icon: Target,
      title: "Akurasi Rekomendasi",
      description: "Model AI menghasilkan akurasi prediksi di atas 90%",
      stat: ">90%",
      gradient: "from-blue-500 to-cyan-600"
    },
    {
      icon: DollarSign,
      title: "Penghematan Biaya",
      description: "Eliminasi biaya analisis tanah laboratorium yang mahal",
      stat: "60%",
      gradient: "from-purple-500 to-indigo-600"
    },
    {
      icon: Leaf,
      title: "Pertanian Berkelanjutan",
      description: "Mendukung konsep precision agriculture untuk masa depan",
      stat: "100%",
      gradient: "from-teal-500 to-cyan-600"
    }
  ];

  const stats = [
    { value: "150+", label: "Hektar Lahan Termonitor", icon: "🌾" },
    { value: "50+", label: "Petani Teredukasi", icon: "👨‍🌾" },
    { value: "1000+", label: "Data Point Terkumpul", icon: "📊" },
    { value: "92%", label: "Kepuasan Pengguna", icon: "🎯" }
  ];

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-green-50/30 to-transparent" />
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
            <span className="text-green-700 text-sm">Dampak Proyek</span>
          </div>
          <h2 className="text-gray-900 mb-6 text-4xl lg:text-5xl max-w-3xl mx-auto">
            Manfaat <span className="text-green-600">Nyata</span> untuk Pertanian Indonesia
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Sistem Tanam Cerdas memberikan dampak positif yang terukur bagi petani dan lingkungan
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {impacts.map((impact, index) => {
            const Icon = impact.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:border-green-200 hover:shadow-xl transition-all duration-300 h-full">
                  <div className={`w-14 h-14 bg-gradient-to-br ${impact.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div className={`text-4xl bg-gradient-to-br ${impact.gradient} bg-clip-text text-transparent mb-4`}>
                    {impact.stat}
                  </div>
                  <h3 className="text-gray-900 mb-3 text-lg">
                    {impact.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {impact.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Case Study */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-12 border border-green-100"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-full mb-6">
                <CheckCircle2 className="w-4 h-4" />
                <span className="text-sm">Studi Kasus</span>
              </div>
              <h3 className="text-gray-900 mb-6 text-3xl">
                Implementasi di Lahan Pertanian Lampung
              </h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Sistem Tanam Cerdas telah diuji coba di beberapa lahan pertanian di Provinsi Lampung dengan hasil yang menjanjikan. Petani dapat mengambil keputusan yang lebih tepat dalam pemilihan tanaman berdasarkan kondisi tanah aktual.
              </p>
              <div className="space-y-4">
                {[
                  {
                    title: "Peningkatan Hasil Panen",
                    desc: "Produktivitas meningkat 25-35% dengan pemilihan tanaman yang tepat"
                  },
                  {
                    title: "Pengurangan Gagal Panen",
                    desc: "Risiko gagal panen menurun drastis berkat rekomendasi berbasis data"
                  },
                  {
                    title: "Efisiensi Waktu",
                    desc: "Petani menghemat waktu dan tenaga dalam analisis kondisi lahan"
                  }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-green-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-green-600/25">
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-gray-900 mb-1">{item.title}</div>
                      <div className="text-sm text-gray-600">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  className="bg-white rounded-2xl p-6 text-center shadow-lg border border-green-100 hover:shadow-xl transition-all"
                >
                  <div className="text-4xl mb-3">{stat.icon}</div>
                  <div className="text-3xl text-green-600 mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Environmental Impact */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-green-100 text-green-700 rounded-full border border-green-200">
            <Leaf className="w-5 h-5" />
            <span>Berkontribusi pada Sustainable Development Goals (SDGs)</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
