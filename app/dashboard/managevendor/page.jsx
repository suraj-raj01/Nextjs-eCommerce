'use client';
import "../managevendor/style.css";
import React, { useEffect, useState } from 'react';
import getAllVendors from "../../actions/admin/getAllVendors";
import Table from "react-bootstrap/Table";
import { AiFillDelete } from "react-icons/ai";
import deleteVendor from '../../actions/admin/deleteVendor';
import activateVendor from '../../actions/admin/activateVendor';
import deActivateVendor from '../../actions/admin/deActivateVendor';
import Button from "react-bootstrap/Button";
import searchVendor from "../../actions/admin/searchVendor";
import approveProduct from '../../actions/admin/approveProduct';
import cancelApproveProduct from '../../actions/admin/cancelApproveProduct';
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function VendorsPage() {
  const [mydata, setData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [status, setStatus] = useState(true);
  const [searchInput, setSearch] = useState("");

  const router = useRouter();

  const fetchData = async () => {
    const data = await getAllVendors();
    if (!Array.isArray(data) && data?.success) {
      setData(data?.users);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const delVendor = (id) => {
    deleteVendor(id);
    Swal.fire({
      title: "Vendor Deleted!",
      icon: "success"
    });
    fetchData();
  };

  const activeVendor = (id) => {
    activateVendor(id);
    Swal.fire({
      title: "Vendor Activated!",
      icon: "success"
    });
    fetchData();
  };

  const dectiveVendor = (id) => {
    deActivateVendor(id);
    Swal.fire({
      title: "Vendor De-Activated!",
      icon: "success"
    });
    fetchData();
  };

  const search = async (e) => {
    const value = e.target.value;
    setSearch(value);

    if (value.trim() === "") {
      setStatus(true);
      return;
    }

    const data = await searchVendor(value);
    setSearchData(data?.data || []);
    setStatus(false);
  };

  const approve = (id) => {
    approveProduct(id);
  };

  const cancelApprove = (id) => {
    cancelApproveProduct(id);
  };

  const seeProduct = (id) => {
    router.push(`/dashboard/products/${id}`);
  };

  let sno = 0;

  return (
    <div>
      <div className="w-full h-auto p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="text-xl font-bold text-gray-800">
          <Button variant="success" onClick={() => router.push("/dashboard/addvendor")}>
            + Add Vendor
          </Button>
        </div>

        <form id="search-form" className="flex w-full md:w-auto gap-2" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            name="search"
            placeholder="Search vendors"
            value={searchInput}
            onChange={search}
            className="w-full md:w-64 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <button
            type="submit"
            className="bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-900 transition"
          >
            Search
          </button>
        </form>
      </div>

      <div className="p-2 w-full">
        <Table striped hover responsive>
          <thead>
            <tr>
              <th>SNo</th>
              <th>Vendor Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Update</th>
              <th>See Products</th>
            </tr>
          </thead>
          <tbody>
            {(status ? mydata : searchData).map((item, index) => (
              <tr key={index}>
                <td>{++sno}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>
                  {item.status === "pending" ? (
                    <Button size="sm" variant="success" onClick={() => activeVendor(item.id)}>
                      Activate
                    </Button>
                  ) : (
                    <Button size="sm" variant="warning" onClick={() => dectiveVendor(item.id)}>
                      Deactivate
                    </Button>
                  )}
                </td>
                <td>
                  <Button size="sm" variant="danger" onClick={() => delVendor(item.id)}>
                    <span className="flex items-center gap-2">
                      <AiFillDelete /> Delete
                    </span>
                  </Button>
                </td>
                <td>
                  <Button size="sm" variant="success" onClick={() => seeProduct(item.id)}>
                    See Products
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
