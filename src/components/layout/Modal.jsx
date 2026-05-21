import { useState,useEffect } from "react";
import { supabase } from "../../lib/supabase";
import Swal from "sweetalert2";



const Modal = ({ isOpen, onClose, fetchData, editData }) => {

  const [formData, setFormData] = useState({
  mobil: '',
  total: '',
  nama_pelanggan: ''
});

  useEffect(() => {

  if(editData){
    setFormData({
      mobil: editData.mobil,
      total: editData.total,
      nama_pelanggan: editData.nama_pelanggan
    });
  }

 }, [editData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {

    let error;

    if(editData){

      const { error: updateError } = await supabase
        .from("pesanan_mobil")
        .update({
          mobil: formData.mobil,
          total: parseInt(formData.total),
          nama_pelanggan: formData.nama_pelanggan
        })
        .eq("id", editData.id);

      error = updateError;

    } else {

      const { error: insertError } = await supabase
        .from("pesanan_mobil")
        .insert([
          {
            mobil: formData.mobil,
            total: parseInt(formData.total),
            nama_pelanggan: formData.nama_pelanggan
          }
        ]);

      error = insertError;
    }

    // CEK ERROR SUPABASE
    if(error){
      console.log(error);

      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error'
      });

      return;
    }

    // SUCCESS
    Swal.fire({
      title: 'Berhasil!',
      text: editData
        ? 'Pesanan berhasil diupdate!'
        : 'Pesanan berhasil ditambahkan!',
      icon: 'success',
      timer: 1500,
      showConfirmButton: false
    });

    if(fetchData){
      fetchData();
    }

  onClose();
  } catch(error){

    console.log(error);

    Swal.fire({
      title: 'Error!',
      text: 'Terjadi kesalahan!',
      icon: 'error'
    });
  }
  }
  // kalau modal belum dibuka
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[9999]">

      <div className="bg-blue-500 rounded-[45px] w-full max-w-sm p-8 shadow-2xl">
        <h2 className="text-white text-3xl font-extrabold mb-8">
          Pesan mobil
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label className="text-white text-lg font-semibold mb-3 block">
              Pilih mobil
            </label>

            <select
              name="mobil"
              value={formData.mobil}
              onChange={handleChange}
              className="w-full bg-white rounded-2xl px-5 py-4 outline-none text-gray-500"
            >
              <option value="">pilih mobil</option>
              <option value="Avanza">Avanza</option>
              <option value="Brio">Brio</option>
              <option value="Porsche">Porsche</option>
            </select>
          </div>

          {/* TOTAL */}
          <div>
            <label className="text-white text-lg font-semibold mb-3 block">
              Total
            </label>

            <input
              type="number"
              name="total"
              value={formData.total}
              onChange={handleChange}
              className="w-full bg-white rounded-2xl px-5 py-4 outline-none"
            />
          </div>

          <div>
            <label className="text-white text-lg font-semibold mb-3 block">
              Nama pelanggan
            </label>

            <input
                type="text"
                name="nama_pelanggan"
                value={formData.nama_pelanggan}
                onChange={handleChange}
                className="w-full bg-white rounded-2xl px-5 py-4 outline-none"
            />
          </div>

          <div className="flex gap-3 mt-4 mb-20">

            <button
              type="button"
              onClick={onClose}
              className="bg-black w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl"
            >
              ⌫
            </button>

            <button
              type="submit"
              className="flex-1 bg-black text-white font-bold text-xl py-4 rounded-full"
            >
              Simpan pesanan
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default Modal;