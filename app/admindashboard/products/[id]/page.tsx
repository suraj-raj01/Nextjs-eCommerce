// app/users/page.jsx
'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Table from "react-bootstrap/Table"
import { MdDelete } from "react-icons/md";
import deleteProduct from '@/app/actions/deleteProduct';
import getVendorsProduct from "@/app/actions/admin/getVendorProduct"
import approveProduct from '@/app/actions/admin/approveProduct';
import cancelApproveProduct from '@/app/actions/admin/cancelApproveProduct';
import { useParams } from 'next/navigation';
import getVendorbyId from '@/app/actions/admin/getVendorbyId';
import Swal from 'sweetalert2';

const data = Array.from({ length: 100 }, (_, i) => `Item ${i + 1}`);

export default function DisplayPage() {
  const [data, setVendorProduct] = useState<any>([]);
  const [vendor, setVendor] = useState<any>({});
  const params = useParams();
  const id = params.id ? Number(params.id) : undefined;

  const fetchData = async () => {
    const vendorData = await getVendorsProduct(id as number);
    if ('data' in vendorData && Array.isArray(vendorData.data)) {
      setVendorProduct(vendorData.data || []);
    } else {
      setVendorProduct([]);
    }
    console.log(vendorData);
  };

  const getVendor = async () => {
    const vendorinfo = await getVendorbyId(id as number)
    setVendor(vendorinfo || {});
  }

  useEffect(() => {
    fetchData();
    getVendor();
  }, []);



  const deleteItem = (id: any) => {
    deleteProduct(id);
    fetchData();
    Swal.fire({
      title: "Product Deleted!!",
      icon: "success"
    });
  }

  const approve = (id: any) => {
    approveProduct(id);
    fetchData();
    Swal.fire({
      title: "Product Approved Successfull!!",
      icon: "success"
    });
  }
  const cancelApprove = (id: any) => {
    cancelApproveProduct(id);
    fetchData();
    Swal.fire({
      title: "Product Approved Cancel!",
      icon: "warning"
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
      {/* <div className="w-full h-auto p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <p className="text-2xl font-bold text-gray-800">Vendor List</p>

        <form id="search-form" className="flex w-full md:w-auto gap-2" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            name="search"
            placeholder="Search vendors"
            // value={searchInput}
            // onChange={search}
            className="w-full md:w-64 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <button
            type="submit"
            className="bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-900 transition"
          >
            Search
          </button>
        </form>
      </div> */}
      <p className='text-center p-2 text-2xl font-bold'>{vendor?.name + "'s PRODUCTS"}</p>

      {data ? (
        <div style={{ height: '77vh' }} className='flex flex-col items-center content-between'>
          <Table striped hover responsive>
            <thead>
              <tr>
                <th className='h-15'>SNo</th>
                <th className='h-15'>Product Name</th>
                <th className='h-15'>Product Title</th>
                <th className='h-15'>Price ₹</th>
                <th className='h-15'>Category</th>
                <th className='w-40 h-15'>Product Image</th>
                <th className='w-40 h-15'>Approve Status</th>
                <th className='h-15'>Update</th>
              </tr>
            </thead>
            <tbody>
              {
                currentItems.map((item: any, index: number) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.proname}</td>
                    <td>{item.protitle}</td>
                    <td>{item.proprice} ₹</td>
                    <td>{item.proCategory}</td>
                    <td><Image src={item.proimgurl} alt='img' height={50} width={50} /></td>
                    <td>
                      {item?.approve === "no" ? (
                        <Button size='sm' variant='warning' onClick={() => approve(item.id)}>Approve</Button>
                      ) : (
                        <Button size='sm' variant='success' onClick={() => cancelApprove(item.id)}>Approved</Button>
                      )}
                    </td>
                    <td>
                      <Button size='sm' variant='danger'>
                        <span onClick={() => deleteItem(item.id)} className='flex items-center gap-1'><MdDelete />Delete</span>
                      </Button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </Table>
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
      ) : (" ")}
    </div>
  );
}
