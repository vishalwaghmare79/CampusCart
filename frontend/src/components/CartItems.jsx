import React from 'react';

const CartItems = ({ cart, removeFromCart }) => {
  return (
    <div className="col-span-2">
      {cart.length > 0 ? (
        cart.map((item) => (
          <div key={item._id} className="flex items-center border-b py-4">
            <img src={item.image.url} alt={item.name} className="w-24 h-24 object-cover rounded-lg" />
            <div className="ml-4 flex-1">
              <h5 className="text-lg font-semibold">{item.name}</h5>
              <p className="text-gray-800 font-medium">
                ₹{item.price} x {item.quantity || 1}
              </p>
            </div>
            <button onClick={() => removeFromCart(item._id)} className="text-red-600">Remove</button>
          </div>
        ))
      ) : (
        <div className="text-center">
          <p>Your cart is empty.</p>
        </div>
      )}
    </div>
  );
};

export default CartItems;