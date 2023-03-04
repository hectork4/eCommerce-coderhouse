import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import UserContext from '../../globalStore/UserContext';
import { types } from '../../globalStore/UserReducer';
import { useFirebase } from '../../hooks/useFirebase';
import Error404 from '../Error404';
import './styles.css';


const ItemDetailContainer = () => {

    const { id } = useParams();
    const [details, setDetails] = useState();
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [ , dispatch]  = useContext(UserContext);
    const { getItem } = useFirebase();
 /*debido a los cambios en las consignas 3, se agregó items al firebase y se cambia el consumo de la API manejado hasta ahora
    const getItemDetails = async() => {
       
        const url = `https://api.reverb.com/api/listings/${id}`;
        await fetch(url)
        .then(res=>res.json())
        .then(res => {
            setDetails(res)
            setLoading(false)
        })
        getItem(id).then((res)=>{
            setDetails(res)
            setLoading(false)
        })

      }  */

      const increaseCart = (e) => {
        dispatch({
            type: types.increase,
            payload: {productId: id}
        })
        e.stopPropagation();
    }  

    useEffect(() => {
        getItem(id).then((res)=>{
            setDetails(res)
            setLoading(false)
        }).catch(() => {
            setError(true);
            setLoading(false)
        })
    }, [id])

    if (loading) return 'Loading...'

    if(!details || error) return <Error404 />

  return (
    <div className = "card-wrapper detail">
        <div className = "card">
            <div className = "product-imgs">
                <div className = "img-display">
                <div className = "img-showcase">
                    <img className='img-item-detail' src={details.picture} alt = "shoe image" />
                </div>
                </div>
            </div>
            <div className = "product-content">
                <h2 className = "product-title">{details.title}</h2>
                <a href="#" className="product-link">visit {details.shop_name} store</a>

                <div className = "product-price">
                    <p className = "new-price">Price: <span>{details.price}</span></p>
                </div>

                <div className = "product-detail">
                    <h2>About this item: </h2>
                    <p dangerouslySetInnerHTML={{__html: details.description}}></p>
                </div>

                <div className = "purchase-info">
                    <button className="btn btn-primary text-white mt-auto align-self-start" onClick={increaseCart}>
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ItemDetailContainer