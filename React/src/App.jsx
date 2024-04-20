import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./Login/LoginForm";
import HomePage from './HomePage/Home';
import NoPage from './NoPage';
import AdminPage from './AdminPage/Admin';
import RestaurentPage from './RestaurantPage/Res';
import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<LoginForm />} />
          <Route path='/Home/:userId' element={<HomePage />} />
          <Route path='/Res/:resId' element={<RestaurentPage />} />
          <Route path='/Admin/:adId' element={<AdminPage />} />
          <Route path='*' element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
