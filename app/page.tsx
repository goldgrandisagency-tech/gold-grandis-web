// @ts-nocheck
"use client";
import { useEffect, useState } from 'react';
import { db } from './lib/firebase'; 
import { collection, getDocs, limit, query } from 'firebase/firestore'; // Tambah limit
import Link from 'next/link';
import { Search, MapPin, Phone, Menu, Facebook, Instagram, Bed, Bath, CheckCircle } from 'lucide-react';

export default function Home() {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const q = query(collection(db, "properties"), limit(6)); // Cuma ambil 6 terbaru buat Home
        const querySnapshot = await getDocs(q);
        const dataRumah = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProperties(dataRumah);
      } catch (error) { console.error(error); }
      setLoading(false);
    };
    fetchProperties();
  }, []);

  const formatRupiah = (number: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(number);
  }

  return (
    <main className="min-h-screen bg-white text-gray-800 font-sans">
      
      {/* TOP BAR */}
      <div className="bg-[#0a2558] text-white py-2 px-4 text-xs md:text-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex gap-4">
            <span className="flex items-center gap-1"><Phone size={14}/> 0851 1749 0500</span>
            <span className="hidden md:flex items-center gap-1"><MapPin size={14}/> Jagakarsa, Jakarta Selatan</span>
          </div>
        </div>
      </div>

      {/* NAVBAR TERINTEGRASI */}
      <nav className="bg-white shadow-sm sticky top-0 z-50 px-4 py-3">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
             <img src="/logo.jpg" alt="Logo" className="h-10 w-auto object-contain" />
             <span className="font-bold text-[#0a2558] text-xl hidden md:block">GOLD GRANDIS</span>
          </div>
          <div className="hidden md:flex gap-8 text-gray-600 font-semibold text-sm">
            <Link href="/" className="text-[#0a2558] border-b-2 border-[#d4af37]">Beranda</Link>
            <Link href="/properti" className="hover:text-[#0a2558]">Listing</Link>
            <Link href="/tentang-kami" className="hover:text-[#0a2558]">Tentang Kami</Link>
            <Link href="/admin" className="hover:text-[#0a2558]">Admin</Link>
          </div>
          <div className="md:hidden"><Menu size={24} className="text-[#0a2558]"/></div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <div className="relative h-[550px] flex items-center justify-center bg-gray-900">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop" className="w-full h-full object-cover opacity-60"/>
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60"></div>
        </div>
        
        <div className="relative z-10 w-full max-w-4xl px-4 mt-10 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg tracking-tight">Temukan Hunian Impian</h2>
          <p className="text-gray-200 mb-8 text-lg font-light">Ribuan properti terbaik di Jabodetabek menanti Anda</p>
          <div className="flex justify-center">
              <Link href="/properti" className="bg-[#d4af37] hover:bg-[#b5952f] text-white px-8 py-3 rounded-lg font-bold transition shadow-md flex items-center gap-2">
                 <Search size={18} /> Lihat Semua Properti
              </Link>
          </div>
        </div>
      </div>

      {/* LISTING SECTION (CARD BARU) */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-[#0a2558]">Properti Terbaru</h3>
            <p className="text-gray-500 mt-2">Pilihan terbaik minggu ini untuk Anda</p>
        </div>

        {loading && <div className="text-center">Loading...</div>}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {properties.map((item) => (
                <div key={item.id} className="bg-white rounded-xl shadow-md hover:shadow-2xl transition overflow-hidden group border border-gray-100 flex flex-col h-full">
                    {/* FOTO & TAG */}
                    <div className="relative h-60 overflow-hidden">
                        <div className="absolute top-4 left-4 bg-[#0a2558] text-white text-[10px] uppercase font-bold px-3 py-1 rounded shadow-md z-10 tracking-wider">
                           {item.type || "Properti"}
                        </div>
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-700"/>
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 pt-12">
                           <p className="text-[#d4af37] font-bold text-2xl">{formatRupiah(item.price)}</p>
                        </div>
                    </div>
                    
                    {/* INFO */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                            <h4 className="font-bold text-lg mb-2 leading-tight group-hover:text-[#0a2558] transition">{item.title}</h4>
                            <p className="text-gray-500 text-sm mb-4 flex items-center gap-1"><MapPin size={14} className="text-[#d4af37]"/> {item.location}</p>
                        </div>

                        {/* SPESIFIKASI ROW */}
                        <div className="grid grid-cols-4 gap-2 border-t pt-4 text-xs font-semibold text-gray-600 text-center">
                            <div className="bg-gray-50 py-2 rounded">
                                <span className="block text-gray-400 font-normal mb-1">LT</span>
                                {item.lt || "-"} m²
                            </div>
                            <div className="bg-gray-50 py-2 rounded">
                                <span className="block text-gray-400 font-normal mb-1">LB</span>
                                {item.lb || "-"} m²
                            </div>
                            <div className="bg-gray-50 py-2 rounded">
                                <span className="block text-gray-400 font-normal mb-1">KT</span>
                                {item.beds}
                            </div>
                            <div className="bg-gray-50 py-2 rounded">
                                <span className="block text-gray-400 font-normal mb-1">KM</span>
                                {item.baths}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        
        <div className="text-center mt-12">
            <Link href="/properti" className="inline-block border-2 border-[#0a2558] text-[#0a2558] font-bold py-3 px-8 rounded-full hover:bg-[#0a2558] hover:text-white transition">
                Lihat Selengkapnya &rarr;
            </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0a2558] text-white py-8 text-center text-sm">
        <p>© 2025 Gold Grandis Property. Website Profesional & Terintegrasi.</p>
      </footer>
    </main>
  );
}