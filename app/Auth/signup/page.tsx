"use client";
import { useRouter } from "next/navigation";
import Registration from "../../../app/actions/login/registration";
import LoginNav from "@/app/_components/LoginNav";
import React from "react";
import Swal from "sweetalert2";

const initialstate = {
  success: false,
  error: "",
  message: "",
};

export default function Form() {
  const [state, formAction] = React.useActionState(Registration, initialstate);
  const router = useRouter();

  if (state?.success) {
    Swal.fire({
      title: "Registration Successfully Completed!",
      icon: "success",
    });
    router.push("/Auth/login");
  }

  return (
    <>
      <LoginNav />
      <div className="h-fit flex items-center justify-center p-4 mt-5">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <p className="text-center font-bold text-2xl text-red-600 mb-6">SIGNUP</p>
          <form action={formAction} className="space-y-4 flex flex-col gap-3">

            <input
              type="text"
              required
              name="username"
              placeholder="Enter your name"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <input
              type="email"
              required
              name="useremail"
              placeholder="Enter your email"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <input
              type="password"
              required
              name="password"
              placeholder="Password"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />

            <button
              type="submit"
              className="w-full p-2 bg-red-500 text-white rounded-md mt-2 hover:bg-red-600 focus:outline-none"
            >
              SIGNUP
            </button>

            <div className="text-center mt-2">
              <p>
                Already have an account?{" "}
                <span
                  className="font-bold text-red-700 cursor-pointer"
                  onClick={() => {
                    router.push("/Auth/login");
                  }}
                >
                  LOGIN
                </span>
              </p>
            </div>

            {state?.error && (
              <p className="text-red-800 text-center mt-2">{state?.error}</p>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
