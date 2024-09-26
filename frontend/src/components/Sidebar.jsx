import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const Sidebar = () => {
    return (
        <div className="drawer z-50">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Page content here */}
                <label htmlFor="my-drawer" className="btn btn-primary drawer-button">Open Menu</label>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 flex flex-col gap-5 justify-center">
                    {/* Sidebar content here */}
                    <NavLink to={"/admin/products"}>Product List</NavLink>
                    <NavLink to={"/admin/add-product"}>Add Product</NavLink>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar
