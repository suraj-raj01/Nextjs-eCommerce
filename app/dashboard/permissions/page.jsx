'use client';
import getRole from "../../actions/superadmin/getRole";
import React, { useState, useEffect } from 'react';
import setPermission from "../../actions/superadmin/setPermissions";

export default function Page() {
  const [role, setRole] = useState([]);

  const fetchRoles = async () => {
    const response = await getRole();
    if (response.success) {
      setRole(response.data);
      console.log(response.data);
    } else {
      console.log(response.error);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const setPermissions = async (id, permission) => {
    console.log(id,permission)
    await setPermission(id, permission);
  };

  return (
    <div>
      <h4 className="text-center">Manage Permissions</h4>
      <div className="flex flex-wrap md:flex-row gap-6 w-full p-4">
        {role.map((item) => (
          <div key={item.id} className="flex flex-col w-130 bg-white shadow rounded-lg pt-2 pb-2 pl-4 pr-4">
            <p className="text-lg font-bold text-gray-800 mb-2">
              Manage permissions for <span className="text-green-600">{item.role}</span>
            </p>

            <PermissionToggle label="create product" value="createproducts" checked={item?.permissions?.includes("createproducts")} onChange={() => setPermissions(item.id, "createproducts")} />
            <PermissionToggle label="update product" value="updateproducts" checked={item?.permissions?.includes("updateproducts")} onChange={() => setPermissions(item.id, "updateproducts")} />
            <PermissionToggle label="manage vendors" value="managevendors" checked={item?.permissions?.includes("managevendors")} onChange={() => setPermissions(item.id, "managevendors")} />
            <PermissionToggle label="manage admins" value="manageadmins" checked={item?.permissions?.includes("manageadmins")} onChange={() => setPermissions(item.id, "manageadmins")} />
            <PermissionToggle label="manage users" value="manageusers" checked={item?.permissions?.includes("manageusers")} onChange={() => setPermissions(item.id, "manageusers")} />
            <PermissionToggle label="view products" value="viewproducts" checked={item?.permissions?.includes("viewproducts")} onChange={() => setPermissions(item.id, "viewproducts")} />
            <PermissionToggle label="manage roles" value="manageroles" checked={item?.permissions?.includes("manageroles")} onChange={() => setPermissions(item.id, "manageroles")} />
            <PermissionToggle label="manage permissions" value="managepermissions" checked={item?.permissions?.includes("managepermissions")} onChange={() => setPermissions(item.id, "managepermissions")} />
          </div>
        ))}
      </div>
    </div>
  );
}

function PermissionToggle({ label, value, checked, onChange }) {
  return (
    <div className="flex items-center justify-between w-full gap-2 text-gray-700 font-semibold">
      {label}
      <input
        type="checkbox"
        value={value}
        defaultChecked={checked}
        onChange={onChange}
        className="accent-green-600 w-5 h-5"
      />
    </div>
  );
}
