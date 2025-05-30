'use client'
import React, { useState } from 'react'
import getOrders from '../../../app/actions/vendors/orders'
import { useRouter } from 'next/navigation'
const page = () => {

    const router = useRouter();
    const [orders, setOrders] = React.useState<any>([]);
    const loadOrders = async () => {
        const data = await getOrders(localStorage.getItem("vendoremail") || "");
        console.log(data);
        if (Array.isArray(data)) {
            setOrders(data);
            console.log(data);
        } else {
            setOrders(data?.data || []);
        }
    }

    const seeProducts = async (id: any) => {
        router.push(`/vendordashboard/products/${id}`)
    }

    React.useEffect(() => {
        loadOrders();
    }, [])

    return (
        <div style={{ height:'88vh' }} className='overflow-y-scroll'>
            <table className="min-w-full border border-gray-300 rounded-lg shadow-md overflow-hidden">
                <thead className="bg-gray-100 text-gray-700 text-left">
                    <tr>
                        <th className="px-6 py-3 border-b whitespace-nowrap">Customer Name</th>
                        <th className="px-6 py-3 border-b whitespace-nowrap">Phone Number</th>
                        <th className="px-6 py-3 border-b whitespace-nowrap">Address</th>
                        <th className="px-6 py-3 border-b whitespace-nowrap">Product Details</th>
                    </tr>
                </thead>
                <tbody className="text-gray-800">
                    {orders.map((item: any, index: number) => (
                        <tr key={index} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 border-b">{item.username}</td>
                            <td className="px-6 py-4 border-b">+91 {item.phoneNumber}</td>
                            <td className="px-6 py-4 border-b">
                                {item.address}
                                <br />
                                {item.pincode}
                            </td>
                            <td className="px-6 py-4 border-b">
                                <button
                                    onClick={() => seeProducts(item.id)}
                                    className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition"
                                >
                                    See Products
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    )
}

export default page