import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useCart from "../hooks/useCart";
import CartItems from "../components/CartItems";
import { createOrder, verifyPayment } from "../services/orderService";
import PaymentSummary from "../components/PaymentSummary";

function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();
  const auth = localStorage.getItem("auth");
  const token = auth ? JSON.parse(auth).token : null; 
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const result = cart.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);
    setTotal(result);
  }, [cart]);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const orderData = await createOrder(total);
      if (orderData.success) {
        handlePaymentVerify(orderData.order);
      } else {
        toast.error("Failed to create order");
      }
    } catch (error) {
      console.log(error);
      toast.error("Payment processing failed");
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentVerify = async (data) => {
    const options = {
      key: import.meta.env.RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: data.currency,
      name: "Campus Cart!",
      description: "Test Mode",
      order_id: data.id,
      handler: async (response) => {
        try {
          const paymentData = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            amount: total,
            items: cart.map((item) => ({
              productId: item._id,
              quantity: item.quantity || 1,
            })),
          };

          const verifyData = await verifyPayment(paymentData, token);
          if (verifyData.message) {
            toast.success(verifyData.message);
            clearCart();
            navigate("/user/dashboard/orders");
          }
        } catch (error) {
          console.log(error);
          toast.error("Payment verification failed");
        }
      },
      theme: {
        color: "#5f63b8",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  return (
    <div className="h-screen container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <CartItems cart={cart} removeFromCart={removeFromCart} />
        {cart.length > 0 && (
          <div className="md:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
              <p>123 Main St, Springfield, IL, 62704</p>
            </div>
            <PaymentSummary total={total} handlePayment={handlePayment} loading={loading} />
          </div>
        )}
      </div>
      {cart.length === 0 && (
        <button
          onClick={() => navigate("/products")}
          className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg"
        >
          Continue Shopping
        </button>
      )}
    </div>
  );
}

export default CartPage;
