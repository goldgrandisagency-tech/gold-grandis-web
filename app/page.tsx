// @ts-nocheck
"use client";

import { useEffect, useState } from 'react';
import { db } from './lib/firebase'; 
import { collection, getDocs, limit, query } from 'firebase/firestore';
import Link from 'next/link';

export default function Home() {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // --- AMBIL DATA DARI FIREBASE ---
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        // Ambil 6 properti terbaru
        const q = query(collection(db, "properties"), limit(6));
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
    <main>
      
      {/* FLOATING WHATSAPP */}
      <a href="https://wa.me/6285117490500" target="_blank" className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg animate-pulse-glow hover:scale-110 transition pointer-events-auto">
         <i className="fa-brands fa-whatsapp text-4xl"></i>
      </a>

      {/* HERO SECTION */}
      <section id="home" className="relative h-[550px] flex items-center justify-center bg-dark overflow-hidden">
        <img src="https://res.cloudinary.com/dzcccwsnk/image/upload/v1764346166/2742d87f35a87f630f655d25df709524_m771cx.jpg" className="absolute inset-0 w-full h-full object-cover opacity-40 pointer-events-none z-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-darkblue via-darkblue/60 to-transparent pointer-events-none z-0"></div>
        
        <div className="relative z-10 container mx-auto px-4 text-center text-white mt-10">
            <span className="bg-white/10 border border-white/30 px-4 py-1 rounded-full text-xs md:text-sm font-semibold mb-6 inline-block backdrop-blur-sm shadow-sm pointer-events-none">
                <i className="fa-solid fa-star text-secondary mr-1"></i> #1 Agency Terpercaya
            </span>
            <h1 className="text-3xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-lg pointer-events-none">
                Hunian Masa Depan<br/>Bersama Gold Grandis
            </h1>
            <p className="text-gray-200 mb-10 text-sm md:text-xl max-w-2xl mx-auto font-light leading-relaxed pointer-events-none">
                Spesialis jual beli Rumah Baru, Second, Ruko, Tanah, hingga Over Kredit dengan proses aman dan transparan di Jabodetabek.
            </p>
            
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center w-full max-w-sm mx-auto md:max-w-none relative z-50">
                <Link href="/properti" className="w-full md:w-auto bg-primary hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-bold text-base md:text-lg transition shadow-lg text-center cursor-pointer transform hover:-translate-y-1 block">
                    Cari Properti
                </Link>
                <Link href="/tentang-kami" className="w-full md:w-auto bg-transparent hover:bg-white hover:text-darkblue border border-white text-white px-8 py-3 rounded-lg font-bold text-base md:text-lg transition text-center cursor-pointer transform hover:-translate-y-1 block">
                    Tentang Kami
                </Link>
            </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="bg-white py-8 shadow-sm relative z-20 -mt-10 mx-4 md:mx-20 rounded-xl border-b-4 border-primary">
        <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center divide-x divide-gray-100">
            <div><h3 className="text-2xl font-bold text-primary">Amanah</h3><p className="text-gray-500 text-sm">Transaksi Terpercaya</p></div>
            <div><h3 className="text-2xl font-bold text-primary">Selektif</h3><p class="text-gray-500 text-sm">Listing Pilihan</p></div>
            <div><h3 className="text-2xl font-bold text-primary">4 Tahun</h3><p className="text-gray-500 text-sm">Pengalaman</p></div>
            <div><h3 className="text-2xl font-bold text-primary">Profesional</h3><p className="text-gray-500 text-sm">Pelayanan Terbaik</p></div>
        </div>
      </section>

      {/* LISTING SECTION */}
      <section id="listing" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-darkblue mb-3">Listing Terbaru</h2>
                <div className="w-20 h-1 bg-primary mx-auto mb-4"></div>
                <p className="text-gray-600 text-sm md:text-base">Properti pilihan terbaru yang baru saja kami tambahkan.</p>
            </div>

            {loading && (
                <div className="text-center py-10">
                    <i className="fa-solid fa-circle-notch fa-spin text-primary text-3xl"></i>
                    <p className="text-gray-500 mt-2 text-sm">Memuat data...</p>
                </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                {properties.map((prop) => (
                    <div key={prop.id} className="group cursor-pointer block mx-auto bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 w-full max-w-[280px] flex flex-col h-[400px] relative z-30 transform hover:-translate-y-2">
                        <div className="relative h-[220px] w-full overflow-hidden bg-gray-200 shrink-0">
                            <span className="absolute top-3 left-3 bg-primary text-white text-[10px] px-2 py-1 rounded z-10 uppercase font-bold shadow">{prop.type || 'Properti'}</span>
                            <img src={prop.image || 'https://via.placeholder.com/280x310'} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                            <span className="absolute top-3 right-3 bg-red-500 text-white text-[10px] px-2 py-1 rounded z-10 font-bold shadow animate-pulse">BARU</span>
                        </div>
                        
                        <div className="p-4 flex flex-col justify-between flex-1">
                            <div>
                                <h3 className="font-bold text-darkblue text-base line-clamp-2 leading-tight mb-1 group-hover:text-primary transition">{prop.title}</h3>
                                <div className="flex items-center text-gray-500 text-xs mt-1 mb-2">
                                    <i className="fa-solid fa-location-dot mr-1 text-red-500"></i> 
                                    <span className="truncate max-w-[200px]">{prop.location}</span>
                                </div>
                            </div>
                            
                            <p className="text-lg font-bold text-secondary">{formatRupiah(prop.price)}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-center mt-12">
                <Link href="/properti" className="inline-block border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-lg font-bold transition cursor-pointer text-sm md:text-base">
                    Lihat Semua Listing <i className="fa-solid fa-arrow-right ml-2"></i>
                </Link>
            </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="py-24 bg-white overflow-hidden border-t border-gray-100">
        <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-16">
                
                <div className="w-full lg:w-1/2 relative hidden md:block"> 
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl group h-[500px]">
                         <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition duration-500 z-10 pointer-events-none"></div>
                         <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Agen Properti" className="w-full h-full object-cover transform group-hover:scale-105 transition duration-700" />
                    </div>
                </div>
                
                <div className="w-full lg:w-1/2">
                    <span className="text-secondary font-bold tracking-wider uppercase text-sm mb-2 block">Layanan Kami</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-darkblue mb-6 leading-tight">Solusi Properti <br/>Terlengkap & Terpercaya</h2>
                    <p className="text-gray-600 mb-8 leading-relaxed text-base">
                        Gold Grandis Property hadir untuk mempermudah perjalanan properti Anda. Kami menyediakan layanan <i>end-to-end</i> mulai dari konsultasi hingga serah terima kunci.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition hover:border-blue-100">
                            <div className="w-12 h-12 bg-blue-100 text-primary rounded-full flex items-center justify-center text-xl shrink-0"><i className="fa-solid fa-house-chimney"></i></div>
                            <div><h4 className="font-bold text-darkblue text-lg mb-1">Jual Beli Rumah</h4><p className="text-sm text-gray-500 leading-snug">Listing eksklusif rumah baru & second legalitas aman.</p></div>
                        </div>
                        <div className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition hover:border-blue-100">
                            <div className="w-12 h-12 bg-blue-100 text-primary rounded-full flex items-center justify-center text-xl shrink-0"><i className="fa-solid fa-hand-holding-dollar"></i></div>
                            <div><h4 className="font-bold text-darkblue text-lg mb-1">Over Kredit</h4><p className="text-sm text-gray-500 leading-snug">Proses cepat, resmi, dan transparan.</p></div>
                        </div>
                        <div className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition hover:border-blue-100">
                            <div className="w-12 h-12 bg-blue-100 text-primary rounded-full flex items-center justify-center text-xl shrink-0"><i className="fa-solid fa-shop"></i></div>
                            <div><h4 className="font-bold text-darkblue text-lg mb-1">Komersial</h4><p className="text-sm text-gray-500 leading-snug">Ruko & ruang usaha di lokasi strategis.</p></div>
                        </div>
                        <div className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition hover:border-blue-100">
                            <div className="w-12 h-12 bg-blue-100 text-primary rounded-full flex items-center justify-center text-xl shrink-0"><i className="fa-solid fa-layer-group"></i></div>
                            <div><h4 className="font-bold text-darkblue text-lg mb-1">Tanah Kavling</h4><p className="text-sm text-gray-500 leading-snug">Pilihan tanah prospektif untuk hunian/investasi.</p></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-20 bg-darkblue text-white text-center relative overflow-hidden">
        <i className="fa-solid fa-building-columns text-white/5 absolute -top-10 -left-10 text-9xl"></i>
        <i className="fa-solid fa-city text-white/5 absolute -bottom-10 -right-10 text-9xl"></i>

        <div className="container mx-auto px-4 max-w-4xl relative z-10">
            <h2 className="text-3xl font-bold mb-6">Tentang Gold Grandis</h2>
            <p className="text-lg text-gray-300 mb-10 leading-relaxed">
                "Kami bukan sekadar menjual properti, kami membantu Anda menemukan tempat untuk membangun masa depan. Dengan jaringan luas di seluruh Jabodetabek dan tim yang berdedikasi, kami menjamin pengalaman transaksi yang aman, nyaman, dan menguntungkan."
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white/5 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
                    <i className="fa-solid fa-shield-halved text-4xl text-primary mb-3"></i>
                    <h4 className="font-bold text-lg">Legalitas Terjamin</h4>
                    <p className="text-sm text-gray-400 mt-2">Cek sertifikat dan dokumen hingga tuntas.</p>
                </div>
                <div className="bg-white/5 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
                    <i className="fa-solid fa-bolt text-4xl text-primary mb-3"></i>
                    <h4 className="font-bold text-lg">Respon Cepat</h4>
                    <p className="text-sm text-gray-400 mt-2">Siap melayani survei kapan saja.</p>
                </div>
                <div className="bg-white/5 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
                    <i className="fa-solid fa-handshake text-4xl text-primary mb-3"></i>
                    <h4 className="font-bold text-lg">Negosiasi Terbaik</h4>
                    <p className="text-sm text-gray-400 mt-2">Harga deal yang menguntungkan kedua pihak.</p>
                </div>
            </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="bg-dark text-gray-300 py-12 border-t border-gray-800">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 justify-between">
            <div>
                <div className="mb-4">
                    <img src="https://res.cloudinary.com/dzcccwsnk/image/upload/v1764346570/Project_2_tligfr.png" alt="Gold Grandis Logo" className="h-12 w-auto object-contain"/>
                </div>
                <p className="text-sm mb-6 text-gray-400 leading-relaxed max-w-sm text-justify">Partner properti terpercaya Anda di wilayah Jabodetabek. Melayani jual beli dan sewa dengan profesionalisme tinggi.</p>
                <div className="flex space-x-4">
                    <a href="https://web.facebook.com/p/Gold-Grandis-Property-61555696204327/?_rdc=1&_rdr#" target="_blank" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white hover:bg-primary hover:text-white transition"><i className="fa-brands fa-facebook-f"></i></a>
                    <a href="https://www.instagram.com/goldgrandisproperty/#" target="_blank" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white hover:bg-primary hover:text-white transition"><i className="fa-brands fa-instagram"></i></a>
                    <a href="https://www.tiktok.com/@gold.grandis.property" target="_blank" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white hover:bg-primary hover:text-white transition"><i className="fa-brands fa-tiktok"></i></a>
                    <a href="https://www.youtube.com/@goldgrandisproperty" target="_blank" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white hover:bg-primary hover:text-white transition"><i className="fa-brands fa-youtube"></i></a>
                </div>
            </div>
            <div className="md:text-right">
                <h4 className="text-lg font-bold text-white mb-4">Hubungi Kami</h4>
                <ul className="space-y-4 text-sm md:flex md:flex-col md:items-end">
                    <li className="flex items-start gap-3 md:flex-row-reverse">
                        <i className="fa-solid fa-location-dot mt-1 text-primary"></i>
                        <span>Jagakarsa, Jakarta Selatan,<br/>DKI Jakarta, Indonesia</span>
                    </li>
                    <li className="flex items-center gap-3 md:flex-row-reverse">
                        <i className="fa-brands fa-whatsapp text-primary text-lg"></i>
                        <a href="https://wa.me/6285117490500" className="hover:text-primary transition">0851 1749 0500</a>
                    </li>
                    <li className="flex items-center gap-3 md:flex-row-reverse">
                        <i className="fa-regular fa-envelope text-primary"></i>
                        <a href="mailto:goldgrandisagency@gmail.com" className="hover:text-primary transition">goldgrandisagency@gmail.com</a>
                    </li>
                </ul>
            </div>
        </div>
        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-xs text-gray-500">
            &copy; 2024 Gold Grandis Property. All Rights Reserved.
        </div>
      </footer>

    </main>
  );
}