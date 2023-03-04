import React,{useContext, useState, useEffect} from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import { useFirebase } from '../../hooks/useFirebase.js';
import { db } from '../../configs/firebase';
import { types } from '../../globalStore/UserReducer';
import UserContext from '../../globalStore/UserContext';
import Login from '../Authentication';
import "./styles.css";

const Cart = () => {
    const [price, setPrice] = useState(0);
    const [items, setItems] = useState([]);
    const [showRegisterModal, setShowRegisterModal] = useState(false);

    const [ userContext, dispatch]  = useContext(UserContext);   
    const { getItem } = useFirebase(); 
    const user = useCurrentUser();

    const { cart, id: userId } = userContext;

    useEffect(()=>{
        setPrice(items.length && items.reduce(function (acu, item) { return acu + (item.amount * item.price); }, 0))
    }, [items])

    useEffect(() => {
        setItems([]);
        cart.forEach(({ id, amount }) => {
            getItem(id)
            .then(({price, title, picture}) => {
                setItems(prevState => 
                    [...prevState,
                    {                    
                        id,
                        amount,
                        price,
                        title,
                        picture
                    }]
                )
            })
        })
    }, [])

    const handleIncrease = (id) => {
        setItems(prevItems => prevItems.map(item => item.id === id ? {...item, amount: item.amount + 1} : item))
        dispatch({
            type: types.increase,
            payload: {productId: id}
        })
    }

    const handleDecrease = (id) => {
        setItems(prevItems => prevItems.map(item => item.id === id ? {...item, amount: item.amount - 1} : item))
        dispatch({
            type: types.decrease,
            payload: {productId: id}
        })
    }

    const handleRemove = (id) =>{
        setItems(prevItems => prevItems.filter(item => item.id !== id))
        dispatch({
            type: types.remove,
            payload: {productId: id}
        })
    }

    const handleOrder = () => {
        if(!user) {
            setShowRegisterModal(true)
        } else {
            cart.forEach((item) => {
                addDoc(collection(db, "order"), {
                    date: new Date(),
                    itemId: item.id,
                    amount: item.amount,
                    client: userId,
                    total: price
                }).then((docRef) => {
                    alert('New order added succesfully. Order: ' + docRef.id)              
                }).catch((error) => {
                    alert(error.message)
                })
            })
            setTimeout(() => {
                setItems([]);
                dispatch({
                    type: types.clean
                })
            }, 4000)
        }
    }

  return (
    <>
        <article>
            {
                items?.map(({ id, picture, title, amount, price }) => 
                <div className="cart_box" key={id}>
                    <div className="cart_img">
                        <img alt='product' src={picture} />
                        <p>{title}</p>
                    </div>
                    <div>
                        <button onClick={() => handleIncrease(id)}> + </button>
                        <button>{amount}</button>
                        <button disabled={amount === 0} onClick={() => handleDecrease(id)}> - </button>
                    </div>
                    <div>
                        <span>{price}</span>
                        <button onClick={()=>handleRemove(id)} >Remove</button>
                    </div>
                </div>
                )
            }
            <div className='total'>
                <span>Total Price of your Cart</span>
                <span>${price}</span>
                <button className='buy-button' disabled={price === 0} onClick={handleOrder}>Finalizar Compra</button>
            </div>
            
        </article>
        {showRegisterModal && <Login onClose={() =>  setShowRegisterModal(false)} />}
    </>
  )
}

export default Cart