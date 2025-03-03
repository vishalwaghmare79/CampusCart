import React from "react";
import useWishlist from "../hooks/useWishlist";
import ProductCard from "../components/ProductCard"; 

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist(); 

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">My Wishlist</h1>
        {wishlist.length === 0 ? (
          <div className="text-center text-gray-600">
            <p>Your wishlist is empty.</p>
            <p>Start adding products to see them here!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map((wishlistItem) => (
              <ProductCard
                key={wishlistItem?._id} 
                name={wishlistItem?.productId?.name}
                shipping={wishlistItem?.productId?.shipping}
                image={wishlistItem?.productId?.image}
                _id={wishlistItem?.productId?._id} 
                price={wishlistItem?.productId?.price}
                category={wishlistItem?.productId?.category}
                isWishlist={true} 
                onRemove={() => removeFromWishlist(wishlistItem?._id)} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;