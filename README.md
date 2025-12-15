
   # SmarticAgro — Landing Page & Demo Rekomendasi Tanaman

   Repositori ini adalah implementasi frontend untuk SmarticAgro: sebuah proyek yang mempromosikan sistem rekomendasi tanaman berbasis data lapangan. Tujuan utama website ini adalah menunjukkan bagaimana sistem 7-in-1 sensor (multi-parameter) yang terhubung ke cloud dan model AI dapat memberikan rekomendasi tanaman yang sesuai, termasuk mempertimbangkan ketinggian lahan (elevation) dan lokasi GPS.

   Ringkas: website ini adalah alat presentasi dan demo — bukan backend produksi. Pengunjung dapat melihat fitur sistem, demo tampilan aplikasi Android, dan memahami alur kerja dari pengukuran sampai rekomendasi.

  ## Fokus Rekomendasi
  - Sensor 7-in-1: mengumpulkan setidaknya 7 parameter penting (mis. N, P, K, pH, suhu, kelembapan, konduktivitas).
  - Elevation-aware: ketinggian lahan dimasukkan dalam analisis spasial untuk memperbaiki rekomendasi tanaman.
  - Model ML: Random Forest digunakan sebagai contoh model untuk menganalisis hubungan kompleks antar parameter dan menghasilkan persentase kecocokan tanaman.

  ## Fitur yang ditampilkan di website
  - Demo antarmuka aplikasi Android (tampilan rekomendasi dan data sensor).
  - Ringkasan integrasi IoT & AI (MQTT, cloud, model ML).
  - Daftar fitur teknis dan spesifikasi (ESP32, akurasi GPS, daya tahan, protokol).
  - Cara kerja sistem (dari penanaman sensor hingga tampilan hasil di aplikasi).

  ## Struktur proyek (singkat)
  - `index.html` — berkas HTML utama
  - `src/main.tsx` — entry React + Vite
  - `src/App.tsx` — layout dan routing level atas
  - `src/components/` — komponen halaman (Hero, Features, AIIntegration, DemoRecommendation, Team, dsb.)
  - `src/assets/images/` — gambar tim dan aset lain
  - `src/ui/` — komponen UI reusable (button, dialog, input, dsb.)
  - `vite.config.ts` — konfigurasi Vite

-
## Detail teknis singkat
  - Perangkat: ESP32 (mikrokontroler) + sensor multi-parameter + modul GPS (mis. LilyGO T-Beam).
  - Komunikasi: data dikirim melalui MQTT ke cloud.
  - Analisis: Random Forest memproses parameter (N, P, K, pH, suhu, kelembapan, lokasi/elevation).
  - Output: rekomendasi tanaman dalam bentuk persentase kecocokan, ditampilkan di aplikasi Android.


## Cara menambahkan / memperbarui demo rekomendasi
- Gambar / aset UI: `src/assets/images/`
- Komponen demo: `src/components/DemoRecommendation.tsx` — berisi contoh tampilan data sensor dan rekomendasi.
- Model & logika ML: saat ini hanya ditampilkan sebagai penjelasan; integrasi model nyata memerlukan backend terpisah untuk training/inference.

## Catatan untuk presentasi
- Tampilkan bagian `DemoRecommendation` untuk langsung memperlihatkan rekomendasi berbasis parameter.
- Jelaskan bagaimana elevation (ketinggian) mempengaruhi pilihan tanaman pada bagian `Features` dan `AIIntegration`.

Jika Anda ingin materi tambahan untuk presentasi (mis. tabel parameter 7-in-1, mock API untuk demo interaktif, atau panduan deploy), beri tahu saya dan saya siapkan terpisah — README ini saya pertahankan hanya sebagai dokumentasi informasi situs.
  