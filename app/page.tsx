// @ts-nocheck
"use client";

import { useEffect, useState } from 'react';
// Perhatikan titik satu (.) karena page.tsx sejajar dengan folder lib
import { db } from './lib/firebase'; 
import { collection, getDocs } from 'firebase/firestore';
import Link from 'next/link';
import { Search, MapPin, Phone, Menu, Facebook, Instagram, Bed, Bath } from 'lucide-react';

export default function Home() {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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
    <main className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <nav className="bg-white shadow-md sticky top-0 z-50 p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
           {/* Pastikan file logo.jpg ada di folder public */}
           <img src="/logo.jpg" alt="Logo" className="h-10 w-auto" />
           <span className="font-bold text-[#1a3b8e]">GOLD GRANDIS</span>
        </div>
        <Link href="/admin" className="text-sm bg-gray-100 px-3 py-1 rounded">Login Admin</Link>
      </nav>

      <div className="py-12 px-4 max-w-7xl mx-auto">
        <h3 className="text-2xl font-bold text-[#1a3b8e] mb-6">Listing Terbaru</h3>
        
        {loading && <p>Loading...</p>}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {properties.map((item) => (
                <div key={item.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <img src={item.image} alt={item.title} className="w-full h-48 object-cover"/>
                    <div className="p-4">
                        <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                        <p className="text-gray-500 text-sm mb-2">{item.location}</p>
                        <div className="text-[#d4af37] font-bold text-xl">{formatRupiah(item.price)}</div>
                        <div className="flex gap-4 mt-2 text-sm text-gray-600">
                            <span>🛏 {item.beds} KT</span>
                            <span>🚿 {item.baths} KM</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </main>
  );
}