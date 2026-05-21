import Navbar from "./components/layout/Navbar";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./components/pages/Dashboard";
import Logs from "./components/pages/Logs";
import Login from "./components/pages/Login";
import { useAuth } from "./hooks/useAuth";
import Register from "./components/pages/Register";


const PrivateRoute = ({children}) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />
  }
  return children;
}

function App() {
  

  const { user } =useAuth();
  return (
    //buat ngambil hal nya
    //ukuran mobile
    <div className='min-h-screen bg-gray-100 flex justify-center'>
      <div className='w-full max-w-100 bg-gray-50 min-h-screen relative shadow-2xl border-blue-500 border-1'>
      <Router>
        <Routes>
          {/* publik */}
          <Route path="/login" element={user ? <Navigate to="/"/>: <Login/>}/>
          <Route path="/register" element={user ? <Navigate to="/"/>: <Register/>}/>

          {/* private */}
          <Route path="/" element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
          <Route path="/logs" element={<PrivateRoute><Logs/></PrivateRoute>}/>
        </Routes>
        {user && <Navbar/>}
        <Navbar/>
      </Router>
      </div>
    </div>
  );
}

export default App
