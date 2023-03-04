import { useState } from 'react';
import { ItemListContainer, ItemDetailContainer, Navbar, Error404 } from './component';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { UserProvider } from './globalStore/UserContext';
import Cart from './component/Checkout';


function App() {
  return (
    <div className='app'>
      <UserProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path={'/'} element={<ItemListContainer />} />
            <Route path={'/category/:id'} element={<ItemListContainer />} />
            <Route path={'/item/:id'} element={<ItemDetailContainer />} />
            <Route path={'/cart'} element={<Cart />} />
            <Route path={'/about'} element={<ItemListContainer />} />
            <Route path={'*'} element={<Error404 />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
