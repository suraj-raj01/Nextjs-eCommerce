'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Home() {
  const [name, setName] = useState<string | null>(null);
  const router = useRouter()
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedName = localStorage.getItem("vendorname");

      if (!storedName) {
        Swal.fire({
          title: "Please Login First!",
          icon: "warning",
        });
        router.push("/Auth/login")
      } else {
        setName(storedName);
      }
    }
  })
  return (
    <>
      <div className="h-135">
        {/* <h1>Vendor Dashboard Layout</h1> */}
        <h2>Welcome <span className="text-red-600">{name}</span></h2>
      </div>
    </>
  )
}