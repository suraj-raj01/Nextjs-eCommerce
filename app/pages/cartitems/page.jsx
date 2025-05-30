'use client'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../../store/cartSlice';
import { clearCart } from '../../store/cartSlice';
import { incrementQuantity, decrementQuantity } from '../../store/cartSlice';
import Button from 'react-bootstrap/Button';
import { useRouter } from 'next/navigation';
import { FaPlusCircle } from "react-icons/fa";
import { FaMinusCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useUser } from '@clerk/nextjs';

const CartItems = () => {

    const [total, setTotal] = useState();

    const cartItems = useSelector((state) => state.cart.cartItems);
    console.log(cartItems);
    const dispatch = useDispatch();

    const removeItm = (id) => {
        dispatch(
            removeFromCart(id)
        );
    }
    const router = useRouter();
    const user = useUser();

    const clearCartItem = () => {
        dispatch(clearCart());
    }

    useEffect(() => {
        let total = 0;
        cartItems.forEach((value) => {
            total += value.quantity * value.proprice;
        });
        setTotal(total);
        setTimeout(() => {
            // if (!user?.user) {
            //     Swal.fire({
            //         title: "Please Login!!",
            //         icon: "warning"
            //     });
            // }
        }, 1500)
    }, [cartItems]);

    return (
        <div>
            <p className='text-2xl font-bold text-center p-3 '>Cart Items 🛒</p>
            <div >
                {user?.isSignedIn ? (
                    <div className="p-4 sm:p-6 md:p-10 w-full">
                        <div className="overflow-x-auto">
                            <table className="min-w-full table-auto border border-gray-300 text-sm sm:text-base">
                                <thead className="bg-gray-100">
                                    <tr className="text-left">
                                        <th className="p-3 font-semibold">Name</th>
                                        <th className="p-3 font-semibold">Title</th>
                                        <th className="p-3 font-semibold">Price</th>
                                        <th className="p-3 font-semibold">Image</th>
                                        <th className="p-3 font-semibold">Quantity</th>
                                        <th className="p-3 font-semibold">Remove</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map((item, index) => (
                                        <tr key={index} className="border-t border-gray-300">
                                            <td className="p-3">{item.proname}</td>
                                            <td className="p-3">{item.protitle}</td>
                                            <td className="p-3">{item.proprice * item.quantity} ₹</td>
                                            <td className="p-3">
                                                <Image
                                                    src={item.proimgurl}
                                                    alt="proimage"
                                                    height={50}
                                                    width={50}
                                                    className="rounded"
                                                />
                                            </td>
                                            <td className="p-3">
                                                <div className="flex items-center gap-2">
                                                    <FaMinusCircle
                                                        className="text-red-500 cursor-pointer"
                                                        onClick={() => dispatch(decrementQuantity(item.id))}
                                                    />
                                                    <span>{item.quantity}</span>
                                                    <FaPlusCircle
                                                        className="text-green-500 cursor-pointer"
                                                        onClick={() => dispatch(incrementQuantity(item.id))}
                                                    />
                                                </div>
                                            </td>
                                            <td className="p-3">
                                                <Button
                                                    size="sm"
                                                    variant="danger"
                                                    onClick={() => removeItm(item.id)}
                                                >
                                                    <MdDelete />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                ) : (
                    <>
                        <div className='flex items-center justify-center h-50 text-center'>
                            <h2 className='text-center m-5 text-red-800'>Seems Like You're not Logged In!</h2>
                            <Button onClick={() => { router.push("https://joint-krill-9.accounts.dev/sign-in?redirect_url=http%3A%2F%2Flocalhost%3A3000%2Fpages%2Fcartitems") }}>Login</Button>
                        </div>
                    </>
                )}

                {
                    user?.isSignedIn ? (
                        <div id='clrbtn'>
                            <Button size='sm' variant='success' onClick={() => { router.push("/pages/checkout") }}>CheckOut</Button>
                            <Button size='sm' variant='danger' onClick={clearCartItem} >Clear Cart</Button>
                            <Button size='sm' variant='' ><span className='font-bold text-2xl'>Total Price : {total}</span></Button>
                        </div>
                    ) : (
                        ""
                    )
                }
            </div>
        </div>
    )
}

export default CartItems;
