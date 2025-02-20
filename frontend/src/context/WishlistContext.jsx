import { useState, createContext, useEffect } from "react";
import { toast } from "react-toastify";
import { addToWishlist, fetchWishlist, removeFromWishlist } from "../services/wishlistServices";

const WishlistContext = createContext();

export const WishListProvider = ({ children }) => {
  const auth = localStorage.getItem("auth");
  const token = auth ? JSON.parse(auth).token : null; 
  const [wishlist, setWishlist] = useState([]);

  const fetchWishlistItems = async () => {
    try {
      const data = await fetchWishlist(token); 
      
      const wishlistProducts = data.map((item) => item);
      setWishlist(wishlistProducts); 
    } catch (error) {
      console.error("Error fetching wishlist items", error);
    }
  };

  useEffect(() => {
    fetchWishlistItems();
  }, [token]);

  const handleAddToWishlist = async (product) => {
    try {
      if (!token) {
        toast.error("Please log in to add items to your wishlist.");
        return;
      }
      const data = await addToWishlist(product, token); 
      toast.success(data.message);
      fetchWishlistItems(); 
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.info(error.response.data.message);
      } else {
        toast.error("Failed to add product to wishlist");
      }
    }
  };

  const handleRemoveFromWishlist = async (wishlistItem) => {
    try {
      if (!token) {
        toast.error("Please log in to remove items from your wishlist.");
        return;
      }
      const data = await removeFromWishlist(wishlistItem, token); 
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
        fetchWishlist: fetchWishlistItems,
        addToWishlist: handleAddToWishlist,
        removeFromWishlist: handleRemoveFromWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export { WishlistContext };