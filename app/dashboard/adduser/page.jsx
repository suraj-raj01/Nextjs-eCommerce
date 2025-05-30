'use client'
import React from 'react'
import AddUserAction from "../../actions/superadmin/login"

const initialState = {
    success: false,
    error: "",
    message: ""
};

const AddUser = () => {
    const [state, formAction] = React.useActionState(AddUserAction, initialState);

    return (
        <div className="flex flex-col items-center justify-center">
            <p className="text-2xl font-bold mb-4 mt-4 text-start">Add User</p>
            <form className="w-full max-w-sm" action={formAction}>
                <div className="mb-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Username*
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Enter username"
                        required
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="useremail">
                        Email*
                    </label>
                    <input
                        type="email"
                        id="useremail"
                        name="useremail"
                        placeholder="Enter email"
                        required
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password*
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter Password"
                        required
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                >
                    Add User
                </button>
                {state?.error && <p className="text-red-500 mt-2">{state.error}</p>}
                {state?.success && <p className="text-green-500 mt-2">{state.message}</p>}
            </form>
        </div>
    );
};

export default AddUser;
