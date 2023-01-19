import { useState } from 'react';
import ItemListContainer from './component/ItemListContainer/ItemListContainer';
import Navbar from './component/NavBar/NavBar.jsx';
import './App.css';

function App() {
  const greeting = 'Welcome';
  const [ test ] = useState(1);

  return (
    <div className='app'>
      <Navbar amount={test} />
      <ItemListContainer greeting={greeting} />
    </div>
  );
}

export default App;
