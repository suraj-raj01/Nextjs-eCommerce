'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Table from "react-bootstrap/Table";
import { MdDelete } from "react-icons/md";
import deleteProduct from '../../../actions/deleteProduct';
import getVendorsProduct from "../../../actions/admin/getVendorProduct";
import approveProduct from '../../../actions/admin/approveProduct';
import cancelApproveProduct from '../../../actions/admin/cancelApproveProduct';
import { useParams } from 'next/navigation';
import getVendorbyId from '../../../actions/admin/getVendorbyId';
import Swal from 'sweetalert2';

export default function DisplayPage() {
  const [data, setVendorProduct] = useState([]);
  const [vendor, setVendor] = useState({});
  const params = useParams();
  const id = params.id || undefined;

  const fetchData = async () => {
    const vendorData = await getVendorsProduct(id);
    if (vendorData && Array.isArray(vendorData.data)) {
      setVendorProduct(vendorData.data);
    } else {
      setVendorProduct([]);
    }
  };

  const getVendor = async () => {
    const vendorInfo = await getVendorbyId(id);
    setVendor(vendorInfo || {});
  };

  useEffect(() => {
    fetchData();
    getVendor();
  }, []);

  const deleteItem = async (productId) => {
    await deleteProduct(productId);
    fetchData();
    Swal.fire({
      title: "Product Deleted!",
      icon: "success"
    });
  };

  const approve = async (productId) => {
    await approveProduct(productId);
    fetchData();
    Swal.fire({
      title: "Product Approved Successfully!",
      icon: "success"
    });
  };

  const cancelApprove = async (productId) => {
    await cancelApproveProduct(productId);
    fetchData();
    Swal.fire({
      title: "Product Approval Canceled!",
      icon: "warning"
    });
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const currentItems = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <p className='text-center p-2 text-2xl font-bold'>{vendor?.name ? `${vendor.name}'s PRODUCTS` : "Vendor's Products"}</p>

      {data && data.length > 0 ? (
        <div style={{ height: '77vh' }} className='flex flex-col items-center content-between'>
          <Table striped hover responsive>
            <thead>
              <tr>
                <th>SNo</th>
                <th>Product Name</th>
                <th>Product Title</th>
                <th>Price ₹</th>
                <th>Category</th>
                <th>Product Image</th>
                <th>Approve Status</th>
                <th>Update</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr key={index}>
                  <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td>{item.proname}</td>
                  <td>{item.protitle}</td>
                  <td>{item.proprice}</td>
                  <td>{item.proCategory}</td>
                  <td>
                    <Image src={item.proimgurl} alt='img' height={50} width={50} />
                  </td>
                  <td>
                    {item.approve === "no" ? (
                      <Button size='sm' variant='warning' onClick={() => approve(item.id)}>Approve</Button>
                    ) : (
                      <Button size='sm' variant='success' onClick={() => cancelApprove(item.id)}>Approved</Button>
                    )}
                  </td>
                  <td>
                    <Button size='sm' variant='danger' onClick={() => deleteItem(item.id)}>
                      <span className='flex items-center gap-1'><MdDelete />Delete</span>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Pagination */}
          <div className="flex justify-center gap-3 mt-4">
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
                className={`px-3 py-1 border rounded ${currentPage === num + 1 ? 'bg-green-700 text-white' : ''}`}
              >
                {num + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-10 text-lg font-semibold text-gray-500">No Data Found</div>
      )}
    </div>
  );
}
