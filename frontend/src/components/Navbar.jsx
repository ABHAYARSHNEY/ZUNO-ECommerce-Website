import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const Navbar = () => {

    const [open, setOpen] = React.useState(false);

    const {
        user,
        setUser,
        setShowUserLogin,
        navigate,
        searchQuery,
        setSearchQuery,
        getCartCount,
        axios
    } = useAppContext();

    // Logout Handler
    const logout = async () => {
        try {
            const { data } = await axios.get(`/api/user/logout`);
            if (data.success) {
                toast.success(data.message);
                setUser(null);
                navigate('/');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Logout failed");
        }
    };

    return (
        <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative">

            {/* Logo */}
            <NavLink to="/" onClick={() => setOpen(false)}>
                <img src={assets.logo} alt="logo" className="w-35 h-10" />
            </NavLink>

            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center gap-8">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/products">All Product</NavLink>
                <NavLink to="/">Contact</NavLink>

                {/* Search Bar */}
                <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
                    <input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                navigate(`/products?search=${searchQuery}`);
                            }
                        }}
                        className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
                        type="text"
                        placeholder="Search products"
                    />
                    <img
                        src={assets.search_icon}
                        alt="search"
                        className="w-4 h-4 cursor-pointer"
                        onClick={() => navigate(`/products?search=${searchQuery}`)}
                    />
                </div>

                {/* Cart Icon */}
                <div onClick={() => navigate("/cart")} className="relative cursor-pointer">
                    <img src={assets.nav_cart_icon} alt="cart" className="w-6 opacity-80" />
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-indigo-500 w-[18px] h-[18px] rounded-full">
                        {getCartCount()}
                    </button>
                </div>

                {/* Login / Profile */}
                {!user ? (
                    <button
                        onClick={() => setShowUserLogin(true)}
                        className="cursor-pointer px-8 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full"
                    >
                        Login
                    </button>
                ) : (
                    <div className="relative group">
                        <img src={assets.profile_icon} alt="profile" className="w-8 h-8 rounded-full cursor-pointer" />
                        <ul className="hidden group-hover:block absolute top-10 right-0 bg-white shadow-md border border-gray-200 rounded-md w-40 text-sm">
                            <li
                                onClick={() => navigate("/myOrders")}
                                className="p-2.5 pl-3 hover:bg-indigo-600 hover:text-white cursor-pointer transition"
                            >
                                My Orders
                            </li>
                            <li
                                onClick={logout}
                                className="p-2.5 pl-3 hover:bg-indigo-600 hover:text-white cursor-pointer transition"
                            >
                                Logout
                            </li>
                        </ul>
                    </div>
                )}
            </div>

            {/* Mobile Section */}
            <div className="flex items-center gap-6 sm:hidden">
                <div onClick={() => navigate("/cart")} className="relative cursor-pointer">
                    <img src={assets.nav_cart_icon} alt="cart" className="w-6 opacity-80" />
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-indigo-500 w-[18px] h-[18px] rounded-full">
                        {getCartCount()}
                    </button>
                </div>

                {/* Menu Button */}
                <button onClick={() => setOpen(!open)} aria-label="Menu">
                    <img src={assets.menu_icon} alt="menu" className="w-6 h-6" />
                </button>
            </div>

            {/* Mobile Menu */}
            {open && (
                <div className="absolute top-full left-0 w-full bg-white shadow-md py-4 flex flex-col gap-2 px-5 text-sm md:hidden">
                    <NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink>
                    <NavLink to="/products" onClick={() => setOpen(false)}>All Products</NavLink>

                    {user && (
                        <NavLink to="/myOrders" onClick={() => setOpen(false)}>My Orders</NavLink>
                    )}

                    <NavLink to="/" onClick={() => setOpen(false)}>Contact</NavLink>

                    {!user ? (
                        <button
                            onClick={() => { setOpen(false); setShowUserLogin(true); }}
                            className="cursor-pointer px-6 py-2 mt-2 bg-indigo-500 text-white rounded-full text-sm"
                        >
                            Login
                        </button>
                    ) : (
                        <button
                            onClick={logout}
                            className="cursor-pointer px-6 py-2 mt-2 bg-indigo-500 text-white rounded-full text-sm"
                        >
                            Logout
                        </button>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
