import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] =  useState('')
  const [isLoading, setIsLoading] = useState(false);
  const {login} = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) =>{
    e.preventDefault();
    setIsLoading(true)
    try{
      await login(email, password);
      Swal.fire({
        title: 'BErhasil log',
        icon: 'success',
        timer:1500,
        showConfirmButton: false
      })
      navigate('/')
    }catch(error){
      Swal.fire({
        title: 'kamu gagal log',
        icon: 'error',
        text: 'email atau password salah'
      });
    }finally{
      setIsLoading(false);
    }
  };

  return(
    <div className='min-h-screen flex flex-col items-center justify-center p-5 bg-emerald'>
      <div className='bg-white p-8 rounded-3xl shadow-xl w-full max-w-sm'>
        {/* judul */}
        <div className='text-center mb-6'>
          <div className='text-5xl mb-2 text-blue-500'>ō͡≡o</div>
          <h2 className='text-2xl font-bold text-shadow-gray-800'>Masuk Brangkas</h2>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className='block text-sm font-semibold text-shadow-gray-700 mb-1'>username</label>
            <input
              type='email'
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full bg-gray-50 border border-gray-200 rounded-xl p-3 outline-none focus:ring-2
              focus:ring-blue-500'
            />
          </div>


          {/* register */}
          <div>
            <label className='block text-sm font-semibold text-shadow-gray-700 mb-1'>password</label>
            <input
            type='password'
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full bg-gray-50 border border-gray-200 rounded-xl p-3 outline-none focus:ring-2
              focus:ring-blue-500'
            />
          </div>
          <button type='submit' disabled={isLoading} className='w-full
          bg-blue-500 text-white font-bold py-3 rounded-xl
          hover:bg-blue-600 transition disabled'>
            {isLoading ? 'Memproses' : 'masuk'}
          </button>
        </form>
        <p className='text-center text-sm text-gray-500 mt-6'>
          <Link to="/register" className="text-blue-500 font-bold hover:underline">belum punya akun?</Link>
        </p>
      </div>
    </div>
  )
}
export default Login