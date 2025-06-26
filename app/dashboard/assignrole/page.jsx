'use client'
import React, { useEffect, useState } from 'react'
import getRoles from '../../actions/superadmin/getRole'
import getUsers from '../../actions/superadmin/getUsers'
import assignRole from '../../actions/superadmin/assignRole'
// import removeRole from '../../actions/superadmin/removeRole'
import { FaEdit, FaTrash } from 'react-icons/fa'
import Swal from 'sweetalert2'

const AssignRole = () => {
  const [roles, setRoles] = useState([])
  const [users, setUsers] = useState([])
  const [assignedUsers, setAssignedUsers] = useState([])
  const [editingUserId, setEditingUserId] = useState(null)

  const fetchData = async () => {
    const [roleRes, userRes] = await Promise.all([getRoles(), getUsers()])
    if (roleRes.success) setRoles(roleRes.data || [])
    if (userRes.success) {
      const data = userRes.data || []
      setUsers(data.filter(u => !u.roleId))
      setAssignedUsers(data.filter(u => u.roleId))
    }
  }

  const handleAssign = async (userId, roleId) => {
    const res = await assignRole(userId, roleId)
    if (res.success) {
      Swal.fire({
        title: "Assigned",
        text: res.message || "Role assigned successfully",
        icon: "success",
      });
      fetchData()
      setEditingUserId(null)
    } else {
      console.error(res.error)
    }
  }

  const handleRemoveRole = async (userId) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to remove this user's role?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Remove",
      cancelButtonText: "Cancel"
    });

    if (confirm.isConfirmed) {
      const res = await removeRole(userId)
      if (res.success) {
        Swal.fire("Removed", res.message || "Role removed successfully", "success")
        fetchData()
      }
    }
  }

  useEffect(() => { fetchData() }, [])

  return (
    <div className="p-6 space-y-10">
      {/* Unassigned Users */}
      <div>
        <p className="text-2xl font-bold text-gray-700 mb-2">Assign Roles to Users</p>
        {users.length === 0 ? (
          <p className="text-gray-500">All users have roles assigned.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {users.map(user => (
              <div key={user.id} className="bg-white rounded-xl shadow p-4">
                <p className="text-lg font-semibold text-gray-800">{user.name}</p>
                <p className="text-sm text-gray-500 mb-2">{user.email}</p>
                <select
                  title="Select role"
                  className="w-full border border-gray-300 p-2 rounded-md"
                  defaultValue=""
                  onChange={e => handleAssign(user.id, e.target.value)}
                >
                  <option value="" disabled>Select role</option>
                  {roles.map(role => (
                    <option key={role.id} value={role.id}>{role.role}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Assigned Users */}
      <div>
        <p className="text-2xl font-bold text-gray-700 mb-3">Users With Assigned Roles</p>
        {assignedUsers.length === 0 ? (
          <p className="text-gray-500">No users have been assigned roles yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {assignedUsers.map(user => (
              <div key={user.id} className="bg-white rounded-xl shadow p-4 relative">
                <p className="text-lg font-semibold text-gray-800">{user.name.toUpperCase()}</p>
                <p className="text-sm text-gray-700">{user.email}</p>

                {editingUserId === user.id ? (
                  <select
                    className="w-full mt-2 border border-gray-300 p-2 rounded-md"
                    defaultValue={user.roleId}
                    onChange={e => handleAssign(user.id, e.target.value)}
                  >
                    <option value="" disabled>Select role</option>
                    {roles.map(role => (
                      <option key={role.id} value={role.id}>{role.role}</option>
                    ))}
                  </select>
                ) : (
                  <div className="mt-2 inline-block text-sm font-semibold text-white bg-gray-800 px-3 py-1 rounded-md">
                    {roles.find(r => r.id === user.roleId)?.role || '—'}
                  </div>
                )}

                {/* Action Icons */}
                <div className="absolute top-3 right-3 flex gap-3">
                  <FaEdit
                    onClick={() => setEditingUserId(user.id)}
                    className="text-blue-600 hover:text-blue-800 cursor-pointer"
                    title="Edit Role"
                  />
                  <FaTrash
                    onClick={() => handleRemoveRole(user.id)}
                    className="text-red-600 hover:text-red-800 cursor-pointer"
                    title="Remove Role"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AssignRole;
