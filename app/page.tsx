// @ts-nocheck
"use client";

import { useEffect, useState } from 'react';
import { db } from './lib/firebase'; 
import { collection, getDocs } from 'firebase/firestore';
import Link from 'next/link';
import { Search, MapPin, Phone, Menu, Facebook, Instagram, Bed, Bath, Home as HomeIcon, CheckCircle, User } from 'lucide-react';

export default function Home() {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('beli'); // Buat tab Beli/Sewa

  // --- AMBIL DATA DARI DATABASE ---
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "properties"));
        const dataRumah = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProperties(dataRumah);
      } catch (error) {
        console.error("Gagal ambil data:", error);
      }
      setLoading(false);
    };
    fetchProperties();
  }, []);

  const formatRupiah = (number: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(number);
  }

  return (
    <main className="min-h-screen bg-white text-gray-800 font-sans">
      
      {/* --- 1. TOP BAR (Kontak) --- */}
      <div className="bg-[#0a2558] text-white py-2 px-4 text-xs md:text-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex gap-4">
            <span className="flex items-center gap-1"><Phone size={14}/> 0851 1749 0500</span>
            <span className="hidden md:flex items-center gap-1"><MapPin size={14}/> Jagakarsa, Jakarta Selatan</span>
          </div>
          <div className="flex gap-3 opacity-90">
             <span className="cursor-pointer hover:text-[#d4af37]">Instagram</span>
             <span className="cursor-pointer hover:text-[#d4af37]">Facebook</span>
          </div>
        </div>
      </div>

      {/* --- 2. NAVBAR (Logo & Menu) --- */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-3">
             {/* Pastikan file logo.jpg ada di folder public */}
             <img src="/logo.jpg" alt="Gold Grandis" className="h-10 md:h-12 w-auto object-contain" />
             <div className="hidden md:block">
                <h1 className="text-xl font-bold text-[#0a2558] leading-none">GOLD GRANDIS</h1>
                <p className="text-[10px] tracking-[0.2em] text-gray-500 font-bold">PROPERTY AGENCY</p>
             </div>
          </div>

          {/* Menu Desktop */}
          <div className="hidden md:flex gap-8 text-gray-600 font-semibold text-sm">
            <Link href="#" className="hover:text-[#0a2558] border-b-2 border-transparent hover:border-[#d4af37] py-1 transition">Dijual</Link>
            <Link href="#" className="hover:text-[#0a2558] border-b-2 border-transparent hover:border-[#d4af37] py-1 transition">Disewa</Link>
            <Link href="#" className="hover:text-[#0a2558] border-b-2 border-transparent hover:border-[#d4af37] py-1 transition">KPR</Link>
            <Link href="/admin" className="hover:text-[#0a2558] border-b-2 border-transparent hover:border-[#d4af37] py-1 transition">Admin</Link>
          </div>

          {/* Tombol Mobile */}
          <div className="md:hidden text-[#0a2558]">
            <Menu size={28} />
          </div>
        </div>
      </nav>

      {/* --- 3. HERO SECTION (Banner ala Rumah123) --- */}
      <div className="relative h-[550px] flex items-center justify-center bg-gray-900">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop" 
            alt="Luxury Home" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60"></div>
        </div>
        
        {/* Search Content */}
        <div className="relative z-10 w-full max-w-4xl px-4 mt-10">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 text-center drop-shadow-lg tracking-tight">
            Temukan Hunian Impian
          </h2>
          <p className="text-gray-200 text-center mb-8 text-lg font-light">
            Ribuan properti terbaik di Jabodetabek menanti Anda
          </p>

          {/* Search Box Card */}
          <div className="bg-white p-1 rounded-2xl shadow-2xl max-w-3xl mx-auto overflow-hidden">
            {/* Tabs Beli/Sewa */}
            <div className="flex border-b border-gray-100">
               <button 
                 onClick={() => setActiveTab('beli')}
                 className={`flex-1 py-3 text-sm font-bold transition ${activeTab === 'beli' ? 'bg-white text-[#0a2558] border-b-2 border-[#0a2558]' : 'bg-gray-50 text-gray-400'}`}
               >
                 Dijual
               </button>
               <button 
                 onClick={() => setActiveTab('sewa')}
                 className={`flex-1 py-3 text-sm font-bold transition ${activeTab === 'sewa' ? 'bg-white text-[#0a2558] border-b-2 border-[#0a2558]' : 'bg-gray-50 text-gray-400'}`}
               >
                 Disewa
               </button>
            </div>
            
            {/* Input Fields */}
            <div className="p-4 flex flex-col md:flex-row gap-3">
               <div className="flex-1 relative">
                 <MapPin className="absolute left-3 top-3.5 text-gray-400" size={18} />
                 <input 
                   type="text" 
                   placeholder="Cari lokasi, nama jalan, atau project..." 
                   className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0a2558] text-gray-700 font-medium"
                 />
               </div>
               <button className="bg-[#d4af37] hover:bg-[#b5952f] text-white px-8 py-3 rounded-lg font-bold transition shadow-md flex items-center justify-center gap-2">
                 <Search size={18} /> Cari
               </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- 4. AREA POPULER --- */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
            <h3 className="text-2xl font-bold text-[#0a2558]">Area Terpopuler</h3>
            <div className="h-1 flex-1 bg-gray-100 rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Jakarta Selatan', img: 'https://images.unsplash.com/photo-1565034946487-077786996e27?q=80&w=400&h=300&fit=crop' },
              { name: 'Depok', img: 'https://images.unsplash.com/photo-1555529733-0e670560f7e1?q=80&w=400&h=300&fit=crop' },
              { name: 'Bogor', img: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=400&h=300&fit=crop' },
              { name: 'BSD City', img: 'https://images.unsplash.com/photo-1575356910606-4404e03102d1?q=80&w=400&h=300&fit=crop' }
            ].map((city) => (
              <div key={city.name} className="relative h-48 rounded-xl overflow-hidden group cursor-pointer shadow-md hover:shadow-xl transition">
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                 <img src={city.img} alt={city.name} className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700"/>
                 <div className="absolute bottom-4 left-4 text-white z-20">
                    <p className="text-xs text-gray-300 font-medium uppercase tracking-wider">Jelajahi</p>
                    <h4 className="font-bold text-xl">{city.name}</h4>
                 </div>
              </div>
            ))}
        </div>
      </section>

      {/* --- 5. LISTING DATABASE (Yang Penting Ini) --- */}
      <section className="py-16 px-4 max-w-7xl mx-auto bg-gray-50 rounded-[3rem]">
        <div className="text-center mb-12">
            <span className="text-[#d4af37] font-bold tracking-widest text-sm uppercase">Pilihan Editor</span>
            <h3 className="text-3xl font-bold text-[#0a2558] mt-2">Properti Terbaru Minggu Ini</h3>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center p-10">
             <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#0a2558]"></div>
          </div>
        )}

        {/* Data Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-8">
            {properties.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300 cursor-pointer border border-gray-100 group">
                    <div className="relative h-64 overflow-hidden">
                        <div className="absolute top-4 left-4 bg-[#0a2558] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md z-10 flex items-center gap-1">
                           <CheckCircle size={12} /> {item.tag || "Verified"}
                        </div>
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"/>
                        {/* Overlay Price on Image */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 pt-10">
                            <p className="text-[#d4af37] font-bold text-2xl">{formatRupiah(item.price)}</p>
                        </div>
                    </div>
                    <div className="p-5">
                        <h4 className="font-bold text-lg text-gray-800 mb-2 line-clamp-1 group-hover:text-[#0a2558] transition">{item.title}</h4>
                        <p className="text-gray-500 text-sm mb-4 flex items-center gap-1"><MapPin size={14} className="text-[#d4af37]"/> {item.location}</p>
                        
                        <div className="flex justify-between items-center border-t border-gray-100 pt-4 text-gray-500 text-sm">
                            <span className="flex items-center gap-1.5 bg-gray-50 px-3 py-1 rounded-lg"><Bed size={16} className="text-[#0a2558]"/> {item.beds} KT</span>
                            <span className="flex items-center gap-1.5 bg-gray-50 px-3 py-1 rounded-lg"><Bath size={16} className="text-[#0a2558]"/> {item.baths} KM</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        {!loading && properties.length === 0 && (
            <div className="text-center text-gray-500 py-10">Belum ada properti. <Link href="/admin" className="text-[#0a2558] font-bold">Input disini</Link></div>
        )}
      </section>

      {/* --- 6. KENAPA MEMILIH KAMI (Biar Rame) --- */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative">
               <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#f8f0d8] rounded-full -z-10"></div>
               <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800&auto=format&fit=crop" className="rounded-2xl shadow-2xl w-full object-cover h-[400px]" alt="Agent" />
               <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl max-w-xs hidden md:block border-l-4 border-[#0a2558]">
                  <p className="text-4xl font-bold text-[#0a2558] mb-1">15+</p>
                  <p className="text-gray-600 text-sm font-medium">Tahun Pengalaman Tim Ahli Kami</p>
               </div>
            </div>
            <div>
               <span className="text-[#d4af37] font-bold uppercase tracking-widest text-sm">Kenapa Gold Grandis?</span>
               <h3 className="text-4xl font-bold text-[#0a2558] mt-2 mb-6">Mitra Terpercaya untuk Aset Masa Depan Anda</h3>
               <p className="text-gray-600 mb-8 leading-relaxed">
                  Kami tidak hanya menjual properti, kami membantu Anda menemukan tempat untuk membangun kenangan. Dengan database terlengkap di Jabodetabek dan tim legal yang handal.
               </p>
               
               <ul className="space-y-4">
                  {[
                    'Database Properti Eksklusif & Terupdate',
                    'Bantuan Pengurusan KPR sampai Tuntas',
                    'Legalitas Terjamin & Transparan'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                       <div className="w-6 h-6 rounded-full bg-[#e8f0fe] flex items-center justify-center text-[#0a2558]"><CheckCircle size={14}/></div>
                       {item}
                    </li>
                  ))}
               </ul>
            </div>
         </div>
      </section>

      {/* --- 7. FOOTER KEREN --- */}
      <footer className="bg-[#0a2558] text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-1">
               <div className="flex items-center gap-2 mb-6">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#0a2558] font-bold">GG</div>
                  <span className="font-bold text-xl">GOLD GRANDIS</span>
               </div>
               <p className="text-blue-200 text-sm leading-relaxed mb-6">
                  Agency properti modern dengan pendekatan personal. Melayani jual, beli, dan sewa properti di seluruh area Jabodetabek.
               </p>
            </div>
            
            <div>
               <h4 className="font-bold text-lg mb-6">Menu Cepat</h4>
               <ul className="space-y-3 text-blue-200 text-sm">
                  <li><Link href="#" className="hover:text-white transition">Beranda</Link></li>
                  <li><Link href="#" className="hover:text-white transition">Listing Dijual</Link></li>
                  <li><Link href="#" className="hover:text-white transition">Simulasi KPR</Link></li>
                  <li><Link href="/admin" className="hover:text-white transition">Login Agen</Link></li>
               </ul>
            </div>

            <div>
               <h4 className="font-bold text-lg mb-6">Area Spesialis</h4>
               <ul className="space-y-3 text-blue-200 text-sm">
                  <li>Rumah di Jagakarsa</li>
                  <li>Apartemen Depok</li>
                  <li>Ruko Jakarta Selatan</li>
                  <li>Tanah Kavling Bogor</li>
               </ul>
            </div>

            <div>
               <h4 className="font-bold text-lg mb-6">Hubungi Kami</h4>
               <p className="flex items-center gap-2 text-blue-200 mb-3 text-sm">
                  <Phone size={16} className="text-[#d4af37]" /> 0851 1749 0500
               </p>
               <p className="flex items-start gap-2 text-blue-200 text-sm">
                  <MapPin size={16} className="text-[#d4af37] mt-1" /> 
                  Jl. Jagakarsa Raya No. 12<br/>Jakarta Selatan, DKI Jakarta
               </p>
            </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 border-t border-blue-900/50 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-blue-300">
           <p>© 2025 Gold Grandis Property. All rights reserved.</p>
           <p>Designed with passion.</p>
        </div>
      </footer>
    </main>
  );
}