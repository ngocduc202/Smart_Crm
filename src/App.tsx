import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import DetailUser from './Components/User/DetailUser'
import Home from './Pages/Home';
import { RedirectToLogin } from './Util/RedirectToLogin'
import Layout from './Pages/Layout';
function App() {
  return (
    <Routes>
      <Route index element={<RedirectToLogin />} />
      <Route path='/login' element={<Login />} />
      <Route path='/home' element={<Home />} />
      <Route path='/homePage' element={<Layout />} />
      <Route path='/detailuser' element={<DetailUser />} />
    </Routes>
  );
}

export default App;
