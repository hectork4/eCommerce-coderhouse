import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import './styles.css';

const ItemDetailContainer = ({addItems}) => {

    const { id } = useParams();
    const [details, setDetails] = useState();
    const [loading, setLoading] = useState(true);

    const getItemDetails = async() => {
        const url = `https://api.reverb.com/api/listings/${id}`;
        await fetch(url)
        .then(res=>res.json())
        .then(res => {
            setDetails(res)
            setLoading(false)
        })
      }  

    useEffect(() => {
        getItemDetails();
    }, [id])

    if (loading) return 'Cargando...'

  return (
    <div className = "card-wrapper detail">
        <div className = "card">
            <div className = "product-imgs">
                <div className = "img-display">
                <div className = "img-showcase">
                    <img className='img-item-detail' src={details?.photos[0]?._links?.full?.href} alt = "shoe image" />
                </div>
                </div>
            </div>
            <div className = "product-content">
                <h2 className = "product-title">{details.title}</h2>
                <a href="#" className="product-link">visit {details.shop_name} store</a>

                <div className = "product-price">
                    <p className = "new-price">Price: <span>{details.price.display}</span></p>
                </div>

                <div className = "product-detail">
                    <h2>About this item: </h2>
                    <p dangerouslySetInnerHTML={{__html: details.description}}></p>
                </div>

                <div className = "purchase-info">
                    <button className="btn btn-primary text-white mt-auto align-self-start" onClick={addItems}>
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ItemDetailContainer