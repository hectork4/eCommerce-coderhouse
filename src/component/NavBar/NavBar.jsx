import CartWidget from '../CartWidget/CartWidget';
import { Menu } from '../Menu';
import Logo from '../Logo';
import { logob64 } from '../../constants';
import './styles.css';

const options = ['Home', 'Products', 'About'];

export default function Navbar(props) {

    return (
        <nav className='navbar navbar-dark bg-dark mb-4'>
            <div className='container'>
                <Logo logo={logob64} text='Helius' />
                <Menu>
                    {options.map((item) => 
                        <a href="#">
                            {item}
                        </a>
                    )}
                </Menu>    
                <CartWidget {...props} />
            </div>
        </nav>
    )
}