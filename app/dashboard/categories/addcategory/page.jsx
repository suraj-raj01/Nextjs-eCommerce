'use client'
import { useRouter } from 'next/navigation'
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import React from 'react'
import "../../categories/style.css"
import { createCategory } from '../../../actions/categories/createCategory'
import Swal from 'sweetalert2';

const initialstate = {
  success: undefined,
  error: ""
};

const Page = () => {
  const router = useRouter();
  const [state, formAction] = React.useActionState(createCategory, initialstate);
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Clear image and file input on successful submission
  useEffect(() => {
    if (state.success) {
      setImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      Swal.fire({
        title: "Category created successfully!",
        icon: "success"
      });
    }
  }, [state.success]);

  return (
    <div>
      <div id='cate-header'>
        <p className='text-2xl font-bold'>Add New Category</p>
        <button className='p-2 bg-green-700 text-white' onClick={() => { router.push("/dashboard/categories") }}>
          Go to Categories
        </button>
      </div>

      <div>
        <form action={formAction} id="cate-form">
          <input type="text" name='category' required placeholder='Enter category name' />

          {image && (
            <div className='my-2'>
              <span onClick={handleRemoveImage} className='text-red-500 cursor-pointer font-bold'>X</span>
              <Image src={image} alt="Selected" width={100} height={100} />
            </div>
          )}

          <input
            type="file"
            name='cateurl'
            required
            ref={fileInputRef}
            onChange={handleFileChange}
          />

          <button className='p-2 bg-green-700 text-white mt-3'>Add Category</button>
        </form>

        {/* Submission Message */}
        {state.success && <p className="text-green-600 mt-3 text-center">Category added successfully!</p>}
        {state.error && <p className="text-red-600 mt-3">Error: {state.error}</p>}
      </div>
    </div>
  )
}

export default Page;
