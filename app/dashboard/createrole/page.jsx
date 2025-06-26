'use client';
import React, { useState, useEffect } from 'react';
import createRole from "../../actions/superadmin/createRole";
import getRole from "../../actions/superadmin/getRole";
import deleteRole from "../../actions/superadmin/deleteRole";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Swal from 'sweetalert2';

const initialState = {
  success: undefined,
  error: '',
};

const CreateRole = () => {
  const [state, formAction] = React.useActionState(createRole, initialState);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRoles = async () => {
    setLoading(true);
    const data = await getRole();
    setRoles(data.data || []);
    setLoading(false);
  };



const delRole = async (id) => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "This role will be permanently deleted!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  });

  if (result.isConfirmed) {
    try {
      setLoading(true);
      await deleteRole(id);
      await fetchRoles();
      Swal.fire("Deleted!", "The role has been deleted.", "success");
    } catch (error) {
      Swal.fire("Error!", "Something went wrong while deleting.", "error");
    } finally {
      setLoading(false);
    }
  }
};


  useEffect(() => {
    fetchRoles();
  }, []);

  useEffect(() => {
    if (state?.success) {
      fetchRoles(); 
    }
  }, [state]);

  return (
    <div className="flex flex-col items-center mt-10">
      <form className="flex flex-col gap-4 w-full max-w-md p-4" action={formAction}>
        <p className="text-xl font-bold">Create Role</p>
        <input
          type="text"
          name="role"
          placeholder="Enter role"
          className="border border-gray-300 rounded p-2"
          required
        />
        <button type="submit" className="bg-red-500 text-white rounded p-2" disabled={loading}>
          {loading ? "Creating..." : "Create Role"}
        </button>
        {state?.error && <p className="text-red-500">{state.error}</p>}
        {state?.success && <p className="text-green-500">Role created successfully!</p>}
      </form>

      <div className="flex flex-col gap-4 w-fit max-w-full p-4">
        <h4 className="text-lg font-bold">Existing Roles</h4>
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : roles.length > 0 ? (
          roles.map((role) => (
            <div key={role.id} className="text-gray-700 font-bold flex w-full items-center gap-3 justify-between">
              {role.role}
              <div className="flex gap-2">
                <span className="text-gray-500 cursor-pointer"><FaEdit /></span>
                <span className="text-gray-500 cursor-pointer" onClick={() => delRole(role.id)}><MdDelete /></span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No roles available.</p>
        )}
      </div>
    </div>
  );
};

export default CreateRole;
