'use client';

import "../managevendor/style.css";
import React, { useEffect, useState } from 'react';
import adminRequest from "@/app/actions/superadmin/adminRequest";
import Table from "react-bootstrap/Table";
import { AiFillDelete } from "react-icons/ai";
import deleteAdmin from "@/app/actions/superadmin/deleteAdmin";
import activateAdmin from "@/app/actions/superadmin/activeAdmin";
import deActivateAdmin from "@/app/actions/superadmin/deactiveAdmin";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";

export default function AdminPage() {
  const [mydata, setData] = useState([]);

  const fetchData = async () => {
    const data = await adminRequest();
    setData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const delAdmin = async (id) => {
    await deleteAdmin(id);
    Swal.fire({
      title: "Admin Deleted!",
      icon: "success"
    });
    fetchData();
  };

  const activeAdmin = async (id) => {
    await activateAdmin(id);
    Swal.fire({
      title: "Admin Activated!",
      icon: "success"
    });
    fetchData();
  };

  const deactiveAdmin = async (id) => {
    await deActivateAdmin(id);
    Swal.fire({
      title: "Admin De-Activated!",
      icon: "success"
    });
    fetchData();
  };

  return (
    <div>
      <div className="w-full h-auto p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <p className="text-2xl font-bold text-gray-800">Admins List</p>

        <form
          id="search-form"
          className="flex w-full md:w-auto gap-2"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="text"
            name="search"
            placeholder="Search vendors"
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
            <th>Admin Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Request</th>
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
                  <Button
                    size="sm"
                    variant="success"
                    onClick={() => activeAdmin(item.id)}
                  >
                    Confirm
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    variant="warning"
                    onClick={() => deactiveAdmin(item.id)}
                  >
                    Deactivate
                  </Button>
                )}
              </td>
              <td>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => delAdmin(item.id)}
                >
                  <span className="flex items-center gap-2">
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
