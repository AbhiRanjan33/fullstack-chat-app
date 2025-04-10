import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import { Routes,Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import SettingsPage from './pages/SettingsPage'
import ProfilePage from './pages/ProfilePage'
import { axiosInstance } from './lib/axios'
import { useAuthStore } from './store/useAuthStore'
import { Loader } from 'lucide-react'
import { Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useThemeStore } from './store/useThemeStore.js'

const App = () => {
  const {authUser,checkAuth,isCheckingAuth,onlineUsers}=useAuthStore();
  const {theme}=useThemeStore();

  console.log({onlineUsers});

  useEffect(()=>{
    checkAuth()
  },[checkAuth]);

  console.log({authUser});

  if(isCheckingAuth && !authUser) return(
    <div>
    <Loader className='size-10 animate-spin'></Loader>
    </div>
  )

  return (
    <div data-theme={theme}>
      <Navbar/>
      <Routes>
        <Route path="/" element={authUser ? <HomePage/> : <Navigate to="/login"></Navigate>}></Route>
        <Route path="/signup" element={!authUser ? <SignUpPage/> : <Navigate to="/"></Navigate>}></Route>
        <Route path="/login" element={!authUser ? <LoginPage/> : <Navigate to="/"></Navigate>}></Route>
        <Route path="/settings" element={<SettingsPage/>}></Route>
        <Route path="/profile" element={authUser ? <ProfilePage/> : <Navigate to="/login"></Navigate>}></Route>
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App