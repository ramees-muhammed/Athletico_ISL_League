
import { Route, Routes, useLocation } from 'react-router-dom'
// import './App.css'
import IntroPage from './pages/IntroPage';
import RegisterPage from './pages/RegisterPage';
import { AnimatePresence } from 'framer-motion';
import AdminLoginPage from './pages/AdminLoginPage';
import PlayerListPage from './pages/PlayerListPage';
import { AdminProvider } from './context/AdminContext';
import Layout from './components/layout/Layout';

function App() {
const location = useLocation(); //To control re-render behavior so AnimatePresence can properly detect route transitions and trigger animations.

  return (
    <AdminProvider>
 <Layout>

     <AnimatePresence mode="wait">
   <Routes location={location} key={location.pathname}>
      <Route path='/' element={<IntroPage/>}/>
      <Route path='/register' element={<RegisterPage/>}/>
      
<Route path="/players" element={<PlayerListPage />} />
          <Route path="/admin-login" element={<AdminLoginPage />} />
    </Routes>
    </AnimatePresence>
 </Layout>
    </AdminProvider>

 
  )
}

export default App
