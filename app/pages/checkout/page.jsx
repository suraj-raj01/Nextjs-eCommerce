'use client';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { useRouter } from 'next/navigation';
import { MdDelete } from "react-icons/md";
import { removeFromCart, clearCart } from '../../store/cartSlice';
import { incrementQuantity, decrementQuantity } from '../../store/cartSlice';
import { createOrder } from '@/app/actions/createOrders';
import { useUser } from '@clerk/nextjs';
import Swal from 'sweetalert2';
import { FaPlusCircle } from "react-icons/fa";
import { FaMinusCircle } from "react-icons/fa";

const CheckOut = () => {
    const { user } = useUser();
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState();
    const [vendoremail, setVendorEmail] = React.useState("");
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.cartItems);

    let price = 0;
    const username = user?.fullName;
    const useremail = user?.emailAddresses[0].emailAddress;
    console.log(username, useremail);

    useEffect(() => {
        let total = 0;
        cartItems.forEach((value) => {
            total += value.quantity * value.proprice;
        });
        setTotal(total);
        setTimeout(() => {
            if (!user?.fullName) {
                router.back();
                Swal.fire({
                    title: "Please Login!!",
                    icon: "warning"
                });
            }
        }, 1500);
    }, [cartItems]);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);
        setVendorEmail(localStorage.getItem("vendoremail")?.toString() || "");
    }, []);

    const clearCartItem = () => dispatch(clearCart());
    const removeItm = (id) => dispatch(removeFromCart(id));
    let productname = "";

    const handlePayment = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.currentTarget);
        formData.append("total", total);
        formData.append("products", JSON.stringify(cartItems));
        formData.append("username", username || "");
        formData.append("useremail", useremail || "");
        formData.append("vendoremail", vendoremail || "");
        const order = await createOrder('', formData);

        const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            amount: price,
            currency: order.currency,
            name: productname || null,
            order_id: order.id,
            handler: function (response) {
                alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
                formData.append("razorpayPaymentId", response.razorpay_payment_id);
                formData.append("razorpayOrderId", response.razorpay_order_id);
                formData.append("razorpaySignature", response.razorpay_signature);
                router.push("/pages/userprofile");
            },
            prefill: {
                name: cartItems.map((key) => { key.proname }) || '',
                email: user?.emailAddresses?.[0]?.emailAddress || '',
            },
            theme: { color: '#3399cc' },
        };

        if (typeof window !== 'undefined' && window.Razorpay) {
            const rzp = new window.Razorpay(options);
            rzp.open();
        } else {
            Swal.fire({
                title: "Razorpay SDK failed to load. Are you online?",
                icon: "warning"
            });
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-8">
            <p className="text-3xl font-bold text-center text-gray-800 mb-6">Checkout Page</p>
            {cartItems.length > 0 ? (
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Products Table */}
                    <div className="w-full lg:w-2/3 bg-white p-4 shadow rounded-lg overflow-x-auto">
                        <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
                        <table className="w-full table-auto text-sm text-gray-700">
                            <thead className="bg-gray-200 text-gray-800">
                                <tr>
                                    <th className="p-3 text-left">Name</th>
                                    <th className="p-3 text-left">Title</th>
                                    <th className="p-3 text-center">Price</th>
                                    <th className="p-3 text-center">Image</th>
                                    <th className="p-3 text-center">Quantity</th>
                                    <th className="p-3 text-center">Remove</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map((item, index) => (
                                    <tr key={index} className="border-b hover:bg-gray-50">
                                        <td className="p-3">{item.proname}</td>
                                        <td className="p-3">{item.protitle}</td>
                                        <td className="p-3 text-center">{item.proprice * item.quantity} ₹</td>
                                        <td className="p-3 text-center">
                                            <img src={item.proimgurl} alt="product" className="h-12 w-12 object-cover rounded" />
                                        </td>
                                        <td className="p-3">
                                            <div className="flex items-center justify-center gap-2">
                                                <FaMinusCircle onClick={() => dispatch(decrementQuantity(item.id))} className="text-red-600 cursor-pointer hover:text-red-800" />
                                                <span className="px-2">{item.quantity}</span>
                                                <FaPlusCircle onClick={() => dispatch(incrementQuantity(item.id))} className="text-green-600 cursor-pointer hover:text-green-800" />
                                            </div>
                                        </td>
                                        <td className="p-3 text-center">
                                            <button onClick={() => removeItm(item.id)} className="text-red-500 hover:text-red-700">
                                                <MdDelete size={20} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="flex justify-between items-center mt-6">
                            <button
                                onClick={clearCartItem}
                                className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded shadow"
                            >
                                Clear Cart
                            </button>
                            <span className="text-lg font-semibold text-gray-800">
                                Total: ₹{total}
                            </span>
                        </div>
                    </div>

                    {/* Delivery Form */}
                    <div className="w-full lg:w-1/3 bg-white p-6 shadow rounded-lg">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Delivery Address</h3>
                        <form onSubmit={handlePayment} className="space-y-4">
                            <input
                                required
                                type="number"
                                name="contact"
                                placeholder="Contact Number"
                                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                            />
                            <textarea
                                rows={4}
                                required
                                name="address"
                                placeholder="Full delivery address"
                                className="w-full border border-gray-300 p-2 rounded resize-none focus:outline-none focus:ring-2 focus:ring-green-400"
                            />
                            <input
                                required
                                type="number"
                                name="pincode"
                                placeholder="PIN Code"
                                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                            />
                            <div className="text-sm text-gray-600 space-y-1">
                                <p><strong>Name:</strong> {username}</p>
                                <p><strong>Email:</strong> {useremail}</p>
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition duration-300"
                            >
                                {loading ? 'Processing Payment...' : 'Pay Now'}
                            </button>
                        </form>
                    </div>
                </div>
            ) : (
                <h2 className="text-center text-xl text-gray-600">Cart is Empty.</h2>
            )}
        </div>
    );

};

export default CheckOut;
