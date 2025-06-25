'use client'

import React, { useEffect, useState } from 'react'
import LoginNav from '../../_components/LoginNav'
import loginUser from '../../actions/login/login'
import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2'
import { useUser } from '@clerk/nextjs'
import { FaFacebook, FaGithub, FaGoogle } from 'react-icons/fa6'

const initialState = {
  success: undefined,
  error: '',
  user: null,
}

const Login = () => {
  const [state, formAction] = React.useActionState(loginUser, initialState);
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { user } = useUser();

  // Perform side effects when login is successful
  useEffect(() => {
    if (state?.user) {
      localStorage.setItem('user', JSON.stringify(state?.user))
      console.log(state.user.id)
      localStorage.setItem("id", JSON.stringify(state?.user?.id))
      Swal.fire({
        title: "Login Successfully Completed!",
        icon: "success"
      });
      router.push('/dashboard')
      setLoading(true);
    }
    setLoading(false);
  }, [state, router])

  return (
    <div>
      <LoginNav />

      <div className="h-fit flex items-center justify-center p-4">
        <div className="bg-white p-8 mt-8 rounded-lg shadow-lg w-full max-w-1/2">
          <p className="text-center font-bold text-2xl text-red-600 mb-6">LOGIN</p>

          <form className="space-y-4" action={formAction}>
            <input
              type="email"
              required
              name="email"
              placeholder="Enter your email"
              className="w-full mt-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />

            <input
              type="password"
              required
              name="password"
              placeholder="Enter your password"
              className="w-full p-2 border border-gray-300 rounded-md mt-4 focus:outline-none focus:ring-2 focus:ring-red-500"
            />

            <button
              type="submit"
              className="w-full p-2 bg-red-500 text-white rounded-md mt-4 disabled:opacity-50 hover:bg-red-600 focus:outline-none font-bold"
              disabled={loading}
            >
              {loading ? 'Processing...' : 'LOGIN'}
            </button>

            <div className="text-center mt-4">
              <div className="text-sm text-gray-600 font-semibold">
                Don't have an account?{' '}
                <span
                  className="font-bold text-red-400 cursor-pointer"
                  onClick={() => router.push('/Auth/signup')}
                >
                  SignUp
                </span>
                <hr />
                {/* <SignedOut>
                  <SignInButton />
                </SignedOut>
                <SignedIn>
                  Signed In
                </SignedIn> */}
                {/* <span className="text-red-400 cursor-pointer"> With Google or Github</span> */}
                {state?.success && (
                  <span className="text-green-600 text-center">Login Successfully Completed!</span>
                )}
                {state?.error && (
                  <span className="text-red-600 text-center">{state.error}</span>
                )}
              </div>
            </div>
          </form>
          <div className="text-center mt-4 space-y-2">
            <p className="text-sm text-gray-600 font-medium">Or sign in with</p>

            <div className="flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => router.push('https://accounts.google.com/o/oauth2/auth?access_type=offline&client_id=787459168867-0v2orf3qo56uocsi84iroseoahhuovdm.apps.googleusercontent.com&prompt=consent&redirect_uri=https%3A%2F%2Fclerk.shared.lcl.dev%2Fv1%2Foauth_callback&response_type=code&scope=openid+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile&state=ahdwosxh9mu8qz3ezylr5ji0fnyqk84bx5w5bkg0')}
                className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md shadow hover:shadow-md hover:bg-gray-50 transition"
              >
                <FaGoogle/>

              </button>

              <button
                type="button"
                onClick={() => router.push('https://www.facebook.com/login.php?skip_api_login=1&api_key=153095393363418&kid_directed_site=0&app_id=153095393363418&signed_next=1&next=https%3A%2F%2Fwww.facebook.com%2Fv20.0%2Fdialog%2Foauth%3Faccess_type%3Doffline%26client_id%3D153095393363418%26prompt%3Dconsent%26redirect_uri%3Dhttps%253A%252F%252Fclerk.shared.lcl.dev%252Fv1%252Foauth_callback%26response_type%3Dcode%26scope%3Demail%26state%3Dfdklgxhttdyqp4b8v72ztpvw5ycm59lio894rvhk%26ret%3Dlogin%26fbapp_pres%3D0%26logger_id%3De8a7778f-4e31-45fc-a912-ada7aa22d6c2%26tp%3Dunspecified&cancel_url=https%3A%2F%2Fclerk.shared.lcl.dev%2Fv1%2Foauth_callback%3Ferror%3Daccess_denied%26error_code%3D200%26error_description%3DPermissions%2Berror%26error_reason%3Duser_denied%26state%3Dfdklgxhttdyqp4b8v72ztpvw5ycm59lio894rvhk%23_%3D_&display=page&locale=en_GB&pl_dbl=0')}
                className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition"
              >
              <FaFacebook/>

              </button>

              <button
                type="button"
                onClick={() => router.push('https://github.com/login?client_id=456274a3f3e4821d16e4&return_to=%2Flogin%2Foauth%2Fauthorize%3Faccess_type%3Doffline%26client_id%3D456274a3f3e4821d16e4%26prompt%3Dconsent%26redirect_uri%3Dhttps%253A%252F%252Fclerk.shared.lcl.dev%252Fv1%252Foauth_callback%26response_type%3Dcode%26scope%3Duser%253Aemail%2Bread%253Auser%26state%3Dhhuwocb592ns76fzd5h83k5mk0ap27duiwjap93o')}
                className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-gray-800 text-white rounded-md shadow hover:bg-black transition"
              >
              <FaGithub/>

              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Login
