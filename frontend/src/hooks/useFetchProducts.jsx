import React, { useEffect, useState } from 'react'

const useFetchProducts = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/products`)
                const data = await res.json()
                if (data.success) {
                    setProducts(data.products)
                }

            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        fetchProducts()
    }, [])
    return { products, loading ,setProducts}
}

export default useFetchProducts
