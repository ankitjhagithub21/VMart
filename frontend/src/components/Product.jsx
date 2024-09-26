import React from 'react'
import { useNavigate } from 'react-router-dom';

const Product = ({product}) => {
    const {_id,image,title,category,price} = product;
    const navigate = useNavigate()

 
    return (
        <div className="card bg-base-100 w-96 shadow-xl cursor-pointer" onClick={()=>navigate(`/products/${_id}`)}>
            <figure>
                <img
                    src={image}
                    alt={title} 
                    loading='lazy'
                    className='hover:scale-105 transition'
                    />
            </figure>
            <div className="card-body">
                <h2 className="card-title">
                  
                    <div className="badge badge-secondary">{category}</div>
                </h2>
                <p>{title}</p>
                <div className="card-actions justify-end">
                    <div className="badge badge-outline">&#8377; {price}</div>
                  
                </div>
            </div>
        </div>
    )
}

export default Product
