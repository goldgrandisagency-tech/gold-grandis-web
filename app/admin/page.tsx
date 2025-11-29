// @ts-nocheck
"use client";

import { useState } from 'react';
import { db } from '../lib/firebase'; 
import { collection, addDoc } from 'firebase/firestore';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function AdminPage() {
  const [loading, setLoading] = useState(false);
  
  // Data Form Lengkap
  const [formData, setFormData] = useState({
    title: '', 
    type: 'Rumah Second', // Default pilihan
    price: '', 
    location: '', 
    lt: '', // Luas Tanah
    lb: '', // Luas Bangunan
    beds: '', 
    baths: '', 
    description: '',
    image: '', // Foto Utama
    gallery: '' // Foto Lainnya (Link dipisah koma)
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simpan ke Firebase
      await addDoc(collection(db, "properties"), {
        title: formData.title,
        type: formData.type,
        price: Number(formData.price),
        location: formData.location,
        lt: Number(formData.lt),
        lb: Number(formData.lb),
        beds: Number(formData.beds),
        baths: Number(formData.baths),
        description: formData.description,
        image: formData.image || "https://source.unsplash.com/random/800x600/?house",
        gallery: formData.gallery.split(','), // Ubah teks koma jadi list
        tag: formData.type, // Tag otomatis ngikut tipe
        createdAt: new Date()
      });
      
      alert("✅ Data Berhasil Disimpan!");
      // Reset Form
      setFormData({ title: '', type: 'Rumah Second', price: '', location: '', lt: '', lb: '', beds: '', baths: '', description: '', image: '', gallery: '' });
    } catch (error) {
      alert("❌ Gagal: " + error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-xl">
        
        <div className="flex items-center gap-4 mb-8 border-b pb-4">
            <Link href="/" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"><ArrowLeft size={20}/></Link>
            <h1 className="text-2xl font-bold text-[#0a2558]">Input Listing Baru</h1>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Judul & Tipe */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="label-admin">Judul Iklan</label>
                <input required placeholder="Cth: Rumah Mewah Hook Jagakarsa" className="input-admin" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
              </div>
              <div>
                <label className="label-admin">Tipe Properti</label>
                <select className="input-admin" value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})}>
                    <option>Rumah Second</option>
                    <option>Rumah Baru</option>
                    <option>Tanah</option>
                    <option>Sewa</option>
                    <option>Take Over</option>
                    <option>Ruko</option>
                </select>
              </div>
          </div>

          {/* Harga & Lokasi */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div>
                <label className="label-admin">Harga (Angka Saja)</label>
                <input required type="number" placeholder="Cth: 1500000000" className="input-admin" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} />
             </div>
             <div>
                <label className="label-admin">Lokasi</label>
                <input required placeholder="Kecamatan, Kota" className="input-admin" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} />
             </div>
          </div>

          {/* Spesifikasi (LT, LB, KT, KM) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-blue-50 p-4 rounded-xl">
            <div>
                <label className="label-admin">L. Tanah (m²)</label>
                <input required type="number" className="input-admin" value={formData.lt} onChange={(e) => setFormData({...formData, lt: e.target.value})} />
            </div>
            <div>
                <label className="label-admin">L. Bangunan (m²)</label>
                <input required type="number" className="input-admin" value={formData.lb} onChange={(e) => setFormData({...formData, lb: e.target.value})} />
            </div>
            <div>
                <label className="label-admin">K. Tidur</label>
                <input required type="number" className="input-admin" value={formData.beds} onChange={(e) => setFormData({...formData, beds: e.target.value})} />
            </div>
            <div>
                <label className="label-admin">K. Mandi</label>
                <input required type="number" className="input-admin" value={formData.baths} onChange={(e) => setFormData({...formData, baths: e.target.value})} />
            </div>
          </div>

          {/* Deskripsi */}
          <div>
            <label className="label-admin">Deskripsi Lengkap</label>
            <textarea rows={4} className="input-admin" placeholder="Jelaskan selling point, akses jalan, legalitas, dll..." value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
          </div>

          {/* Foto */}
          <div className="space-y-3">
             <div>
                <label className="label-admin">Link Foto Utama (Cover)</label>
                <input placeholder="https://..." className="input-admin" value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} />
             </div>
             <div>
                <label className="label-admin">Link Foto Lainnya (Pisahkan dengan koma)</label>
                <input placeholder="https://foto2.jpg, https://foto3.jpg" className="input-admin" value={formData.gallery} onChange={(e) => setFormData({...formData, gallery: e.target.value})} />
                <p className="text-xs text-gray-500 mt-1">*Bisa isi banyak link, pisahkan dengan tanda koma (,)</p>
             </div>
          </div>

          <button disabled={loading} type="submit" className="w-full bg-[#0a2558] text-white font-bold py-4 rounded-xl hover:bg-blue-900 transition shadow-lg text-lg">
            {loading ? "Menyimpan Data..." : "Tayangkan Properti"}
          </button>

        </form>
      </div>
      
      {/* CSS Tambahan khusus halaman ini */}
      <style jsx>{`
        .label-admin { display: block; font-size: 0.875rem; font-weight: 600; color: #4a5568; margin-bottom: 0.5rem; }
        .input-admin { width: 100%; padding: 0.75rem; border: 1px solid #cbd5e0; border-radius: 0.5rem; outline: none; transition: border-color 0.2s; }
        .input-admin:focus { border-color: #0a2558; ring: 2px; }
      `}</style>
    </div>
  );
}