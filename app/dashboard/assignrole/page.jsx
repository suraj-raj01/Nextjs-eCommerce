'use client'
import React, { useEffect, useState } from 'react'
import getRoles from '../../actions/superadmin/getRole'
import getUsers from '../../actions/superadmin/getUsers'
import assignRole from '../../actions/superadmin/assignRole'
import { FaEdit } from 'react-icons/fa'

const AssignRole = () => {
  const [roles, setRoles] = useState([])
  const [users, setUsers] = useState([])
  const [assignedUsers, setAssignedUsers] = useState([])

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
      alert(res.message)
      fetchData()
    } else {
      console.error(res.error)
    }
  }

  useEffect(() => { fetchData() }, [])

  const renderRow = (user, withSelect = false) => (
    <div key={user.id} className="flex items-center gap-4 pb-2">
      <div className="w-1/3 font-medium">{user.name}</div>
      <div className="w-1/3 font-medium">{user.email}</div>
      <div className="w-1/3 font-medium">
        {withSelect ? (
          <select
            title='select role'
            className="border border-gray-300 p-2 rounded-md w-full"
            defaultValue=""
            onChange={e => handleAssign(user.id, e.target.value)}
          >
            <option value="" disabled>Select role</option>
            {roles.map(r => <option key={r.id} value={r.id}>{r.role}</option>)}
          </select>
        ) : (
          roles.find(r => r.id === user.roleId)?.role || '—'
        )}
      </div>
    </div>
  )

  return (
    <div>
      <p className="text-xl font-bold pl-5">Assign Role</p>
      <div className="flex items-center gap-4 pl-6 bg-gray-100 pt-2 pb-2">
        <div className="w-1/3 font-medium">User Name</div>
        <div className="w-1/3 font-medium">User Email</div>
        <div className="w-1/3 font-medium">Assign Role</div>
      </div>
      <div className="flex flex-col gap-2 p-4">
        {users.map(u => renderRow(u, true))}
      </div>

      <p className="text-xl font-bold mt-8 pl-5">Assigned Role</p>
      <div className="flex items-center gap-2 pl-5 bg-gray-100 pt-2 pb-2">
        <div className="w-1/3 font-medium">User Name</div>
        <div className="w-1/3 font-medium">User Email</div>
        <div className="w-1/3 font-medium">Role</div>
      </div>
      <div className="flex flex-col gap-4 p-4">
        {assignedUsers.map(u => renderRow(u))}
      </div>
    </div>
  )
}

export default AssignRole;
