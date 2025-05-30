'use client';

import React, { ReactNode, useEffect } from 'react';
import Link from 'next/link';
import { FaBars } from 'react-icons/fa';
import { FaUserGroup } from 'react-icons/fa6';
import { AiFillDashboard } from 'react-icons/ai';
import { AiFillProduct } from "react-icons/ai";
import { IoSettingsSharp } from "react-icons/io5";
import DashbaordFooter from '../_components/DashbaordFooter';
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import { MdLaptopChromebook } from "react-icons/md";
import { IoMdGitPullRequest } from "react-icons/io";
import { GoSidebarExpand } from "react-icons/go";
import { IoMdLogOut } from "react-icons/io";
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {

  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
   if(typeof window!="undefined"){
    const email = localStorage.getItem("email");
    if (!email) {
      Swal.fire({
        title: "Please Login!!",
        icon: "warning"
      });
      router.push("/Auth/login");
    } else {
      setUserEmail(email);
    }
  }
  }, []);


  const sidebar = (): void => {
    const dashboard = document.getElementById('vendordashboard');
    const menu = document.getElementById('menu');
    const cancelBtn = document.getElementById('cancelbtn');


    if (dashboard && menu && cancelBtn) {
      dashboard.style.display = 'block';
      menu.style.display = 'none';
      cancelBtn.style.display = 'block';
    }
  };

  const cancelbtn = (): void => {
    const dashboard = document.getElementById('vendordashboard');
    const menu = document.getElementById('menu');
    const cancelBtn = document.getElementById('cancelbtn');

    if (dashboard && menu && cancelBtn) {
      dashboard.style.display = 'none';
      menu.style.display = 'block';
      cancelBtn.style.display = 'none';
    }
  };

  const router = useRouter();
  const logOut = () => {
   if(typeof window != "undefined"){
    localStorage.clear();
    router.push("/Auth/login")
   }
  }


  const [smShow, setSmShow] = useState(false);

  return (
    <main>
      <header id="vendor-nav">
        <div className="flex items-center content-center gap-3">
          <FaBars onClick={sidebar} id="menu" style={{ display: 'none' }} />
          <GoSidebarExpand id="cancelbtn" onClick={cancelbtn} style={{ display: 'block' }} />
          ADMIN DASHBOARD
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontSize: '18px' }}>
          <p className='text-center'>{userEmail}</p>
          {userEmail ? (
            <p onClick={logOut} className='text-red-500 text-2xs flex items-center content-center gap-1 cursor-pointer'><IoMdLogOut />Logout</p>
          ) : null}
        </div>


      </header>
      <div id="vendor-main" className="flex">
        <div id="vendordashboard" style={{ display: 'block' }}>
          <p></p>
          <Link href="/admindashboard" className="flex items-center gap-3 text-2xs">
            <AiFillDashboard />
            Dashboard
          </Link>
          {/* <Link href="/admindashboard/insert" className="flex items-center gap-3 text-2xs">
            <RiInsertColumnRight />
            Insert Product
          </Link> */}
          <Link href="/admindashboard/vendors" className="flex items-center gap-3 text-2xs">
            <FaUserGroup />
            Manage Vendors
          </Link>
          {/* <Link href="/admindashboard/products" className="flex items-center gap-3 text-2xs">
            <AiFillProduct />
            Manage Products
          </Link> */}
          <Link href="/admindashboard/requestvendor" className="flex items-center gap-3 text-2xs">
            <IoMdGitPullRequest />
            Vendors Request
          </Link>
          <Link href="/admindashboard/categories" className="flex items-center gap-3 text-2xs">
            <AiFillProduct />
            Categories
          </Link>
          {/* <Link href="#" className="flex items-center gap-3 text-2xs" onClick={() => setSmShow(true)}>
            <IoSettingsSharp />
            Settings
          </Link> */}
        </div>
        <main style={{ width: '100%' }}>
          {children}
        </main>
      </div>
      <DashbaordFooter />
      <Modal
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Settings
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className='font-bold'>Appearance</p>
          <p className='flex items-center content-center gap-3 cursor-pointer'><CiLight /> Light Mode</p>
          <p className='flex items-center content-center gap-3 cursor-pointer'><MdDarkMode /> Dark Mode</p>
          <p className='flex items-center content-center gap-3 cursor-pointer'><MdLaptopChromebook /> System Default</p>
        </Modal.Body>
      </Modal>
    </main>
  );
}
