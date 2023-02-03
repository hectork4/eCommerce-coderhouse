import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

const Item = ({
    article:
    { buyer_price: {display}, 
    description, slug,
    image, title, 
    photos:[ photo ] }, addItems
    }) => {
    const [loading, setLoading] = useState(true);
    const imageLoaded = () => {
        setLoading(false);
    }
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/item/${slug}`)
    }
    
    const increaseCart = (e) => {
        addItems();
        e.stopPropagation();
    }

    return (
        <div className="col-lg-4 mb-3 align-items-stretch items-row">
            <div className="card card-item" onClick={handleClick}>
                <img 
                styles={loading ? {display: 'none'} : ''} 
                src={photo._links.large_crop.href} 
                className="card-img-top item-image" alt={`Article about ${title}`} 
                onLoad={imageLoaded} /> 
                <div className="card-body flex-column" style={{display: 'block'}}>
                    <h5 className="card-title">{ title }</h5>
                    <p className="card-text mb-4">{description.slice(0, 250)}</p>
                    <button onClick={increaseCart} className="btn btn-primary text-white mt-auto align-self-start">Add to cart</button>
                </div>
            </div>
        </div>
    )

}

export default Item