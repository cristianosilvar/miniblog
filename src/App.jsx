import './styles/App.css';

import {BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { onAuthStateChanged } from 'firebase/auth';
import { useAuthentication } from './hooks/useAuthentication'

import { AuthProvider } from './context/AuthContext';

import Home from './pages/Home/Home'
import About from './pages/About/About'
import {Dashboard} from './pages/Dashboard/Dashboard'
import {CreatePost} from './pages/CreatePost/CreatePost'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'

import Header from'./components/Header'
import Footer from'./components/Footer'
import { Search } from './pages/Search/Search';

function App() {
  const [user, setUser] = useState(undefined)
  const {auth} = useAuthentication()

  const loadingUser = user === undefined

  useEffect((
    onAuthStateChanged(auth, user => {
      setUser(user)
    })
  ), [auth])

  if (loadingUser) {
    return <span>Carregando...</span>
  }

  return (
    <div className="App">
      <AuthProvider value={{user}}>
        <BrowserRouter>
          <Header/>
          <div className="container">
            <Routes>
              <Route path='/' element={<Home/>} />
              <Route path='/about' element={<About/>} />
              <Route path='/search' element={<Search/>}  />
              <Route 
                path='/posts/create' 
                element={user ? <CreatePost/> : <Navigate to='/' /> }  />
              <Route 
                path='/dashboard' 
                element={user ? <Dashboard/> : <Navigate to='/' /> }  
              />
              <Route 
                path='/login' 
                element={!user ? <Login/> : <Navigate to='/' /> } 
              />
              <Route 
                path='/register' 
                element={!user ? <Register/> : <Navigate to='/' />}
              />
            </Routes>
          </div>
          <Footer/>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
