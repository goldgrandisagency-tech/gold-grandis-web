// @ts-nocheck
"use client";
import Link from 'next/link';
import { Phone, MapPin, Menu, CheckCircle, Users, Award, Building } from 'lucide-react';

export default function About() {
  return (
    <main className="min-h-screen bg-white text-gray-800 font-sans">
      
      {/* NAVBAR (Sama kayak home biar konsisten) */}
      <nav className="bg-white shadow-sm sticky top-0 z-50 px-4 py-3">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
             <img src="/logo.jpg" alt="Logo" className="h-10 w-auto object-contain" />
             <span className="font-bold text-[#0a2558] text-xl hidden md:block">GOLD GRANDIS</span>
          </div>
          <div className="flex gap-6 text-sm font-semibold text-gray-600">
            <Link href="/" className="hover:text-[#0a2558]">Beranda</Link>
            <Link href="/properti" className="hover:text-[#0a2558]">Listing</Link>
            <Link href="/tentang-kami" className="text-[#0a2558] border-b-2 border-[#d4af37]">Tentang Kami</Link>
          </div>
        </div>
      </nav>

      {/* HEADER JUDUL */}
      <div className="bg-[#0a2558] py-20 text-center text-white px-4">
        <h1 className="text-4xl font-bold mb-4">Tentang Gold Grandis</h1>
        <p className="text-blue-200 max-w-2xl mx-auto">Mengenal lebih dekat partner properti terpercaya Anda di Jabodetabek.</p>
      </div>

      {/* KONTEN UTAMA */}
      <section className="py-16 px-4 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
            <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1000&auto=format&fit=crop" className="rounded-xl shadow-2xl" alt="Office" />
            <div>
                <h2 className="text-3xl font-bold text-[#0a2558] mb-6">Dedikasi Selama 4 Tahun</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                    Gold Grandis Property didirikan dengan satu tujuan: <strong>Mempermudah proses kepemilikan rumah</strong> bagi masyarakat Indonesia.
                </p>
                <p className="text-gray-600 leading-relaxed">
                    Berbasis di Jagakarsa, Jakarta Selatan, kami telah membantu ratusan klien menemukan hunian impian mereka di area Jabodetabek. Kami percaya bahwa properti bukan sekadar aset, tapi tempat di mana kehidupan bertumbuh.
                </p>
            </div>
        </div>

        {/* STATISTIK */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <div className="bg-gray-50 p-8 rounded-xl text-center hover:shadow-lg transition">
                <Users size={40} className="text-[#d4af37] mx-auto mb-4"/>
                <h3 className="text-4xl font-bold text-[#0a2558]">100+</h3>
                <p className="text-gray-500">Klien Puas</p>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl text-center hover:shadow-lg transition">
                <Building size={40} className="text-[#d4af37] mx-auto mb-4"/>
                <h3 className="text-4xl font-bold text-[#0a2558]">500+</h3>
                <p className="text-gray-500">Listing Properti</p>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl text-center hover:shadow-lg transition">
                <Award size={40} className="text-[#d4af37] mx-auto mb-4"/>
                <h3 className="text-4xl font-bold text-[#0a2558]">4 Th</h3>
                <p className="text-gray-500">Pengalaman</p>
            </div>
        </div>

        {/* VISI MISI */}
        <div className="bg-[#f8f9fa] p-10 rounded-2xl border-l-8 border-[#0a2558]">
            <h3 className="text-2xl font-bold text-[#0a2558] mb-4">Komitmen Kami</h3>
            <ul className="space-y-3">
                <li className="flex gap-3"><CheckCircle className="text-[#d4af37]" /> Menyediakan data properti yang valid dan terverifikasi.</li>
                <li className="flex gap-3"><CheckCircle className="text-[#d4af37]" /> Mendampingi proses KPR hingga akad kredit selesai.</li>
                <li className="flex gap-3"><CheckCircle className="text-[#d4af37]" /> Mengutamakan transparansi harga tanpa markup tersembunyi.</li>
            </ul>
        </div>
      </section>

      {/* FOOTER SIMPLE */}
      <footer className="bg-[#0a2558] text-white py-8 text-center text-sm">
        <p>© 2025 Gold Grandis Property.</p>
      </footer>
    </main>
  );
}