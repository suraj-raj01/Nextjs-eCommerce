'use client';
import "../managevendor/style.css";
import React, { useEffect, useState } from 'react';
import getAdmin from "@/app/actions/superadmin/getAdmins";
import Table from "react-bootstrap/Table";
import { AiFillDelete } from "react-icons/ai";
import deleteAdmin from "@/app/actions/superadmin/deleteAdmin";
import activateAdmin from "@/app/actions/superadmin/activeAdmin";
import deActivateAdmin from "@/app/actions/superadmin/deactiveAdmin";
import Button from "react-bootstrap/Button";
import searchVendor from "@/app/actions/admin/searchVendor";
import Modal from 'react-bootstrap/Modal';
import approveProduct from '@/app/actions/admin/approveProduct';
import cancelApproveProduct from '@/app/actions/admin/cancelApproveProduct';
import Image from "next/image";
import Swal from "sweetalert2";

export default function AdminPage() {
  const [mydata, setData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [status, setStatus] = useState(false);
  const [data, setVendorProduct] = useState([]);
  const [searchInput, setSearch] = useState("");

  const [show, setShow] = useState(false);

  const fetchData = async () => {
    const data = await getAdmin();
    setData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const delAdmin = (id) => {
    deleteAdmin(id);
    Swal.fire({
      title: "Admin Deleted!",
      icon: "success"
    });
    fetchData();
  };

  const activeAdmin = (id) => {
    activateAdmin(id);
    Swal.fire({
      title: "Admin Activated!",
      icon: "success"
    });
    fetchData();
  };

  const deactiveAdmin = (id) => {
    deActivateAdmin(id);
    Swal.fire({
      title: "Admin De-Activated!",
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
            <th>Status</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {mydata.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.contact}</td>
              <td>
                {item.status === "pending" ? (
                  <Button size="sm" variant="success" onClick={() => activeAdmin(item.id)}>
                    Activate
                  </Button>
                ) : (
                  <Button size="sm" variant="warning" onClick={() => deactiveAdmin(item.id)}>
                    Deactivate
                  </Button>
                )}
              </td>
              <td>
                <Button size="sm" variant="danger" onClick={() => delAdmin(item.id)}>
                  <span className="flex items-center content-center gap-2">
                    <AiFillDelete /> Delete
                  </span>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={() => setShow(false)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title>Products</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped hover responsive>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Price</th>
                <th>Image</th>
                <th>Approve</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(data) && data.map((item, index) => (
                <tr key={index}>
                  <td>{item?.proname}</td>
                  <td>{item?.proprice}{" ₹"}</td>
                  <td>
                    <Image src={item?.proimgurl} alt="pro image" height={40} width={40} />
                  </td>
                  <td>
                    {item?.approve === "no" ? (
                      <Button size='sm' variant='warning' onClick={() => { approve(item.id) }}>Approve</Button>
                    ) : (
                      <Button size='sm' variant='success' onClick={() => { cancelApprove(item.id) }}>Approved</Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>
    </div>
  );
}
