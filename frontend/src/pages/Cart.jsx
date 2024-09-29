import { useSelector, useDispatch } from 'react-redux';
import Loading from '../components/Loading';
import useFetchCart from '../hooks/useFetchCart';
import { toast } from 'react-toastify'; 
import { setCart } from '../redux/slices/cartSlice'; 
import CartItem from '../components/CartItem';

const Cart = () => {
    useFetchCart();
    const dispatch = useDispatch();

    const { loading, cart } = useSelector(state => state.cart);
    const { user } = useSelector(state => state.auth);

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
        </div>
    );
};

export default Cart;
