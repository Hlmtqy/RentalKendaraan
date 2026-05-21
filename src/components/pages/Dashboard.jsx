import React from 'react'
import Modal from '../layout/Modal'
import { useState, useEffect } from "react";
import { supabase } from '../../lib/supabase';


const Dashboard = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);

  const fetchData = async () => {
  const { data, error } = await supabase
    .from("pesanan_mobil")
    .select("*")

  if(error){
    console.log(error)
    return
  }

  setData(data)
  }

  useEffect(() => {
  fetchData()
  }, [])


  return (
    <div className='p-5 pb-24'>
      <h1 className='text-2xl font-extrabold text-gray-800 mb-13 mt-5'>
        PinjemDong
      </h1>

      <div className='bg-blue-500 rounded-2xl p-6 text-white shadow-lg mb-6 relative'>
        <p className="text-emerald-100 text-sm font-medium">
          Welcome
        </p>

        <h2 className='text-3xl font-black mt-2 mb-5'>
          PinjemMobil
        </h2>

        <div className='absolute -right-4 -bottom-4 opacity-50 text-8xl'>
          ō͡≡o
        </div>
      </div>

      <p className="text-black text-sm font-medium ml-3">
        Mobil tersedia
      </p>

      <div className="flex gap-3 mt-2">

        {/* Box 1 */}
        <div className="bg-white shadow-lg mb-6 relative rounded-2xl p-6 w-64">
          <p className="text-black text-sm font-medium mb-4">
            Avanza
          </p>

          <img
            src="https://imgcdn.oto.com/large/gallery/color/38/1654/toyota-avanza-color-523617.jpg"
            alt="Avanza"
            className="w-full object-contain"
          />
        </div>

        {/* Box 2 */}
        <div className="bg-white shadow-lg mb-6 relative rounded-2xl p-6 w-64">
          <p className="text-black text-sm font-medium mb-4">
            Brio
          </p>

          <img
            src="https://xmxpc86yeg.otospector.co.id/wp-content/uploads/2026/04/brio-terendah-dan-tertinggi.webp"
            alt="Brio"
            className="w-full object-contain"
          />
        </div>

        {/* Box 3 */}
        <div className="bg-white shadow-lg mb-6 relative rounded-2xl p-6 w-64">
          <p className="text-black text-sm font-medium mb-1">
            Porsche
          </p>

          <img
            src="https://png.pngtree.com/png-vector/20240325/ourmid/pngtree-car-isolated-on-white-background-porsche-911-png-image_12235239.png"
            alt="Porsche"
            className="w-full object-contain"
          />
        </div>

      </div>

      <button 
      onClick={() => setIsModalOpen(true)}
      className='w-full bg-slate-800 text-white font-bold text-lg py-4 rounded-2xl shadow-lg hover:bg-blue-500 transition active:scale-95'>
        + Tambah Pesanan
      </button>
      <Modal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      />
    </div>
  )
}

export default Dashboard