import React from 'react'
import { useNavigate } from 'react-router-dom';

const Product = ({product}) => {
    const {_id,image,title,category,price} = product;
    const navigate = useNavigate()

 
    return (
        <div className="bg-base-100 shadow-xl product cursor-pointer overflow-hidden rounded-lg" onClick={()=>navigate(`/products/${_id}`)}>
            <div>
                <img
                    src={image}
                    alt={title} 
                    loading='lazy'
                    className=' object-cover w-full h-62'
                    />
            </div>
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
