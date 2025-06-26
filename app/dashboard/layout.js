'use client';
import Link from 'next/link';
import { FaBars } from 'react-icons/fa';
import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";
import { FaUserGroup } from 'react-icons/fa6';
import { AiFillDashboard } from 'react-icons/ai';
import DashbaordFooter from '../_components/DashbaordFooter';
import { TbCategoryPlus } from "react-icons/tb";
import { defineAbilitiesFor } from "../../lib/casl/ability";
import { createContextualCan } from '@casl/react';
import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AiFillProduct } from "react-icons/ai";
import { IoIosPersonAdd } from "react-icons/io";
import { MdAssignmentInd } from "react-icons/md";
import { MdPrivacyTip } from "react-icons/md";
import { PiUserCirclePlusFill } from "react-icons/pi";
import { FaRegEdit } from "react-icons/fa";
import Swal from 'sweetalert2';

const AbilityContext = createContext();

export default function SuperAdminLayout({ children }) {
  const [ability, setAbility] = useState(null);
  const [username, setUsername] = useState("");
  const [useremail, setUseremail] = useState("");

  const SidebarLink = ({ href, icon, label }) => (
    <Link href={href} className="flex items-center gap-3 text-sm font-medium text-gray-700 hover:text-blue-600 transition">
      {icon}
      <span>{label}</span>
    </Link>
  );


  const router = useRouter();
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) return;
    const user = JSON.parse(storedUser);
    setUsername(user?.role?.role);
    setUseremail(user?.email);
    const abilityInstance = defineAbilitiesFor(user);
    setAbility(abilityInstance);
  }, []);

  const CanComponent = createContextualCan(AbilityContext.Consumer);
  if (!ability){
    return(
      <div className='h-screen flex items-center justify-center text-2xl text-white font-bold bg-gray-800'>
        Redirecting....
      </div>
    )
  };

  const sidebar = () => {
    const dashboard = document.getElementById('vendordashboard');
    const menu = document.getElementById('menu');
    const cancelBtn = document.getElementById('cancelbtn');

    if (dashboard && menu && cancelBtn) {
      dashboard.style.display = 'block';
      menu.style.display = 'none';
      cancelBtn.style.display = 'block';
    }
  };

  const cancelbtn = () => {
    const dashboard = document.getElementById('vendordashboard');
    const menu = document.getElementById('menu');
    const cancelBtn = document.getElementById('cancelbtn');

    if (dashboard && menu && cancelBtn) {
      dashboard.style.display = 'none';
      menu.style.display = 'block';
      cancelBtn.style.display = 'none';
    }
  };

  const logout = () => {
    localStorage.clear();
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to LogOut!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout"
    }).then((result) => {
      if (result.isConfirmed) {
        router.push("/Auth/login")
        Swal.fire("You Logged Out", "Your file has been deleted.", "success");
      }
    });
  }

  return (
    <main className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header id="vendor-nav" className="flex justify-between items-center bg-blue-800 text-white px-6 py-4 shadow">
        <div className="flex items-center gap-3 text-lg font-bold">
          <GoSidebarCollapse id="menu" onClick={sidebar} className="cursor-pointer hidden md:block" />
          <GoSidebarExpand id="cancelbtn" onClick={cancelbtn} className="cursor-pointer hidden md:block" />
          <span>{username?.toUpperCase()} DASHBOARD</span>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span>
            <span className='pl-2 pr-2 pb-1 rounded-xl mr-2 bg-red-500 font-bold'>{useremail[0]}</span>
            {useremail}
          </span>
          <span
            onClick={logout}
            className="cursor-pointer bg-red-600 hover:bg-red-700 px-3 py-1 font-semibold"
          >
            LOGOUT
          </span>
        </div>
      </header>

      {/* Main Layout */}
      <AbilityContext.Provider value={ability}>
        <div id="vendor-main" className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <aside
            id="vendordashboard"
            style={{ display: 'block' }}
            className="w-64 bg-gray-900 shadow-lg p-4 space-y-3  border-r"
          >
            <SidebarLink href="#" icon={<AiFillDashboard />} label="Dashboard" />

            <CanComponent I="manage" a="Admin">
              <SidebarLink href="/dashboard/createrole" icon={<PiUserCirclePlusFill />} label="Create Role" />
              <SidebarLink href="/dashboard/adduser" icon={<IoIosPersonAdd />} label="Add User" />
              <SidebarLink href="/dashboard/assignrole" icon={<MdAssignmentInd />} label="Assign Role" />
              <SidebarLink href="/dashboard/permissions" icon={<MdPrivacyTip />} label="Manage Permissions" />
            </CanComponent>

            <CanComponent I="manage" a="Vendor">
              <SidebarLink href="/dashboard/managevendor" icon={<FaUserGroup />} label="Manage Vendors" />
              <SidebarLink href="/dashboard/categories" icon={<TbCategoryPlus />} label="Categories" />
            </CanComponent>

            <CanComponent I="manage" a="User">
              <SidebarLink href="/dashboard/managevendor" icon={<FaUserGroup />} label="See Users" />
            </CanComponent>

            <CanComponent I="create" a="Products">
              <SidebarLink href="/dashboard/insert" icon={<FaUserGroup />} label="Insert Product" />
              <SidebarLink href="/dashboard/products" icon={<FaRegEdit />} label="Update Product" />
              <SidebarLink href="/dashboard/orders" icon={<AiFillProduct />} label="Orders" />
            </CanComponent>

            <CanComponent I="read" a="Products">
              <SidebarLink href="/dashboard/customers" icon={<AiFillProduct />} label="See Products" />
            </CanComponent>
          </aside>

          {/* Content */}
          <section className="flex-1 overflow-y-auto p-6" style={{ height: '88vh' }}>
            {children}
          </section>
        </div>
      </AbilityContext.Provider>

      <DashbaordFooter />
    </main>

  );
}
