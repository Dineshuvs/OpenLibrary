// import logo from './logo.svg';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import LoginSignup from './Pages/loginSignup';
import './App.css';
import Search from './Pages/search';
import Login from './Pages/login';
import ProtectedRoutes from './Pages/ProtectedRoutes';
import { useState } from 'react';



function App() {
  const [accountVerified, setAccountVerified] = useState(false);

  return (
      <div>
          <BrowserRouter>
              <Routes>
                  <Route path='/signup' element={<LoginSignup />} />
                  <Route path='/login' element={<Login setAccountVerified={setAccountVerified} />} />
                  <Route element={<ProtectedRoutes accountVerified={accountVerified} />}>
                      <Route path='/search' element={<Search />} />
                  </Route>
                  <Route path='/' element={<Login setAccountVerified={setAccountVerified} />} />
              </Routes>
          </BrowserRouter>
      </div>
  );
}

export default App;
