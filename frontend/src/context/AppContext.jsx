import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";
import axios from "axios";

// Axios global config
axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_URL;

export const AppContext = createContext();

export const AppProvider = ({ children }) => {

  const navigate = useNavigate();

  const currency = "Rs.";

  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);

  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch Authenticated user
  const fetchUser = async () => {
    try {
      const { data } = await axios.get(`/api/user/isAuth`);
      console.log("Auth response:", data);
      if (data.success) {
        setUser(data.user);
        setCartItems(data.user.cartItems || {});
      }
    } catch {
      setUser(null);
    }
  };

  // Load dummy products
  const fetchProducts = async () => {
    setProducts(dummyProducts);
  };

  // Add to cart
  const addToCart = (itemId) => {
    let cartData = { ...cartItems };
    cartData[itemId] = cartData[itemId] ? cartData[itemId] + 1 : 1;
    setCartItems(cartData);
    toast.success("Item added to cart");
  };

  // Update item quantity
  const updateCartItem = (itemId, quantity) => {
    let cartData = { ...cartItems };

    if (quantity <= 0) {
      delete cartData[itemId];
      setCartItems(cartData);
      toast.success("Item removed from cart");
      return;
    }

    cartData[itemId] = Number(quantity);
    setCartItems(cartData);
    toast.success("Cart updated");
  };

  // Remove 1 quantity
  const removeFromCart = (itemId) => {
    let cartData = { ...cartItems };

    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] <= 0) delete cartData[itemId];
    }

    setCartItems(cartData);
    toast.success("Item removed from cart");
  };

  // Count items
  const getCartCount = () =>
    Object.values(cartItems).reduce((acc, qty) => acc + qty, 0);

  // Total cart amount
  const getCartAmount = () => {
    let amount = 0;

    for (let id in cartItems) {
      const product = products.find((p) => p._id === id);
      if (product) {
        amount += product.offerPrice * cartItems[id];
      }
    }
    return Math.floor(amount * 100) / 100;
  };

  // Initial load
  useEffect(() => {
    fetchUser();
    fetchProducts();
  }, []);

  const value = {
    user,
    setUser,
    isSeller,
    setIsSeller,
    navigate,
    showUserLogin,
    setShowUserLogin,
    products,
    currency,
    cartItems,
    addToCart,
    updateCartItem,
    removeFromCart,
    searchQuery,
    setSearchQuery,
    getCartCount,
    getCartAmount,
    axios,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
