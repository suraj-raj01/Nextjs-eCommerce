'use client';
import Image from 'next/image';
import React from 'react';
import logo from "@/public/logo/logo.png";
import { useRouter } from 'next/navigation';

const LoginNav = () => {
  const router = useRouter();

  const home = () => {
    router.push('/');
  };

  return (
    <nav className="w-full shadow-md bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div
          className="cursor-pointer flex items-center space-x-2 hover:opacity-80 transition-opacity duration-200"
          onClick={home}
        >
          <Image src={logo} alt="logo" height={50} width={50} />
        </div>

      </div>
    </nav>
  );
};

export default LoginNav;
