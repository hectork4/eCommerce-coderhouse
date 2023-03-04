import { useContext, useEffect, useState } from 'react';
import cartIcon from '../../images/cart-icon.png'
import cartIconHover from '../../images/cart-icon-hover.png'
import './styles.css'
import UserContext from '../../globalStore/UserContext';

const CartWidget = () => {
    const [hover, setHover] = useState(false);
    const [ userContext ] = useContext(UserContext);
    const [amount, setAmount] = useState(0);

    const handleHover = () => {
        setHover(true)
    }

    const handleLeave = () => {
        setHover(false)
    }

    useEffect(() => {
        setAmount(userContext?.cart.length && userContext?.cart.reduce(function (acu, item) { return acu + item.amount; }, 0))
    }, [userContext])

  return (
    <div
        onMouseOver={handleHover} 
        onMouseLeave={handleLeave}
    >
        <img alt='cart-widget' src={hover ? cartIconHover : cartIcon} />
        { !!amount &&
        <div className='amount-wrapper'>
            <span>{amount}</span>
        </div>
        }
    </div>
  )
}

export default CartWidget