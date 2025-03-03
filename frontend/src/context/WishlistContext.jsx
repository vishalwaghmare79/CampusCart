import { useState, createContext, useEffect } from "react";
import { toast } from "react-toastify";
import { addToWishlist, fetchWishlist, removeFromWishlist } from "../services/wishlistServices";

const WishlistContext = createContext();

export const WishListProvider = ({ children }) => {
  const auth = localStorage.getItem("auth");
  const token = auth ? JSON.parse(auth).token : null;
  const [wishlist, setWishlist] = useState([]);

  // Fetch wishlist items
  const fetchWishlistItems = async () => {
    try {
      if (!token) {
        setWishlist([]); // Clear wishlist if no token
        return;
      }
      const data = await fetchWishlist(token);
      setWishlist(data); // Assuming the API returns the wishlist items directly
    } catch (error) {
      console.error("Error fetching wishlist items", error);
      toast.error("Failed to fetch wishlist items");
    }
  };

  // Fetch wishlist on component mount and when token changes
  useEffect(() => {
    fetchWishlistItems();
  }, [token]);

  // Add item to wishlist
  const handleAddToWishlist = async (product) => {
    try {
      if (!token) {
        toast.error("Please log in to add items to your wishlist.");
        return;
      }
      const data = await addToWishlist(product, token);
      toast.success(data.message);
      fetchWishlistItems(); // Refetch wishlist to update the state
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.info(error.response.data.message);
      } else {
        toast.error("Failed to add product to wishlist");
      }
    }
  };

  // Remove item from wishlist
  const handleRemoveFromWishlist = async (wishlistItemId) => {
    try {
      if (!token) {
        toast.error("Please log in to remove items from your wishlist.");
        return;
      }
      const data = await removeFromWishlist(wishlistItemId, token);
      toast.success(data.message);

      // Update the wishlist state by filtering out the removed item
      setWishlist((prevWishlist) =>
        prevWishlist.filter((item) => item._id !== wishlistItemId)
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