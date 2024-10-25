import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../pages/Login/Login';
import DashBoard from '../pages/DashBoard/DashBoard';
import Products from '../pages/Products/Products';
import AddProduct from '../pages/Products/AddProduct';
import EditProduct from '../pages/Products/EditProduct';
import OrderList from '../pages/OrderList/OrderList';
import ProductStock from '../pages/ProductsStock/ProductStock';

const Routing = () => {
    return (
        <div>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/AddProduct' element={<AddProduct />} />
                <Route path='/editproduct/:productId' element={<EditProduct/>} /> 
                <Route path='/order-list' element={<OrderList />} />
                <Route path='/dashBoard' element={<DashBoard />} />
                <Route path='/' element={<DashBoard />} />
                <Route path='/products' element={<Products />} />
                <Route path='/order-lists' element={<OrderList />} />
                <Route path='/products-stock' element={<ProductStock />} />
            </Routes>
        </div>
    );
}

export default Routing;
