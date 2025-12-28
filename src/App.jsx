import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { useApp } from './context/AppContext'

// Public Pages
import Home from './Pages/Home';
import ProductDetail from './Pages/ProductDetail';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Cart from './Pages/Cart';
import Favorites from './Pages/Favorites';
import Dashboard from './Pages/Dashboard';
import Account from './Pages/Account';
import Orders from './Pages/Orders';
import Reviews from './Pages/Reviews';
import Support from './Pages/Support';
import Shop from './Pages/Shop';
import About from './Pages/About';

// Admin Pages
import AdminLogin from './Pages/Admin/AdminLogin';
import AdminLayout from './Components/Admin/AdminLayout';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import AdminProducts from './Pages/Admin/AdminProducts';
import AdminOrders from './Pages/Admin/AdminOrders';
import AdminSupport from './Pages/Admin/AdminSupport';
import AdminMarketing from './Pages/Admin/AdminMarketing';

// Components
import ChatWidget from './Components/ChatWidget';
import Loading from './Components/Loading';

function App() {
    const { isInitialLoading, isLoading } = useApp()

    return (
        <div style={{ fontFamily: 'Cascadia' }} className="bg-[var(--bg-primary)] transition-colors duration-500">
            {(isInitialLoading || isLoading) && <Loading />}
            <BrowserRouter>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/favorites" element={<Favorites />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/account" element={<Account />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/reviews" element={<Reviews />} />
                    <Route path="/support" element={<Support />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/about" element={<About />} />

                    {/* Admin Routes */}
                    <Route path="/admin/login" element={<AdminLogin />} />
                    <Route path="/admin" element={<AdminLayout />}>
                        <Route index element={<AdminDashboard />} />
                        <Route path="dashboard" element={<AdminDashboard />} />
                        <Route path="products" element={<AdminProducts />} />
                        <Route path="orders" element={<AdminOrders />} />
                        <Route path="support" element={<AdminSupport />} />
                        <Route path="marketing" element={<AdminMarketing />} />
                    </Route>
                </Routes>
                <ChatWidget />
            </BrowserRouter>
        </div>
    )
}

export default App
