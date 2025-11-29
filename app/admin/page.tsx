// @ts-nocheck
"use client";

import { useState } from 'react';
// Perhatikan titik dua (..) ini artinya mundur satu langkah keluar folder admin
import { db } from '../lib/firebase'; 
import { collection, addDoc } from 'firebase/firestore';

export default function AdminPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '', price: '', location: '', beds: '', baths: '', image: ''
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, "properties"), {
        title: formData.title,
        price: Number(formData.price),
        location: formData.location,
        beds: Number(formData.beds),
        baths: Number(formData.baths),
        image: formData.image || "https://images.unsplash.com/photo-1580587771525-78b9dba3b91d",
        tag: "Dijual",
        createdAt: new Date()
      });
      alert("✅ Berhasil! Properti sudah tayang.");
      setFormData({ title: '', price: '', location: '', beds: '', baths: '', image: '' });
    } catch (error) {
      console.error(error);
      alert("❌ Gagal menyimpan: " + error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex justify-center items-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg">
        <h1 className="text-2xl font-bold text-[#1a3b8e] mb-6 text-center">Admin Gold Grandis</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input required placeholder="Judul (Misal: Rumah Mewah)" className="w-full p-3 border rounded" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
          <input required type="number" placeholder="Harga (Angka saja)" className="w-full p-3 border rounded" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} />
          <input required placeholder="Lokasi" className="w-full p-3 border rounded" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} />
          <div className="flex gap-4">
            <input required type="number" placeholder="KT" className="w-full p-3 border rounded" value={formData.beds} onChange={(e) => setFormData({...formData, beds: e.target.value})} />
            <input required type="number" placeholder="KM" className="w-full p-3 border rounded" value={formData.baths} onChange={(e) => setFormData({...formData, baths: e.target.value})} />
          </div>
          <input placeholder="Link Foto URL" className="w-full p-3 border rounded" value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} />
          <button disabled={loading} type="submit" className="w-full bg-[#1a3b8e] text-white font-bold py-3 rounded-lg hover:bg-blue-800 transition">
            {loading ? "Menyimpan..." : "Posting Properti"}
          </button>
        </form>
      </div>
    </div>
  );
}