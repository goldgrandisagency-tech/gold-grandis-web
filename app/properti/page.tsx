// @ts-nocheck
"use client";
import { useEffect, useState } from 'react';
import { db } from '../lib/firebase'; // Mundur satu folder cari lib
import { collection, getDocs } from 'firebase/firestore';
import Link from 'next/link';
import { MapPin, Bed, Bath, Search } from 'lucide-react';

export default function Properties() {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "properties"));
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
      
      {/* NAVBAR */}
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
          </div>
        </div>
      </nav>

      {/* TITLE PAGE */}
      <div className="bg-white py-8 border-b">
         <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-2xl font-bold text-[#0a2558]">Semua Listing Properti</h1>
            <p className="text-gray-500 text-sm">Menampilkan semua properti yang tersedia untuk Anda</p>
         </div>
      </div>

      {/* GRID LISTING */}
      <section className="py-12 px-4 max-w-7xl mx-auto">
        {loading && <div className="text-center">Sedang memuat data...</div>}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {properties.map((item) => (
                <div key={item.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden group">
                    <div className="relative h-64">
                        <div className="absolute top-4 left-4 bg-[#0a2558] text-white text-xs font-bold px-3 py-1 rounded z-10">{item.tag || "Dijual"}</div>
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-500"/>
                    </div>
                    <div className="p-5">
                        <h4 className="font-bold text-lg mb-2 truncate">{item.title}</h4>
                        <p className="text-gray-500 text-sm mb-4 flex items-center gap-1"><MapPin size={14}/> {item.location}</p>
                        <p className="text-[#d4af37] font-bold text-xl mb-4">{formatRupiah(item.price)}</p>
                        <div className="flex gap-4 text-sm text-gray-600 border-t pt-3">
                            <span className="flex items-center gap-1"><Bed size={16}/> {item.beds} KT</span>
                            <span className="flex items-center gap-1"><Bath size={16}/> {item.baths} KM</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </section>
    </main>
  );
}