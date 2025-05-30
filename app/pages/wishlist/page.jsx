'use client'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import Image from 'next/image';
import Table from "react-bootstrap/Table"
import { removeFromLike, clearLikes } from '../../store/cartSlice';
import Button from 'react-bootstrap/Button';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { FaPlusCircle } from "react-icons/fa";
import { FaMinusCircle } from "react-icons/fa";
import { SlDislike } from "react-icons/sl";
import Swal from 'sweetalert2';

const WishList = () => {

    const [total, setTotal] = useState(0);

    const cartItems = useSelector((state) => state.cart.likeItems);

    const dispatch = useDispatch();
    const removeItm = (id) => {
        dispatch(removeFromLike(id));
    }
    const router = useRouter();
    const { user } = useUser();

    const clearCartItem = () => {
        dispatch(clearLikes());
    }

    useEffect(() => {
        let total = 0;
        cartItems.forEach((value) => {
            total += value.quantity * value.proprice;
        });
        setTotal(total);
    }, [cartItems]);

    return (
        <>
            <p className='text-2xl font-bold text-center p-3 '>Liked Items</p>
            <div className="p-4 sm:p-6 md:p-10 w-full">
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto border border-gray-300 text-sm sm:text-base">
                        <thead className="bg-gray-200">
                            <tr className="text-left">
                                <th className="p-2">Name</th>
                                <th className="p-2">Title</th>
                                <th className="p-2">Price</th>
                                <th className="p-2">Image</th>
                                <th className="p-2">Dislike</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item, index) => (
                                <tr key={index} className="border-t border-gray-300">
                                    <td className="p-2">{item.proname}</td>
                                    <td className="p-2">{item.protitle}</td>
                                    <td className="p-2">${item.proprice * item.quantity}</td>
                                    <td className="p-2">
                                        <Image src={item.proimgurl} alt="proimage" height={50} width={50} className="rounded" />
                                    </td>
                                    <td className="p-2">
                                        <Button size="sm" variant="danger" onClick={() => removeItm(item.id)}>
                                            <SlDislike />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div id="clrbtn" className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4">
                <Button size="sm" variant="danger" onClick={clearCartItem}>
                    Clear Cart
                </Button>
                <Button size="sm" variant="">
                    <span className="font-bold text-xl sm:text-2xl">Total Price : ${total}</span>
                </Button>
            </div>
        </>
    )
}

export default WishList;
