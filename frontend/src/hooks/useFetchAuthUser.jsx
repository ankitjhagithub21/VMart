import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setIsLoggedIn, setUser } from '../redux/slices/authSlice'

const useFetchAuthUser = () => {
    const { isLoggedIn } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    useEffect(()=>{
        const getAuthUser = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/user`, {
                    credentials: 'include'
                })
                const data = await res.json()
                if (data.success) {
                    dispatch(setIsLoggedIn(true))
                    dispatch(setUser(data.user))
                } else {
                    dispatch(setIsLoggedIn(false))
                    dispatch(setUser(null))
                }
            } catch (error) {
                console.log(error)
            }
        }
        getAuthUser()
    },[isLoggedIn])
}

export default useFetchAuthUser
