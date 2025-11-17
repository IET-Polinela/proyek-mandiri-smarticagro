import { Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer id="kontak" className="bg-gray-900 text-gray-300 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Logo & Description */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-600/25">
                <span className="text-white">STC</span>
              </div>
              <div>
                <span className="text-white block">Sistem Tanam Cerdas</span>
                <span className="text-gray-500 text-xs">IoT & AI Agriculture</span>
              </div>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Solusi pertanian presisi berbasis IoT dan AI untuk meningkatkan produktivitas dan keberlanjutan pertanian Indonesia.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 bg-gray-800 hover:bg-green-600 rounded-xl flex items-center justify-center transition-all shadow-lg hover:shadow-green-600/25"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 bg-gray-800 hover:bg-green-600 rounded-xl flex items-center justify-center transition-all shadow-lg hover:shadow-green-600/25"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:info@sistemtanamcerdas.id"
                className="w-11 h-11 bg-gray-800 hover:bg-green-600 rounded-xl flex items-center justify-center transition-all shadow-lg hover:shadow-green-600/25"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white mb-6 text-lg">Navigasi</h3>
            <ul className="space-y-3">
              {["beranda", "tentang", "fitur", "tim", "kontak"].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => scrollToSection(item)}
                    className="text-gray-400 hover:text-green-400 transition-colors capitalize"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white mb-6 text-lg">Sumber Daya</h3>
            <ul className="space-y-3">
              {["Dokumentasi", "Tutorial", "FAQ", "Blog", "Download APK"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white mb-6 text-lg">Kontak</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                <span className="text-gray-400 text-sm leading-relaxed">
                  Politeknik Negeri Lampung<br />
                  Jl. Soekarno Hatta No.10<br />
                  Bandar Lampung, Indonesia
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-green-500 flex-shrink-0" />
                <a href="mailto:info@sistemtanamcerdas.id" className="text-gray-400 hover:text-green-400 transition-colors">
                  info@sistemtanamcerdas.id
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-green-500 flex-shrink-0" />
                <a href="tel:+6281234567890" className="text-gray-400 hover:text-green-400 transition-colors">
                  +62 812-3456-7890
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Institution Badge */}
        <div className="border-t border-gray-800 pt-10 mb-10">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <div className="inline-flex items-center gap-4 px-8 py-4 bg-gray-800 rounded-2xl border border-gray-700">
              <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-700 rounded-xl flex items-center justify-center shadow-lg shadow-green-600/25">
                <span className="text-white">🏛️</span>
              </div>
              <div className="text-left">
                <div className="text-white">Politeknik Negeri Lampung</div>
                <div className="text-gray-400 text-sm">Jurusan Teknik Elektro</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-center md:text-left">
            © 2025 Sistem Tanam Cerdas. Dikembangkan oleh Mahasiswa Politeknik Negeri Lampung.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-gray-500 hover:text-green-400 transition-colors">
              Kebijakan Privasi
            </a>
            <a href="#" className="text-gray-500 hover:text-green-400 transition-colors">
              Syarat & Ketentuan
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
