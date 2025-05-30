'use client';
import "../vendors/style.css";
import React, { useEffect, useState } from 'react';
import vendorRequest from "@/app/actions/admin/vendorsRequest";
import Table from "react-bootstrap/Table";
import { AiFillDelete } from "react-icons/ai";
import deleteVendor from '@/app/actions/admin/deleteVendor';
import activateVendor from '@/app/actions/admin/activateVendor';
import deActivateVendor from '@/app/actions/admin/deActivateVendor';
import Button from "react-bootstrap/Button";
import searchVendor from "@/app/actions/admin/searchVendor";
import Swal from "sweetalert2";

export default function VendorsPage() {
  const [mydata, setData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [status, setStatus] = useState(true);
  const [searchInput, setSearch] = useState("");

  const fetchData = async () => {
    const data = await vendorRequest();
    setData(data);
  };

  useEffect(() => {
    fetchData();
    setStatus(false);
  }, []);

  const delVendor = async (id) => {
    await deleteVendor(id);
    Swal.fire({
      title: "Vendor Deleted!!",
      icon: "warning"
    });
    fetchData();
  };

  const activeVendor = async (id) => {
    await activateVendor(id);
    Swal.fire({
      title: "Vendor Confirmed!!",
      icon: "success"
    });
    fetchData();
  };

  const dectiveVendor = async (id) => {
    await deActivateVendor(id);
    Swal.fire({
      title: "Vendor De-Activated!!",
      icon: "warning"
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

  return (
    <div>
      <div className="w-full h-auto p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <p className="text-2xl font-bold text-gray-800">Vendor List</p>

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

      <Table striped hover responsive>
        <thead>
          <tr>
            <th>Vendor Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Request</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {(status ? mydata : searchData).map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.contact}</td>
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
                  <span className="flex items-center content-center gap-2">
                    <AiFillDelete /> Delete
                  </span>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
