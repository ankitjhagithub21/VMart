import { useSelector, useDispatch } from 'react-redux';
import Loading from '../components/Loading';
import useFetchCart from '../hooks/useFetchCart';
import { toast } from 'react-toastify'; 
import { setCart } from '../redux/slices/cartSlice'; 
import CartItem from '../components/CartItem';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const Cart = () => {
    useFetchCart();
    const dispatch = useDispatch();

    const { loading, cart } = useSelector(state => state.cart);
    const { user } = useSelector(state => state.auth);


    const handleCheckout = async () => {
        const stripe = await stripePromise;

        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/cart/create-checkout-session`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    items: cart.items,  
                }),
            });

            const { id } = await res.json();

            const result = await stripe.redirectToCheckout({ sessionId: id });
            if (result.error) {
                toast.error(result.error.message);
            }
        } catch (error) {
            console.error('Error during checkout:', error);
            toast.error('Failed to proceed to checkout.');
        }
    };

    // Function to handle increment quantity via increment route
    const handleIncrementQuantity = async (productId) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/cart/increment`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify({ userId: user._id, productId })
            });
            const data = await res.json();
            if (data.success) {
                dispatch(setCart(data.cart));
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to increment quantity.");
        }
    };

    // Function to handle decrement quantity via decrement route
    const handleDecrementQuantity = async (productId) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/cart/decrement`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify({ userId: user._id, productId })
            });
            const data = await res.json();
            if (data.success) {
                dispatch(setCart(data.cart));
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to decrement quantity.");
        }
    };

    // Function to remove item from cart
    const handleRemoveFromCart = async (productId) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/cart/remove`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify({ userId: user._id, productId })
            });
            const data = await res.json();
            if (data.success) {
                toast.success("Item removed from cart.");
                dispatch(setCart(data.cart));
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to remove item.");
        }
    };

    if (loading) {
        return <Loading />;
    }

    if (!cart || cart.items.length === 0) {
        return (
            <div className='h-screen w-full flex items-center justify-center'>
                <h1 className='text-3xl'>Cart is empty.</h1>
            </div>
        );
    }

    // Calculate total quantity and total price
    const totalQuantity = cart.items.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = cart.items.reduce((acc, item) => acc + item.quantity * item.productId.price, 0);

    return (
        <div className='container mx-auto my-24 px-5'>
            <h1 className='text-3xl mb-5'>Your Cart</h1>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Sub Total</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart?.items?.map((item) => (
                           item.productId &&  <CartItem 
                           key={item.productId._id} 
                           item={item} 
                           handleIncrementQuantity={handleIncrementQuantity} 
                           handleDecrementQuantity={handleDecrementQuantity} 
                           handleRemoveFromCart={handleRemoveFromCart} 
                       />
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Cart Summary */}
            <div className='mt-10 p-5 border-t-2 border-gray-200'>
                <h2 className='text-2xl font-semibold'>Cart Summary</h2>
                <div className='flex justify-between mt-4'>
                    <p>Total Items: <span className='font-bold'>{totalQuantity}</span></p>
                    <p>Total Price: <span className='font-bold'>${totalPrice.toFixed(2)}</span></p>
                </div>

                {/* Checkout Button */}
                <div className='mt-6'>
                    <button
                        className='bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-500 transition-all'
                        onClick={handleCheckout}
                    >
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
