"use client";
import { useRouter } from "next/navigation";
import Registration from "../../../app/actions/login/registration";
import LoginNav from "@/app/_components/LoginNav";
import React from "react";
import Swal from "sweetalert2";
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa6";

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
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-1/2">
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
          <div className="text-center mt-2 space-y-2">
            <p className="text-sm text-gray-600 font-medium">Or sign in with</p>

            <div className="flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => router.push('https://accounts.google.com/o/oauth2/auth?access_type=offline&client_id=787459168867-0v2orf3qo56uocsi84iroseoahhuovdm.apps.googleusercontent.com&prompt=consent&redirect_uri=https%3A%2F%2Fclerk.shared.lcl.dev%2Fv1%2Foauth_callback&response_type=code&scope=openid+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile&state=ahdwosxh9mu8qz3ezylr5ji0fnyqk84bx5w5bkg0')}
                className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md shadow hover:shadow-md hover:bg-gray-50 transition"
              >
                <FaGoogle />

              </button>

              <button
                type="button"
                onClick={() => router.push('https://www.facebook.com/login.php?skip_api_login=1&api_key=153095393363418&kid_directed_site=0&app_id=153095393363418&signed_next=1&next=https%3A%2F%2Fwww.facebook.com%2Fv20.0%2Fdialog%2Foauth%3Faccess_type%3Doffline%26client_id%3D153095393363418%26prompt%3Dconsent%26redirect_uri%3Dhttps%253A%252F%252Fclerk.shared.lcl.dev%252Fv1%252Foauth_callback%26response_type%3Dcode%26scope%3Demail%26state%3Dfdklgxhttdyqp4b8v72ztpvw5ycm59lio894rvhk%26ret%3Dlogin%26fbapp_pres%3D0%26logger_id%3De8a7778f-4e31-45fc-a912-ada7aa22d6c2%26tp%3Dunspecified&cancel_url=https%3A%2F%2Fclerk.shared.lcl.dev%2Fv1%2Foauth_callback%3Ferror%3Daccess_denied%26error_code%3D200%26error_description%3DPermissions%2Berror%26error_reason%3Duser_denied%26state%3Dfdklgxhttdyqp4b8v72ztpvw5ycm59lio894rvhk%23_%3D_&display=page&locale=en_GB&pl_dbl=0')}
                className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition"
              >
                <FaFacebook />

              </button>

              <button
                type="button"
                onClick={() => router.push('https://github.com/login?client_id=456274a3f3e4821d16e4&return_to=%2Flogin%2Foauth%2Fauthorize%3Faccess_type%3Doffline%26client_id%3D456274a3f3e4821d16e4%26prompt%3Dconsent%26redirect_uri%3Dhttps%253A%252F%252Fclerk.shared.lcl.dev%252Fv1%252Foauth_callback%26response_type%3Dcode%26scope%3Duser%253Aemail%2Bread%253Auser%26state%3Dhhuwocb592ns76fzd5h83k5mk0ap27duiwjap93o')}
                className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-gray-800 text-white rounded-md shadow hover:bg-black transition"
              >
                <FaGithub />

              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
