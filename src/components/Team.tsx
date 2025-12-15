import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { Linkedin, Mail, User } from "lucide-react";

export function Team() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const teamMembers = [
    {
      name: "Amanda Bulan Nayla",
      role: "Project Leader",
      npm: "23758003",
      gradient: "from-pink-500 to-rose-600",
      image: "/src/assets/images/Amandabulan.jpeg"
    },
    {
      name: "Gilang Rizki Ramadhan",
      role: "Mobile Developer",
      npm: "23758012",
      gradient: "from-blue-500 to-cyan-600",
      image: "/src/assets/images/GilangRamadhani.jpeg"
    },
    {
      name: "Syahreza Riatma",
      role: "IoT Engineer",
      npm: "23758028",
      gradient: "from-purple-500 to-indigo-600",
      image: "/src/assets/images/SyahrezaRiatma.jpeg"
    },
    {
      name: "Hafish Arrusal Isfalana",
      role: "IoT Engineer",
      npm: "23758042",
      gradient: "from-green-500 to-emerald-600",
      image: "/src/assets/images/HafishArrusal.jpeg"
    },
    {
      name: "Rahmat Hadinata",
      role: "System Integration Specialist",
      npm: "23758051",
      gradient: "from-orange-500 to-amber-600",
      image: "/src/assets/images/Rahmathadinata.jpeg"
    },
    {
      name: "Satria Divo Praditya",
      role: "Backend Developer",
      npm: "23758058",
      gradient: "from-teal-500 to-cyan-600"
    }
  ];

  return (
    <section id="tim" className="py-32 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Background Elements */}
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
            <span className="text-green-700 text-sm">Tim Pengembang</span>
          </div>
          <h2 className="text-gray-900 mb-6 text-4xl lg:text-5xl max-w-3xl mx-auto">
            Mahasiswa & <span className="text-green-600">Dosen Pembimbing</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Tim yang berdedikasi untuk mengembangkan solusi pertanian presisi berbasis IoT dan AI
          </p>
        </motion.div>

        {/* Team Members */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
                {/* Avatar Background */}
                <div className={`h-32 bg-gradient-to-br ${member.gradient} relative`}>
                  <div className="absolute inset-0 bg-black/5" />
                </div>

                {/* Avatar Circle */}
                <div className="relative -mt-12 mb-4">
                  <div className={`w-24 h-24 bg-white rounded-2xl mx-auto border-4 border-white shadow-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-20 h-20 object-cover rounded-xl"
                      />
                    ) : (
                      <div className={`w-20 h-20 bg-gradient-to-br ${member.gradient} rounded-xl flex items-center justify-center`}>
                        <User className="w-10 h-10 text-white" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="px-6 pb-6 text-center">
                  <h3 className="text-gray-900 mb-2 text-lg">
                    {member.name}
                  </h3>
                  <p className="text-green-600 mb-3">
                    {member.role}
                  </p>
                  <div className="inline-block px-4 py-2 bg-gray-100 rounded-xl text-sm text-gray-600 mb-4">
                    NPM: {member.npm}
                  </div>

                  <div className="flex items-center justify-center gap-3">
                    <button className="w-10 h-10 bg-gray-100 hover:bg-blue-100 rounded-xl flex items-center justify-center transition-colors group/icon">
                      <Linkedin className="w-5 h-5 text-gray-600 group-hover/icon:text-blue-600" />
                    </button>
                    <button className="w-10 h-10 bg-gray-100 hover:bg-green-100 rounded-xl flex items-center justify-center transition-colors group/icon">
                      <Mail className="w-5 h-5 text-gray-600 group-hover/icon:text-green-600" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Advisor Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-3xl p-12 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="relative">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 overflow-hidden">
              <img
                src="/src/assets/images/Septafianyah.jpg"
                alt="Dr. Ir. Septafiansyah Dwi Putra"
                className="w-20 h-20 object-cover rounded-2xl"
              />
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6">
              <span className="text-white text-sm">Dosen Pembimbing</span>
            </div>
            <h3 className="text-white mb-3 text-2xl">
              Dr. Ir. Septafiansyah Dwi Putra, S.T., M.T., IPM., ASEAN Eng.
            </h3>
            <p className="text-green-100 mb-8 max-w-2xl mx-auto text-lg">
              Dosen Jurusan Teknologi Informasi, Politeknik Negeri Lampung
            </p>
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-xl">
              <Mail className="w-5 h-5 text-white" />
              <span className="text-white">septafiansyah@polinela.ac.id</span>
            </div>
          </div>
        </motion.div>

        {/* Institution Logo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-4 px-8 py-5 bg-white rounded-2xl shadow-xl border border-gray-100">
            <div className="w-14 h-14 bg-gradient-to-br from-green-600 to-emerald-700 rounded-xl flex items-center justify-center shadow-lg shadow-green-600/25">
              <div className="text-white text-2xl">🏛️</div>
            </div>
            <div className="text-left">
              <div className="text-gray-900 text-lg">Politeknik Negeri Lampung</div>
              <div className="text-gray-600">Jurusan Teknologi Informasi</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
