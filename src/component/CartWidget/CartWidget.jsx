import { useState } from 'react';
import cartIcon from '../../images/cart-icon.png'
import cartIconHover from '../../images/cart-icon-hover.png'
import './styles.css'

const CartWidget = ({ amount = 0 }) => {
    const [hover, setHover] = useState(false);

    const handleHover = () => {
        setHover(true)
    }

    const handleLeave = () => {
        setHover(false)
    }

  return (
    <a 
        className='anchor-cart' 
        href='#' 
        onMouseOver={handleHover} 
        onMouseLeave={handleLeave}
    >
        <img src={hover ? cartIconHover : cartIcon} />
        { !!amount &&
        <div className='amount-wrapper'>
            <span>{amount}</span>
        </div>
        }
    </a>
  )
}

export default CartWidget