import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';

import { RedirectToLogin } from './Util/RedirectToLogin'
import DashboardPage from './Pages/DashboardPage';
import UserManagerPage from './Pages/UserManagerPage';
import DetailUserPage from './Pages/DetailUserPage';
function App() {
  return (
    <Routes>
      <Route index element={<RedirectToLogin />} />
      <Route path='/login' element={<Login />} />
      {/* <Route path='/home' element={<Home />} /> */}
      <Route path='/dasboard' element={<DashboardPage />} />
      <Route path='/usermanager' element={<UserManagerPage />} />
      <Route path='/detailuser' element={<DetailUserPage />} />
    </Routes>
  );
}

export default App;
