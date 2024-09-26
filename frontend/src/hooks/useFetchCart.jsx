import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setCart, setLoading } from '../redux/slices/cartSlice'

const useFetchCart = () => {
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(setLoading(true))
        const getCart = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/cart`, {
                    credentials: 'include'
                })
                const data = await res.json()

                if (data.success) {
                    dispatch(setCart(data.cart))
                }

            } catch (error) {
                console.log(error)
            } finally {
                dispatch(setLoading(false))
            }
        }
        getCart()

    }, [])
}
export default useFetchCart
