import { CartWidget, Menu, Logo } from '../index';
import { NavLink } from 'react-router-dom';
import { logob64 } from '../../constants';
import './styles.css';
import { useState, useEffect } from 'react';
import { menuItems } from './getMenu';

export default function Navbar(props) {
    const [options, setOptions] = useState('');
    const [categories, setCategories] = useState([]);
    const [collapsed, setCollapsed] = useState(true);

    useEffect(() => {
        setOptions(menuItems);
        fetch('https://api.reverb.com/api/categories/')
            .then(res=>res.json())
            .then(({ categories }) => setCategories(categories))
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
                                        <NavLink className="dropdown-item" to={`/category/${item.uuid}`}>
                                            {item.name}
                                        </NavLink>
                                    ) 
                                })}
                            </div></li>:
                            <li class="nav-item"><NavLink className='nav-link' to={option.url}>{option.title}</NavLink></li>}
                    )}
                </Menu>    
                <CartWidget {...props} />
            </div>
        </nav>
    )
}