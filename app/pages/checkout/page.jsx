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
        <div>
            <p className='text-2xl font-bold text-center p-3'>Checkout Page</p>
            <hr />
            {cartItems.length > 0 ? (
                <div id="main" className="flex flex-col lg:flex-row gap-6 p-4">
                    {/* Cart Products Section */}
                    <div id="products" className="w-full lg:w-2/3">
                        <hr className="mb-4" />
                        <div className="overflow-auto">
                            <table className="min-w-full table-auto text-left border-collapse">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="p-2">Name</th>
                                        <th className="p-2">Title</th>
                                        <th className="p-2 w-20">Price</th>
                                        <th className="p-2">Image</th>
                                        <th className="p-2">Quantity</th>
                                        <th className="p-2">Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map((item, index) => (
                                        <tr key={index} className="border-b">
                                            <td className="p-2">{item.proname}</td>
                                            <td className="p-2">{item.protitle}</td>
                                            <td className="p-2">{item.proprice * item.quantity} ₹</td>
                                            <td className="p-2">
                                                <img src={item.proimgurl} alt="proimage" className="h-12 w-12 object-cover" />
                                            </td>
                                            <td className="p-2">
                                                <div className="flex items-center gap-2 justify-center">
                                                    <FaMinusCircle onClick={() => dispatch(decrementQuantity(item.id))} className="cursor-pointer" />
                                                    <span>{item.quantity}</span>
                                                    <FaPlusCircle onClick={() => dispatch(incrementQuantity(item.id))} className="cursor-pointer" />
                                                </div>
                                            </td>
                                            <td className="p-2">
                                                <button
                                                    className="bg-red-500 hover:bg-red-600 text-white text-sm px-2 py-1 rounded"
                                                    onClick={() => removeItm(item.id)}
                                                >
                                                    <MdDelete />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Action Buttons */}
                        <div id="clrbtn" className="mt-4 flex flex-wrap gap-4 justify-between items-center">
                            <button onClick={clearCartItem} className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded">
                                Clear Cart
                            </button>
                            <span className="text-lg font-bold">Total: {total} ₹</span>
                        </div>
                    </div>

                    {/* Delivery Form Section */}
                    <div id="deliveryform" className="w-full lg:w-1/3 bg-gray-50 p-4 rounded shadow-md">
                        <h3 className="text-xl font-semibold mb-2">Delivery Address</h3>
                        <hr className="mb-4" />
                        <form onSubmit={handlePayment} className="flex flex-col gap-3">
                            <input
                                required
                                type="number"
                                name="contact"
                                placeholder="Contact Number"
                                className="p-2 border border-gray-300 rounded"
                            />
                            <textarea
                                rows={5}
                                required
                                name="address"
                                placeholder="Enter delivery address"
                                className="p-2 border border-gray-300 rounded"
                            />
                            <input
                                required
                                type="number"
                                name="pincode"
                                placeholder="PIN Code"
                                className="p-2 border border-gray-300 rounded"
                            />
                            <span className="text-sm text-gray-700">{username}</span>
                            <span className="text-sm text-gray-700">{useremail}</span>
                            <button
                                type="submit"
                                disabled={loading}
                                className="p-2 bg-green-700 text-white rounded hover:bg-green-800 transition"
                            >
                                {loading ? 'Processing...' : 'Pay Now'}
                            </button>
                        </form>
                    </div>
                </div>

            ) : (
                <h2 className='text-center'>Data Not Found!!!</h2>
            )}
        </div>
    );
};

export default CheckOut;
