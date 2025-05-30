'use client'

import React, { useEffect, useState } from 'react'
import LoginNav from '../../_components/LoginNav'
import loginUser from '../../actions/login/login'
import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2'
import { useUser } from '@clerk/nextjs'
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';

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
        <div className="bg-white p-8 mt-8 rounded-lg shadow-lg w-full max-w-md">
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
              className="w-full p-2 bg-red-500 text-white rounded-md mt-4 disabled:opacity-50 hover:bg-red-600 focus:outline-none"
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
                <SignedOut>
                  <SignInButton />
                </SignedOut>
                <SignedIn>
                  Signed In
                </SignedIn>
                <span className="text-red-400 cursor-pointer"> With Google or Github</span>
                <br />
                {state?.success && (
                  <span className="text-green-600 text-center">Login Successfully Completed!</span>
                )}
                {state?.error && (
                  <span className="text-red-600 text-center">{state.error}</span>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
