import { CartWidget, Menu, Logo } from '../index';
import { NavLink } from 'react-router-dom';
import { logob64 } from '../../constants';
import './styles.css';
import { useState, useEffect } from 'react';
import { menuItems } from './getMenu';
import Login from '../Authentication';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import { useFirebase } from '../../hooks/useFirebase';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../configs/firebase';

export default function Navbar() {
    const [options, setOptions] = useState('');
    const [categories, setCategories] = useState([]);
    const [collapsed, setCollapsed] = useState(true);
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const { getCategories } = useFirebase();
    const user = useCurrentUser();

    useEffect(() => {
        setOptions(menuItems);
        getCategories().then((res) => setCategories(res));
        /*debido a los cambios en las consignas, se agregó items al firebase y se cambia el consumo de la API manejado hasta ahora
        fetch('https://api.reverb.com/api/categories/')
            .then(res=>res.json())
            .then(({ categories }) => setCategories(categories));*/
    }, [])

    const collapseDropdown = () => setCollapsed(true);
    const expandDropdown = () => setCollapsed(false);
    
    return (
        <nav className='navbar navbar-dark bg-dark mb-4'>
            <div className='container'>
                <NavLink className="dropdown-item" to={`/`}>
                    <Logo logo={logob64} text='Helius' />
                </NavLink>
                <Menu>
                    {options.length && options.map((option) => {
                        return option.submenu ?
                            <li class="nav-item dropdown" onMouseOver={expandDropdown} onMouseLeave={collapseDropdown}>
                                <span className="nav-link dropdown-toggle" id="navbarDropdown" role="button">
                                    {option.title}
                                </span>
                            <div className={`dropdown-menu ${!collapsed ? 'dropdown_expanded' : ''}`}>
                                {categories?.map((item) => {
                                    return(
                                        <NavLink key={item.id} className="dropdown-item" to={`/category/${item.uid}`}>
                                            {item.name}
                                        </NavLink>
                                    ) 
                                })}
                            </div></li>:
                            <li class="nav-item"><NavLink className='nav-link' to={option.url}>{option.title}</NavLink></li>}
                    )}
                    {!user ? 
                    <button onClick={() => setShowRegisterModal(true)}>Login</button> : 
                    <button onClick={() => signOut(auth)}>Logout</button>}
                    {showRegisterModal && <Login onClose={() =>  setShowRegisterModal(false)} />}
                </Menu>
                <NavLink className="anchor-cart" to={`/cart`}>
                    <CartWidget />
                </NavLink>
            </div>
        </nav>
    )
}