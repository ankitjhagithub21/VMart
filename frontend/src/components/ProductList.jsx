import React from 'react'
import useFetchProducts from '../hooks/useFetchProducts'
import Loading from './Loading'
import { toast } from 'react-toastify'

const ProductList = () => {
    const { loading, products,setProducts } = useFetchProducts()

    const handleDeleteProduct = async(productId) => {
        try{
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/products/${productId}`,{
                method:"DELETE",
                credentials:'include'
            })
            const data = await res.json()
            if(data.success){
                toast.success(data.message)
                const updatedProducts = products.filter(product=>product._id !== productId)
                setProducts(updatedProducts)
            }else{
                toast.error(data.message)
            }
            
        }catch(error){
            console.log(error)
            toast.error("Error")
        }
    }
    if (loading) {
        return <Loading />
    }

    return (
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>

                        <th>Image</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {/* row 1 */}
                    {
                        products.map((product) => {
                            return <tr key={product._id}>

                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={product.image}
                                                    alt={product.title} />
                                            </div>
                                        </div>
                                       
                                    </div>
                                </td>
                                <td>
                                   {product.title}
                                    <br />
                                    <span className="badge badge-ghost badge-sm">{product.category}</span>
                                </td>
                                <td>
                                    &#8377;{product.price}
                                </td>
                                <th>
                                    <button className="btn btn-warning btn-xs" onClick={()=>handleDeleteProduct(product._id)}>
                                        Delete
                                    </button>
                                </th>
                            </tr>
                        })
                    }


                </tbody>
                {/* foot */}

            </table>
        </div>
    )
}

export default ProductList
