// app/users/page.jsx
'use client';
import { useEffect, useState } from 'react';
import getVendorsProduct from '@/app/actions/admin/getVendorProduct';
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import "../insert/style.css"
import { useRouter } from 'next/navigation';
import deleteProduct from '@/app/actions/deleteProduct';
import Swal from 'sweetalert2';

const data = Array.from({ length: 100 }, (_, i) => `Item ${i + 1}`);

export default function DisplayPage() {
  const [data, setData] = useState<any>([]);
  const [id, setId] = useState<any>([]);

  const fetchData = async () => {
    const vendorData = await getVendorsProduct(id);
    if ('data' in vendorData && Array.isArray(vendorData.data)) {
      setData(vendorData.data);
    } else {
      setData([]);
    }
    console.log(vendorData);
  };

  useEffect(() => {
    fetchData();
    setId(localStorage.getItem("id"));
  }, [id]);

  const router = useRouter();
  const editpage = (id: number) => {
    router.push(`/vendordashboard/editdata/${id}`)
  }

  const deletePro = async (id: number) => {
    await deleteProduct(id.toString())
    Swal.fire({
      title: "Please Login First!",
      icon: "warning",
    });
  }

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const currentItems = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  let sno = 0;

  return (
    <div>
      <div className='overflow-y-scroll' style={{ height: '88vh' }}>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-300 rounded-lg shadow-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2 border">SNo</th>
                <th className="px-4 py-2 border">Product Name</th>
                <th className="px-4 py-2 border">Product Title</th>
                <th className="px-4 py-2 border">Price</th>
                <th className="px-4 py-2 border">Category</th>
                <th className="px-4 py-2 border">Product Image</th>
                <th className="px-4 py-2 border">Approve Status</th>
                <th className="px-4 py-2 border">Update</th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              {currentItems.map((item: any, index: number) => (
                <tr key={index} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-2 border">{++sno}</td>
                  <td className="px-4 py-2 border">{item.proname}</td>
                  <td className="px-4 py-2 border">{item.protitle}</td>
                  <td className="px-4 py-2 border">₹{item.proprice}</td>
                  <td className="px-4 py-2 border">{item.proCategory}</td>
                  <td className="px-4 py-2 border">
                    {item.proimgurl ? (
                      <img
                        src={item.proimgurl}
                        alt="img"
                        className="h-12 w-12 object-cover rounded"
                      />
                    ) : (
                      <span className="text-sm text-gray-500">No Image</span>
                    )}
                  </td>
                  <td className="px-4 py-2 border">
                    <span
                      className={`font-semibold ${item.approve === "yes" ? "text-green-600" : "text-yellow-600"
                        }`}
                    >
                      {item.approve === "yes" ? "Active" : "Pending"}
                    </span>
                  </td>
                  <td className="px-4 py-2 border space-y-1">
                    <button
                      onClick={() => deletePro(item.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-sm w-full flex items-center justify-center gap-1"
                    >
                      <AiFillDelete /> Delete
                    </button>
                    <button
                      onClick={() => editpage(item.id)}
                      className="bg-green-600 hover:bg-green-700 text-white mt-1 px-2 py-1 rounded text-sm w-full flex items-center justify-center gap-1"
                    >
                      <FaEdit /> Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center gap-3 space-x-2 mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          {[...Array(totalPages).keys()].map((num) => (
            <button
              key={num}
              onClick={() => setCurrentPage(num + 1)}
              className={`px-3 py-1 border rounded ${currentPage === num + 1 ? 'bg-green-700 text-white' : ''
                }`}
            >
              {num + 1}
            </button>
          ))}
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
