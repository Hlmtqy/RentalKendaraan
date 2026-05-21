import React from 'react'
import { useState,useEffect } from 'react'
import { supabase } from "../../lib/supabase";
import { Trash2, Edit } from 'lucide-react'
import Modal from '../layout/Modal';
import Swal from 'sweetalert2'

const Logs = () => {

  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const fetchData = async () => {

  const { data, error } = await supabase
    .from("pesanan_mobil")
    .select("*")
    .order("created_at", { ascending: false });

  if(error){
    console.log(error);
    return;
  }

  setData(data);
}

useEffect(() => {
  fetchData();
}, []);

const handleDelete = async (id) => {

   const result = await Swal.fire({
    title: 'Yakin dihapus?',
    text: 'Data yang dihapus tidak bisa dikembalikan!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#46db9e',
    cancelButtonColor: '#f94c63',
    confirmButtonText: 'Ya, Hapus!',
    cancelButtonText: 'Batal'
  });

  if(result.isConfirmed){

    await supabase
      .from("pesanan_mobil")
      .delete()
      .eq("id", id);

    Swal.fire({
      title: 'Berhasil!',
      text: 'Pesanan berhasil dihapus!',
      icon: 'success',
      timer: 1500,
      showConfirmButton: false
    });

    fetchData();
  }
}

const handleEdit = (item) => {
  setEditData(item);
  setIsModalOpen(true);
}
return (
  <div className="min-h-screen bg-[#2F80ED] p-5 pb-28">

    {/* HEADER */}
    <div className="mb-8">
      <p className="text-yellow-200 text-lg">
        Welcome
      </p>

      <h1 className="text-white text-4xl font-extrabold">
        Riwayat Pesanan
      </h1>
    </div>

    {/* LIST DATA */}
    <div className="flex flex-col gap-4">

      {data.map((item) => (

        <div
          key={item.id}
          className="bg-white rounded-3xl p-5 flex items-center justify-between shadow-lg"
        >

          <div>
            <h2 className="text-xl font-bold text-gray-800">
              {item.mobil}
            </h2>

            <p className="text-gray-400 mt-1">
              {item.nama_pelanggan}
            </p>
          </div>

          <div>
            <p className="text-blue-500 text-xl font-extrabold">
              Jumlah {item.total}
            </p>

            <div className='flex gap-4 mt-1'>
              <button 
              type="button"
              onClick={() => handleEdit(item)}
              className='bg-blue-100 p-2 rounded-xl text-blue-500'
              >
              <Edit size={22}/>
              </button>
              <button 
              type="button"
              onClick={() => handleDelete(item.id)}
              className='bg-red-100 p-2 rounded-xl text-red-500'
              >
              <Trash2 size={22}/>
              </button>
            </div>
          </div>

        </div>


      ))}

      {data.length === 0 && (
          <div className='flex flex-col items-center justify-center mt-20 mb-4 text-white'>
            <div className='text-6xl md-4'>🥵</div>
            <p className='font-medium text-lg'>belum ada riwayat catatan</p>
            <p className='text-sm'>mulai catatan keuangan hari ini</p>
          </div>
        )}

    </div>
        <Modal
        isOpen={isModalOpen}
        onClose={() => {
        setIsModalOpen(false);
        setEditData(null);
        }}
        fetchData={fetchData}
        editData={editData}
      />
    </div>
  
)

}

export default Logs