import useFetchProducts from '../hooks/useFetchProducts'
import Loading from './Loading'
import Product from './Product'

const Products = () => {
    const {loading,products} = useFetchProducts()
    if(loading){
        return <Loading/>
    }
    return (
        <section>
            <div className='max-w-7xl mx-auto px-5 flex flex-wrap items-center justify-center gap-10 my-12'>
               {
                 products.map((product)=>{
                    return <Product key={product._id} product={product}/>
                 })
               }
            </div>
        </section>
    )
}

export default Products
