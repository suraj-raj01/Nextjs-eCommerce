'use client'
import React from 'react'
import addVendor from '../../actions/admin/addVendor';
import Swal from 'sweetalert2';

const initialState = {
    success: false,
    error: "",
    message: ""
};

const AddVendor = () => {
    const [state, formAction] = React.useActionState(addVendor, initialState);

    if(state?.success) {
        Swal.fire({
            icon: 'success',
            text: state?.message,
        }).then(() => {
            window.location.href = '/dashboard/managevendor';
        });
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <h3 className="text-2xl font-bold mb-4 mt-4">Add Vendor</h3>
            <form className="w-full max-w-sm" action={formAction}>
                <div className="mb-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Vendor Name
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Enter vendor name"
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="useremail">
                       Vendor Email
                    </label>
                    <input
                        type="email"
                        id="useremail"
                        name="useremail"
                        placeholder="Enter vendor email"
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter Password"
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                >
                    Add User
                </button>
                {state?.error && <p className="text-red-500 mt-2">{state.error}</p>}
                {state?.success && <p className="text-green-500 mt-2">{state.message}</p>}
            </form>
        </div>
    );
};

export default AddVendor;
