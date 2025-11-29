"use client";

import Link from 'next/link';
import { Search, MapPin, Phone, Menu, Facebook, Instagram, Bed, Bath, Move } from 'lucide-react';

export default function Home() {
  
  // Data Dummy Rumah (Nanti kita ganti pakai Database Firebase)
  const properties = [
    {
      id: 1,
      title: "Rumah Minimalis Modern Jagakarsa",
      price: 1850000000,
      location: "Jagakarsa, Jakarta Selatan",
      beds: 3,
      baths: 2,
      area: 120,
      image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b91d?q=80&w=800&auto=format&fit=crop",
      tag: "Dijual"
    },
    {
      id: 2,
      title: "Cluster Mewah Dekat Tol Desari",
      price: 2500000000,
      location: "Cilandak, Jakarta Selatan",
      beds: 4,
      baths: 3,
      area: 180,
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
      tag: "Hot Deal"
    },
    {
      id: 3,
      title: "Apartemen Studio Full Furnished",
      price: 650000000,
      location: "Margonda, Depok",
      beds: 1,
      baths: 1,
      area: 32,
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800&auto=format&fit=crop",
      tag: "Disewa"
    }
  ];

  // Format Rupiah
  const formatRupiah = (number: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(number);
  }

  return (
    <main className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      
      {/* --- TOP BAR --- */}
      <div className="bg-[#1a3b8e] text-white py-2 px-4 text-xs md:text-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="flex gap-4">
            <span className="flex items-center gap-1"><Phone size={14}/> 0851 1749 0500</span>
            <span className="hidden md:flex items-center gap-1"><MapPin size={14}/> Jagakarsa, Jakarta Selatan</span>
          </div>
          <div className="flex gap-4">
             <span className="cursor-pointer hover:text-yellow-400 flex items-center gap-1"><Instagram size={14}/> Instagram</span>
             <span className="cursor-pointer hover:text-yellow-400 flex items-center gap-1"><Facebook size={14}/> Facebook</span>
          </div>
        </div>
      </div>

      {/* --- HEADER --- */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            {/* Logo Image */}
            <img src="/logo.jpg" alt="Gold Grandis" className="h-10 md:h-12 w-auto object-contain" />
          </div>

          <div className="hidden md:flex gap-8 text-gray-700 font-medium text-sm">
            <Link href="#" className="hover:text-[#1a3b8e] transition">Dijual</Link>
            <Link href="#" className="hover:text-[#1a3b8e] transition">Disewa</Link>
            <Link href="#" className="hover:text-[#1a3b8e] transition">Proyek Baru</Link>
            <Link href="#" className="hover:text-[#1a3b8e] transition">Simulasi KPR</Link>
          </div>

          <div className="hidden md:block">
            <button className="bg-[#d4af37] hover:bg-yellow-600 text-white px-5 py-2 rounded-lg font-semibold transition shadow-lg">
              Titip Jual Properti
            </button>
          </div>
          <div className="md:hidden text-[#1a3b8e]"><Menu size={28} /></div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <div className="relative h-[500px] md:h-[600px] bg-gray-900 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/50 z-0">
          <img src="https://images.unsplash.com/photo-1600596542815-2a4d9f6facb8?q=80&w=2000&auto=format&fit=crop" alt="Background" className="w-full h-full object-cover opacity-60"/>
        </div>
        <div className="relative z-10 w-full max-w-4xl px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-2 drop-shadow-md">Agency Property Pilihan di Jabodetabek</h2>
          <p className="text-gray-200 mb-8 text-lg shadow-black drop-shadow-md">Temukan hunian impian Anda bersama Gold Grandis Property</p>
          <div className="bg-white p-3 rounded-xl shadow-2xl max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row gap-2">
              <input type="text" placeholder="Cari lokasi..." className="w-full flex-1 h-12 px-4 rounded-lg border border-gray-200 text-black"/>
              <button className="h-12 px-8 bg-[#1a3b8e] text-white font-bold rounded-lg hover:bg-blue-900 transition flex items-center justify-center gap-2"><Search size={18} /> Cari</button>
            </div>
          </div>
        </div>
      </div>

      {/* --- AREA POPULER --- */}
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <h3 className="text-2xl font-bold text-[#1a3b8e] mb-6 border-l-4 border-[#d4af37] pl-4">Area Populer</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Jakarta Selatan', 'Depok', 'Bogor', 'Tangerang'].map((city) => (
              <div key={city} className="relative h-32 md:h-40 rounded-xl overflow-hidden group cursor-pointer shadow-lg">
                 <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition z-10"></div>
                 <img src={`https://source.unsplash.com/random/400x300/?${city},building`} alt={city} className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"/>
                 <div className="absolute bottom-4 left-4 text-white font-bold text-lg z-20 shadow-black drop-shadow-md">{city}</div>
              </div>
            ))}
        </div>
      </section>

      {/* --- NEW: LISTING PROPERTI --- */}
      <section className="py-12 px-4 max-w-7xl mx-auto bg-white rounded-3xl shadow-sm mb-12">
        <div className="flex justify-between items-end mb-8">
            <div>
                <h3 className="text-2xl font-bold text-[#1a3b8e]">Rekomendasi Terkini</h3>
                <p className="text-gray-500 text-sm mt-1">Pilihan properti terbaik minggu ini</p>
            </div>
            <Link href="#" className="text-[#d4af37] font-semibold hover:underline">Lihat Semua →</Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {properties.map((item) => (
                <div key={item.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition duration-300 group cursor-pointer">
                    <div className="relative h-60 overflow-hidden">
                        <div className="absolute top-4 left-4 bg-[#1a3b8e] text-white text-xs font-bold px-3 py-1 rounded shadow-md z-10">{item.tag}</div>
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"/>
                    </div>
                    <div className="p-5">
                        <h4 className="font-bold text-lg text-gray-800 mb-1 truncate">{item.title}</h4>
                        <p className="text-gray-500 text-sm mb-3 flex items-center gap-1"><MapPin size={14}/> {item.location}</p>
                        <div className="text-[#d4af37] font-bold text-xl mb-4">{formatRupiah(item.price)}</div>
                        
                        <div className="flex justify-between border-t border-gray-100 pt-4 text-gray-500 text-sm">
                            <span className="flex items-center gap-1"><Bed size={16}/> {item.beds} KT</span>
                            <span className="flex items-center gap-1"><Bath size={16}/> {item.baths} KM</span>
                            <span className="flex items-center gap-1"><Move size={16}/> {item.area} m²</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-[#1a3b8e] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center md:text-left grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
                <h2 className="text-2xl font-bold mb-4">GOLD GRANDIS</h2>
                <p className="text-blue-200 text-sm">Agency property terpercaya dengan pengalaman 4 tahun di Jagakarsa dan Jabodetabek.</p>
            </div>
            <div>
                <h3 className="font-bold mb-4 text-[#d4af37]">Hubungi Kami</h3>
                <p className="text-blue-100 mb-2">0851 1749 0500</p>
                <p className="text-blue-100">Jagakarsa, Jakarta Selatan</p>
            </div>
            <div>
                <h3 className="font-bold mb-4 text-[#d4af37]">Menu</h3>
                <div className="flex flex-col gap-2 text-blue-200 text-sm">
                    <Link href="#">Beranda</Link>
                    <Link href="#">Dijual</Link>
                    <Link href="#">Kontak Agen</Link>
                </div>
            </div>
        </div>
        <div className="text-center text-blue-300 text-xs mt-12 border-t border-blue-800 pt-8">
            © 2025 Gold Grandis Property. Created with Next.js
        </div>
      </footer>

    </main>
  );
}