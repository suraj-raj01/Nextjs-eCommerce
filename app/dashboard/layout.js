'use client';
import Link from 'next/link';
import { FaBars } from 'react-icons/fa';
import { GoSidebarExpand } from "react-icons/go";
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

  const router = useRouter();
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) return;

    const user = JSON.parse(storedUser);
    console.log(user);
    console.log('User Role:', user?.role?.role);
    setUsername(user?.role?.role);
    console.log('User Permissions:', user?.role?.permissions);
    const abilityInstance = defineAbilitiesFor(user);
    setAbility(abilityInstance);
  }, []);

  const CanComponent = createContextualCan(AbilityContext.Consumer);
  if (!ability) return null;
  console.log(ability);

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
    <main>
      <header id="vendor-nav">
        <div className="flex items-center content-center gap-3">
          <FaBars onClick={sidebar} id="menu" style={{ display: 'none' }} />
          <GoSidebarExpand id="cancelbtn" onClick={cancelbtn} style={{ display: 'block' }} />
          {username.toUpperCase()} DASHBOARD
        </div>
        <div>
        <span onClick={logout} className="font-semibold text-sm text-white cursor-pointer bg-red-600 p-2 rounded-md">LOGOUT</span>
        </div>
      </header>
      <AbilityContext.Provider value={ability}>
        <div id="vendor-main" className="flex">
          <div id="vendordashboard" style={{ display: 'block' }}>
            <Link href="#" className="flex items-center gap-3 text-2xs">
              <AiFillDashboard />
              Dashboard
            </Link>
            <CanComponent I="manage" a="Admin">
              <Link href="/dashboard/createrole" className="flex items-center gap-3 text-2xs">
                <PiUserCirclePlusFill />
                Create Role
              </Link>
              <Link href="/dashboard/adduser" className="flex items-center gap-3 text-2xs">
                <IoIosPersonAdd />
                Add User
              </Link>
              <Link href="/dashboard/assignrole" className="flex items-center gap-3 text-2xs">
                <MdAssignmentInd />
                Assign Role
              </Link>
              <Link href="/dashboard/permissions" className="flex items-center gap-3 text-2xs">
                <MdPrivacyTip />
                Manage Permissions
              </Link>

            </CanComponent>

            <CanComponent I="manage" a="Vendor">
              {/* <Link href="/dashboard/addvendor" className="flex items-center gap-3 text-2xs">
                <FaUserGroup />
                Add Vendors
              </Link> */}
              <Link href="/dashboard/managevendor" className="flex items-center gap-3 text-2xs">
                <FaUserGroup />
                Manage Vendors
              </Link>
              <Link href="/dashboard/categories" className="flex items-center gap-3 text-2xs">
                <TbCategoryPlus />
                Categories
              </Link>
            </CanComponent>
            <CanComponent I="manage" a="User">
              <Link href="/dashboard/managevendor" className="flex items-center gap-3 text-2xs">
                <FaUserGroup />
                See Users
              </Link>
            </CanComponent>
            <CanComponent I="create" a="Products">

              <Link href="/dashboard/insert" className="flex items-center gap-3 text-2xs">
                <FaUserGroup />
                Insert Product
              </Link>
              <Link href="/dashboard/products" className="flex items-center gap-3 text-2xs">
                <FaRegEdit />
                Update Product
              </Link>
              <Link href="/dashboard/orders" className="flex items-center gap-3 text-2xs">
                <AiFillProduct />
                Orders
              </Link>
            </CanComponent>
            <CanComponent I="read" a="Products">

              <Link href="/dashboard/customers" className="flex items-center gap-3 text-2xs">
                <AiFillProduct />
                See Products
              </Link>
            </CanComponent>
          </div>
          <div className="flex-1 overflow-y-scroll " style={{height:'88vh'}}>{children}</div>
        </div>
      </AbilityContext.Provider>
      <DashbaordFooter />
    </main>
  );
}
