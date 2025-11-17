import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-600/25">
              <span className="text-white text-sm">STC</span>
            </div>
            <div>
              <span className="text-gray-900">Sistem Tanam Cerdas</span>
              <div className="text-xs text-gray-500">IoT & AI Agriculture</div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <button
              onClick={() => scrollToSection("beranda")}
              className="px-4 py-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all"
            >
              Beranda
            </button>
            <button
              onClick={() => scrollToSection("tentang")}
              className="px-4 py-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all"
            >
              Tentang
            </button>
            <button
              onClick={() => scrollToSection("fitur")}
              className="px-4 py-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all"
            >
              Fitur
            </button>
            <button
              onClick={() => scrollToSection("tim")}
              className="px-4 py-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all"
            >
              Tim
            </button>
            <button
              onClick={() => scrollToSection("kontak")}
              className="ml-4 bg-green-600 text-white px-6 py-2.5 rounded-xl hover:bg-green-700 transition-all shadow-lg shadow-green-600/25"
            >
              Kontak
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className="w-6 h-6 text-gray-900" />
            ) : (
              <Menu className="w-6 h-6 text-gray-900" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-gray-100">
            <button
              onClick={() => scrollToSection("beranda")}
              className="block w-full text-left px-4 py-3 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all"
            >
              Beranda
            </button>
            <button
              onClick={() => scrollToSection("tentang")}
              className="block w-full text-left px-4 py-3 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all"
            >
              Tentang
            </button>
            <button
              onClick={() => scrollToSection("fitur")}
              className="block w-full text-left px-4 py-3 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all"
            >
              Fitur
            </button>
            <button
              onClick={() => scrollToSection("tim")}
              className="block w-full text-left px-4 py-3 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all"
            >
              Tim
            </button>
            <button
              onClick={() => scrollToSection("kontak")}
              className="block w-full text-left px-4 py-3 bg-green-600 text-white hover:bg-green-700 rounded-lg transition-all mt-2"
            >
              Kontak
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
