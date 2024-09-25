import { useState, createContext, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "./auth";

const WishlistContext = createContext();

const WishListProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [auth] = useAuth();

  // Fetch Wishlist
const fetchWishlist = async () => {
  try {
    const API_BASE_URL = `${process.env.REACT_APP_API}/api/v1/wishlist`;
    const { data } = await axios.get(API_BASE_URL);
    setWishlist(data?.wishlistItems);    
  } catch (error) {
    console.error("Error fetching wishlist items", error);
  }
};

useEffect(() => {
  fetchWishlist();
  //eslint-disable-next-line
}, [auth?.token]);


  // Add to Wishlist
  const addToWishlist = async (product) => {
    try {
      const API_BASE_URL = `${process.env.REACT_APP_API}/api/v1/wishlist/add-wishlist`;
      const { data } = await axios.post(API_BASE_URL, {
        productId: product._id,
      });
      toast.success(data.message);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.info(error.response.data.message);
      } else {
        toast.error("Failed to add product to wishlist");
      }
    }
  };

  // Remove from Wishlist (fixed DELETE method)
  const removeFromWishlist = async (wishlistItem) => {
    try {
      const API_BASE_URL = `${process.env.REACT_APP_API}/api/v1/wishlist/remove-wishlist/${wishlistItem._id}`;
      const { data } = await axios.delete(API_BASE_URL);
      toast.success(data.message);
      setWishlist((prevWishlist) =>
        prevWishlist.filter((item) => item._id !== wishlistItem._id)
      );
    } catch (error) {
      console.error("Error removing item from wishlist:", error);
      toast.error("Failed to remove item from wishlist");
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        setWishlist,
        fetchWishlist,
        addToWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

const useWishlist = () => useContext(WishlistContext);

export { useWishlist, WishListProvider };
