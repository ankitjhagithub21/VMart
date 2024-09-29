import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loading from '../components/Loading';
import Button from '../components/Button';
import { setCart } from '../redux/slices/cartSlice';

const ProductDetails = () => {
    const { productId } = useParams();
    const { user } = useSelector(state => state.auth);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    
    const dispatch = useDispatch();

    // Fetch product details when the component mounts
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/products/${productId}`);
                if (!res.ok) {
                    throw new Error('Failed to fetch product details');
                }
                const data = await res.json();
                if (data.success) {
                    setProduct(data.product);
                } else {
                    toast.error(data.message);
                }
            } catch (error) {
                console.error(error);
                toast.error('Error fetching product details.');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    
    // Add product to the cart
    const handleAddToCart = async () => {
        if (!user) return toast.error('You are not logged in.');

        setIsLoading(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/cart/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ userId: user._id, productId, quantity: 1 }),
            });

            const data = await res.json();
            if (res.ok && data.success) {
                toast.success(data.message);
                dispatch(setCart(data.cart));
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to add product to cart.');
        } finally {
            setIsLoading(false);
        }
    };

    // Handle loading state
    if (loading) {
        return <Loading />;
    }

    // Handle if product is not found
    if (!product) {
        return <h1>Product not found.</h1>;
    }

    // Render product details
    return (
        <section className='px-5 py-12'>
            
            <div className="max-w-7xl mx-auto">
                <div className="lg:w-4/5 mx-auto flex flex-wrap items-center">
                    <img
                        alt="ecommerce"
                        className="lg:w-1/2 w-full lg:h-auto h-64 object-contain object-center rounded"
                        src={product.image}
                    />
                    <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                        <div className="badge badge-secondary">{product.category}</div>
                        <h1 className="text-3xl title-font font-medium my-3">
                            {product.title}
                        </h1>
                        <p className="leading-relaxed">
                            {product.description}
                        </p>
                        <div className="flex mt-5 items-center justify-between">
                            <span className="title-font font-medium text-2xl">
                                &#8377; {product.price}
                            </span>
                            <Button
                                type="button"
                                text="ADD TO CART"
                                onClick={handleAddToCart}
                                loading={isLoading} 
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductDetails;
