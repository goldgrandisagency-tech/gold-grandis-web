// @ts-nocheck
"use client";

import { useEffect, useState } from 'react';
import { db } from './lib/firebase';
import { collection, getDocs, limit, query } from 'firebase/firestore';
import Link from 'next/link';
import { Search, MapPin, Phone, Menu, Facebook, Instagram, Bed, Bath, X, MessageCircle, Maximize2, Home, ArrowRight } from 'lucide-react';

export default function HomePage() {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProp, setSelectedProp] = useState<any>(null); // State untuk Pop-up
  const [activeImageIndex, setActiveImageIndex] = useState(0); // Untuk slider foto di pop-up

  // --- AMBIL DATA ---
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const q = query(collection(db, "properties"), limit(6));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProperties(data);
      } catch (error) { console.error(error); }
      setLoading(false);
    };
    fetchProperties();
  }, []);

  const formatRupiah = (number: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(number);
  }

  // Fungsi Buka Pop-up
  const openModal = (prop: any) => {
    setSelectedProp(prop);
    setActiveImageIndex(0);
    document.body.style.overflow = 'hidden'; // Matikan scroll belakang
  }

  // Fungsi Tutup Pop-up
  const closeModal = () => {
    setSelectedProp(null);
    document.body.style.overflow = 'auto'; // Nyalakan scroll
  }

  return (
    <main className="min-h-screen bg-slate-50 font-sans text-slate-800">
      
      {/* --- 1. NAVBAR TRANSPARAN & MODERN --- */}
      <nav className="fixed top-0 w-full z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 transition-all">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
             <img src="/logo.jpg" alt="Logo" className="h-10 w-auto rounded-md" />
             <div>
                <h1 className="text-xl font-bold text-[#0a2558] tracking-tight leading-none">GOLD GRANDIS</h1>
                <p className="text-[10px] font-bold text-[#d4af37] tracking-[0.3em]">PROPERTY</p>
             </div>
          </div>
          
          <div className="hidden md:flex gap-8 text-sm font-semibold text-slate-600">
            <Link href="/" className="text-[#0a2558]">Beranda</Link>
            <Link href="/properti" className="hover:text-[#0a2558] transition">Listing</Link>
            <Link href="/tentang-kami" className="hover:text-[#0a2558] transition">Tentang Kami</Link>
            <Link href="/admin" className="hover:text-[#0a2558] transition">Admin</Link>
          </div>

          <button className="md:hidden text-[#0a2558]"><Menu/></button>
        </div>
      </nav>

      {/* --- 2. HERO SECTION (FULL SCREEN & CLEAN) --- */}
      <div className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Video/Image */}
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop" className="w-full h-full object-cover"/>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a2558]/80 to-slate-900/60"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mt-10">
          <span className="inline-block py-1 px-3 rounded-full bg-[#d4af37]/20 border border-[#d4af37] text-[#d4af37] text-xs font-bold tracking-widest mb-6 backdrop-blur-sm">
            AGENCY PROPERTY JABODETABEK
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
            Hunian Mewah,<br/>Investasi Masa Depan.
          </h1>
          <p className="text-slate-200 text-lg md:text-xl font-light mb-10 max-w-2xl mx-auto">
            Temukan properti eksklusif dengan legalitas terjamin dan proses KPR yang kami bantu sampai tuntas.
          </p>

          {/* Search Bar Floating */}
          <div className="bg-white/95 backdrop-blur-xl p-2 rounded-full shadow-2xl max-w-2xl mx-auto flex items-center gap-2 pl-6 pr-2">
             <Search className="text-slate-400" size={20}/>
             <input type="text" placeholder="Cari lokasi (Misal: Jagakarsa)..." className="bg-transparent flex-1 outline-none text-slate-700 placeholder:text-slate-400 py-3"/>
             <Link href="/properti" className="bg-[#0a2558] hover:bg-blue-900 text-white px-8 py-3 rounded-full font-semibold transition shadow-lg flex items-center gap-2">
               Cari
             </Link>
          </div>
        </div>
      </div>

      {/* --- 3. LISTING TERBARU (PREMIUM CARDS) --- */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
           <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0a2558]">Pilihan Editor</h2>
              <p className="text-slate-500 mt-2">Properti terbaik yang baru saja kami kurasi.</p>
           </div>
           <Link href="/properti" className="hidden md:flex items-center gap-2 text-[#d4af37] font-bold hover:gap-3 transition-all">
              Lihat Semua <ArrowRight size={18}/>
           </Link>
        </div>

        {loading && <div className="text-center py-20">Mengambil data...</div>}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {properties.map((item) => (
            <div 
              key={item.id} 
              onClick={() => openModal(item)} // KLIK KARTU BUAT BUKA POPUP
              className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer border border-slate-100"
            >
              <div className="relative h-72 overflow-hidden">
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-[#0a2558] text-xs font-bold px-4 py-2 rounded-full z-10 shadow-lg">
                   {item.type || "Properti"}
                </div>
                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-700"/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                   <p className="text-2xl font-bold text-[#d4af37] shadow-black drop-shadow-md">{formatRupiah(item.price)}</p>
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-bold text-xl text-[#0a2558] mb-2 line-clamp-1 group-hover:text-blue-700 transition">{item.title}</h3>
                <div className="flex items-center gap-2 text-slate-500 text-sm mb-6">
                   <MapPin size={16} className="text-[#d4af37]"/> {item.location}
                </div>
                
                <div className="grid grid-cols-3 gap-2 border-t border-slate-100 pt-4">
                   <div className="text-center">
                      <span className="block text-slate-400 text-xs font-medium mb-1">Luas Tanah</span>
                      <span className="font-bold text-slate-700">{item.lt || "-"} m²</span>
                   </div>
                   <div className="text-center border-l border-slate-100">
                      <span className="block text-slate-400 text-xs font-medium mb-1">K. Tidur</span>
                      <span className="font-bold text-slate-700">{item.beds}</span>
                   </div>
                   <div className="text-center border-l border-slate-100">
                      <span className="block text-slate-400 text-xs font-medium mb-1">K. Mandi</span>
                      <span className="font-bold text-slate-700">{item.baths}</span>
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- 4. MODAL / POP-UP DETAIL (ESTETIK) --- */}
      {selectedProp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
           {/* Backdrop Gelap Blur */}
           <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={closeModal}></div>
           
           {/* Kotak Modal */}
           <div className="relative bg-white w-full max-w-5xl h-[90vh] md:h-auto md:max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in fade-in zoom-in duration-300">
              
              {/* Tombol Close Floating */}
              <button onClick={closeModal} className="absolute top-4 right-4 z-20 bg-white/20 backdrop-blur hover:bg-white text-white hover:text-black p-2 rounded-full transition">
                 <X size={24}/>
              </button>

              {/* Bagian Kiri: Galeri Foto */}
              <div className="w-full md:w-1/2 bg-black relative flex flex-col justify-center">
                 <img 
                   src={selectedProp.gallery && selectedProp.gallery.length > 0 ? selectedProp.gallery[activeImageIndex] : selectedProp.image} 
                   className="w-full h-[300px] md:h-full object-contain bg-black"
                 />
                 
                 {/* Thumbnail Slider Kecil */}
                 {selectedProp.gallery && selectedProp.gallery.length > 1 && (
                   <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 px-4 overflow-x-auto">
                      {selectedProp.gallery.map((img: string, idx: number) => (
                        <button 
                          key={idx} 
                          onClick={() => setActiveImageIndex(idx)}
                          className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition ${activeImageIndex === idx ? 'border-[#d4af37]' : 'border-transparent opacity-70'}`}
                        >
                           <img src={img} className="w-full h-full object-cover"/>
                        </button>
                      ))}
                   </div>
                 )}
              </div>

              {/* Bagian Kanan: Info Detail */}
              <div className="w-full md:w-1/2 p-8 overflow-y-auto bg-white">
                 <span className="inline-block bg-blue-50 text-[#0a2558] text-xs font-bold px-3 py-1 rounded-full mb-4">
                    {selectedProp.type || "Properti"}
                 </span>
                 <h2 className="text-2xl md:text-3xl font-bold text-[#0a2558] mb-2">{selectedProp.title}</h2>
                 <p className="text-3xl font-bold text-[#d4af37] mb-6">{formatRupiah(selectedProp.price)}</p>

                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-slate-50 p-3 rounded-xl text-center">
                       <Maximize2 size={20} className="mx-auto text-slate-400 mb-1"/>
                       <p className="text-xs text-slate-400">Luas Tanah</p>
                       <p className="font-bold text-[#0a2558]">{selectedProp.lt || "-"} m²</p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl text-center">
                       <Home size={20} className="mx-auto text-slate-400 mb-1"/>
                       <p className="text-xs text-slate-400">Luas Bangunan</p>
                       <p className="font-bold text-[#0a2558]">{selectedProp.lb || "-"} m²</p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl text-center">
                       <Bed size={20} className="mx-auto text-slate-400 mb-1"/>
                       <p className="text-xs text-slate-400">K. Tidur</p>
                       <p className="font-bold text-[#0a2558]">{selectedProp.beds}</p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl text-center">
                       <Bath size={20} className="mx-auto text-slate-400 mb-1"/>
                       <p className="text-xs text-slate-400">K. Mandi</p>
                       <p className="font-bold text-[#0a2558]">{selectedProp.baths}</p>
                    </div>
                 </div>

                 <div className="mb-8">
                    <h3 className="font-bold text-lg text-[#0a2558] mb-3">Deskripsi Properti</h3>
                    <p className="text-slate-600 leading-relaxed text-sm whitespace-pre-line">
                       {selectedProp.description || "Tidak ada deskripsi tersedia."}
                    </p>
                 </div>

                 {/* Tombol Action Sticky */}
                 <div className="sticky bottom-0 bg-white pt-4 border-t mt-auto">
                    <a 
                      href={`https://wa.me/6285117490500?text=Halo Gold Grandis, saya tertarik dengan properti: ${selectedProp.title} (${formatRupiah(selectedProp.price)})`}
                      target="_blank"
                      className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition shadow-lg hover:shadow-green-200"
                    >
                       <MessageCircle size={20}/> Hubungi via WhatsApp
                    </a>
                    <p className="text-center text-xs text-slate-400 mt-3">Agen kami akan merespon dalam waktu singkat.</p>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* --- 5. FOOTER MINIMALIS --- */}
      <footer className="bg-white border-t border-slate-100 py-12 text-center">
         <p className="text-slate-400 text-sm">© 2025 Gold Grandis Property. All rights reserved.</p>
      </footer>
    </main>
  );
}