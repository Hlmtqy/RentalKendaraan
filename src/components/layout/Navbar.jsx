import React from 'react'
import { Home, List } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className='fixed bottom-0 w-full max-w-[400px] bg-white border-t border-gray-200 flex justify-around p-3 z-50 rounded-[50px] mb-5 shadow-2xl'>
      
      <Link
        to="/"
        className={`flex flex-col items-center p-2 ${
          location.pathname === '/'
            ? 'text-blue-600'
            : 'text-gray-400'
        }`}
      >
        <Home size={24} />
        <span className="text-xs font-medium mt-1">
          Beranda
        </span>
      </Link>

      <Link
        to="/logs"
        className={`flex flex-col items-center p-2 ${
          location.pathname === '/logs'
            ? 'text-blue-600'
            : 'text-gray-400'
        }`}
      >
        <List size={24} />
        <span className="text-xs font-medium mt-1">
          Riwayat
        </span>
      </Link>

    </nav>
  )
}

export default Navbar