import { useState, useEffect } from 'react';
import { ItemListContainer, ItemDetailContainer, Navbar, Error404 } from './component';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  const greeting = 'Welcome';
  const [ carts, setCarts ] = useState(0);

  const increaseAmount = () => {
    setCarts(prevAmount => prevAmount + 1)
  }

  return (
    <div className='app'>
      <BrowserRouter>
        <Navbar amount={carts} />
        <Routes>
          <Route path={'/'} element={<ItemListContainer />} />
          <Route path={'/category/:id'} element={<ItemListContainer addItems={increaseAmount} />} />
          <Route path={'/item/:id'} element={<ItemDetailContainer addItems={increaseAmount} />} />
          <Route path={'/about'} element={<ItemListContainer />} />
          <Route path={'*'} element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
