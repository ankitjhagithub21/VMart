import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    return (
        <div className="drawer lg:drawer-open z-10">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content ml-5">
                {/* Page content here */}
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button mt-24 lg:hidden">
                    Menu
                </label>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 flex flex-col justify-center">
                    {/* Sidebar content here */}
                    <li><Link to={"/admin/products"}>Products</Link></li>
                    <li><Link to={"/admin/add-product"}>Add Product</Link></li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar
