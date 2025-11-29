// @ts-nocheck
"use client";
import { useEffect, useState } from 'react';
import { db } from '../lib/firebase'; 
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import Link from 'next/link';
import { MapPin, Bed, Bath, Move, Home, Layers } from 'lucide-react';

export default function Properties() {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const q = query(collection(db, "properties")); // Ambil semua data
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
    <main className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      
      {/* NAVBAR TERINTEGRASI */}
      <nav className="bg-white shadow-sm sticky top-0 z-50 px-4 py-3">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
             <img src="/logo.jpg" alt="Logo" className="h-10 w-auto object-contain" />
             <span className="font-bold text-[#0a2558] text-xl hidden md:block">GOLD GRANDIS</span>
          </div>
          <div className="flex gap-6 text-sm font-semibold text-gray-600">
            <Link href="/" className="hover:text-[#0a2558]">Beranda</Link>
            <Link href="/properti" className="text-[#0a2558] border-b-2 border-[#d4af37]">Listing</Link>
            <Link href="/tentang-kami" className="hover:text-[#0a2558]">Tentang Kami</Link>
             <Link href="/admin" className="hover:text-[#0a2558]">Admin</Link>
          </div>
        </div>
      </nav>

      {/* HEADER PAGE */}
      <div className="bg-white py-8 border-b">
         <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-2xl font-bold text-[#0a2558]">Semua Listing Properti</h1>
            <p className="text-gray-500 text-sm">Temukan rumah baru, second, tanah, atau properti sewa.</p>
         </div>
      </div>

      {/* GRID LISTING (CARD BARU) */}
      <section className="py-12 px-4 max-w-7xl mx-auto">
        {loading && <div className="text-center py-10">Sedang memuat data...</div>}
        
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
                    
                    {/* INFO PROPERTI */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                            <h4 className="font-bold text-lg mb-2 leading-tight group-hover:text-[#0a2558] transition">{item.title}</h4>
                            <p className="text-gray-500 text-sm mb-4 flex items-center gap-1"><MapPin size={14} className="text-[#d4af37]"/> {item.location}</p>
                            
                            {/* Deskripsi Singkat (Dipotong) */}
                            {item.description && (
                                <p className="text-xs text-gray-400 mb-4 line-clamp-2">{item.description}</p>
                            )}
                        </div>

                        {/* SPESIFIKASI ROW */}
                        <div className="grid grid-cols-4 gap-2 border-t pt-4 text-xs font-semibold text-gray-600 text-center">
                            <div className="bg-gray-50 py-2 rounded">
                                <span className="block text-gray-400 font-normal mb-1">LT</span>
                                {item.lt} m²
                            </div>
                            <div className="bg-gray-50 py-2 rounded">
                                <span className="block text-gray-400 font-normal mb-1">LB</span>
                                {item.lb} m²
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
      </section>
    </main>
  );
}